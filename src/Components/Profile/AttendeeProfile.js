import "../../css/kendo/subset.scss";

import React, { useCallback, useEffect, useState } from "react";
import { getUserProfileByFuzionId, getUserStatusByFuzionId } from "util/api";
import { setOpenChat, setOtherAttendeeProfile } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import AttendeeProfileButtons from "./AttendeeProfileButtons";
import AttendeeProfileCustomFields from "./AttendeeProfileCustomFields";
import AttendeeProfileDetails from "./AttendeeProfileDetails";
import AttendeeProfileShowcases from "./AttendeeProfileShowcases";
import Auth from "services/Auth";
import BannerWrapper from "Components/Banners/BannerWrapper";
import { Breadcrumbs } from "Components/Breadcrumbs";
import CreateMeetingModal from "./CreateMeetingModal";
import ErrorModal from "Components/Modal/ErrorModal";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import Loader from "Components/Loader";
import Logger from "js-logger";
import MeetingScheduler from "../Exhibitor/MeetingScheduler";
import ProfileAvatar from "./ProfileAvatar";
import { Redirect } from "react-router-dom";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import axios from "axios";
import { bpMap } from "../../util/bpMap";
import { dataTypes } from "store/utils/dataTypes";
import getAnalyticsPage from "util/getAnalyticsPage";
import getExhibitor from "../Exhibitor/utils/getExhibitor";
import { getPayload } from "../../store/actions";
import { pageBanners } from "hooks/useGetPageByPathname";
import profilePageStyles from "./scss/profile-page.module.scss";
import sortResults from "util/sortResults";
import { useHistory } from "react-router-dom";
import useToggleDisplayMQ from "../../hooks/useToggleDisplayMQ";

const unsubscribeAndCloseSocket = (ws) => {
  ws.close();
};

let unsubRef = null;

const AttendeeProfile = ({ match }) => {
  const [attendeeProfile, setAttendeeProfile] = useState();
  const [exhibitor, setExhibitor] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [exhibitorToSchedule, setExhibitorToSchedule] = useState(null);
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const [openSection, setOpenSection] = useState(false);
  const [filteredShowcases, setFilteredShowcases] = useState([]);
  const sessions = useSelector((state) => state.global.showcaseSessions);
  const [scheduleMeetingAttendee, setScheduleMeetingAttendee] = useState(false);
  const permissions = useSelector((state) => state.global.permissions);
  const user = useSelector((state) => state.global.user);
  const profileConfigurations = useSelector(
    (state) => state.global.profileConfigurations
  );
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );

  const isMobile = useToggleDisplayMQ(bpMap.midpoint);

  const toggleMeetingScheduler = (exhibitor) => {
    setExhibitorToSchedule(exhibitor ? exhibitor : false);
  };

  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const genericBreadcrumbLabel =
    match.params.source === "notifications"
      ? `Notifications`
      : `Meet Attendees`;
  const genericBreadcrumbUrl =
    match.params.source === "notifications"
      ? `/account/notifications`
      : `/networking/attendees`;

  const breadcrumbs = [
    {
      path: breadcrumbUrl || genericBreadcrumbUrl,
      label: breadcrumbLabel || genericBreadcrumbLabel,
    },
  ];

  const onCloseErrorModal = (event) => {
    setShowErrorModal(false);
    const goTo =
      match.params.source === "notifications"
        ? `/account/notifications`
        : `/networking/attendees`;
    history.push(goTo);
  };

  const capitalizeFirstLetter = (input) => {
    if (input?.length > 0) {
      return input[0].toUpperCase() + input.substring(1);
    } else {
      return input;
    }
  };

  const sortData = useCallback((data) => {
    return sortResults(data, "startEndTimeAndName");
  }, []);

  const toggleSection = () => {
    setOpenSection((openSection) => !openSection);
  };

  const handleChatClick = () => {
    attendeeProfile.id = match.params.id;
    dispatch(
      setOpenChat({
        selectedAttendee: {
          id: attendeeProfile.id,
          Profile: attendeeProfile,
        },
        isMinimized: false,
        show: true,
      })
    );
  };

  const handleScheduleClick = () => {
    attendeeProfile.id = match.params.id;
    setScheduleMeetingAttendee(attendeeProfile);
  };

  const toggleDialog = () => {
    setScheduleMeetingAttendee(null);
  };

  const fetchExhibitor = useCallback(
    (exhibitorsData, id) => {
      const data = getExhibitor(exhibitorsData, id);
      setExhibitor(data);
    },
    [setExhibitor]
  );

  const openWebsocket = useCallback(() => {
    let ws;
    const token = Auth.getMiddlewareAPIAccessToken();
    const localHost = process.env.REACT_APP_API_HOST.indexOf("//localhost");
    ws = new WebSocket(
      localHost >= 0
        ? "ws://" + process.env.REACT_APP_API_HOST.split("http://")[1]
        : "wss://" + process.env.REACT_APP_API_HOST.split("https://")[1],
      [token]
    );
    ws.onopen = () => {
      unsubRef = unsubscribeAndCloseSocket.bind(null, ws);
      window.addEventListener("beforeunload", unsubRef);
      ws.send(
        JSON.stringify({
          request: "subscribe",
        })
      );
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (match.params.id === msg.user) {
          setStatus(msg.status);
        }
      };
    };
    ws.onclose = (e) => {
      Logger.log("websocket close", e.code);
      if (e.code !== 1005) {
        setTimeout(() => {
          openWebsocket();
        }, 2 * 1000);
      }
    };
    return ws;
  }, [match.params.id]);

  const getTierLevelAccessForExhibitorRep = () => {
    const exhibitorTier = networkSettings.networkingMeetings.tiers.find(
      (tier) => tier.tierName === exhibitor?.membership_level
    );

    return exhibitorTier;
  };

  const checkExhibitorTierChatAccess = (exhibitor) => {
    if (!exhibitor) {
      return true;
    }
    const exhibitorTier = getTierLevelAccessForExhibitorRep(exhibitor);

    return exhibitorTier ? exhibitorTier?.chat : true;
  };

  const checkExhibitorTierVideoAccess = (exhibitor) => {
    if (!exhibitor) {
      return true;
    }
    const exhibitorTier = getTierLevelAccessForExhibitorRep(exhibitor);

    return exhibitorTier
      ? exhibitorTier?.chat || exhibitorTier?.videoChat
      : true;
  };

  useEffect(() => {
    let ws;
    const fetchAttendeeProfile = async () => {
      try {
        const res = await getUserProfileByFuzionId(match.params.id);
        // create map for profile config attr array for look up
        if (profileConfigurations) {
          // make copy of response attributes to modify
          let attributes = [];
          const map = {};
          for (let p in profileConfigurations.attributes) {
            map[profileConfigurations.attributes[p].attr] =
              profileConfigurations.attributes[p];
            if (
              res?.data?.data?.attributes[
                profileConfigurations.attributes[p].attr
              ]
            ) {
              attributes.push({
                attr: profileConfigurations.attributes[p].attr,
                label: profileConfigurations.attributes[p].label,
                value:
                  res.data.data.attributes[
                    profileConfigurations.attributes[p].attr
                  ],
                hide: profileConfigurations.attributes[p].hide,
              });
            }
          }
          const attrArrayCopy = JSON.parse(JSON.stringify(attributes));
          // check profile config to remove from attendees attributes if attribute meant to be hidden
          for (let a in attributes) {
            const attr = map[attributes[a].attr];
            if (attr) {
              if (attr.hide) {
                attrArrayCopy.splice(
                  attrArrayCopy.findIndex((elem) => {
                    return elem.attr === attributes[a].attr;
                  }),
                  1
                );
              }
            }
          }
          res.data.data.attributes = attrArrayCopy;
        }
        setAttendeeProfile(res.data.data);
      } catch (err) {
        setShowErrorModal(true);
      }
    };
    const fetchAttendeeStatus = async () => {
      try {
        const res = await getUserStatusByFuzionId(match.params.id);
        dispatch(setOtherAttendeeProfile(res.data.data));
        setStatus(res.data.data.status);
        ws = openWebsocket();
      } catch (err) {
        setShowErrorModal(true);
      }
    };
    if (process.env.REACT_APP_ENABLE_ONLINE_STATUS) {
      fetchAttendeeStatus();
    }
    fetchAttendeeProfile();
    return () => {
      // eslint-disable-next-line no-console
      console.debug("closing online status WS");
      if (ws) {
        ws.close();
        window.removeEventListener("beforeunload", unsubRef);
        unsubRef = null;
      }
    };
  }, [match.params.id, dispatch, openWebsocket, profileConfigurations]);

  useEffect(() => {
    const fetchExhibitorProfile = async (companyId) => {
      return await axios.get(
        `${process.env.REACT_APP_API_HOST}/account/exhibitor/company/${companyId}`
      );
    };
    if (!exhibitors && attendeeProfile?.companyId !== "") {
      dispatch(getPayload(dataTypes.exhibitors));
    } else if (attendeeProfile && attendeeProfile?.companyId !== "") {
      fetchExhibitorProfile(attendeeProfile?.companyId).then((res) => {
        fetchExhibitor(exhibitors, res.data?.data?.exhibitorId);
        setShowLoader(false);
      });
    } else {
      setShowLoader(false);
    }
  }, [exhibitors, attendeeProfile, fetchExhibitor, dispatch]);

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.showcaseSessions));
    } else {
      if (exhibitor) {
        const filtered = sortData(sessions);
        setFilteredShowcases(
          filtered.filter((session) => {
            return exhibitor?.exhibitor_company_id === session.sessionCustom5;
          })
        );
      }
    }
  }, [sessions, dispatch, exhibitor, sortData]);

  if (!match.params.id) {
    return <Redirect push to={`/networking/attendees`} />;
  }

  if ((!attendeeProfile && !showErrorModal) || showLoader) {
    return <Loader />;
  }

  return (
    <>
      <BannerWrapper pageName={pageBanners.publicProfileAttendee} />
      <div className={profilePageStyles.background}>
        <div className={profilePageStyles.main}>
          <div className={profilePageStyles.profilePage}>
            <h1 className={profilePageStyles.header}>Public Profile</h1>
            <div style={{ margin: "30px auto 0px", padding: "0 30px" }}>
              {match.params.source !== "directchat" && (
                <Breadcrumbs
                  crumbs={breadcrumbs}
                  page={`Attendee Info`}
                  componentType="Navigation Item"
                />
              )}
            </div>
            <div className={profilePageStyles.gridWrapper}>
              <div className={`k-block ${profilePageStyles.kBlockNoForm}`}>
                <div className={profilePageStyles.profileDetails}>
                  <div className={`${profilePageStyles.profileDisplay}`}>
                    <div className={profilePageStyles.pageGridAvatar}>
                      <div
                        className={`k-hbox-container ${profilePageStyles.profileName}`}
                      >
                        <div className={profilePageStyles.attendeeAvatar}>
                          <ProfileAvatar
                            url={attendeeProfile?.avatar}
                            firstName={attendeeProfile?.firstName}
                            preferredName={attendeeProfile?.preferredName}
                            lastName={attendeeProfile?.lastName}
                            status={status}
                            size={162}
                          />
                          <div
                            style={{
                              textAlign: "center",
                              paddingTop: "0.8rem",
                            }}
                            aria-label={status}
                          >
                            {capitalizeFirstLetter(status)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {!isMobile && attendeeProfile.attributes.length > 0 && (
                      <div className={profilePageStyles.customContainer}>
                        {attendeeProfile.attributes.length > 0 && (
                          <h4
                            aria-label={"Custom Profile"}
                            style={{ marginBottom: "0.5rem" }}
                          >
                            Custom Profile
                          </h4>
                        )}
                        {attendeeProfile.attributes.map((attr) => {
                          return (
                            <div className={profilePageStyles.attributes}>
                              <div className={profilePageStyles.customLabel}>
                                {attr.label}
                              </div>
                              <div
                                aria-label={attr.value}
                                className={profilePageStyles.customValue}
                              >
                                {typeof attr.value === "object"
                                  ? attr.value.map((attrVal) => {
                                      return <span>{attrVal}, &nbsp;</span>;
                                    })
                                  : attr.value}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div
                    className={`${profilePageStyles.pageGridForm}`}
                    // style={
                    //   attendeeProfile.attributes.length > 2 && !isMobile
                    //     ? { marginTop: "-90px" }
                    //     : { marginTop: "30px" }
                    // }
                  >
                    <div className={`${profilePageStyles.formGrid}`}>
                      <AttendeeProfileDetails
                        attendeeProfile={attendeeProfile}
                        profileConfigurations={profileConfigurations}
                        exhibitor={exhibitor}
                      />
                      <AttendeeProfileButtons
                        attendeeProfile={attendeeProfile}
                        exhibitor={exhibitor}
                        handleChatClick={handleChatClick}
                        toggleMeetingScheduler={toggleMeetingScheduler}
                        handleScheduleClick={handleScheduleClick}
                        permissions={permissions}
                        user={user}
                        exhibitorTierChatAccess={checkExhibitorTierChatAccess(
                          exhibitor
                        )}
                        exhibitorTierVideoAccess={checkExhibitorTierVideoAccess(
                          exhibitor
                        )}
                      />
                      <AttendeeProfileCustomFields
                        isMobile={isMobile}
                        attendeeProfile={attendeeProfile}
                      />
                    </div>
                  </div>
                </div>
                <AttendeeProfileShowcases
                  attendeeProfile={attendeeProfile}
                  filteredShowcases={filteredShowcases}
                  openSection={openSection}
                  toggleSection={toggleSection}
                  exhibitor={exhibitor}
                />
              </div>
              <VerticalSponsorBanner
                pageName={pageBanners.publicProfileAttendee}
              />
              <HorizontalSponsorBanner
                pageName={pageBanners.publicProfileAttendee}
              />
            </div>
          </div>
          {scheduleMeetingAttendee && (
            <CreateMeetingModal
              toggleDialog={toggleDialog}
              preLoadedAttendeeProp={scheduleMeetingAttendee}
            />
          )}
          {exhibitorToSchedule && (
            <MeetingScheduler
              closeCallback={toggleMeetingScheduler}
              exhibitor={exhibitorToSchedule}
              page={getAnalyticsPage(window.location.pathname)}
              repAttendee={attendeeProfile}
            />
          )}
        </div>
        {scheduleMeetingAttendee && (
          <CreateMeetingModal
            toggleDialog={toggleDialog}
            preLoadedAttendeeProp={scheduleMeetingAttendee}
          />
        )}
        {exhibitorToSchedule && (
          <MeetingScheduler
            closeCallback={toggleMeetingScheduler}
            exhibitor={exhibitorToSchedule}
            page={getAnalyticsPage(window.location.pathname)}
            repAttendee={attendeeProfile}
          />
        )}
        <ErrorModal
          isActive={showErrorModal}
          onCloseErrorModal={onCloseErrorModal}
        />
      </div>
    </>
  );
};

export default AttendeeProfile;

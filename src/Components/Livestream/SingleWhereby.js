// import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs } from "Components/Breadcrumbs";
import ConfigService from "services/ConfigService";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import LiveStreamChat from "Components/Chat/LiveStreamChat";
import Loader from "Components/Loader";
import Meta from "../Meta";
import OEPAnalytics from "Components/OEPAnalytics";
import ScheduleToCalendar from "Components/Schedule/ScheduleToCalendar";
import SessionExternalLink from "Components/Session/SessionExternalLink";
import SessionSurveyLink from "Components/Session/SessionSurveyLink";
import SessionVideoPlayer from "Components/Session/SessionVideoPlayer";
import SideBar from "../Sidebar/SingleSideBar";
import SideBarCategories from "Components/Sidebar/SideBarCategories";
import SideBarItem from "Components/Sidebar/SideBarItem";
import SideBarTitle from "Components/Sidebar/SideBarTitle";
import SlidoChat from "Components/Chat/SlidoChat";
import { SpeakerCard } from "Components/Speaker/SpeakerCard";
import SyncEmbed from "../Sync/SyncEmbed";
import TabList from "Components/Tabs/TabList";
import TabListItem from "Components/Tabs/TabListItem";
import Wordly from "Components/Chat/Wordly";
import { allowVideo } from "util/allowWherebyVideo";
import axios from "axios";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import generatedName from "../../util/generatedName";
import { getExhibitorsCategories } from "../Exhibitor/utils/getSideBar";
import { getModerators } from "Components/Session/utils/sideBarContent";
import { getPayload } from "../../store/actions";
import { hasBasicUserAccess } from "util/gatingHelpers";
import lodash from "lodash";
import singleLiveStreamStyles from "./scss/single-live-stream.module.scss";
import useAccountProfile from "hooks/useAccountProfile";
import useTrackCurrentSession from "hooks/useTrackCurrentSession";
import { withRouter } from "react-router-dom";

const SingleWhereby = ({ match, history }) => {
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.showcaseSessions);
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const { accountProfile } = useAccountProfile();
  const timezone = useSelector((state) => state.global.timezone);
  /**@type {[Session, Function]} */
  const [session, setSession] = useState(null);
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const [exhibitorCategories, setExhibitorCategories] = useState(null);
  const [moderatorList, setModeratorList] = useState(null);
  const [speakersList, setSpeakersList] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const id = match.params.id;

  const parentPageType = useSelector((state) => state.filters.pageType);
  const breadcrumbs =
    parentPageType && parentPageType === "schedule"
      ? [
          {
            path: breadcrumbUrl || "/schedule",
            label: breadcrumbLabel || "Schedule",
          },
        ]
      : [
          {
            path: breadcrumbUrl || "/networking/showcases",
            label: breadcrumbLabel || "Networking Showcases",
          },
        ];

  const [iFrameId, setIframeId] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const [exhibitor, setExhibitor] = useState(null);

  const getWhereByUrl = async (session, exhibitorID) => {
    const accountInfo = accountProfile?.companyId
      ?.replace(/ /g, "-")
      ?.toLowerCase();
    const exhibitorInfo = exhibitorID?.replace(/ /g, "-")?.toLowerCase();
    const isHost = accountInfo === exhibitorInfo;

    const roomType = isHost ? "host" : "room";
    const meetingId = session.sessionVideoSource;

    const res = await axios.get(
      `${process.env.REACT_APP_API_HOST}/whereby/${roomType}/${meetingId}`
    );
    return res.data;
  };

  const handleJoinClick = (session) => {
    const exhibitorInfo = session?.sessionCustom5
      ?.replace(/ /g, "-")
      ?.toLowerCase();
    const accountInfo = accountProfile?.companyId
      ?.replace(/ /g, "-")
      ?.toLowerCase();
    const isHost = accountInfo === exhibitorInfo;

    getWhereByUrl(session, exhibitorInfo).then((result) => {
      if (!lodash.isEmpty(result)) {
        const whereByUrl = isHost ? result.hostRoomUrl : result.roomUrl;

        setShowVideo(true);
        setIframeId(
          isHost
            ? `${whereByUrl}&needsAncestor&breakout=off&chat=off&leaveButton=on`
            : `${whereByUrl}?embed&needsAncestor&video=off&audio=off&screenshare=off&chat=off&leaveButton=on&displayName=${user.contact.first_name}%20${user.contact.last_name}`
        );
        setStreamId(whereByUrl);
      } else {
        setShowVideo(false);
      }
    });
  };

  const getExhibitorUrl = (exData) => {
    return `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${
      exData.fuzion_exhibitor_id
    }/${generatedName(exData.exhibitor_name)}`;
  };

  const getButton = () => {
    return showMeetingInfo === 0 ? (
      hasBasicUserAccess(user) && (
        <div className={singleLiveStreamStyles.boothCalendarButton}>
          <ScheduleToCalendar id={session.sessionId} page="single showcase" />
        </div>
      )
    ) : (
      <OEPAnalytics
        componentType="Button"
        page="single showcase"
        url={`Join ${session.sessionName}`}
        componentName="Join meeting"
      >
        <button
          className={singleLiveStreamStyles.boothButton}
          onClick={handleJoinClick.bind(null, session, exhibitor)}
          aria-label={`Join "${session.sessionName}" Now`}
        >
          Join
        </button>
      </OEPAnalytics>
    );
  };

  const fetchSession = useCallback(
    (id, sessionData, exhibitorData, accountProfile) => {
      /**@type {Session} */
      const data = sessionData.find((s) => `${s.sessionId}` === id);
      const speakerList = data?.subSessions
        ? data.subSessions
            .map((subSessions) => {
              if (subSessions.presenters) {
                return subSessions.presenters.map((presenter) => ({
                  ...presenter,
                  presentationFiles: subSessions.presentationFiles,
                }));
              }

              return null;
            })
            .filter(Boolean)
        : null;
      /**
       * No data mean's the user should not be able to see this page. The content was filtered out.
       * Redirect to home page.
       */
      if (!data) {
        return history.push("/");
      }
      if (data) {
        let exh = null;

        if (exhibitorData && data.sessionCustom5) {
          const exhibitorInfo = data?.sessionCustom5
            ?.replace(/ /g, "")
            ?.toLowerCase();

          exh = exhibitorData.find(
            (ex) =>
              ex.exhibitor_name?.replace(/ /g, "")?.toLowerCase() ===
                exhibitorInfo ||
              ex.exhibitor_company_id?.replace(/ /g, "")?.toLowerCase() ===
                exhibitorInfo
          );
        }
        setExhibitor(exh);
        setExhibitorCategories(getExhibitorsCategories(exh));

        if (data.sessionVideoSource && user) {
          // Set the iframe and stream IDs based on the player type
          if (data.sessionVideoSource) {
            data.iFrameId = `${data.sessionVideoSource}?embed&video=off&audio=off&screenshare=off&background=off&chat=off&leaveButton=on&displayName=${user.contact.first_name}%20${user.contact.last_name}`;
            data.streamId = data.sessionVideoSource;

            setIframeId(
              `${data.sessionVideoSource}?embed&video=off&audio=off&screenshare=off&background=off&chat=off&leaveButton=on&displayName=${user.contact.first_name}%20${user.contact.last_name}`
            );
            setStreamId(data.sessionVideoSource);
          }
        }
      }

      setModeratorList(getModerators(data));
      setShowMeetingInfo(allowVideo(data, accountProfile));
      setSession(data);
      setSpeakersList(
        speakerList && speakerList.length > 0
          ? lodash.flatMap(speakerList)
          : null
      );
    },
    [history, user]
  );

  useEffect(() => {
    if (!sessions || !exhibitors || !accountProfile) {
      if (!sessions) {
        dispatch(getPayload(dataTypes.showcaseSessions));
      } else if (!exhibitors) {
        dispatch(getPayload(dataTypes.exhibitors));
      }
    } else {
      fetchSession(id, sessions, exhibitors, accountProfile);
    }
  }, [sessions, id, exhibitors, dispatch, fetchSession, accountProfile]);

  useTrackCurrentSession(session);

  if (!session) {
    return (
      <div className={singleLiveStreamStyles.main}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={singleLiveStreamStyles.main}>
      <Meta pageTitle={session.sessionName} />
      <Breadcrumbs
        crumbs={breadcrumbs}
        page="single showcase"
        componentType="Navigation Item"
      />
      {showVideo ? (
        <div className={singleLiveStreamStyles.liveStreamWherebyEmbed}>
          {session.streamId && session.iFrameId && (
            <div className={singleLiveStreamStyles.showcaseContainer}>
              <SessionVideoPlayer
                streamId={streamId}
                classnames={"showcaseContainer"}
                session={session}
                iframeId={iFrameId}
                stopPlayer={true}
                pageLabel="single showcase"
                isWhereby={true}
              />
            </div>
          )}

          {ConfigService.runValues.hasSync ? (
            <div className={singleLiveStreamStyles.liveStreamPluginContainer}>
              <SyncEmbed
                title={session.sessionName}
                user={user}
                interactionKey={session.sessionId}
              />
            </div>
          ) : (
            <div
              className={
                session.interactionKey &&
                singleLiveStreamStyles.liveStreamPluginContainer
              }
            >
              <TabList
                ik={session.interactionKey}
                whereBy
                ismention={match.params.ismention}
              >
                {(session.interactionKey || session.sessionCustom6) && (
                  <TabListItem tabName={"Engage"}>
                    <div style={{ height: "100%" }}>
                      <SlidoChat
                        title="Live Event Chat and Polling"
                        interactionKey={session.interactionKey}
                        minHeight="560px"
                      />
                    </div>
                  </TabListItem>
                )}
                <TabListItem tabName={"Chat"}>
                  <LiveStreamChat
                    user={user}
                    sessionId={session.sessionId}
                    sessionName={`${session.sessionName} - Showcase Chat`}
                    classNameProp="showcaseChat"
                    componentName="Showcase Chat"
                  />
                </TabListItem>
                {session.sessionCustom6 && (
                  <TabListItem tabName={"Wordly"}>
                    <div>
                      <Wordly
                        sessionId={session.sessionCustom6}
                        minHeight="560px"
                      />
                    </div>
                  </TabListItem>
                )}
              </TabList>
            </div>
          )}
        </div>
      ) : (
        <div className={singleLiveStreamStyles.whereByEmbed}>
          <div>
            {exhibitor?.logo_image_path && (
              <LinkWrapper
                to={getExhibitorUrl(exhibitor)}
                external={false}
                page="Single Showcase"
                componentType="Logo"
                trackingUrl={getExhibitorUrl(exhibitor)}
                componentName="Single Showcase logo"
              >
                <div className={singleLiveStreamStyles.sponsorLogo}>
                  <img
                    src={exhibitor.logo_image_path}
                    alt={`${exhibitor.exhibitor_name} logo`}
                  />
                </div>
              </LinkWrapper>
            )}
          </div>
          <h1>{session.sessionName}</h1>
          {showMeetingInfo !== 2 ? (
            <Fragment>
              <h2>{formatDate({ date: session.sessionStart }, timezone)}</h2>
              <h2>{formatTime(session, timezone)}</h2>
              {getButton()}
            </Fragment>
          ) : (
            <h2>The Showcase Talk has ended.</h2>
          )}
        </div>
      )}

      <div className={singleLiveStreamStyles.liveStreamSessionContainer}>
        <div className={singleLiveStreamStyles.customSessionContainer}>
          <SideBar showcase={true}>
            <SideBarTitle title={session.sessionName} />
            {exhibitor && (
              <section className={singleLiveStreamStyles.sidebarSponsor}>
                <div>
                  {exhibitor.logo_image_path && (
                    <LinkWrapper
                      to={getExhibitorUrl(exhibitor)}
                      external={false}
                      page="Single Showcase"
                      componentType="Single Showcase Sponsor Logo"
                      trackingUrl={getExhibitorUrl(exhibitor)}
                    >
                      <div className={singleLiveStreamStyles.sponsorLogo}>
                        <img
                          src={exhibitor.logo_image_path}
                          alt={`${exhibitor.exhibitor_name} logo`}
                        />
                      </div>
                    </LinkWrapper>
                  )}
                </div>
                <LinkWrapper
                  to={getExhibitorUrl(exhibitor)}
                  external={false}
                  page="Single Showcase"
                  componentType="Button"
                  trackingUrl={getExhibitorUrl(exhibitor)}
                  exhibitorId={exhibitor.fuzion_exhibitor_id}
                >
                  <button
                    type="button"
                    className={singleLiveStreamStyles.boothButton}
                    aria-describedby={`Visit Exhibitor Both ${exhibitor.exhibitor_name}`}
                  >
                    Visit Booth
                  </button>
                </LinkWrapper>
              </section>
            )}
            {exhibitor?.company_info?.address?.country && (
              <SideBarItem
                data={{
                  content: exhibitor.company_info.address.country,
                  title: "Location",
                }}
                className={"showcaseSidebar"}
              />
            )}
            {exhibitorCategories && (
              <SideBarCategories
                data={exhibitorCategories}
                className={"showcaseSidebar"} //test
              />
            )}
          </SideBar>
          <section className={singleLiveStreamStyles.speakerSessionInfo}>
            {session.sessionSurveyLink && (
              <div className={singleLiveStreamStyles.surveyHolderAboveContent}>
                <SessionSurveyLink
                  link={session.sessionSurveyLink}
                  page="Single Showcase"
                />
              </div>
            )}
            {/* {!isMobile && (
              <h1 className={singleLiveStreamStyles.sessionTitle}>
                {session.sessionName}

                <Favorites
                  page="Single Showcase"

                  url={`${session.sessionName}`}
                  type={favoriteTypes.sessions}
                  id={session.sessionId}
                />
              </h1>
            )} */}

            <h2 className={singleLiveStreamStyles.showcaseInfo}>
              {formatDate({ date: session.sessionStart }, timezone)}{" "}
              {formatTime(session, timezone)}
            </h2>
            {moderatorList?.content && (
              <h2 className={singleLiveStreamStyles.showcaseInfo}>
                Hosted by {moderatorList?.content}
              </h2>
            )}

            {session.description && (
              <div
                className={singleLiveStreamStyles.description}
                dangerouslySetInnerHTML={{ __html: session.description }}
              />
            )}

            {session.sessionExternalLink && (
              <SessionExternalLink
                sessionExternalLink={session.sessionExternalLink}
                page="Single Showcase"
              />
            )}
            {speakersList && speakersList.length > 0 && (
              <div className={singleLiveStreamStyles.speakerList}>
                {speakersList.map((speaker) => (
                  <SpeakerCard
                    isWhereby={true}
                    key={speaker.subSessionId + speaker.username}
                    speaker={speaker}
                    page="Single Showcase"
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SingleWhereby);

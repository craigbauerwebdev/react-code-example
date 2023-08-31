import "./scss/exhibitor-virtual-booth.scss";

import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, { useCallback, useEffect, useState } from "react";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";
import {
  getExhibitorsCategories,
  getExhibitorsLocation,
  getExhibitorsLogo,
} from "./utils/getSideBar";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs } from "Components/Breadcrumbs";
import ConfigService from "services/ConfigService";
import ErrorModal from "Components/Modal/ErrorModal";
import { ExhibitorBooth } from "./ExhibitorBooth";
import ExhibitorBoothStyles from "./ExhibitorBoothStyles";
import ExhibitorBusinessCard from "./ExhibitorBusinessCard";
import ExhibitorContacts from "./ExhibitorContacts";
import { ExhibitorDocuments } from "./ExhibitorDocuments";
import { ExhibitorProducts } from "./ExhibitorProducts";
import { ExhibitorVideos } from "./ExhibitorVideos";
import { ExhibitorWebinars } from "./ExhibitorWebinars";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import LiveStreamChat from "../Chat/LiveStreamChat";
import Loader from "Components/Loader";
import MeetingScheduler from "./MeetingScheduler";
import Meta from "../Meta";
import OEPAnalytics from "Components/OEPAnalytics";
import SideBar from "Components/Sidebar/SingleSideBar";
import SideBarCategories from "Components/Sidebar/SideBarCategories";
import SideBarItem from "Components/Sidebar/SideBarItem";
import SideBarLogo from "Components/Sidebar/SideBarLogo";
import SideBarTitle from "Components/Sidebar/SideBarTitle";
import SocialLinks from "Components/SocialLinks/SocialLinks";
import { bpMap } from "util/bpMap";
import { capitalize } from "lodash";
import { dataTypes } from "store/utils/dataTypes";
import formatUrl from "util/formatter";
import getAnalyticsPage from "util/getAnalyticsPage";
import getBanner from "./utils/getBanner";
import getContacts from "./utils/getContact";
import getDocuments from "./utils/getDocs";
import getExhibitor from "./utils/getExhibitor";
import { getPayload } from "store/actions";
import getVideos from "./utils/getVideos";
import singleExhibitorStyles from "./scss/single-exhibitor.module.scss";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import { withRouter } from "react-router-dom";

const SingleExhibitor = ({ match }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const permissions = useSelector((state) => state.global.permissions);
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const virtualBooths = useSelector((state) => state.global.virtualBooths);
  const userSession = useSelector((state) => state.global.user);
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );

  const [booth, setBooth] = useState(null);
  const [exhibitorTheme, setExhibitorTheme] = useState(null);
  const [exhibitor, setExhibitor] = useState(0);
  const [exhibitorVideos, setExhibitorVideos] = useState(null);
  const [exhibitorDocuments, setExhibitorDocuments] = useState(null);
  const [exhibitorProducts, setExhibitorProducts] = useState(null);
  const [contact, setContact] = useState(false);
  const [exhibitorChat, setExhibitorChat] = useState(false);
  const [exhibitorBusinessCard, setExhibitorBusinessCard] = useState(false);
  const [exhibitorScheduleMeeting, setExhibitorScheduleMeeting] = useState(
    false
  );
  const [exhibitorLocation, setExhibitorLocation] = useState(null);
  const [exhibitorCategories, setExhibitorCategories] = useState(null);
  const [exhibitorToSchedule, setExhibitorToSchedule] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const isMobile = useToggleDisplayMQ(bpMap.tablet);

  const toggleMeetingScheduler = (exhibitor) => {
    setExhibitorToSchedule(exhibitor ? exhibitor : false);
    if (exhibitorToSchedule) {
      enableParentPageScroll();
    } else {
      disableParentPageScroll();
    }
  };
  const id = match.params.id;
  const parentPageType = useSelector((state) => state.filters.pageType);
  const breadcrumbs = parentPageType.includes("exhibitor")
    ? [
        {
          path:
            breadcrumbUrl ||
            `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
          label:
            breadcrumbLabel ||
            (breadcrumbUrl?.includes("/networking/exhibitors")
              ? "Networking Exhibitors"
              : `${capitalize(
                  process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE
                )}`),
        },
      ]
    : [
        {
          path: breadcrumbUrl || "/networking/showcases",
          label: breadcrumbLabel || "Networking Showcases",
        },
      ];
  const emptyBannerImg = (img) => img !== "";
  const onCloseErrorModal = (event) => {
    setShowErrorModal(false);
    history.push("/exhibitors");
  };
  const fetchExhibitor = useCallback(
    (exhibitorsData) => {
      const data = getExhibitor(exhibitorsData, id);
      if (!data) {
        setShowErrorModal(true);
      }
      const documents = getDocuments(data);
      const videos = getVideos(data);
      const contacts = getContacts(data);
      const products = data?.products;
      setExhibitor(data);
      setContact(contacts);
      setExhibitorVideos(videos);
      setExhibitorDocuments(documents);
      setExhibitorProducts(products);
      setExhibitorChat(data?.custom_attributes?.Rolling_Chat === "Yes");
      setExhibitorBusinessCard(
        data?.custom_attributes?.drop_a_business_card !== "No"
      );
      setExhibitorScheduleMeeting(
        data?.custom_attributes?.Schedule_Meeting !== "No"
      );
      // Sidebar Data
      setExhibitorLocation(getExhibitorsLocation(data));
      setExhibitorCategories(getExhibitorsCategories(data));
    },
    [
      setExhibitor,
      setContact,
      setExhibitorVideos,
      setExhibitorDocuments,
      id,
      setExhibitorLocation,
      setExhibitorCategories,
    ]
  );
  const getFavorites = () => {
    return (
      <Favorites
        page={getAnalyticsPage(location.pathname)}
        url={exhibitor.exhibitor_name}
        type={favoriteTypes.exhibitors}
        id={exhibitor.fuzion_exhibitor_id}
        exhibitorId={exhibitor.fuzion_exhibitor_id}
        data={exhibitor}
      />
    );
  };
  const checkTierLevelAccessForExhibitor = (exhibitor) => {
    const exhibitorTier = networkSettings.networkingMeetings.tiers.find(
      (tier) => tier.tierName === exhibitor.membership_level
    );

    const isAllowedChatOrVideo = exhibitorTier
      ? exhibitorTier?.chat || exhibitorTier?.videoChat
      : true;

    return isAllowedChatOrVideo;
  };
  const fetchVirtualBooth = useCallback(
    (virtualBooths, exhibitor) => {
      let theme;
      const booth = virtualBooths.find((booth) => {
        return (
          exhibitor.fuzion_exhibitor_id === booth.fuzion_exhibitor_id &&
          booth.booth_video_animation &&
          booth.booth_still
        );
      });
      if (booth && booth.colors.bg_color) {
        if (booth.colors.bg_color === "Dark Mode") {
          theme = "single-exhibitor-dark-theme";
        } else if (booth.colors.bg_color === "Light Mode") {
          theme = "single-exhibitor-light-theme";
        }
        document.body.classList.add(theme);
      }
      if (booth) {
        document.head.insertAdjacentHTML(
          "beforeend",
          ExhibitorBoothStyles({ booth })
        );
      }
      setExhibitorTheme(theme);
      setBooth(booth);
    },
    [setExhibitorTheme, setBooth]
  );
  // rendering logic for chats
  // const hasRollingChatAttribute =
  //   exhibitor && exhibitor.custom_attributes.Rolling_Chat === "Yes";
  // const isShowcaseItem =
  //   exhibitor && exhibitor.booth_id && exhibitor.booth_id.startsWith("SH");
  // const renderShowcaseChat = isShowcaseItem && hasRollingChatAttribute;
  // const renderExhibitorChat = !isShowcaseItem && hasRollingChatAttribute;

  //*************************************************

  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    } else {
      fetchExhibitor(exhibitors);
    }
  }, [exhibitors, fetchExhibitor, dispatch]);

  useEffect(() => {
    if (!virtualBooths) {
      dispatch(getPayload(dataTypes.virtualBooths));
    } else if (exhibitor) {
      fetchVirtualBooth(virtualBooths, exhibitor);
    }
    return () => {
      if (document.getElementById("exhibitor-theme")) {
        document.getElementById("exhibitor-theme").remove();
      }
      if (exhibitorTheme) {
        document.body.classList.remove(exhibitorTheme);
      }
    };
  }, [virtualBooths, exhibitorTheme, exhibitor, fetchVirtualBooth, dispatch]);

  if (!exhibitor) {
    return (
      <div className={singleExhibitorStyles.main}>
        <Loader />
        <ErrorModal
          isActive={showErrorModal}
          onCloseErrorModal={onCloseErrorModal}
          customMessage={
            <div>
              Sorry, this Exhibitor page is currently not available. Please
              review the{" "}
              <LinkWrapper to="/exhibitors" componentName="exhibitor list page">
                Exhibitor List Page
              </LinkWrapper>
              .
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        exhibitor.custom_attributes &&
        exhibitor.custom_attributes.BackgroundImage
          ? singleExhibitorStyles.hero
          : ""
      }`}
      style={
        exhibitor.custom_attributes &&
        exhibitor.custom_attributes.BackgroundImage && {
          backgroundImage: `url('${exhibitor.custom_attributes.BackgroundImage}')`,
        }
      }
    >
      <div className={singleExhibitorStyles.main}>
        <Meta
          pageTitle={exhibitor.exhibitor_name}
          pageDescription={exhibitor.exhibitor_description}
        />
        <Breadcrumbs
          crumbs={breadcrumbs}
          page="Single Exhibitor"
          componentType="Navigation Item"
        />
        {exhibitor.membership_level === "Tier 1" && booth ? (
          <ExhibitorBooth booth={booth} exhibitor={booth} />
        ) : (
          emptyBannerImg(
            exhibitor.custom_attributes.custom_fields.Banner_Images
          ) && (
            <img
              className={singleExhibitorStyles.singlePageTopImg}
              src={getBanner(exhibitor)}
              alt={exhibitor.exhibitor_name}
            />
          )
        )}
        <div className={singleExhibitorStyles.singleExhibitorContainer}>
          {exhibitor.membership_level !== "Tier 4" && (
            <SideBar rawData={exhibitor} colorMode={booth?.colors?.bg_color}>
              <SideBarTitle
                title={exhibitor.exhibitor_name}
                node={getFavorites()}
              />
              <SideBarLogo
                data={getExhibitorsLogo(exhibitor)}
                exhibitorId={exhibitor.fuzion_exhibitor_id}
              />
              <nav
                className={singleExhibitorStyles.exhibitorSocialLinks}
                aria-label={`${exhibitor.exhibitor_name} - Social Media`}
              >
                <SocialLinks
                  faceBook={exhibitor.company_info.facebook_account}
                  twitter={exhibitor.company_info.twitter_account}
                  linkedIn={exhibitor.company_info.linkedin_account}
                  instagram={exhibitor.company_info.instagram_account}
                  snapchat={exhibitor.company_info.snapchat_account}
                  youtube={exhibitor.company_info.youtube_account}
                  page={getAnalyticsPage(location.pathname)}
                  exhibitorId={exhibitor.fuzion_exhibitor_id}
                />
              </nav>
              {exhibitorLocation && (
                <SideBarItem
                  data={exhibitorLocation}
                  boothStyle={booth?.colors?.bg_color}
                />
              )}
              {exhibitorCategories && (
                <SideBarCategories
                  data={exhibitorCategories}
                  boothStyle={booth?.colors?.bg_color}
                />
              )}
              {contact && (
                <ExhibitorContacts
                  contact={contact}
                  exhibitor={exhibitor}
                  boothStyle={booth?.colors?.bg_color}
                />
              )}
              {ConfigService.runValues.enableExhibitorChat &&
                userSession &&
                exhibitorChat && (
                  <div
                    className={singleExhibitorStyles.liveStreamPluginContainer}
                  >
                    <LiveStreamChat
                      user={userSession}
                      sessionId={exhibitor.fuzion_exhibitor_id}
                      sessionName={`${exhibitor.exhibitor_name} - Exhibitor Chat`}
                      isMention={match.params.ismention}
                      componentName="Exhibitor Chat"
                      isExhibitor
                    />
                  </div>
                )}
            </SideBar>
          )}
          <section className={singleExhibitorStyles.content}>
            {!isMobile && (
              <div className={singleExhibitorStyles.title}>
                <h1>{exhibitor.exhibitor_name} </h1>
                {getFavorites()}
              </div>
            )}
            <div
              className={`${singleExhibitorStyles.descriptionContainer} ${
                booth?.colors?.bg_color === "Dark Mode" &&
                singleExhibitorStyles.darkMode
              }`}
              dangerouslySetInnerHTML={{
                __html: exhibitor.exhibitor_description,
              }}
            />
            {exhibitor.company_info.website_url && (
              <LinkWrapper
                to={formatUrl(exhibitor.company_info.website_url)}
                external={true}
                className={`${singleExhibitorStyles.singleWebsite} gtm-exhibitor-website`}
                page={getAnalyticsPage(location.pathname)}
                componentType="Link"
                trackingUrl={exhibitor.company_info.website_url}
                componentName={"company website url"}
                exhibitorId={exhibitor.fuzion_exhibitor_id}
              >
                <span>{formatUrl(exhibitor.company_info.website_url)}</span>
              </LinkWrapper>
            )}
            <div className={singleExhibitorStyles.contentWrapperWithContact}>
              <div className={singleExhibitorStyles.leftDetails}>
                <ExhibitorDocuments
                  documents={exhibitorDocuments}
                  exhibitorName={exhibitor.exhibitor_name}
                />
              </div>
              <div className={singleExhibitorStyles.singleListDetails}>
                {(permissions.allowScheduleMeetingsAttendeeToAttendee ||
                  permissions.allowScheduleMeetingsExhibitorToAttendee) &&
                  (permissions.allowVideoChatAccess ||
                    permissions.allowNetworkingChatMeetings) &&
                  permissions.allowNetworking &&
                  permissions.allowUserNetworking &&
                  exhibitorScheduleMeeting &&
                  checkTierLevelAccessForExhibitor(exhibitor) && (
                    <div
                      className={singleExhibitorStyles.scheduleMeetingContainer}
                    >
                      <OEPAnalytics
                        page={getAnalyticsPage(location.pathname)}
                        componentType="Button"
                        url={`Schedule a meeting modal open`}
                        componentName="Schedule a meeting"
                        exhibitorId={exhibitor.fuzion_exhibitor_id}
                      >
                        <button
                          type="button"
                          className={`${singleExhibitorStyles.detailsButton} gtm-schedule-meeting`}
                          onClick={toggleMeetingScheduler.bind(null, exhibitor)}
                          aria-label={`Schedule Meeting With ${exhibitor.exhibitor_name}`}
                        >
                          Schedule a Meeting
                        </button>
                      </OEPAnalytics>
                    </div>
                  )}
                {exhibitorBusinessCard && (
                  <ExhibitorBusinessCard exhibitor={exhibitor} id={id} />
                )}
              </div>
            </div>
            {ConfigService.runValues.hasShowcases &&
              permissions.allowNetworking &&
              permissions.allowUserNetworking && (
                <ExhibitorWebinars exhibitor={exhibitor} />
              )}
            <ExhibitorProducts
              products={exhibitorProducts}
              exhibitorName={exhibitor.exhibitor_name}
            />
            <ExhibitorVideos
              videos={exhibitorVideos}
              exhibitorName={exhibitor.exhibitor_name}
            />
          </section>
        </div>
      </div>
      {exhibitorToSchedule && (
        <MeetingScheduler
          closeCallback={toggleMeetingScheduler}
          exhibitor={exhibitorToSchedule}
          page={getAnalyticsPage(location.pathname)}
        />
      )}
    </div>
  );
};

export default withRouter(SingleExhibitor);

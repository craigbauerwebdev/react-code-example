import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, { useCallback, useEffect, useState } from "react";
import {
  getModerators,
  getSessionDisclosure,
  getSessionSupplementalFiles,
  getSessionTopic,
  getSessionTypeName,
} from "./utils/sideBarContent";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs } from "Components/Breadcrumbs";
import ConfigService from "services/ConfigService";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import LanguageSelector from "./LanguageSelector";
// import LiveStreamChat from "../Chat/LiveStreamChat";
import Loader from "Components/Loader";
import Meta from "../Meta";
import SessionContent from "./SessionContent";
import SessionVideoPlayer from "Components/Session/SessionVideoPlayer";
import SideBar from "Components/Sidebar/SingleSideBar";
import SideBarDateTime from "Components/Sidebar/SideBarDateTime";
import SideBarDisclosureBtn from "Components/Sidebar/SideBarDisclosureBtn";
import SideBarItem from "Components/Sidebar/SideBarItem";
import SideBarSupplemental from "Components/Sidebar/SideBarSupplemental";
import SideBarTitle from "Components/Sidebar/SideBarTitle";
import SocialShare from "Components/SocialShare/SocialShare";
import SubSessionContent from "./SubSessionContent";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { bpMap } from "util/bpMap";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import generatedName from "util/generatedName";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getPayload } from "store/actions";
import getSelectedLanguage from "util/getSelectedLanguage";
import getVideoIds from "./utils/getVideoIds";
import lodash from "lodash";
import { pageBanners } from "hooks/useGetPageByPathname";
import singleSessionStyles from "./scss/single-session.module.scss";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import useTrackCurrentSession from "hooks/useTrackCurrentSession";
import { withRouter } from "react-router-dom";

const SingleSession = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.global.timezone);
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );
  /**@type {[Session, Function]} */
  const [session, setSession] = useState(null);
  const [isSubSession, setSubSession] = useState(false);
  const id = match.params.id;
  const subSessionId = match.params.subSessionId;
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [moderatorList, setModeratorList] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [topic, setTopic] = useState(null);
  const [supplementalFiles, setSupplementalFiles] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const horizontalBannerName = isSubSession
    ? pageBanners.singleSubSession
    : pageBanners.singleSession;

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
            path: breadcrumbUrl || "/sessions",
            label: breadcrumbLabel || "Sessions",
          },
        ];
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [embedArray, setEmbedArray] = useState([]); //all available embeds for the session
  const [languageArray, setLanguages] = useState([]); //list of available languages
  const [iFrameId, setIframeId] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const getVimeoType = (id) => {
    return id.length > 7 ? "VimeoPrerecorded" : "VimeoLivestream";
  };

  const analyticsPageName = getAnalyticsPage(location.pathname);
  const setVideoData = (data, videoSource) => {
    // data.subSessionVideoSource = "English,451560218;French,451560218;Spanish,451560213;Portuguese,451560210;Arabic,451560172";
    const sessLanguageArray = videoSource.split(";");
    const { sessionLanguages, defaultEmbed } = getSelectedLanguage(
      sessLanguageArray
    );
    const [iFrameId, streamId] = getVideoIds(sessLanguageArray, defaultEmbed, [
      false,
      false,
    ]);

    setSelectedLanguage(
      defaultEmbed[0].substr(0, defaultEmbed[0].indexOf(","))
    );

    // Set the iframe and stream IDs based on the player type
    if (iFrameId) {
      if (streamId) {
        data.iFrameId = iFrameId;
        data.streamId = streamId;
        setIframeId(iFrameId);
        setStreamId(streamId);
      } else if (iFrameId.length > 10) {
        data.iFrameId = "Youtube";
        data.streamId = iFrameId;
        setIframeId("Youtube");
        setStreamId(iFrameId);
      } else {
        data.iFrameId = getVimeoType(iFrameId);
        data.streamId = iFrameId;
        setIframeId(getVimeoType(iFrameId));
        setStreamId(iFrameId);
      }

      setEmbedArray(sessLanguageArray);

      setLanguages(
        streamId && iFrameId && sessionLanguages.length > 1
          ? sessionLanguages.sort()
          : null
      );
    }
  };

  const fetchSession = useCallback(
    (id, sessionsData) => {
      const data = sessionsData.find((s) => `${s.sessionId}` === id);

      /**
       * No data mean user should not be able to see this page. The content was filtered out. Redirect to home page.
       * Find 1st subSession with video id.
       * If you need to change which video is displayed on the On Demand landing page then adjust this code below
       */
      if (data) {
        const subSessionWithVideo = data.subSessions.find(
          (subsession) => subsession.subSessionVideoSource
        );
        const subSessionVideoSource = subSessionWithVideo
          ? subSessionWithVideo.subSessionVideoSource
          : null;
        if (subSessionVideoSource) {
          setVideoData(data, subSessionVideoSource);
        }
      } else {
        return history.push("/");
      }

      setSession(data);
      // Sidebar data
      setModeratorList(getModerators(data)); // Sidebar Moderator List
      setTypeName(getSessionTypeName(data)); // Sidebar Type Name
      setTopic(getSessionTopic(data)); // Sidebar Type Name
      setPageTitle(data.sessionName);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history]
  );
  const fetchSubSession = useCallback(
    (subId, id, sessionsData) => {
      const subIdAsNum = Number(subId);
      const idAsNum = Number(id);

      const [data] = lodash.flatten(
        sessionsData
          .filter((session) => session.sessionId === idAsNum)
          .map(
            (s) =>
              s.subSessions &&
              s.subSessions.filter(
                (subItem) =>
                  subItem.subSessionId === subIdAsNum &&
                  s.subSessions.filter((subItem) => subItem.description)
              )
          )
      );

      /**
       * No data mean user should not be able to see this page. The content was filtered out. Redirect to home page.
       */
      if (data) {
        if (data.subSessionVideoSource) {
          // data.subSessionVideoSource =
          // "English,ibm_24121036;Spanish,ibm_24121036";
          // data.subSessionVideoSource = "ibm_24121036";
          // data.subSessionVideoSource = "English,451560218;French,451560218;Spanish,451560213;Portuguese,451560210;Arabic,451560172";
          const sessLanguageArray = data.subSessionVideoSource.split(";");
          const { sessionLanguages, defaultEmbed } = getSelectedLanguage(
            sessLanguageArray
          );
          const [streamId] = getVideoIds(sessLanguageArray, defaultEmbed, [
            false,
          ]);

          setSelectedLanguage(
            defaultEmbed[0].substr(0, defaultEmbed[0].indexOf(","))
          );

          // Set the iframe and stream IDs based on the player type
          if (streamId?.includes("ibm_")) {
            data.iframeId = "IbmPlayer";
            data.streamId = streamId.replace("ibm_", "");
            setStreamId(streamId.replace("ibm_", ""));
          } else if (streamId) {
            data.streamId = streamId;
            setStreamId(streamId);
          }

          setEmbedArray(sessLanguageArray);
          setLanguages(
            sessionLanguages.length > 1 ? sessionLanguages.sort() : null
          );
        }
      } else {
        return history.push("/");
      }
      setSubSession(true);
      setSession(data);

      const disclosureText = data.presenters
        ? data.presenters.find((presenter) => presenter.disclosureText !== null)
        : null;

      if (disclosureText) {
        setShowDisclosure(getSessionDisclosure());
      }
      // Get Sidebar data
      setModeratorList(getModerators(data)); // Sidebar Moderator List
      setTypeName(getSessionTypeName(data)); // Sidebar Type Name
      setTopic(getSessionTopic(data)); // Sidebar Topic
      setSupplementalFiles(getSessionSupplementalFiles(data)); // Sidebar Supplemental Files
      setPageTitle(data.subSessionName);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history]
  );
  const handleChange = (e) => {
    const { value } = e.target;
    if (!languageArray.includes(value)) {
      return;
    }
    setSelectedLanguage(value);
    const selectedEmbed = embedArray
      ? embedArray.filter((langs) => langs.includes(value))
      : null;

    const [selectedLang, selectedStreamId] = selectedEmbed
      ? selectedEmbed[0].split(",")
      : [false, false];
    session.streamId = selectedStreamId;
    setSession(session);
    setStreamId(selectedStreamId);
    setSelectedLanguage(selectedLang);
  };
  const getFavorites = () => {
    return (
      <Favorites
        page={isSubSession ? "Single Sub-Session" : "single session"}
        type={isSubSession ? favoriteTypes.subsessions : favoriteTypes.sessions}
        url={pageTitle}
        id={isSubSession ? session.subSessionId : session.sessionId}
        data={session}
      />
    );
  };
  const getSocialShare = () => (
    <SocialShare
      isLiveStream={false}
      title={pageTitle}
      page={analyticsPageName}
    />
  );

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    } else {
      if (subSessionId) {
        // Is sub session page
        fetchSubSession(subSessionId, id, sessions);
      } else {
        // Is single session page
        fetchSession(id, sessions);
      }
    }
  }, [sessions, fetchSubSession, fetchSession, id, subSessionId, dispatch]);

  useTrackCurrentSession(session);

  if (session && isSubSession) {
    breadcrumbs.push({
      path: `/sessions/${session.sessionId}/${generatedName(
        session.sessionName
      )}`,
      label: session.sessionName,
    });
  }

  if (!session) {
    return (
      <div className={singleSessionStyles.main}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={singleSessionStyles.main}>
      <Meta pageTitle={pageTitle} pageDescription={session.description} />
      <div className={singleSessionStyles.sessionNav}>
        <Breadcrumbs
          crumbs={breadcrumbs}
          page={isSubSession ? "Single Sub-Session" : "single session"}
          componentType="Navigation Item"
        />
      </div>
      {!isSubSession && (
        <div className={singleSessionStyles.liveStreamEmbed}>
          <div className={singleSessionStyles.videoContainer}>
            {session.streamId && session.iFrameId && (
              <SessionVideoPlayer
                streamId={streamId}
                classnames={"liveStreamEmbedIframeVideo"}
                session={session}
                iframeId={iFrameId}
                stopPlayer={true}
                pageLabel={analyticsPageName}
              />
            )}
          </div>
        </div>
      )}
      <div className={singleSessionStyles.customSessionContainer}>
        <section>
          {streamId && languageArray && (
            <LanguageSelector
              handleChange={handleChange}
              selectedLanguage={selectedLanguage}
              languageOptions={languageArray}
            />
          )}
          <SideBar>
            <SideBarTitle
              title={pageTitle}
              node={
                <div>
                  {getFavorites()} {getSocialShare()}
                </div>
              }
            />
            <SideBarDateTime
              date={
                !session.sessionVideoSource
                  ? false
                  : formatDate(
                      { date: session.sessionStart || session.startTime },
                      timezone
                    )
              }
              time={
                !session.sessionVideoSource
                  ? false
                  : formatTime(session, timezone)
              }
            />
            {moderatorList && <SideBarItem data={moderatorList} />}
            {typeName && <SideBarItem data={typeName} />}
            {topic && <SideBarItem data={topic} />}
            {supplementalFiles && (
              <SideBarSupplemental
                data={supplementalFiles}
                pageType="Sessions"
              />
            )}
            {showDisclosure && (
              <SideBarDisclosureBtn
                data={showDisclosure}
                rawData={session}
                page={analyticsPageName}
              />
            )}
          </SideBar>

          {!isSubSession && (
            <VerticalSponsorBanner pageName={pageBanners.singleSession} />
          )}
        </section>
        <section
          className={`${singleSessionStyles.speakerSessionInfo} ${
            isSubSession && singleSessionStyles.speakerSessionInfoSubSession
          }`}
        >
          {!isMobile && (
            <h1 className={singleSessionStyles.sessionTitle}>
              {pageTitle}
              <div>
                {getFavorites()}
                {getSocialShare()}
              </div>
            </h1>
          )}
          {ConfigService.runValues.hasSubSessions && isSubSession ? (
            <SubSessionContent data={session} page={"Single Sub-Session"} />
          ) : (
            <SessionContent data={session} page={"Single Session"} />
          )}
        </section>
      </div>
      <HorizontalSponsorBanner pageName={horizontalBannerName} />
    </div>
  );
};

export default withRouter(SingleSession);

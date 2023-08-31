import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, { useCallback, useEffect, useState } from "react";
import {
  displaySessionSpeakers,
  getSessionSpeakers,
} from "Components/Session/utils/getSessionSpeakers";
import {
  getModerators,
  getSessionTopic,
  getSessionTypeName,
} from "Components/Session/utils/sideBarContent";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs } from "Components/Breadcrumbs";
import ConfigService from "services/ConfigService";
import { Fragment } from "react";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import LanguageSelector from "Components/Session/LanguageSelector";
import LiveStreamChat from "Components/Chat/LiveStreamChat";
import Loader from "Components/Loader";
import Meta from "../Meta";
import SessionExternalLink from "Components/Session/SessionExternalLink";
import SessionSurveyLink from "Components/Session/SessionSurveyLink";
import SessionVideoPlayer from "Components/Session/SessionVideoPlayer";
import SideBar from "../Sidebar/SingleSideBar";
import SideBarCalendar from "Components/Sidebar/SideBarCalendar";
import SideBarDateTime from "Components/Sidebar/SideBarDateTime";
import SideBarItem from "Components/Sidebar/SideBarItem";
import SideBarSchedule from "Components/Sidebar/SideBarSchedule";
import SideBarTitle from "Components/Sidebar/SideBarTitle";
import SlidoChat from "Components/Chat/SlidoChat";
import SocialShare from "Components/SocialShare/SocialShare";
import SyncEmbed from "../Sync/SyncEmbed";
import TabList from "Components/Tabs/TabList";
import TabListItem from "Components/Tabs/TabListItem";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { bpMap } from "util/bpMap";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getPayload } from "../../store/actions";
import getSelectedLanguage from "util/getSelectedLanguage";
import getVideoIds from "Components/Session/utils/getVideoIds";
import { hasBasicUserAccess } from "util/gatingHelpers";
import sessionStarted from "util/sessionStarted";
import singleLiveStreamStyles from "./scss/single-live-stream.module.scss";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import useTrackCurrentSession from "hooks/useTrackCurrentSession";
import { withRouter } from "react-router-dom";

const SingleLiveStream = ({ match, history, location }) => {
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );
  const timezone = useSelector((state) => state.global.timezone);
  /**@type {[Session, Function]} */
  const [session, setSession] = useState(null);
  const [moderatorList, setModeratorList] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [topic, setTopic] = useState(null);
  const [hasSessionStarted, setHasSessionStarted] = useState(null);
  const [speakersList, setSpeakersList] = useState(null);
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
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
            path: breadcrumbUrl || "/sessions",
            label: breadcrumbLabel || "Sessions",
          },
        ];
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [embedArray, setEmbedArray] = useState([]); //all available embeds for the session
  const [languageArray, setLanguages] = useState(null); //list of available languages
  const [iFrameId, setIframeId] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const getVimeoType = (id) => {
    return id.length > 7 ? "VimeoPrerecorded" : "VimeoLivestream";
  };
  const analyticsPageName = getAnalyticsPage(location.pathname);
  const fetchSession = useCallback(
    (id, sessionData) => {
      /**@type {Session} */
      const data = sessionData.find((s) => `${s.sessionId}` === id);
      const speakerList = getSessionSpeakers(data?.subSessions);
      /**
       * No data mean's the user should not be able to see this page. The content was filtered out.
       * Redirect to home page.
       */
      if (!data) {
        return history.push("/");
      }

      if (data) {
        if (data.sessionVideoSource) {
          // data.sessionVideoSource = "English,ibm_24121036;Spanish,ibm_24121036";
          // data.sessionVideoSource = "ibm_24121036";
          // data.subSessionVideoSource = "English,451560218;French,451560218;Spanish,451560213;Portuguese,451560210;Arabic,451560172";
          const sessLanguageArray = data.sessionVideoSource.split(";");
          const { sessionLanguages, defaultEmbed } = getSelectedLanguage(
            sessLanguageArray
          );

          const [iFrameId, streamId] = getVideoIds(
            sessLanguageArray,
            defaultEmbed,
            [false, false]
          );

          setSelectedLanguage(
            defaultEmbed[0].substr(0, defaultEmbed[0].indexOf(","))
          );

          // Set the iframe and stream IDs based on the player type
          if (iFrameId) {
            if ([iFrameId, streamId].some((id) => id.includes("ibm_"))) {
              const formatIBMStreamId = streamId
                ? streamId.replace("ibm_", "")
                : iFrameId.replace("ibm_", "");
              data.iFrameId = "IbmPlayer";
              data.streamId = formatIBMStreamId;
              setIframeId("IbmPlayer");
              setStreamId(formatIBMStreamId);
            } else if (streamId) {
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
              data.streamId && data.iFrameId && sessionLanguages.length > 1
                ? sessionLanguages.sort()
                : null
            );
          }
        }
      }

      setSession(data);
      setSpeakersList(speakerList);

      // Sidebar data
      setHasSessionStarted(sessionStarted(data.sessionStart || data.startTime)); // Sidebar Calendar
      setModeratorList(getModerators(data)); // Sidebar Moderator List
      setTypeName(getSessionTypeName(data)); // Sidebar Type Name
      setTopic(getSessionTopic(data)); // Sidebar Topic Name
    },
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

    const [selectedLang, selectedIframeId, selectedStreamId] = selectedEmbed
      ? selectedEmbed[0].split(",")
      : [false, false, false];
    if (
      [selectedIframeId, selectedStreamId].some((id) => id.includes("ibm_"))
    ) {
      const formattedIBMStreamId = selectedIframeId.includes("ibm_")
        ? selectedIframeId.replace("ibm_", "")
        : selectedStreamId.replace("ibm_", "");
      setIframeId("IbmPlayer");
      setStreamId(formattedIBMStreamId);
    } else if (selectedStreamId) {
      setIframeId(selectedIframeId);
      setStreamId(selectedStreamId);
    } else if (selectedIframeId.length > 10) {
      setIframeId("Youtube");
      setStreamId(selectedIframeId);
    } else {
      setIframeId(getVimeoType(selectedIframeId));
      setStreamId(selectedIframeId);
    }
    setSelectedLanguage(selectedLang);
  };
  const getFavorites = () => {
    return (
      <Favorites
        page={analyticsPageName}
        type={favoriteTypes.sessions}
        id={session.sessionId}
        url={session.sessionName}
        data={session}
      />
    );
  };
  const getSocialShare = () => (
    <SocialShare
      isLiveStream={true}
      title={session.sessionName}
      page={analyticsPageName}
    />
  );

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    } else {
      fetchSession(id, sessions);
    }
  }, [sessions, id, dispatch, fetchSession]);

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
        page={analyticsPageName}
        componentType="Navigation Item"
      />
      <div className={singleLiveStreamStyles.liveStreamEmbed}>
        <div className={singleLiveStreamStyles.videoContainer}>
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
        <div className={singleLiveStreamStyles.liveStreamPluginContainer}>
          {ConfigService.runValues.hasSync ? (
            <SyncEmbed
              title={session.sessionName}
              user={user}
              sessionKey={session.sessionId}
            />
          ) : (
            <TabList
              ik={session.interactionKey}
              ismention={match.params.ismention}
            >
              {session.interactionKey && (
                <TabListItem tabName={"Q&A"}>
                  <div>
                    <SlidoChat
                      title="Live Event Chat and Polling"
                      interactionKey={session.interactionKey}
                      minHeight="560px"
                    />
                  </div>
                </TabListItem>
              )}
              {ConfigService.runValues.enableLivestreamChat && (
                <TabListItem tabName={"Chat"}>
                  <LiveStreamChat
                    user={user}
                    sessionId={session.sessionId}
                    sessionName={`${session.sessionName} - LiveStream Chat`}
                    match={match}
                    componentName="Livestream Chat"
                  />
                </TabListItem>
              )}
            </TabList>
          )}
        </div>
      </div>
      {session.sessionSurveyLink && !languageArray && (
        <div className={singleLiveStreamStyles.surveyHolderAboveContent}>
          <SessionSurveyLink
            link={session.sessionSurveyLink}
            page={analyticsPageName}
            sessionData={session}
          />
        </div>
      )}
      <div className={singleLiveStreamStyles.liveStreamSessionContainer}>
        <div className={singleLiveStreamStyles.customSessionContainer}>
          <SideBar
            outSide={[
              languageArray && (
                <div
                  className={singleLiveStreamStyles.languageSurvey}
                  key="LanguageSelector"
                >
                  {/*option to select language if there is a video and more than one language*/}
                  <LanguageSelector
                    handleChange={handleChange}
                    selectedLanguage={selectedLanguage}
                    languageOptions={languageArray}
                  />
                </div>
              ),
            ]}
          >
            <SideBarTitle
              title={session.sessionName}
              node={
                <div>
                  {getFavorites()} {getSocialShare()}
                </div>
              }
            />
            <SideBarDateTime
              date={formatDate({ date: session.sessionStart }, timezone)}
              time={formatTime(session, timezone)}
            />
            {!hasSessionStarted &&
              session.sessionVideoSource &&
              hasBasicUserAccess(user) && (
                <Fragment>
                  <SideBarCalendar
                    session={session}
                    userTz={timezone}
                    page={analyticsPageName}
                  />
                  <SideBarSchedule
                    id={session.sessionId}
                    page={analyticsPageName}
                    url={session.sessionName}
                  />
                </Fragment>
              )}
            {moderatorList && <SideBarItem data={moderatorList} />}
            {typeName && <SideBarItem data={typeName} />}
            {topic && <SideBarItem data={topic} />}
          </SideBar>
          <section className={singleLiveStreamStyles.speakerSessionInfo}>
            {session.sessionSurveyLink && languageArray && (
              <div className={singleLiveStreamStyles.surveyHolderAboveContent}>
                <SessionSurveyLink
                  link={session.sessionSurveyLink}
                  page={analyticsPageName}
                  sessionData={session}
                />
              </div>
            )}
            {!isMobile && (
              <h1 className={singleLiveStreamStyles.sessionTitle}>
                {session.sessionName.replace(/<(.|\n)*?>/g, "")}
                <div>
                  {getFavorites()}
                  {getSocialShare()}
                </div>
              </h1>
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
                page="Single Session"
              />
            )}
            {speakersList &&
              speakersList.length > 0 &&
              displaySessionSpeakers(
                speakersList,
                singleLiveStreamStyles,
                analyticsPageName
              )}
          </section>
        </div>
        <VerticalSponsorBanner pageName="single_live_session" />
      </div>
      <HorizontalSponsorBanner pageName="single_live_session" />
    </div>
  );
};

export default withRouter(SingleLiveStream);

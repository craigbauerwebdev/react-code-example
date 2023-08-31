import React, { useCallback, useEffect, useState } from "react";
import {
  getModerators,
  getSessionTopic,
  getSessionTypeName,
} from "Components/Session/utils/sideBarContent";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs } from "Components/Breadcrumbs";
import LiveStreamChat from "Components/Chat/LiveStreamChat";
import Loader from "Components/Loader";
import Meta from "../Meta";
import SessionVideoPlayer from "Components/Session/SessionVideoPlayer";
import SideBar from "../Sidebar/SingleSideBar";
import SideBarCalendar from "Components/Sidebar/SideBarCalendar";
import SideBarDateTime from "Components/Sidebar/SideBarDateTime";
import SideBarItem from "Components/Sidebar/SideBarItem";
import SideBarTitle from "Components/Sidebar/SideBarTitle";
import { SpeakerCard } from "Components/Speaker/SpeakerCard";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { bpMap } from "util/bpMap";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import generatedName from "util/generatedName";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getPayload } from "store/actions";
import { hasBasicUserAccess } from "util/gatingHelpers";
import sessionStarted from "util/sessionStarted";
import subLiveStreamStyles from "./scss/single-sub-live-stream.module.scss";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import useTrackCurrentSession from "hooks/useTrackCurrentSession";
import { withRouter } from "react-router-dom";

const SingleSubLiveStream = ({ match, location }) => {
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const timezone = useSelector((state) => state.global.timezone);
  const user = useSelector((state) => state.global.user);
  const breadcrumbsBase = useSelector((state) => state.filters.breadcrumbs);
  const [session, setSession] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [moderatorList, setModeratorList] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [topic, setTopic] = useState(null);
  const [hasSessionStarted, setHasSessionStarted] = useState(null);
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const id = match.params.subLiveId;
  const fetchSubSession = useCallback(
    (id, sessionsData) => {
      const [data] = sessionsData
        .map(
          (s) =>
            s.subSessions &&
            s.subSessions.find((s) => `${s.subSessionId}` === id)
        )
        .filter(Boolean);

      setSession(data);
      setSpeakers(
        data.presenters.map((p) => ({
          ...p,
          presentationFiles: data.presentationFiles,
        }))
      );
      setHasSessionStarted(sessionStarted(data.sessionStart || data.startTime)); // Sidebar Calendar
      setModeratorList(getModerators(data)); // Sidebar Moderator List
      setTypeName(getSessionTypeName(data)); // Sidebar Type Name
      setTopic(getSessionTopic(data)); // Sidebar Type Name
    },
    [setSpeakers]
  );
  const parentPageType = useSelector((state) => state.filters.pageType);
  const breadcrumbs =
    parentPageType && parentPageType === "schedule"
      ? [
          {
            path: breadcrumbsBase || "/schedule/",
            label: "Schedule",
          },
        ]
      : [
          {
            path: breadcrumbsBase || "/sessions/",
            label: "Sessions",
          },
        ];

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    } else {
      fetchSubSession(id, sessions);
    }
  }, [sessions, id, dispatch, fetchSubSession]);

  useTrackCurrentSession(session);

  if (session) {
    breadcrumbs.push({
      path: `/live-stream/${session.session.sessionId}/${generatedName(
        session.session.sessionName
      )}`,
      label: session.session.sessionName,
    });
  }

  if (!session) {
    return (
      <div className={subLiveStreamStyles.main}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={subLiveStreamStyles.main}>
      <Meta pageTitle={session.subSessionName} />
      <Breadcrumbs
        crumbs={breadcrumbs}
        page="Sub Live Stream Single"
        componentType="Navigation Item"
      />
      <div className={subLiveStreamStyles.liveStreamEmbed}>
        <SessionVideoPlayer
          classnames={"liveStreamEmbedIframeVideo"}
          iframeId={session.iFrameId}
          session={session}
          pageLabel="Sub Live Stream Single"
        />
        <div className={subLiveStreamStyles.liveStreamPluginContainer}>
          <LiveStreamChat
            sessionId={session.subSessionName}
            sessionName={`${session.subSessionName} - Sub LiveStream Chat`}
            componentName="Sub Livestream Chat"
          ></LiveStreamChat>
        </div>
      </div>
      <div className={subLiveStreamStyles.liveStreamSessionContainer}>
        <div className={subLiveStreamStyles.customSessionContainer}>
          <SideBar>
            <SideBarTitle title={session.subSessionName} />
            <SideBarDateTime
              date={formatDate({ date: session.startTime }, timezone)}
              time={formatTime(session, timezone)}
            />
            {!hasSessionStarted &&
              session.sessionVideoSource &&
              hasBasicUserAccess(user) && (
                <SideBarCalendar
                  session={session}
                  userTz={timezone}
                  page={getAnalyticsPage(location.pathname)}
                />
              )}
            {moderatorList && <SideBarItem data={moderatorList} />}
            {typeName && <SideBarItem data={typeName} />}
            {topic && <SideBarItem data={topic} />}
          </SideBar>
          <section className={subLiveStreamStyles.speakerSessionInfo}>
            {!isMobile && <h1>{session.subSessionName}</h1>}
            {session.description && (
              <div
                className={subLiveStreamStyles.description}
                dangerouslySetInnerHTML={{ __html: session.description }}
              />
            )}

            <div className={subLiveStreamStyles.speakerList}>
              {speakers ? (
                speakers.map((speaker, i) => (
                  <SpeakerCard
                    key={i}
                    speaker={speaker}
                    page={getAnalyticsPage(location.pathname)}
                  />
                ))
              ) : (
                <Loader />
              )}
            </div>
          </section>
        </div>
        <VerticalSponsorBanner pageName="single_live_session" />
      </div>
    </div>
  );
};

export default withRouter(SingleSubLiveStream);

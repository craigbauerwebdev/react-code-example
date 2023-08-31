import React, { useEffect, useRef, useState } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import SessionVideoPlayer from "Components/Session/SessionVideoPlayer";
import { actionTypesNowPlayingDrawer } from "./reducer";
import getSessionUrl from "util/getSessionUrl";
import nowPlayingVideoStyles from "./scss/now-playing-video.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";

export default function NowPlayingVideo({ session, state, dispatch }) {
  const [frameId, streamId] = session?.sessionVideoSource?.split(",");
  const [transVideo, setTransVideo] = useState(false);
  const togglePlayer = () => {
    dispatch({
      type: actionTypesNowPlayingDrawer.SET_MIN_VIDEO_PLAYER,
      payload: !state.miniVideoOpen,
    });
  };
  const iframeRef = useRef();
  const checkTransition = () => {
    if (!state.miniVideoOpen) {
      dispatch({
        type: actionTypesNowPlayingDrawer.REMOVE_VIDEO_PLAYING,
        payload: true,
      });
    }
  };

  if (frameId) {
    if (streamId) {
      session.iFrameId = frameId;
      session.streamId = streamId;
    } else if (frameId.length > 10) {
      session.iFrameId = "Youtube";
      session.streamId = frameId;
    } else {
      session.iFrameId = "VimeoPrerecorded";
      session.streamId = frameId;
    }
  }

  useEffect(() => {
    const iFrameListener = () => {
      if (document.activeElement === iframeRef.current) {
        const data = iframeRef.current.getAttribute("data-oepa");
        saveAnalytic(JSON.parse(data));
        window.removeEventListener("blur", iFrameListener);
      }
    };
    window.addEventListener("blur", iFrameListener);
    return () => {
      window.removeEventListener("blur", iFrameListener);
    };
  }, [iframeRef]);

  useEffect(() => {
    if (state.miniVideoOpen) {
      setTransVideo(true);
    } else {
      setTransVideo(false);
    }
  }, [state.miniVideoOpen]);

  return (
    <div
      id="nowPlayingSlide"
      className={`${nowPlayingVideoStyles.nowPlayingVideoDrawer} ${
        transVideo && nowPlayingVideoStyles.open
      }`}
      onTransitionEnd={checkTransition}
      tabIndex="0"
    >
      <SessionVideoPlayer
        classnames="nowPlayingVideo"
        iframeId={session.iFrameId}
        streamId={session.streamId}
        isInDrawer={true}
        session={session}
        width="100%"
        height="100%"
        stopPlayer={state.miniVideoOpen}
        pageLabel="Now Playing"
        componentType="Now Playing Video"
        componentName="Now Playing Video"
      />
      <div
        className={nowPlayingVideoStyles.nowPlayingVideoDrawerActionContainer}
      >
        <div>
          <OEPAnalytics
            componentType="Button"
            page="Now Playing"
            url="Close video player"
            componentName="Close video player"
          >
            <button
              onClick={togglePlayer}
              className={nowPlayingVideoStyles.closeButton}
            >
              <img
                className={nowPlayingVideoStyles.closeIcon}
                src="/images/icons/iconExitDark.svg"
                alt="close video player"
              />
            </button>
          </OEPAnalytics>
          <LinkWrapper
            to={getSessionUrl(session)}
            onClick={togglePlayer}
            className={nowPlayingVideoStyles.expandLink}
            componentName="open video player"
            componentType="Button"
            page="Now Playing"
            trackingUrl={getSessionUrl(session)}
          >
            <img
              className={nowPlayingVideoStyles.expandIcon}
              src="/images/icons/icon-expand.svg"
              alt="open video player"
            />
          </LinkWrapper>
        </div>
      </div>
    </div>
  );
}

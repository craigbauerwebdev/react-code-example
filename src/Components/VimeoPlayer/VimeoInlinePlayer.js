import React, { useCallback, useEffect } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import Player from "@vimeo/player";
import SvgTypes from "Components/SVG/SvgTypes";
import { bpMap } from "util/bpMap";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";
import useTabVisibility from "hooks/useTabVisibility";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import useVimeoPlayerAnalytics from "hooks/useVimeoPlayerAnalytics";
import videoSkin from "./scss/video-player.module.scss";
import { vimeoPlayerActionTypes } from "./reducer";

const VimeoInlinePlayer = ({
  id,
  pauseAt = bpMap.tablet,
  state,
  dispatch,
  divId,
  page,
  componentType,
  trackingId,
  sessionData,
}) => {
  const location = useLocation();
  const isMobile = useToggleDisplayMQ(pauseAt);
  const isTabActive = useTabVisibility();
  const timeUpdate = useCallback(
    (data) => {
      dispatch({
        type: vimeoPlayerActionTypes.UPDATE_TIME,
        payload: data,
      });
    },
    [dispatch]
  );
  const progressChange = useCallback(
    (data) => {
      dispatch({
        type: vimeoPlayerActionTypes.UPDATE_BUFFER,
        payload: data.percent,
      });
    },
    [dispatch]
  );
  const toggleVideoPlay = () => {
    if (state.player) {
      state.player.getPaused().then((paused) => {
        if (paused) {
          state.player.play();
        } else {
          state.player.pause();
        }

        dispatch({
          type: vimeoPlayerActionTypes.IS_PLAYING,
          payload: paused,
        });
      });
    }
  };
  const posterPlay = (e) => {
    e.stopPropagation();
    state.player.play();
    dispatch({
      type: vimeoPlayerActionTypes.PLAY_VIDEO,
    });
  };
  const pauseVideo = useCallback(() => {
    if (state.player) {
      state.player.getPaused().then((paused) => {
        if (!paused) {
          state.player.pause();
        }
      });
    }
  }, [state.player]);
  const changeVolume = ({ volume, index }) => {
    state.player.setVolume(volume);

    dispatch({
      type: vimeoPlayerActionTypes.SET_VOLUME_LEVEL,
      payload: {
        volume,
        index,
      },
    });
  };
  const seek = (e) => {
    e.persist();
    const percent = e.target.value / 100;

    state.player.setCurrentTime(percent * state.rawDuration);
  };
  const handleFocusEvt = () => {
    dispatch({
      type: vimeoPlayerActionTypes.SET_FOCUS,
      payload: true,
    });
  };
  const handleBlurEvt = () => {
    dispatch({
      type: vimeoPlayerActionTypes.SET_FOCUS,
      payload: false,
    });
  };
  const handleKeyEvt = (e) => {
    if (e.keyCode === 32) {
      toggleVideoPlay();
    }
  };
  const openFullscreen = () => {
    pauseVideo();
    dispatch({
      type: vimeoPlayerActionTypes.SET_FULLSCREEN,
      payload: true,
    });
  };
  const toggleSettings = useCallback(() => {
    dispatch({
      type: vimeoPlayerActionTypes.TOGGLE_SETTINGS,
    });
  }, [dispatch]);
  const changeSpeed = (speed) => {
    state.player.setPlaybackRate(speed);

    dispatch({
      type: vimeoPlayerActionTypes.CHANGE_SPEED,
      payload: speed,
    });
  };
  const transitionEnd = () => {
    if (!state.settingsOpen) {
      dispatch({
        type: vimeoPlayerActionTypes.HIDE_SPEED_LIST,
      });
    }
  };
  const keyDownEvt = useCallback(
    (e) => {
      if (e.code === "Escape") {
        toggleSettings();
      }
    },
    [toggleSettings]
  );
  const focusSeek = () => {
    dispatch({
      type: vimeoPlayerActionTypes.SEEK_HAS_FOCUS,
      payload: true,
    });
  };
  const blurSeek = () => {
    dispatch({
      type: vimeoPlayerActionTypes.SEEK_HAS_FOCUS,
      payload: false,
    });
  };

  useEffect(() => {
    // Init player for fullscreen
    const player = new Player(divId, {
      id: id,
      controls: false,
      speed: true,
    });

    player.on("timeupdate", timeUpdate);
    player.on("progress", progressChange);
    player.getVideoTitle().then(function (title) {
      setTitleAttribute(id, title);
    });
    player.getDuration().then((data) => {
      dispatch({
        type: vimeoPlayerActionTypes.SET_PLAYER,
        payload: { playerInstance: player, duration: data },
      });
    });
    // Set default volume
    player.setVolume(0.25);

    return () => {
      // Destroy player
      player.off("timeupdate", timeUpdate);
      player.off("progress", progressChange);
      player.destroy();

      dispatch({
        type: vimeoPlayerActionTypes.SET_PLAYER,
        payload: { playerInstance: null, duration: "00:00" },
      });
    };
  }, [id, dispatch, progressChange, timeUpdate, divId]);

  const setTitleAttribute = (i, t) => {
    const cleanedId = i.replace("https://player.vimeo.com/video/", "");
    const selectedVideo = document
      .getElementById(`${cleanedId}`)
      .querySelectorAll("iframe")[0];
    selectedVideo.setAttribute("title", t);
  };

  useVimeoPlayerAnalytics(
    trackingId,
    null,
    {
      page: page,

      componentType: componentType || "Video",
      url: id,
    },
    state.player
  );

  useEffect(() => {
    /**
     * Bug fix for some reason when the layout changes to mobile.
     * The progress event stops firing. Pausing the video and having the user play again seems to fix the issue.
     */
    if (isMobile && state.player) {
      pauseVideo();
      state.player.setVolume(1);
    } else if (state.player) {
      pauseVideo();
      state.player.setVolume(0.25);
    }
  }, [isMobile, pauseVideo, state.player]);

  useEffect(() => {
    if (!state.isFullscreenOpen && state.updateSettings) {
      // Set setting from fullscreen player to inline payer.
      dispatch({
        type: vimeoPlayerActionTypes.RESUME_PLAYBACK,
      });

      state.player.setCurrentTime(state.rawCurrentTime || 0);
      state.player.setVolume(state.currentVolume);
      state.player.setPlaybackRate(state.currentSpeed);
    }
  }, [
    state.isFullscreenOpen,
    state.updateSettings,
    state.rawCurrentTime,
    state.player,
    state.currentVolume,
    state.currentSpeed,
    dispatch,
  ]);

  useEffect(() => {
    if (state.settingsOpen) {
      window.addEventListener("keydown", keyDownEvt);
    }

    return () => {
      if (state.settingsOpen) {
        window.removeEventListener("keydown", keyDownEvt);
      }
    };
  }, [state.settingsOpen, keyDownEvt]);

  useEffect(() => {
    if (!isTabActive) {
      // Pause video when tab is inactive
      pauseVideo();
    }
  }, [isTabActive, pauseVideo]);

  useEffect(() => {
    const unload = () => {
      // Pause video before window unloads
      pauseVideo();
      return "";
    };

    window.addEventListener("beforeunload", unload);

    return () => {
      window.removeEventListener("beforeunload", unload);
    };
  }, [pauseVideo]);

  return (
    <div
      className={`${videoSkin.player} ${state.hasFocus && videoSkin.active}`}
      onFocus={handleFocusEvt}
      onBlur={handleBlurEvt}
    >
      <div
        className={videoSkin.adaLayer}
        onClick={handleFocusEvt}
        tabIndex={0}
        onKeyDown={handleKeyEvt}
      >
        {!state.hasStartedPlaying && (
          <OEPAnalytics
            page={getAnalyticsPage(location.pathname)}
            componentType="Video"
            url={trackingId}
            componentName="on-demand"
            subSessionId={sessionData.subSessionId}
          >
            <button aria-label="play video" onClick={posterPlay}>
              <SvgTypes name="play" />
            </button>
          </OEPAnalytics>
        )}
      </div>
      <div id={divId} className={videoSkin.videoHolder} />
      <div className={videoSkin.controlsHolder}>
        <div className={videoSkin.controls}>
          <OEPAnalytics
            page={getAnalyticsPage(location.pathname)}
            componentType="Video"
            url={trackingId}
            componentName="on-demand"
            subSessionId={sessionData.subSessionId}
          >
            <button onClick={toggleVideoPlay} className={videoSkin.playBtn}>
              <img
                src={
                  state.isPlaying
                    ? "/images/audio/icon-pause.svg"
                    : "/images/audio/icon-play.svg"
                }
                alt={state.isPlaying ? "pause" : "play"}
              />
            </button>
          </OEPAnalytics>
          <div className={videoSkin.bar}>
            <div
              className={`${videoSkin.track} ${
                state.seekHasFocus && videoSkin.focus
              }`}
            >
              <input
                type="range"
                min="0"
                max="100"
                onChange={seek}
                name="seek"
                tabIndex={state.isPlaying ? 0 : -1}
                onFocus={focusSeek}
                onBlur={blurSeek}
              />
              <div
                className={videoSkin.progressHolder}
                style={{
                  width: `${state.progress}%`,
                }}
              >
                <time>
                  {state.hasStartedPlaying ? state.currentTime : state.duration}{" "}
                  <img
                    src="/images/audio/icon-play.svg"
                    alt=""
                    role="presentation"
                  />
                </time>
                <hr className={videoSkin.progress} />
              </div>
              <hr
                className={videoSkin.buffer}
                style={{
                  width: `${state.buffer}%`,
                }}
              />
            </div>
            {!isMobile && (
              <div className={videoSkin.soundBars}>
                {state.bars.map((bar, i) => (
                  <OEPAnalytics
                    componentType="Button"
                    page={getAnalyticsPage(location.pathname)}
                    url={`change volume to ${bar.soundValue}%`}
                    key={bar.soundValue}
                    subSessionId={sessionData.subSessionId}
                  >
                    <button
                      onClick={changeVolume.bind(null, {
                        volume: bar.soundValue,
                        index: i,
                      })}
                      style={{
                        height: `${bar.size}em`,
                      }}
                      className={`${bar.active && videoSkin.active}`}
                      aria-label={`change volume to ${bar.soundValue}%`}
                    >
                      <hr />
                    </button>
                  </OEPAnalytics>
                ))}
              </div>
            )}
            <div className={videoSkin.settingsHolder}>
              <OEPAnalytics
                componentType="Button"
                page={getAnalyticsPage(location.pathname)}
                url="Open settings"
                subSessionId={sessionData.subSessionId}
              >
                <button
                  className={`${videoSkin.playerSettingsIcons} ${
                    state.settingsOpen && videoSkin.active
                  }`}
                  onClick={toggleSettings}
                  aria-label="Open settings"
                >
                  <SvgTypes name="cog" />
                </button>
              </OEPAnalytics>
              <div
                className={`${videoSkin.settings} ${
                  state.settingsOpen && videoSkin.active
                }  ${state.hideSettingList && videoSkin.inActive}`}
                onTransitionEnd={transitionEnd}
              >
                <h4 className={videoSkin.title}>Speed:</h4>
                <ul>
                  {state.speedSettings.map((speed) => (
                    <li
                      key={speed.speedValue}
                      className={`${videoSkin.speedHolder} ${
                        speed.active && videoSkin.active
                      }`}
                    >
                      <OEPAnalytics
                        componentType="Button"
                        page={getAnalyticsPage(location.pathname)}
                        url={`Change speed to ${speed.speedValue}%`}
                        subSessionId={sessionData.subSessionId}
                      >
                        <button
                          onClick={changeSpeed.bind(null, speed.speedValue)}
                          aria-label={`Change speed to ${speed.speedValue}%`}
                        >
                          <span>{speed.displayValue}</span>
                        </button>
                      </OEPAnalytics>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <OEPAnalytics
              componentType="Button"
              page={getAnalyticsPage(location.pathname)}
              url="Open full screen player"
              subSessionId={sessionData.subSessionId}
            >
              <button
                className={videoSkin.fullscreenIcon}
                onClick={openFullscreen}
                aria-label="Open full screen player"
              >
                <SvgTypes name="fullscreen" />
              </button>
            </OEPAnalytics>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VimeoInlinePlayer;

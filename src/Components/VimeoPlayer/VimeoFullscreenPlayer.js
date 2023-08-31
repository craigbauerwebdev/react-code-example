import React, { useCallback, useEffect } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import Player from "@vimeo/player";
import SvgTypes from "Components/SVG/SvgTypes";
import useTabVisibility from "hooks/useTabVisibility";
import useVimeoPlayerAnalytics from "hooks/useVimeoPlayerAnalytics";
import videoSkin from "./scss/video-player.module.scss";
import { vimeoFullscreenPlayerActionTypes } from "./reducer/fullscreen";

const VimeoFullscreenPlayer = ({
  id,
  state,
  dispatch,
  clickEvt,
  divId,
  page,
  componentType,
  trackingId,
  sessionData,
}) => {
  const isTabActive = useTabVisibility();
  const timeUpdate = useCallback(
    (data) => {
      dispatch({
        type: vimeoFullscreenPlayerActionTypes.UPDATE_FULLSCREEN_TIME,
        payload: data,
      });
    },
    [dispatch]
  );
  const progressChange = useCallback(
    (data) => {
      dispatch({
        type: vimeoFullscreenPlayerActionTypes.UPDATE_FULLSCREEN_BUFFER,
        payload: data.percent,
      });
    },
    [dispatch]
  );
  const seek = (e) => {
    e.persist();
    const percent = e.target.value / 100;

    state.fullscreenPlayer.setCurrentTime(percent * state.rawDuration);
  };
  const pauseVideo = useCallback(() => {
    if (state.fullscreenPlayer) {
      state.fullscreenPlayer.getPaused().then((paused) => {
        if (!paused) {
          state.fullscreenPlayer.pause();
        }
      });
    }
  }, [state.fullscreenPlayer]);
  const toggleVideoPlay = () => {
    if (state.fullscreenPlayer) {
      state.fullscreenPlayer.getPaused().then((paused) => {
        if (paused) {
          state.fullscreenPlayer.play();
        } else {
          state.fullscreenPlayer.pause();
        }

        dispatch({
          type: vimeoFullscreenPlayerActionTypes.IS_FULLSCREEN_PLAYING,
          payload: paused,
        });
      });
    }
  };
  const toggleControls = () => {
    dispatch({
      type: vimeoFullscreenPlayerActionTypes.SHOW_CONTROLS,
      payload: true,
    });
  };
  const handleBlurEvt = () => {
    dispatch({
      type: vimeoFullscreenPlayerActionTypes.SHOW_CONTROLS,
      payload: false,
    });
  };
  const handleKeyEvt = (e) => {
    if (e.keyCode === 32) {
      toggleVideoPlay();
    }
  };
  const changeVolume = ({ volume, index }) => {
    state.fullscreenPlayer.setVolume(volume);

    dispatch({
      type: vimeoFullscreenPlayerActionTypes.SET_FULLSCREEN_VOLUME_LEVEL,
      payload: {
        volume,
        index,
      },
    });
  };
  const toggleSettings = useCallback(() => {
    dispatch({
      type: vimeoFullscreenPlayerActionTypes.TOGGLE_FULLSCREEN_SETTINGS,
    });
  }, [dispatch]);
  const changeSpeed = (speed) => {
    state.fullscreenPlayer.setPlaybackRate(speed);

    dispatch({
      type: vimeoFullscreenPlayerActionTypes.CHANGE_SPEED,
      payload: speed,
    });
  };
  const transitionEnd = () => {
    if (!state.settingsOpen) {
      dispatch({
        type: vimeoFullscreenPlayerActionTypes.HIDE_SPEED_LIST,
      });
    }
  };
  const focusSeek = () => {
    dispatch({
      type: vimeoFullscreenPlayerActionTypes.SEEK_HAS_FOCUS,
      payload: true,
    });
  };
  const blurSeek = () => {
    dispatch({
      type: vimeoFullscreenPlayerActionTypes.SEEK_HAS_FOCUS,
      payload: false,
    });
  };

  useEffect(() => {
    // Init player for fullscreen
    const player = new Player(`${divId}-fullscreen`, {
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
        type: vimeoFullscreenPlayerActionTypes.SET_FULLSCREEN_PLAYER,
        payload: { playerInstance: player, duration: data },
      });
    });

    return () => {
      // Destroy player
      player.off("timeupdate", timeUpdate);
      player.off("progress", progressChange);
      player.destroy();

      dispatch({
        type: vimeoFullscreenPlayerActionTypes.SET_FULLSCREEN_PLAYER,
        payload: { playerInstance: null, duration: "00:00" },
      });
    };
  }, [id, dispatch, progressChange, timeUpdate, divId]);

  useVimeoPlayerAnalytics(
    trackingId,
    null,
    {
      page: page,

      componentType: componentType || "Fullscreen Video",
      url: id,
    },
    state.fullscreenPlayer
  );

  const setTitleAttribute = (i, t) => {
    const cleanedId = i.replace("https://player.vimeo.com/video/", "");
    const selectedVideo = document
      .getElementById(`${cleanedId}`)
      .querySelectorAll("iframe")[0];
    selectedVideo.setAttribute("title", t);
  };

  useEffect(() => {
    if (!state.firstMount && state.fullscreenPlayer) {
      /**
       * Copy video settings from inline player to fullscreen player.
       * Fullscreen player is destroyed every time the fullscreen is closed.
       * This should run every time the player is opened.
       */
      if (state.rawCurrentTime) {
        state.fullscreenPlayer.setCurrentTime(state.rawCurrentTime);
      }

      if (state.currentVolume) {
        state.fullscreenPlayer.setVolume(state.currentVolume);
      }

      if (state.currentSpeed) {
        state.fullscreenPlayer.setPlaybackRate(state.currentSpeed);
      }

      dispatch({
        type: vimeoFullscreenPlayerActionTypes.FULLSCREEN_MOUNTED,
      });
    }
  }, [state, dispatch]);

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
      className={`${videoSkin.player} ${videoSkin.fullscreenPlayer} ${
        state.showControls && videoSkin.active
      }`}
      onFocus={toggleControls}
      onBlur={handleBlurEvt}
    >
      <div className={videoSkin.adaLayer} tabIndex={0} />
      <div
        id={`${divId}-fullscreen`}
        className={`${videoSkin.videoHolder} ${videoSkin.fullscreenPlayer}`}
        tabIndex={0}
        onClick={toggleControls}
        onKeyDown={handleKeyEvt}
      />
      <div
        className={`${videoSkin.controlsHolder} ${videoSkin.fullscreenPlayer}`}
      >
        <div className={`${videoSkin.controls} ${videoSkin.fullscreenPlayer}`}>
          <OEPAnalytics
            componentType="now playing video"
            page={page}
            url={state.isPlaying ? "Pause Video" : "Play Video"}
            componentName={state.isPlaying ? "Pause Video" : "Play Video"}
            subSessionId={sessionData.subSessionId}
          >
            <button
              onClick={toggleVideoPlay}
              className={`${videoSkin.playBtn} ${videoSkin.fullscreen}`}
            >
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
          </div>
          <div className={`${videoSkin.soundBars} ${videoSkin.fullscreen}`}>
            {state.bars.map((bar, i) => (
              <OEPAnalytics
                componentType="Button"
                page={page}
                url={`change volume to ${bar.soundValue}%`}
                componentName="Change volume"
                subSessionId={sessionData.subSessionId}
              >
                <button
                  key={bar.soundValue}
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
          <div className={videoSkin.settingsHolder}>
            <OEPAnalytics
              componentType="Button"
              page={page}
              url="Open settings"
              componentName="Open settings"
              subSessionId={sessionData.subSessionId}
            >
              <button
                className={`${videoSkin.playerSettingsIcons} ${
                  videoSkin.fullscreen
                } ${state.settingsOpen && videoSkin.active}`}
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
                      page={page}
                      url={`Change speed to ${speed.speedValue}%`}
                      componentName="Change video speed"
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
            page={page}
            url="Open full screen player"
            componentName="Open full screen player"
            subSessionId={sessionData.subSessionId}
          >
            <button
              className={`${videoSkin.fullscreenIcon} ${videoSkin.fullscreenPlayer}`}
              onClick={clickEvt}
            >
              <SvgTypes name="fullscreen" />
            </button>
          </OEPAnalytics>
        </div>
      </div>
    </div>
  );
};

export default VimeoFullscreenPlayer;

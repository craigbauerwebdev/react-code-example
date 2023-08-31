import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { actionTypes, audioReducer } from "./reducer";

import AudioButton from "./AudioButton";
import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import audioPlayerStyles from "./scss/audio-player.module.scss";
import fileDownload from "js-file-download";
import moment from "moment";
import useTabVisibility from "hooks/useTabVisibility";
import ConfigService from "services/ConfigService";

require("moment-duration-format");
/**
 * Audio player
 * @param {object} data
 * @param {array} data.audioFile list of audio files
 * @param {string} data.title sections title
 * @param {object} posterData
 * @param {object} posterData.subSessionName Tracking info
 */
const AudioPlayer = ({ data: { data: audioFile, title } }) => {
  const audio = useRef(null);
  const isTabActive = useTabVisibility();
  const [audioState, dispatchAudio] = useReducer(audioReducer, {
    currentTime: "00:00:00",
    duration: 0,
    progress: 0,
    rawDuration: 0,
    rawCurrentTime: 0,
    activeAudioFile: null,
    audioList: [],
    audioSupported: null,
    isPaused: false,
    isSoundOff: false,
    downLoadOnly: null,
    buffer: 0,
  });
  const downLoadFile = (link) => {
    fileDownload(link, displayName(link));
  };
  const pauseAudio = () => {
    if (!audio.current.paused) {
      audio.current.pause();
    }
  };
  const togglePlay = () => {
    if (audio.current.paused) {
      audio.current.play();
      dispatchAudio({
        type: actionTypes.IS_PLAYING,
        payload: true,
      });
    } else {
      audio.current.pause();
      dispatchAudio({
        type: actionTypes.IS_PLAYING,
        payload: false,
      });
    }
  };
  const toggleMute = () => {
    if (audio.current.volume === 0) {
      audio.current.volume = 1;
      dispatchAudio({
        type: actionTypes.CHANGE_SOUND,
        payload: false,
      });
    } else {
      audio.current.volume = 0;
      dispatchAudio({
        type: actionTypes.CHANGE_SOUND,
        payload: true,
      });
    }
  };
  const displayName = (file) => {
    return file.split("/").pop();
  };
  const changeAudio = (file) => {
    if (file !== audioState.activeAudioFile.path) {
      if (!audio.current.paused) {
        audio.current.pause();
      }

      dispatchAudio({
        type: actionTypes.CHANGE_AUDIO_FILE,
        payload: file,
      });
    }
  };
  const updateDur = (e) => {
    e.persist();
    const percent = e.target.value / 100;

    audio.current.currentTime = percent * audio.current.duration;
  };
  const downloadList = () => {
    return (
      <Fragment>
        <h3>Download List</h3>
        {audioState.downLoadOnly.map((list) => (
          <OEPAnalytics
            page="Single Poster"
            componentType="Audio"
            key={list.path}
            url={audioState.activeAudioFile.path}
            componentName="Audio Download File"
          >
            <button
              onClick={downLoadFile.bind(this, list.path)}
              key={list.path}
              aria-label="Download Audio File"
            >
              {list.name}
            </button>
          </OEPAnalytics>
        ))}
      </Fragment>
    );
  };
  const getDisplay = () => {
    if (audioState.audioSupported === false && audioState.downLoadOnly) {
      // No supported audio files so make a download list for users.
      return (
        <div className={audioPlayerStyles.audioPlayer}>
          <div className={audioPlayerStyles.downLoadList}>{downloadList()}</div>
        </div>
      );
    }

    return (
      // There is supported audio files so make player
      <Fragment>
        <audio
          ref={audio}
          src={`https://assets.onlineeventapp.com/${ConfigService.runValues.fileviewerAsset}/${audioState.activeAudioFile.path}`}
        >
          <track kind="captions" />
        </audio>
        <div className={audioPlayerStyles.audioPlayer}>
          <div className={audioPlayerStyles.track}>
            <input type="range" min="0" max="100" onClick={updateDur} />
            <hr
              className={audioPlayerStyles.progress}
              style={{
                width: `${audioState.progress}%`,
              }}
            />
            <hr
              className={audioPlayerStyles.buffer}
              style={{
                width: `${audioState.buffer}%`,
              }}
            />
          </div>
          <time>
            {audioState.currentTime} / {audioState.duration}
          </time>
          <div className={audioPlayerStyles.buttonsHolder}>
            <AudioButton
              page="Single Poster"
              copy={audioState.isSoundOff ? "sound off" : "sound on"}
              url={audioState.activeAudioFile.path}
              evtHandler={toggleMute}
              img={
                audioState.isSoundOff
                  ? "/images/audio/volume-off-24.svg"
                  : "/images/audio/icon-volume-up.svg"
              }
            />
            <AudioButton
              page="Single Poster"
              copy={audioState.isPaused ? "paused" : "play"}
              url={audioState.activeAudioFile.path}
              evtHandler={togglePlay}
              img={
                audioState.isPaused
                  ? "/images/audio/icon-pause.svg"
                  : "/images/audio/icon-play.svg"
              }
              classList={audioState.isPaused ? "" : audioPlayerStyles.play}
            />
            <AudioButton
              page="Single Poster"
              copy="Download"
              url={audioState.activeAudioFile.path}
              evtHandler={downLoadFile.bind(
                this,
                audioState.activeAudioFile.path
              )}
              img="/images/audio/icon-more-dark.svg"
              sr={`(Audio Download File ${audioState.activeAudioFile.name})`}
            />
          </div>
          {audioState.audioList.length > 0 && (
            <div className={audioPlayerStyles.list}>
              <h3>Track List</h3>
              <nav>
                {audioState.audioList.map((list) => (
                  <OEPAnalytics
                    page="Single Poster"
                    componentType="Audio"
                    key={list.path}
                    url={audioState.activeAudioFile.path}
                    componentName="Change Audio Track"
                  >
                    <button
                      onClick={changeAudio.bind(this, list.path)}
                      className={
                        list.name === audioState.activeAudioFile.name
                          ? audioPlayerStyles.active
                          : ""
                      }
                      aria-label={`Change Track to ${list.name}`}
                    >
                      {list.name}
                    </button>
                  </OEPAnalytics>
                ))}
              </nav>
            </div>
          )}
          {audioState.downLoadOnly && (
            // Some files were not supported make a download list
            <div className={audioPlayerStyles.list}>{downloadList()}</div>
          )}
        </div>
      </Fragment>
    );
  };
  const getDuration = useCallback((audio) => {
    dispatchAudio({
      type: actionTypes.SET_DURATION,
      payload: {
        displayDuration: moment
          .duration(audio.duration, "seconds")
          .format("hh:mm:ss", { trim: false }),
        rawDuration: audio.duration,
      },
    });
  }, []);
  const getBuffer = useCallback((audio) => {
    if (audio.buffered.length > 0) {
      dispatchAudio({
        type: actionTypes.UPDATE_BUFFER_PROGRESS,
        payload: (audio.buffered.end(0) / audio.duration) * 100,
      });
    }
  }, []);
  const timeUpdate = useCallback((audio) => {
    dispatchAudio({
      type: actionTypes.CURRENT_TIME,
      payload: {
        displayCurrentTime: moment
          .duration(audio.currentTime, "seconds")
          .format("hh:mm:ss", { trim: false }),
        rawCurrentTime: audio.currentTime,
      },
    });
  }, []);

  useEffect(() => {
    const audioElem = audio.current;
    // Set up Audio player event listeners
    if (audioState.activeAudioFile && audioElem) {
      audioElem.addEventListener(
        "loadedmetadata",
        getDuration.bind(this, audioElem)
      );
      audioElem.addEventListener("progress", getBuffer.bind(this, audioElem));
      audioElem.addEventListener(
        "timeupdate",
        timeUpdate.bind(this, audioElem)
      );
    }

    return () => {
      // Remove all event listeners
      if (audioElem) {
        audioElem.removeEventListener(
          "progress",
          getBuffer.bind(this, audioElem)
        );
        audioElem.removeEventListener(
          "timeupdate",
          timeUpdate.bind(this, audioElem)
        );
        audioElem.removeEventListener(
          "loadedmetadata",
          getDuration.bind(this, audioElem)
        );
      }
    };
  }, [audio, audioState.activeAudioFile, getDuration, getBuffer, timeUpdate]);

  useEffect(() => {
    // Set Audio player files to local store
    dispatchAudio({
      type: actionTypes.SET_AUDIO_FILES,
      payload: audioFile,
    });
  }, [audioFile]);

  useEffect(() => {
    if (!isTabActive && audioState.activeAudioFile) {
      // Pause audio file if browser window losses focus
      pauseAudio();
      dispatchAudio({
        type: actionTypes.IS_PLAYING,
        payload: false,
      });
    }
  }, [isTabActive, audioState.activeAudioFile]);

  if (audioState.audioSupported === null) {
    return null;
  }

  return (
    <section className={audioPlayerStyles.audioPlayerHolder}>
      <h2 className={audioPlayerStyles.title}>{title}</h2>
      {getDisplay()}
    </section>
  );
};

export default AudioPlayer;

AudioPlayer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        fileName: PropTypes.string.isRequired,
        filePath: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  posterData: PropTypes.shape({
    subSessionName: PropTypes.string.isRequired,
  }).isRequired,
};

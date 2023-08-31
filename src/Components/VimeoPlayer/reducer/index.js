import updateBars, { volumeUIUpdate } from "./utils/updateBars";

import formatDisplayTime from "./utils/formatDisplayTime";
import updateSpeed from "./utils/updateSpeed";

export const vimeoPlayerActionTypes = {
  SET_PLAYER: "SET_PLAYER",
  UPDATE_TIME: "UPDATE_TIME",
  UPDATE_BUFFER: "UPDATE_BUFFER",
  IS_PLAYING: "IS_PLAYING",
  SET_VOLUME_LEVEL: "SET_VOLUME_LEVEL",
  SET_FOCUS: "SET_FOCUS",
  SET_FULLSCREEN: "SET_FULLSCREEN",
  CLOSE_FULLSCREEN: "CLOSE_FULLSCREEN",
  RESUME_PLAYBACK: "RESUME_PLAYBACK",
  TOGGLE_SETTINGS: "TOGGLE_SETTINGS",
  CHANGE_SPEED: "CHANGE_SPEED",
  HIDE_SPEED_LIST: "HIDE_SPEED_LIST",
  SEEK_HAS_FOCUS: "SEEK_HAS_FOCUS",
  PLAY_VIDEO: "PLAY_VIDEO",
};

export const vimeoIntState = {
  player: null,
  duration: "00:00",
  progress: 0,
  currentTime: "00:00",
  buffer: 0,
  rawDuration: null,
  rawCurrentTime: null,
  isPlaying: false,
  hasStartedPlaying: false,
  hasFocus: false,
  isFullscreenOpen: false,
  updateSettings: false,
  currentVolume: 0.25,
  settingsOpen: false,
  hideSettingList: true,
  seekHasFocus: false,
  currentSpeed: 1,
  bars: [
    {
      soundValue: 0,
      size: 0.3,
      active: true,
    },
    {
      soundValue: 0.25,
      size: 0.5,
      active: true,
    },
    {
      soundValue: 0.5,
      size: 0.7,
      active: false,
    },
    {
      soundValue: 0.75,
      size: 0.9,
      active: false,
    },
    {
      soundValue: 1,
      size: 1.1,
      active: false,
    },
  ],
  speedSettings: [
    {
      speedValue: 0.5,
      displayValue: "0.5x",
      active: false,
    },
    {
      speedValue: 0.75,
      displayValue: "0.75x",
      active: false,
    },
    {
      speedValue: 1,
      displayValue: "Normal",
      active: true,
    },
    {
      speedValue: 1.25,
      displayValue: "1.25x",
      active: false,
    },
    {
      speedValue: 1.5,
      displayValue: "1.5x",
      active: false,
    },
    {
      speedValue: 2,
      displayValue: "2x",
      active: false,
    },
  ],
};

export const vimeoReducer = (state, action) => {
  switch (action.type) {
    case vimeoPlayerActionTypes.SET_PLAYER:
      return {
        ...state,
        player: action.payload.playerInstance,
        duration: formatDisplayTime(action.payload.duration),
        rawDuration: action.payload.duration,
        progress: 0,
        currentTime: "00:00",
        buffer: 0,
      };
    case vimeoPlayerActionTypes.UPDATE_TIME:
      return {
        ...state,
        progress: action.payload.percent * 100,
        currentTime: formatDisplayTime(action.payload.seconds),
        rawCurrentTime: action.payload.seconds,
      };
    case vimeoPlayerActionTypes.UPDATE_BUFFER:
      return {
        ...state,
        buffer: action.payload * 100,
      };
    case vimeoPlayerActionTypes.IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
        hasStartedPlaying: true,
      };
    case vimeoPlayerActionTypes.SET_VOLUME_LEVEL:
      return updateBars(state, action.payload);
    case vimeoPlayerActionTypes.SET_FOCUS:
      return {
        ...state,
        hasFocus: action.payload,
      };
    case vimeoPlayerActionTypes.SET_FULLSCREEN:
      return {
        ...state,
        isFullscreenOpen: action.payload,
        updateSettings: false,
      };
    case vimeoPlayerActionTypes.CLOSE_FULLSCREEN:
      return {
        ...state,
        isFullscreenOpen: action.payload.open,
        progress: action.payload.progress,
        currentTime: action.payload.currentTime,
        rawCurrentTime: action.payload.rawCurrentTime,
        updateSettings: true,
        currentVolume: action.payload.currentVolume,
        bars: volumeUIUpdate(state.bars, action.payload.currentVolume),
        speedSettings: updateSpeed(
          state.speedSettings,
          action.payload.currentSpeed
        ),
        currentSpeed: action.payload.currentSpeed,
      };
    case vimeoPlayerActionTypes.RESUME_PLAYBACK:
      return {
        ...state,
        updateSettings: false,
      };
    case vimeoPlayerActionTypes.TOGGLE_SETTINGS:
      return {
        ...state,
        settingsOpen: !state.settingsOpen,
        hideSettingList: false,
      };
    case vimeoPlayerActionTypes.CHANGE_SPEED:
      return {
        ...state,
        speedSettings: updateSpeed(state.speedSettings, action.payload),
        settingsOpen: false,
        currentSpeed: action.payload,
      };
    case vimeoPlayerActionTypes.HIDE_SPEED_LIST:
      return {
        ...state,
        hideSettingList: true,
      };
    case vimeoPlayerActionTypes.SEEK_HAS_FOCUS:
      return {
        ...state,
        seekHasFocus: action.payload,
      };
    case vimeoPlayerActionTypes.PLAY_VIDEO:
      return {
        ...state,
        isPlaying: true,
        hasStartedPlaying: true,
        hasFocus: false,
      };
    default:
      return {
        ...state,
      };
  }
};

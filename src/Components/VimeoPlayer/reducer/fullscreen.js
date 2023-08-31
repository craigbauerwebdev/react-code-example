import updateBars, { volumeUIUpdate } from "./utils/updateBars";

import formatDisplayTime from "./utils/formatDisplayTime";
import updateSpeed from "./utils/updateSpeed";

export const vimeoFullscreenPlayerActionTypes = {
  SET_FULLSCREEN_PLAYER: "SET_FULLSCREEN_PLAYER",
  IS_FULLSCREEN_PLAYING: "IS_FULLSCREEN_PLAYING",
  UPDATE_FULLSCREEN_TIME: "UPDATE_FULLSCREEN_TIME",
  UPDATE_FULLSCREEN_BUFFER: "UPDATE_FULLSCREEN_BUFFER",
  RESUME_PLAY_FULLSCREEN: "RESUME_PLAY_FULLSCREEN",
  FULLSCREEN_MOUNTED: "FULLSCREEN_MOUNTED",
  SHOW_CONTROLS: "SHOW_CONTROLS",
  SET_FULLSCREEN_VOLUME_LEVEL: "SET_FULLSCREEN_VOLUME_LEVEL",
  SEEK_HAS_FOCUS: "SEEK_HAS_FOCUS",
  CHANGE_SPEED: "CHANGE_SPEED",
  HIDE_SPEED_LIST: "HIDE_SPEED_LIST",
  TOGGLE_FULLSCREEN_SETTINGS: "TOGGLE_SETTINGS",
};

export const vimeoFullscreenIntState = {
  currentTime: "00:00",
  duration: "00:00",
  rawCurrentTime: null,
  fullscreenPlayer: null,
  rawDuration: null,
  isPlaying: false,
  progress: 0,
  buffer: 0,
  hasStartedPlaying: false,
  firstMount: false,
  showControls: false,
  currentVolume: 0.25,
  seekHasFocus: false,
  currentSpeed: 1,
  bars: [
    {
      soundValue: 0,
      size: 0.6,
      active: true,
    },
    {
      soundValue: 0.25,
      size: 0.9,
      active: true,
    },
    {
      soundValue: 0.5,
      size: 1.2,
      active: false,
    },
    {
      soundValue: 0.75,
      size: 1.45,
      active: false,
    },
    {
      soundValue: 1,
      size: 1.65,
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

export const fullscreenReducer = (state, action) => {
  switch (action.type) {
    case vimeoFullscreenPlayerActionTypes.SET_FULLSCREEN_PLAYER:
      return {
        ...state,
        fullscreenPlayer: action.payload.playerInstance,
        duration: formatDisplayTime(action.payload.duration),
        firstMount: false,
      };
    case vimeoFullscreenPlayerActionTypes.IS_FULLSCREEN_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
        hasStartedPlaying: true,
      };
    case vimeoFullscreenPlayerActionTypes.UPDATE_FULLSCREEN_TIME:
      return {
        ...state,
        progress: action.payload.percent * 100,
        currentTime: formatDisplayTime(action.payload.seconds),
        rawDuration: action.payload.duration,
        rawCurrentTime: action.payload.seconds,
      };
    case vimeoFullscreenPlayerActionTypes.UPDATE_FULLSCREEN_BUFFER:
      return {
        ...state,
        buffer: action.payload * 100,
      };
    case vimeoFullscreenPlayerActionTypes.RESUME_PLAY_FULLSCREEN:
      return {
        ...state,
        currentTime: action.payload.currentTime,
        progress: action.payload.progress,
        hasStartedPlaying: true,
        rawCurrentTime: action.payload.rawCurrentTime,
        currentVolume: action.payload.currentVolume,
        bars: volumeUIUpdate(state.bars, action.payload.currentVolume),
        speedSettings: updateSpeed(
          state.speedSettings,
          action.payload.currentSpeed
        ),
        currentSpeed: action.payload.currentSpeed,
      };
    case vimeoFullscreenPlayerActionTypes.FULLSCREEN_MOUNTED:
      return {
        ...state,
        firstMount: true,
      };
    case vimeoFullscreenPlayerActionTypes.SHOW_CONTROLS:
      return {
        ...state,
        showControls: action.payload,
      };
    case vimeoFullscreenPlayerActionTypes.SET_FULLSCREEN_VOLUME_LEVEL:
      return updateBars(state, action.payload);
    case vimeoFullscreenPlayerActionTypes.SEEK_HAS_FOCUS:
      return {
        ...state,
        seekHasFocus: action.payload,
      };
    case vimeoFullscreenPlayerActionTypes.TOGGLE_FULLSCREEN_SETTINGS:
      return {
        ...state,
        settingsOpen: !state.settingsOpen,
        hideSettingList: false,
      };
    case vimeoFullscreenPlayerActionTypes.CHANGE_SPEED:
      return {
        ...state,
        speedSettings: updateSpeed(state.speedSettings, action.payload),
        settingsOpen: false,
        currentSpeed: action.payload,
      };
    case vimeoFullscreenPlayerActionTypes.HIDE_SPEED_LIST:
      return {
        ...state,
        hideSettingList: true,
      };
    default:
      return {
        ...state,
      };
  }
};

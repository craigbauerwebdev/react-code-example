import { cleanPath } from "util/getPDFLink";

export const actionTypes = {
  SET_DURATION: "SET_DURATION",
  CURRENT_TIME: "CURRENT_TIME",
  SET_AUDIO_FILES: "SET_AUDIO_FILES",
  CHANGE_AUDIO_FILE: "CHANGE_AUDIO_FILE",
  CHANGE_SOUND: "CHANGE_SOUND",
  IS_PLAYING: "IS_PLAYING",
  UPDATE_PROGRESS: "UPDATE_PROGRESS",
  UPDATE_BUFFER_PROGRESS: "UPDATE_BUFFER_PROGRESS",
};

const fileMap = (file) => ({ name: file.name, path: file.path });

const updateTime = (state, { displayCurrentTime, rawCurrentTime }) => {
  const progress = (rawCurrentTime / state.rawDuration) * 100; // Display time
  return {
    ...state,
    currentTime:
      displayCurrentTime > state.duration ? state.duration : displayCurrentTime,
    progress,
  };
};

const setAudioFile = (state, payload) => {
  const audio = document.createElement("audio");
  const extList = payload.map((file) => ({
    name: file.fileName,
    ext: file.fileName.split(".").pop(),
    path: cleanPath(file.filePath),
  }));

  if (audio) {
    // Test to see if Audio file is supported
    const canPlay = extList.map((file) => {
      file.canPlay = audio.canPlayType(`audio/${file.ext}`);

      return file;
    });
    // Make list of supported files
    const canPlayList = canPlay
      .filter((file) => file.canPlay !== "")
      .map((file) => fileMap(file));
    // List of on download only lifes
    const downloadOnly = canPlay
      .filter((file) => file.canPlay === "")
      .map((file) => fileMap(file));
    // Do we have file that can be played
    if (canPlayList.length > 0) {
      return {
        ...state,
        activeAudioFile: canPlayList[0],
        audioList: canPlayList.length > 0 ? canPlayList : [],
        audioSupported: true,
        downLoadOnly: downloadOnly.length > 0 ? downloadOnly : null, // Do we have files that cant be played
      };
    }
    // No files can be played so check if we have any download files
    if (downloadOnly.length > 0) {
      return {
        ...state,
        audioSupported: false,
        downLoadOnly: downloadOnly,
      };
    }
  }

  return {
    ...state,
    downLoadOnly: extList,
    audioSupported: false,
  };
};

const setNewAudioFile = (state, file) => {
  return {
    ...state,
    currentTime: "00:00",
    duration: 0,
    progress: 0,
    rawDuration: 0,
    rawCurrentTime: 0,
    activeAudioFile: file,
    isPaused: false,
  };
};

export const audioReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_TIME:
      return updateTime(state, action.payload);
    case actionTypes.SET_DURATION:
      return {
        ...state,
        duration: action.payload.displayDuration,
        rawDuration: action.payload.rawDuration,
      };
    case actionTypes.SET_AUDIO_FILES:
      return setAudioFile(state, action.payload);
    case actionTypes.CHANGE_AUDIO_FILE:
      return setNewAudioFile(state, action.payload);
    case actionTypes.CHANGE_SOUND:
      return {
        ...state,
        isSoundOff: action.payload,
      };
    case actionTypes.IS_PLAYING:
      return {
        ...state,
        isPaused: action.payload,
      };
    case actionTypes.UPDATE_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case actionTypes.UPDATE_BUFFER_PROGRESS:
      return {
        ...state,
        buffer: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

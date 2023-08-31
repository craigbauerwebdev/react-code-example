export const bannerActionTypes = {
  UPDATE_SLIDE: "UPDATE_SLIDE",
  SET_DATA: "SET_DATA",
  ARROW_CHANGE: "ARROW_CHANGE",
  NO_DATA: "NO_DATA",
  SET_BANNER_FOCUS: "SET_BANNER_FOCUS",
};

export const bannerIntState = {
  currentIndex: 0,
  maxCount: 0,
  item: null,
  data: null,
  invTime: 0,
  noData: false,
  focus: false,
};

const changeSlide = (state, payload) => {
  let currentIndex = state.currentIndex;
  if (typeof payload === "number") {
    currentIndex = payload;
  } else {
    currentIndex = (state.currentIndex + 1) % state.maxCount;
  }

  return { ...state, currentIndex, item: state.data[currentIndex] };
};

const arrowChange = (state, dir) => {
  if (dir === "next") {
    const currentIndex =
      state.currentIndex + 1 >= state.maxCount ? 0 : state.currentIndex + 1;
    return {
      ...state,
      currentIndex,
      item: state.data[currentIndex],
    };
  }
  const currentIndex =
    state.currentIndex - 1 < 0 ? state.maxCount - 1 : state.currentIndex - 1;

  return {
    ...state,
    currentIndex,
    item: state.data[currentIndex],
  };
};

const setData = (state, { data, delay }) => {
  return {
    ...state,
    maxCount: data.length,
    data: data,
    item: data[state.currentIndex],
    invTime: delay * 1000,
    noData: false,
  };
};

export const bannerReducer = (state, action) => {
  switch (action.type) {
    case bannerActionTypes.UPDATE_SLIDE:
      return changeSlide(state, action.payload);
    case bannerActionTypes.ARROW_CHANGE:
      return arrowChange(state, action.payload);
    case bannerActionTypes.SET_DATA:
      return setData(state, action.payload);
    case bannerActionTypes.NO_DATA:
      return {
        ...state,
        noData: true,
      };
    case bannerActionTypes.SET_BANNER_FOCUS:
      return {
        ...state,
        focus: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

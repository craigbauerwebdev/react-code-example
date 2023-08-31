export const actionTypesAvailability = {
  SET_EXHIBITOR1: "SET_EXHIBITOR1",
  SET_EXHIBITOR2: "SET_EXHIBITOR2",
  SET_ALL_SELECTED: "SET_ALL_SELECTED",
  SET_IN_PERSON: "IN_PERSON",
  SET_ONLINE: "SET_ONLINE",
  SET_VIDEO: "SET_VIDEO",
  SET_CHAT: "SET_CHAT",
  SET_WEBINARS: "SET_WEBINARS",
  SET_START_TIME: "SET_START_TIME",
  SET_END_TIME: "SET_END_TIME",
  SET_START_DATE: "SET_START_DATE",
  SET_END_DATE: "SET_END_DATE",
  SET_SELECTED_EXHIBITORS: "SET_SELECTED_EXHIBITORS",
};

export const availabilityReducer = (state, action) => {
  switch (action.type) {
    case actionTypesAvailability.SET_EXHIBITOR1:
      return {
        ...state,
        exhibitor1: action.payload,
      };
    case actionTypesAvailability.SET_EXHIBITOR2:
      return {
        ...state,
        exhibitor2: action.payload,
      };
    case actionTypesAvailability.SET_ALL_SELECTED:
      return {
        ...state,
        allSelected: action.payload,
      };
    case actionTypesAvailability.SET_IN_PERSON:
      return {
        ...state,
        inPerson: action.payload,
      };
    case actionTypesAvailability.SET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };
    case actionTypesAvailability.SET_WEBINARS:
      return {
        ...state,
        webinars: action.payload,
      };
    case actionTypesAvailability.SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case actionTypesAvailability.SET_END_TIME:
      return {
        ...state,
        endTime: action.payload,
      };
    case actionTypesAvailability.SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    case actionTypesAvailability.SET_END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };
    case actionTypesAvailability.SET_SELECTED_EXHIBITORS:
      return {
        ...state,
        selectedExhibitors: action.payload,
      };
    case actionTypesAvailability.SET_CHAT:
      return {
        ...state,
        chat: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

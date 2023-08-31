import * as actionTypes from "../actions/actionTypes";

const initialChatState = {
  channels: null,
  chatUserFlag: false,
  chatClient: null,
  chatBotOpen: null,
  chatUnreadCount: null,
};

const chatReducer = (state = initialChatState, action) => {
  switch (action.type) {
    case actionTypes.RESET_CHANNEL_LIST: {
      return {
        ...state,
        channels: [],
      };
    }
    case actionTypes.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
      };
    case actionTypes.CHAT_BOTOPEN:
      return {
        ...state,
        chatBotOpen: action.payload,
      };
    case actionTypes.SET_CHAT_USER_FLAG:
      return {
        ...state,
        chatUserFlag: action.payload,
      };
    case actionTypes.SET_CHAT_CLIENT:
      return {
        ...state,
        chatClient: action.payload,
      };
    case actionTypes.CHAT_LOGOUT:
      return {
        ...state,
        channels: null,
        chatUserFlag: false,
        chatClient: null,
      };
    case actionTypes.CHAT_UNREAD_COUNT:
      return {
        ...state,
        chatUnreadCount: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;

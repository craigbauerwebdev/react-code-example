export const actionTypesChatBot = {
  SHOW_VIRTUAL_ASSISTANT: "SHOW_VIRTUAL_ASSISTANT",
  SLID_OUT_DONE: "SLID_OUT_DONE",
  HIDE_VIRTUAL_ASSISTANT: "HIDE_VIRTUAL_ASSISTANT",
  SHOW_CHAT_ICON: "SHOW_CHAT_ICON",
  ICON_SHOW_VIRTUAL_ASSISTANT: "ICON_SHOW_VIRTUAL_ASSISTANT",
  CLOSE_CHAT_BOT: "CLOSE_CHAT_BOT",
  SET_CONTENT: "SET_CONTENT",
};

export const chatIntState = {
  previewChatEmbed: false,
  chatWindow: true,
  hideFreeman: false,
  fluentShow: true,
  assistantOpen: false,
  showChatIcon: false,
  disablePreview: false,
  closeChatBot: false,
  displayAssistant: false,
  chatBotData: null,
  dataSet: false,
};

export const chatBotReducer = (state, action) => {
  switch (action.type) {
    case actionTypesChatBot.SHOW_VIRTUAL_ASSISTANT:
      return {
        ...state,
        chatWindow: false,
        previewChatEmbed: true,
        displayAssistant: true,
      };
    case actionTypesChatBot.SLID_OUT_DONE:
      return {
        ...state,
        chatWindow: true,
        hideFreeman: true,
        fluentShow: false,
        assistantOpen: true,
        disablePreview: true,
      };
    case actionTypesChatBot.HIDE_VIRTUAL_ASSISTANT:
      return {
        ...state,
        hideFreeman: false,
      };
    case actionTypesChatBot.SHOW_CHAT_ICON:
      return {
        ...state,
        showChatIcon: true,
        assistantOpen: false,
        disablePreview: true,
        displayAssistant: false,
      };
    case actionTypesChatBot.ICON_SHOW_VIRTUAL_ASSISTANT:
      return {
        ...state,
        showChatIcon: false,
        displayAssistant: true,
      };
    case actionTypesChatBot.CLOSE_CHAT_BOT:
      return {
        ...state,
        closeChatBot: true,
        previewChatEmbed: true,
      };
    case actionTypesChatBot.SET_CONTENT:
      return {
        ...state,
        chatBotData: action.payload,
        dataSet: true,
      };
    default:
      return {
        ...state,
      };
  }
};

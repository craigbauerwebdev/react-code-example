import ChatSponsor from "./ChatSponsor";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import { actionTypesChatBot } from "./reducer";
import assistantStyles from "./scss/chatbot-assistant.module.scss";
import lodash from "lodash";
import { setChatBotOpen } from "../Chat/store/actions";
import splitClassList from "util/splitClassList";
import { useDispatch } from "react-redux";

const VirtualAssistant = ({ state, dispatch }) => {
  const chatDispatch = useDispatch();
  const closeAssistant = () => {
    // Start closing assistant trigger css animations with class change
    dispatch({
      type: actionTypesChatBot.HIDE_VIRTUAL_ASSISTANT,
    });
    chatDispatch(setChatBotOpen(false));
  };
  const handleTransEnd = (e) => {
    e.persist();
    const list = splitClassList(e.target.classList);

    if (!state.hideFreeman && list && list.includes("hideFreeman")) {
      // Virtual Assistant animation is done now we hide it for ADA
      dispatch({
        type: actionTypesChatBot.SHOW_CHAT_ICON,
      });
    }
  };

  return (
    <div
      className={`${!state.hideFreeman && assistantStyles.hideFreeman} ${
        assistantStyles.iframeContFreeman
      }`}
      onTransitionEnd={handleTransEnd}
      style={{
        display: !state.displayAssistant ? "none" : "block",
      }}
    >
      <div className={assistantStyles.fluentChat}>
        <div className={assistantStyles.fluentChatAppMainContainer}>
          <div className={assistantStyles.fluentAppBackground}>
            <div className={assistantStyles.fluentBackgroundHeader}>
              <img
                src={state.chatBotData.chatbotHeaderImageURL}
                alt={state.chatBotData.chatbotHeaderImageAltText}
              />
            </div>
            <div className={assistantStyles.chatWrap}>
              <OEPAnalytics
                page="Chatbot"
                componentType="Video"
                url={state.chatBotData.chatbotURLSource}
                componentName="Fluent Chatbot Embed"
              >
                <iframe
                  title="Fluent Chat"
                  src={state.chatBotData.chatbotURLSource}
                  className={`${
                    lodash.isEmpty(state.chatBotData.sponsor) &&
                    assistantStyles.noSponsor
                  }`}
                />
              </OEPAnalytics>
            </div>
            <ChatSponsor data={state.chatBotData.sponsor} />
          </div>
        </div>
        <OEPAnalytics
          page="Chatbot"
          componentType="Chatbot"
          url="Close chatbot"
        >
          <button
            title="Close Chat"
            data-w-id="5fce1ac3-01f6-3202-39d4-bbb1744369ac"
            className={assistantStyles.fluentCloseButton}
            aria-label="close chatbot"
            onClick={closeAssistant}
          >
            <img
              src="https://s3.amazonaws.com/freeman-chatbot-assets/cancel.svg"
              alt="Close Chat"
            />
          </button>
        </OEPAnalytics>
      </div>
    </div>
  );
};

export default VirtualAssistant;

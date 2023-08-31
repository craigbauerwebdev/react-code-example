import React, { useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import { actionTypesChatBot } from "./reducer";
import { bpMap } from "util/bpMap";
import chatBotStyle from "./scss/chatbot.module.scss";
import { setChatBotOpen } from "../Chat/store/actions";
import splitClassList from "util/splitClassList";
import { useDispatch } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const Bot = ({ state, dispatch }) => {
  const [showIconOnly, setShowIconOnly] = useState(false);
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const chatDispatch = useDispatch();
  const previewOpenAssistant = () => {
    dispatch({ type: actionTypesChatBot.SHOW_VIRTUAL_ASSISTANT });
    chatDispatch(setChatBotOpen(true));
  };
  const handleTransEnd = () => {
    if (!state.chatWindow) {
      //  Hide Preview chat bot
      dispatch({ type: actionTypesChatBot.SLID_OUT_DONE });
    } else if (state.closeChatBot) {
      //  Show chat bot icon
      dispatch({ type: actionTypesChatBot.SHOW_CHAT_ICON });
    }
  };
  const iconShowAssistant = () => {
    // Hide chat bot icon first part of showing the Virtual Assistant
    dispatch({ type: actionTypesChatBot.ICON_SHOW_VIRTUAL_ASSISTANT });
    chatDispatch(setChatBotOpen(true));
  };
  const handleIconTransEnd = (e) => {
    e.persist();
    const list = splitClassList(e.target.classList);

    if (!state.showChatIcon && list.includes("out")) {
      // Icon has slide out of view. Now show Virtual Assistant
      dispatch({ type: actionTypesChatBot.SLID_OUT_DONE });
    }
  };
  const closeChat = () => {
    // Close preview chat bot
    dispatch({
      type: actionTypesChatBot.CLOSE_CHAT_BOT,
    });
  };

  const displayIconOnly = () => {
    return isMobile || state.disablePreview;
  };

  useEffect(() => {
    // Watch for state changes on state.showChatIcon to animate chat bot
    if (state.showChatIcon) {
      setShowIconOnly(true);
    } else {
      setShowIconOnly(false);
    }
  }, [state.showChatIcon]);

  useEffect(() => {
    // Watch for display changes for mobile
    if (isMobile && !state.disablePreview && !state.previewChatEmbed) {
      // If mobile from desktop show chat bot
      dispatch({
        type: actionTypesChatBot.CLOSE_CHAT_BOT,
      });
      // Give sometime between dispatcher to change state for animations.
      setTimeout(() => {
        dispatch({ type: actionTypesChatBot.SHOW_CHAT_ICON });
      }, 250);
    }
  }, [state, isMobile, dispatch]);

  if (state.assistantOpen) {
    return null;
  }

  return (
    <div>
      {!isMobile && !state.disablePreview && (
        <div
          className={`${state.previewChatEmbed && chatBotStyle.out} ${
            state.fluentShow
              ? chatBotStyle.fluentShow
              : chatBotStyle.fluentHidden
          }  ${chatBotStyle.previewChatAppEmbed}`}
          onTransitionEnd={handleTransEnd}
        >
          <OEPAnalytics
            page="Chatbot"
            componentType="Chatbot"
            url="Close chatbot popup"
            componentName="Close chatbot popup"
          >
            <button
              title="Close Chat Pop-up"
              className={chatBotStyle.fluentPreviewClose}
              aria-label="close chatbot popup"
              onClick={closeChat}
            >
              <img
                src="https://s3.amazonaws.com/freeman-chatbot-assets/close.svg"
                alt="close chat pop-up"
              />
            </button>
          </OEPAnalytics>
          <OEPAnalytics
            page="Chatbot"
            componentType="Chatbot"
            url="View Chatbot"
            componentName="View Chatbot"
          >
            <button
              className={`${chatBotStyle.fluentPreviewChat} ${chatBotStyle.fluentShow}`}
              onClick={previewOpenAssistant}
            >
              <span className={chatBotStyle.fluentPreviewIcon}>
                <img
                  src={state.chatBotData.chatbotPreviewImageURL}
                  alt={state.chatBotData.chatbotPreviewImageAltText}
                />
              </span>
              <span className={chatBotStyle.fluentPreviewHeadline}>
                {state.chatBotData.chatbotHeadline}
              </span>
              {state.chatBotData.chatbotBodyCopy && (
                <span>{state.chatBotData.chatbotBodyCopy}</span>
              )}
            </button>
          </OEPAnalytics>
        </div>
      )}
      {displayIconOnly() && (
        <div
          className={`${!showIconOnly && chatBotStyle.out} ${
            chatBotStyle.chatBotAppEmbed
          }`}
          onTransitionEnd={handleIconTransEnd}
        >
          <OEPAnalytics
            page="Chatbot"
            componentType="Chatbot"
            url="Open Chatbot"
            componentName="Open Chatbot"
          >
            <button
              onClick={iconShowAssistant}
              className={chatBotStyle.fluentOpenButton}
            >
              <span className="sr-only">Open Chatbot</span>
            </button>
          </OEPAnalytics>
        </div>
      )}
    </div>
  );
};

export default Bot;

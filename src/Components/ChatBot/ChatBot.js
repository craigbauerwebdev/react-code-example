import React, { useEffect, useReducer } from "react";
import { actionTypesChatBot, chatBotReducer, chatIntState } from "./reducer";

import Bot from "./Bot";
import OEPAnalytics from "Components/OEPAnalytics";
import VirtualAssistant from "./VirtualAssistant";
import { useSelector } from "react-redux";

/**
 * Chatbot
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Chatbot
 */
const ChatBot = () => {
  const chatBotData = useSelector((state) => state.global.siteConfig);
  const [stateChat, dispatchChat] = useReducer(chatBotReducer, chatIntState);

  useEffect(() => {
    if (chatBotData && chatBotData.chatbot) {
      // Set data to local store this flow mocks what liferay will do.
      dispatchChat({
        type: actionTypesChatBot.SET_CONTENT,
        payload: chatBotData.chatbot,
      });
    }
  }, [chatBotData]);

  if (!stateChat.dataSet) {
    return null;
  }

  return (
    <div role="complementary" aria-label="Chatbot">
      <OEPAnalytics
        componentType="Button"
        page="Chatbot"
        url="#after-chatbot"
        componentName="Skip to after chatbot"
      >
        <a href="#after-chatbot" className="sr-focusable">
          Skip to after chatbot
        </a>
      </OEPAnalytics>
      <div id="before-chatbot"></div>
      <Bot state={stateChat} dispatch={dispatchChat} />
      <VirtualAssistant state={stateChat} dispatch={dispatchChat} />
      <OEPAnalytics
        componentType="Button"
        page="Chatbot"
        url="#before-chatbot"
        componentName="Skip to before chatbot"
      >
        <a href="#before-chatbot" className="sr-focusable">
          Skip to before chatbot
        </a>
      </OEPAnalytics>
      <div id="after-chatbot"></div>
    </div>
  );
};

export default ChatBot;

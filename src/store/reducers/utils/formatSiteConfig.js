import ConfigService from "services/ConfigService";
import chatBot from "util/staticData/Components/ChatBot/ChatBot.data";
import lodash from "lodash";

/**
 * Format site config data
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Chatbot
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
 * @param {object} data payload from Liferay
 */
export default function formatSiteConfig(data) {
  const siteConfig = {
    grip: {},
    // If no chatbot data from liferay or can't use liferay use the data.chatbot object
    chatbot: lodash.isEmpty(data.chatbot) ? chatBot : data.chatbot,
  };

  siteConfig.grip = {
    id: data.grip?.id || process.env.REACT_APP_FUZION_EVENT_ID,
    url:
      data.grip?.url ||
      `https://matchmaking.grip.events/${ConfigService.runValues.gripEventName}`,
  };

  siteConfig.eventInfo = data.details;

  return siteConfig;
}

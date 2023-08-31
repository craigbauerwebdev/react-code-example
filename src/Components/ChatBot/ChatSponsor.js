import { Fragment } from "react";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import assistantStyles from "./scss/chatbot-assistant.module.scss";

const ChatSponsor = ({
  data: {
    chatbotSponsorLinkURL,
    chatbotSponsorLinkTarget,
    chatbotSponsorIntroOrLeadIn,
    chatbotSponsorImageURL,
    chatbotSponsorAltText,
  },
}) => {
  const content = () => {
    return (
      <Fragment>
        {chatbotSponsorIntroOrLeadIn && (
          <span>
            <strong>{chatbotSponsorIntroOrLeadIn}</strong>
          </span>
        )}
        {chatbotSponsorImageURL && (
          <img src={chatbotSponsorImageURL} alt={chatbotSponsorAltText} />
        )}
      </Fragment>
    );
  };
  const body = () => {
    if (chatbotSponsorLinkURL) {
      return (
        <LinkWrapper
          to={chatbotSponsorLinkURL}
          external={chatbotSponsorLinkTarget === "_blank"}
          componentName="Chatbot sponsor link"
        >
          {content()}
        </LinkWrapper>
      );
    }

    return content();
  };

  return (
    <div className={assistantStyles.fluentBackgroundFooter}>
      <div className={assistantStyles.fluentSponsorArea}>{body()}</div>
    </div>
  );
};

export default ChatSponsor;

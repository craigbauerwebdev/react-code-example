import React, { useEffect } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import cropName from "util/cropName";
import getSessionUrl from "util/getSessionUrl";
import nowPlayingAlertStyles from "./scss/now-playing-alert.module.scss";

const AlertItem = ({ session, animationEvt, closeEvt, index }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeEvt(session);
    }, index * 800 + 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [index, session, closeEvt]);
  return (
    <div
      onAnimationEnd={animationEvt.bind(this, session)}
      className={`${session.active ? "" : nowPlayingAlertStyles.removeItem}`}
      style={{
        animationDelay: session.active ? `${500 * index}ms` : "0",
      }}
    >
      <OEPAnalytics
        page="Now Playing"
        componentType="Button"
        url="Close Now Playing Video"
        componentName="Close Now Playing Video"
      >
        <button
          type="button"
          className={nowPlayingAlertStyles.close}
          onClick={closeEvt.bind(this, session)}
        >
          <img
            src="https://s3.amazonaws.com/freeman-chatbot-assets/close.svg"
            alt="close"
          />
        </button>
      </OEPAnalytics>
      <div className={nowPlayingAlertStyles.alert}>
        <img src="/images/icons/video-play.svg" alt="play" />
        <p>{cropName(session.SessionName, 40)}</p>
      </div>
      <div className={nowPlayingAlertStyles.watchNowHolder}>
        <LinkWrapper
          page="Now Playing"
          to={getSessionUrl(session)}
          className={nowPlayingAlertStyles.watchNow}
          componentName="Watch Now"
        >
          Watch Now
        </LinkWrapper>
      </div>
    </div>
  );
};

export default AlertItem;

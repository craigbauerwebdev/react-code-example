import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import FeedStyles from "./scss/feed.module.scss";
import OEPAnalytics from "Components/OEPAnalytics";
import { loadFeed } from "store/actions";

const Feed = () => {
  const dispatch = useDispatch();
  const feedLoaded = useSelector((state) => state.global.feedLoaded);

  useEffect(() => {
    //Attach Script to head tag
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.hypemarks.com/pages/a5b5e5.js";
    script.id = "tint";
    document.getElementsByTagName("head")[0].appendChild(script);

    // Feed has been load once just need to refresh the feed.
    if (feedLoaded) {
      window.HM.render();
    }

    return () => {
      //Remove Script from head tag
      const elem = document.getElementById("tint");
      elem.parentNode.removeChild(elem);

      // Track if feed component has been mounted
      dispatch(loadFeed());
    };
  }, [feedLoaded, dispatch]);
  return (
    <div className={FeedStyles.holder}>
      <OEPAnalytics
        componentType="Button"
        page="Social Feed"
        url="#after-feed"
        componentName="Skip to after social feed"
      >
        <a href="#after-feed" className="sr-focusable">
          Skip to after social feed
        </a>
      </OEPAnalytics>
      <div id="before-feed"></div>
      <div
        className={`tintup ${FeedStyles.tintUp}`}
        data-id={ConfigService.runValues.tintEventName}
        data-columns=""
        data-mobilescroll="true"
        data-infinitescroll="true"
        data-personalization-id={ConfigService.runValues.tintPersonalizationID}
      ></div>
      <OEPAnalytics
        componentType="Button"
        page="Social Feed"
        url="#before-feed"
      >
        <a href="#before-feed" className="sr-focusable">
          Skip to before social feed
        </a>
      </OEPAnalytics>
      <div id="after-feed"></div>
    </div>
  );
};

export default Feed;

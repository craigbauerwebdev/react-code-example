import React, { useEffect, useRef } from "react";

import { saveAnalytic } from "Components/OEPAnalytics";

const SubSessionVideoPlayer = ({ videoId, sessionName }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const iFrameListener = () => {
      if (document.activeElement === iframeRef.current) {
        const dataOepa = iframeRef.current.getAttribute("data-oepa");
        saveAnalytic(JSON.parse(dataOepa));
        window.removeEventListener("blur", iFrameListener);
      }
    };

    window.addEventListener("blur", iFrameListener);

    return () => {
      window.removeEventListener("blur", iFrameListener);
    };
  }, [iframeRef]);

  return (
    <iframe
      ref={iframeRef}
      title="Session Video"
      id="subsession-video"
      src={`https://player.vimeo.com/video/${videoId}?autoplay=0&loop=1`}
      width="630"
      height="354"
      frameBorder="0"
      allowFullScreen
      msallowfullscreen="true"
      allow="autoplay; fullscreen"
      data-oepa={JSON.stringify({
        page: "Single SubSession",
        componentType: "On-Demand",
        url: `https://player.vimeo.com/video/${videoId}?autoplay=0&loop=1`,
        componentName: "Single subsession video",
      })}
    />
  );
};

export default SubSessionVideoPlayer;

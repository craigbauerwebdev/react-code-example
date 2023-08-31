import React, { useEffect, useRef } from "react";

import PropTypes from "prop-types";
import { saveAnalytic } from "Components/OEPAnalytics";

export default function DrawerIframe({ session }) {
  const iframeRef = useRef();

  useEffect(() => {
    const iFrameListener = () => {
      if (document.activeElement === iframeRef.current) {
        const data = iframeRef.current.getAttribute("data-oepa");
        saveAnalytic(JSON.parse(data));
        window.removeEventListener("blur", iFrameListener);
      }
    };
    window.addEventListener("blur", iFrameListener);
    return () => {
      window.removeEventListener("blur", iFrameListener);
    };
  }, [iframeRef]);

  const video = session?.sessionVideoSource?.split(",");
  if (video && video.length) {
    session.iFrameId = video[0];
    session.streamId = video[1];
  }

  const url = `https://livestream.com/accounts/10952998/events/${session.streamId}/player?width=107&height=60&enableInfoAndActivity=true&defaultDrawer=feed&autoPlay=true&mute=false`;

  return (
    <iframe
      className="now-playing-drawer-iframe"
      id={session.iFrameId}
      title={`${session.sessionName} Small Video`}
      src={url}
      frameBorder="0"
      scrolling="no"
      allowFullScreen
      muted
      width="107px"
      height="60px"
      ref={iframeRef}
      data-oepa={JSON.stringify({
        page: "Banner",
        componentType: "Video",
        url: url,
        componentName: "Now playing video",
      })}
    />
  );
}

DrawerIframe.propTypes = {
  session: PropTypes.shape({
    sessionVideoSource: PropTypes.string,
  }).isRequired,
};

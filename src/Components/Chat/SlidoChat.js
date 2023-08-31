import React, { useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";

export default function SlidoChat({ interactionKey, minHeight, title }) {
  const [frameUrl, setFrameUrl] = useState(
    `https://app.sli.do/event/${interactionKey}`
  );
  useEffect(() => {
    return () => {
      setFrameUrl("");
    };
  }, []);
  useEffect(() => {
    setFrameUrl(`https://app.sli.do/event/${interactionKey}`);
  }, [interactionKey]);

  return (
    <OEPAnalytics
      page="Slido"
      componentType="Video"
      url={frameUrl}
      componentName="Slidio Chat Embed"
    >
      <iframe
        title={title}
        src={frameUrl}
        height="100%"
        width="100%"
        min-height={minHeight}
      ></iframe>
    </OEPAnalytics>
  );
}

SlidoChat.propTypes = {
  minHeight: PropTypes.string,
  title: PropTypes.string,
};

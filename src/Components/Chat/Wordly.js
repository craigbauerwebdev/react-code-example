import React, { useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";

export default function Wordly({
  sessionId,
  minHeight,
  title,
  bgcolor,
  fgcolor,
}) {
  const [frameUrl, setFrameUrl] = useState(
    `https://attend.wordly.ai/en/frame/${sessionId}?lang=en&fgcolor=${fgcolor}&bgcolor=${bgcolor}`
  );

  useEffect(() => {
    return () => {
      setFrameUrl("");
    };
  }, []);

  return (
    <div>
      <OEPAnalytics
        page="Wordly"
        componentType="Video"
        url={frameUrl}
        componentName="Wordly Video Embed"
      >
        <iframe
          title={title}
          src={frameUrl}
          height="100%"
          width="100%"
          min-height={minHeight}
        />
      </OEPAnalytics>
    </div>
  );
}

Wordly.propTypes = {
  minHeight: PropTypes.string,
  title: PropTypes.string,
  fgcolor: PropTypes.string,
  bgcolor: PropTypes.string,
};

Wordly.defaultProps = {
  language: "en",
  fgcolor: "ffffff",
  bgcolor: "452d6c",
};

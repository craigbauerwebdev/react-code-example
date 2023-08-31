import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import React from "react";

const AudioButton = ({ copy, evtHandler, img, classList, sr, page, url }) => {
  return (
    <OEPAnalytics
      page={page}
      componentType="Audio"
      url={url}
      componentName={`${copy} Audio`}
    >
      <button onClick={evtHandler}>
        <img
          src={img}
          alt={`${copy} Audio`}
          className={classList ? classList : ""}
        />
      </button>
    </OEPAnalytics>
  );
};

export default AudioButton;

AudioButton.propTypes = {
  copy: PropTypes.string.isRequired,
  evtHandler: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  classList: PropTypes.string,
  sr: PropTypes.string,
};

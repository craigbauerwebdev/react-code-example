import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import sorryStyles from "./scss/leader-board-sorry.module.scss";

const LeaderBoardSorry = ({ title }) => {
  return (
    <div className={sorryStyles.sorry}>
      <h2>Failed to Load {title}</h2>
      <div className={sorryStyles.content}>
        <SvgTypes name="error-icon" />
        <p>
          We apologize for the inconvenience, we’re working on bringing it back
          online!
        </p>
      </div>
    </div>
  );
};

export default LeaderBoardSorry;

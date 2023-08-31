import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import removedStyles from "./scss/removed.module.scss";

const RemovedFromMeeting = () => {
  return (
    <div className={removedStyles.main}>
      <SvgTypes name="blocked-user" />
      <div className={removedStyles.header}>Sorry, you have been removed.</div>
      <div className={removedStyles.description}>
        A moderator has removed you from the meeting and you will not be able to
        re-join.
      </div>
      <LinkWrapper
        className={removedStyles.button}
        to="/"
        aria-label="Home"
        page="Removed from meeting"
        componentType="Link"
        componentName="Home"
      >
        Home
      </LinkWrapper>
    </div>
  );
};

export default RemovedFromMeeting;

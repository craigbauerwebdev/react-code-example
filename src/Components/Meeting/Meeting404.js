import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import removedStyles from "./scss/removed.module.scss";

const Meeting404 = ({ message, description }) => {
  return (
    <div className={removedStyles.main}>
      <SvgTypes name="blocked-user" />
      <div className={removedStyles.header}>{message}</div>
      <div className={removedStyles.description}>{description}</div>
      <LinkWrapper
        className={removedStyles.button}
        to="/"
        aria-label="Home"
        page="Meeting 404"
        componentType="Link"
        componentName="Home"
      >
        Home
      </LinkWrapper>
    </div>
  );
};

export default Meeting404;

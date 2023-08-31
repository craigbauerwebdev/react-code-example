import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import externalLinkStyles from "./scss/session-external-link.module.scss";
import formatUrl from "util/formatter";

const SessionExternalLink = ({ sessionExternalLink, page }) => {
  return (
    <LinkWrapper
      to={formatUrl(sessionExternalLink)}
      external={true}
      className={externalLinkStyles.sessionExternalLink}
      page={page}
      componentType="Link"
      trackingUrl={sessionExternalLink}
      componentName={sessionExternalLink}
    >
      <span>
        <SvgTypes name="external" />
      </span>{" "}
      {sessionExternalLink}
    </LinkWrapper>
  );
};

export default SessionExternalLink;

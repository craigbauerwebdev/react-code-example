import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import cardWrapperStyles from "./scss/card-wrapper.module.scss";

const CardWrapper = ({
  children,
  to,
  className,
  page,
  componentType,
  componentName,
  trackingUrl,
  exhibitorId,
  sessionId,
  subSessionId,
  posterId,
  ...attrs
}) => {
  return to ? (
    <LinkWrapper
      to={to}
      {...attrs}
      className={`${className ? className : ""} ${cardWrapperStyles.holder}`}
      page={page}
      componentType={componentType}
      trackingUrl={trackingUrl}
      componentName={componentName || trackingUrl}
      exhibitorId={exhibitorId}
      sessionId={sessionId}
      subSessionId={subSessionId}
      posterId={posterId}
    >
      {children}
    </LinkWrapper>
  ) : (
    <div {...attrs} className={`${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default CardWrapper;

CardWrapper.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

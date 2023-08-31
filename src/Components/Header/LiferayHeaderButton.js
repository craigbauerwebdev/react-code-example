import { TIME_CHECKS, checkTime } from "util/timeCheck";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import buttonStyles from "./scss/buttons.module.scss";

export const LiferayHeaderButton = ({ data, isPreEventOn, disabled }) => {
  const { buttonLabel, linkURL, linkTarget, isActive, starts, ends } =
    data || {};

  const classNames = `${buttonStyles.register} ${
    isPreEventOn ? buttonStyles.preEvent : ""
  }`;

  /**
   * If the @param disabled receives a falsy value,
   * or the @param isActive property is false,
   * or the button is missing @param buttonLabel or @param linkURL,
   * the button will not render.
   */
  if (disabled || isActive === false || !buttonLabel || !linkURL) return null;

  /**
   * @const isWithinAllowedTime
   * If there is data in @param starts and @param ends,
   * then this variable will allow/disallow the button to render.
   * Currently if there is no data in either, the button will still render.
   */
  const isWithinAllowedTime =
    checkTime(TIME_CHECKS.start, starts) && checkTime(TIME_CHECKS.end, ends);
  if (!!starts && !!ends && !isWithinAllowedTime) return null;

  return (
    <LinkWrapper
      to={linkURL}
      className={classNames}
      page="Header"
      componentType="Button"
      trackingUrl="Register"
      componentName="Register"
      external={linkTarget !== "_parent"}
    >
      {buttonLabel}
    </LinkWrapper>
  );
};

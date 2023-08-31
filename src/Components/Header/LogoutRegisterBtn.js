import { LiferayHeaderButton } from "./LiferayHeaderButton";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import buttonStyles from "./scss/buttons.module.scss";
import { useSelector } from "react-redux";

const LogoutRegisterBtn = () => {
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const preEvent = useSelector((state) => state.global.isPreventOn);
  const headerButtonData = useSelector(
    (state) => state.global.topNav?.headerButton
  );

  return user ? (
    <LinkWrapper
      to="/logout"
      className={`${buttonStyles.logout} ${
        preEvent ? buttonStyles.preEvent : ""
      }`}
      page="Header"
      componentType="Button"
      trackingUrl="/logout"
      componentName="Log out"
    >
      Sign Out
    </LinkWrapper>
  ) : (
    <LiferayHeaderButton data={headerButtonData} isPreEventOn={preEvent} />
  );
};

export default LogoutRegisterBtn;

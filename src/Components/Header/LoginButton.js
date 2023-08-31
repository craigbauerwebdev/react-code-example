import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import buttonStyles from "./scss/buttons.module.scss";
import { useSelector } from "react-redux";

const LoginButton = ({ onClick }) => {
  const preEvent = useSelector((state) => state.global.isPreventOn);
  return (
    <LinkWrapper
      to="/login"
      className={`${buttonStyles.login} ${
        preEvent ? buttonStyles.preEvent : ""
      }`}
      onClick={onClick}
      componentType="Button"
      page="homepage"
      trackingUrl="/login"
      componentName="Log in"
    >
      Sign In
    </LinkWrapper>
  );
};

LoginButton.propTypes = {
  onClick: PropTypes.func,
};

LoginButton.defaultProps = {
  onClick: () => {},
};

export default LoginButton;

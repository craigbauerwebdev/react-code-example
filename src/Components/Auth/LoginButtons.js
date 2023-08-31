import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import loginRectangleStyles from "./scss/login-form.module.scss";

const LoginButtons = ({ buttons, forgotConfirmation, disableLoginBtn }) => {
  const forgotBtn = (buttonData) => {
    if (buttonData.url) {
      // External link was provided in Liferay return a stander link.
      return (
        <LinkWrapper
          to={buttonData.url}
          external={true}
          className={loginRectangleStyles.loginFormForgot}
          page="Login Page"
          componentType="Button"
          trackingUrl={buttonData.name || "External Forgot"}
          componentName={buttonData.name}
        >
          {buttonData.name}
        </LinkWrapper>
      );
    }
    // No link so we default to forgot confirmation email.
    return (
      <OEPAnalytics
        componentType="Button"
        page="Login Page"
        url="Forgot email"
        componentName="Forgot email"
      >
        <button
          type="button"
          onClick={forgotConfirmation}
          className={loginRectangleStyles.loginFormForgot}
        >
          {buttonData.name}
        </button>
      </OEPAnalytics>
    );
  };
  const getButton = (buttonData) => {
    // Each button has its own class and its own style so we check to see what the button is so we can return the correct setup.
    switch (buttonData.type) {
      case "login":
        return (
          <OEPAnalytics
            componentType="Button"
            page="Login Page"
            url="Login"
            componentName="Login"
          >
            <button
              type="submit"
              className={loginRectangleStyles.loginSubmitButton}
              disabled={disableLoginBtn}
            >
              {buttonData.name}
            </button>
          </OEPAnalytics>
        );
      case "register":
        return (
          <LinkWrapper
            to={buttonData.url}
            external={true}
            className={loginRectangleStyles.loginFormRegister}
            page="Login Page"
            componentType="Button"
            trackingUrl={buttonData.name || "Login"}
            componentName={buttonData.name}
          >
            {buttonData.name}
          </LinkWrapper>
        );
      case "forgot":
        return forgotBtn(buttonData);
      default:
        return null;
    }
  };

  return (
    <div className={loginRectangleStyles.loginButtons}>
      {buttons.map((button) => (
        <div key={button.name}>{getButton(button)}</div>
      ))}
    </div>
  );
};

export default LoginButtons;

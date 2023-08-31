import React from "react";
import loginRectangleStyles from "./scss/login-form.module.scss";

/**
 * Forgot Success is a message this displays after the forgot email was sent out.
 */
const ForgotSuccess = () => {
  return (
    <div className={loginRectangleStyles.forgotMessage}>
      <p>A request for confirmation details was initiated for your account.</p>
      <p>
        If requested outside of business hours (M-F, 8am - 5pm CDT), please
        allow additional time for our security team to process your request.
      </p>
      <p>
        Once processed, you will receive your confirmation details to the email
        address associated to your account.
      </p>
    </div>
  );
};

export default ForgotSuccess;

import React from "react";
import loginRectangleStyles from "./scss/login-form.module.scss";

/**
 * Display message this is normally used to show login errors.
 * @param {string} generalMessage
 */
const GeneralMessage = ({ generalMessage }) => {
  return (
    <div
      className={`${loginRectangleStyles.loginFormSection} ${loginRectangleStyles.errors}`}
      role="alert"
      aria-atomic="true"
    >
      <span>{generalMessage}</span>
    </div>
  );
};

export default GeneralMessage;

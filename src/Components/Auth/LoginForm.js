import React, { useEffect, useReducer, useRef, useState } from "react";
import { loginActionTypes, loginIntState, loginReducer } from "./reducer";

import ConfigService from "services/ConfigService";
import ForgotSuccess from "./ForgotSuccess";
import LifeRayAuthMessage from "./LifeRayAuthMessage";
import LoginButtons from "./LoginButtons";
import LoginInputs from "./LoginInputs";
import ReCAPTCHA from "react-google-recaptcha";
import TechnicalSupportModal from "Components/TechnicalSupport/TechnicalSupportModal";
import { errorMessageMap } from "../../services/Auth";
import forgotConfirmationEmail from "./utils/forgotConfirmationEmail";
import isEmail from "validator/es/lib/isEmail";
import loginAttempt from "./utils/loginAttempt";
import loginRectangleStyles from "./scss/login-form.module.scss";
import { updateAuth } from "../../store/actions";
import { useDispatch } from "react-redux";

/**
 * Login Form pulling data from Liferay
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Login-and-Logout-page
 * @param {function} onLogin
 * @param {object} loginData
 * @param {array} errorMessage
 * @param {string} alignment
 * @param {string} transparentFormBox
 */
const LoginForm = ({
  onLogin,
  loginData,
  errorMessage,
  alignment,
  transparentFormBox,
}) => {
  const [stateLogin, dispatchLogin] = useReducer(loginReducer, loginIntState);
  const {
    loginLogoImageURL,
    loginLogoImageAltText,
    loginHeaderText,
    displayInputLabels,
    loginFooterText,
  } = loginData.pageSettings;
  const dispatch = useDispatch();
  const [recapToken, setRecapToken] = useState(null);
  const recaptchaRef = useRef(null);
  const formRef = useRef();

  const loginError = ({ response_type, message }) => {
    if (
      (response_type || response_type === 0) &&
      errorMessageMap.has(response_type)
    ) {
      const messageType = errorMessageMap.get(response_type);
      // Display Error massages from liferay.
      dispatchLogin({
        type: loginActionTypes.ERROR_MESSAGE,
        payload: errorMessage[messageType],
      });
      if (messageType !== "9_recap_not_verified") {
        recaptchaRef.current && recaptchaRef.current.reset();
      }

      dispatch(
        updateAuth({
          isError: true,
          message: errorMessage[messageType],
        })
      );
    } else {
      // Got an error that we don't have a match for show raw error message.
      dispatchLogin({
        type: loginActionTypes.ERROR_MESSAGE,
        payload: message,
      });

      dispatch(
        updateAuth({
          isError: true,
          message,
        })
      );
    }
  };

  const showErrorOutlineAndFocus = (element) => {
    element.focus();
    element.style.outline = "2px solid #ff0000";
    element.style.outlineOffset = "2px";
  };

  /**
   * @description Checks if inputs have values, if not,
   * then update focus and style of input,
   * and then dispatch login error.
   * @returns {Boolean}
   * if false, onSubmit is not called,
   * else continue onSubmit logic.
   */
  const handleValidation = () => {
    let userNameOrEmail;
    let registrationOrConfirmationNumber;

    if (formRef.current) {
      userNameOrEmail = formRef.current[0];
      registrationOrConfirmationNumber = formRef.current[1];
    }

    if (stateLogin.inputs?.some((input) => !input.value.length)) {
      // First empty input will be
      // used for the login error message.
      const blankField = stateLogin.inputs?.find(
        (input) => !input.value.length
      );

      if (!userNameOrEmail.value) {
        showErrorOutlineAndFocus(userNameOrEmail);
        loginError({
          message: `${userNameOrEmail.name} field is Required. Please fill out in order to continue.`,
        });
        return false;
      } else if (!registrationOrConfirmationNumber.value) {
        showErrorOutlineAndFocus(registrationOrConfirmationNumber);
        loginError({
          message: `${registrationOrConfirmationNumber.name} field is Required. Please fill out in order to continue.`,
        });

        return false;
      }

      loginError({
        message: `${blankField.label} field is Required. Please fill out in order to continue.`,
      });
      return false;
    }

    if (
      userNameOrEmail.id === "email-address" &&
      !isEmail(userNameOrEmail.value)
    ) {
      showErrorOutlineAndFocus(userNameOrEmail);
      loginError({
        message: `A Valid Email Address is Required.`,
      });
      return false;
    }

    if (ConfigService.runValues.enableReCaptcha && !recapToken) {
      loginError({
        message: `Please confirm you are a human by completing the challenge below. `,
      });
      return false;
    }

    return true;
  };

  const forgotEmailCallback = ({ success, userName, message }) => {
    if (success) {
      dispatchLogin({
        type: loginActionTypes.FORGOT_SUCCESS,
      });
    } else {
      // Errors
      if (userName) {
        dispatchLogin({
          type: loginActionTypes.USER_NAME_ERROR,
          payload: "Please enter a valid email address",
        });
      } else {
        dispatchLogin({
          type: loginActionTypes.ERROR_MESSAGE,
          payload: message,
        });
      }
    }
  };

  const verifyCallback = async (token) => {
    setRecapToken(token);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const isValid = handleValidation();

    if (!isValid) {
      // eslint-disable-next-line no-console
      console.debug("Login form validation failed.");
      return;
    }

    dispatchLogin({
      type: loginActionTypes.SUBMIT_FORM,
    });

    // Check users credentials and if error is triggered call the loginError function.
    loginAttempt(
      {
        emailAddress: stateLogin.emailAddress,
        confirmationNumber: stateLogin.confirmationNumber,
        onLogin: onLogin,
        recapToken: recapToken,
      },
      loginError
    );
  };

  const forgotConfirmation = () => {
    dispatchLogin({
      type: loginActionTypes.FORGOT_CONFIRMATION,
    });

    // Send forgot confirmation email if error call forgotEmailCallback function
    forgotConfirmationEmail(
      { emailAddress: stateLogin.emailAddress },
      forgotEmailCallback
    );
  };

  useEffect(() => {
    dispatchLogin({
      type: loginActionTypes.SET_DATA,
      payload: {
        inputs: loginData.inputs,
      },
    });
  }, [loginData]);

  if (!stateLogin.inputs) {
    return null;
  }

  return (
    <div
      className={`${loginRectangleStyles.loginRectangle} ${
        loginRectangleStyles[alignment]
      } ${transparentFormBox && loginRectangleStyles.transparentBg}`}
    >
      {loginLogoImageURL && (
        <section className={loginRectangleStyles.formLogo}>
          <img src={loginLogoImageURL} alt={loginLogoImageAltText} />
        </section>
      )}
      <div>
        <h1 className={loginRectangleStyles.loginTitle}>{loginHeaderText}</h1>
        <LifeRayAuthMessage />
        <form onSubmit={onSubmit} noValidate ref={formRef}>
          <LoginInputs
            inputs={stateLogin.inputs}
            userNameError={stateLogin.userNameError}
            dispatch={dispatchLogin}
            displayLabels={displayInputLabels}
          />
          {ConfigService.runValues.enableReCaptcha && (
            <div style={{ margin: "0 auto", width: "fit-content" }}>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={verifyCallback}
                ref={recaptchaRef}
              />
            </div>
          )}
          <LoginButtons
            buttons={loginData.buttons}
            forgotConfirmation={forgotConfirmation}
            disableLoginBtn={stateLogin.disableLoginBtn}
          />
        </form>
        {stateLogin.showForgotRequestSuccess && <ForgotSuccess />}
        {loginFooterText && (
          <div className={loginRectangleStyles.notes}>
            <p>* Required</p>
            <p
              dangerouslySetInnerHTML={{
                __html: loginFooterText,
              }}
            />
            <TechnicalSupportModal
              classes={loginRectangleStyles.technicalSupport}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;

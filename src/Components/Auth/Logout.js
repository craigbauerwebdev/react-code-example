import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LifeRayAuthMessage from "./LifeRayAuthMessage";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import Meta from "../Meta";
import TechnicalSupportModal from "Components/TechnicalSupport/TechnicalSupportModal";
import { dataTypes } from "store/utils/dataTypes";
import getFormStyles from "./utils/getFormStyles";
import { getPayload } from "store/actions";
import loginRectangleStyles from "./scss/login-form.module.scss";
import loginStyles from "./scss/login.module.scss";
import logoutStyles from "./scss/logout.module.scss";
import { searchCode } from "services/Route";

// import staticData from "util/staticData/Components/LoginForm/LoginForm.data";

/**
 * Logout page
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Login-and-Logout-page
 * @param {function} onLogout
 */
const Logout = ({ onLogout }) => {
  const dispatch = useDispatch();
  // To use staticData and not liferay data replace this variable use staticData.logInData
  const loginData = useSelector((state) => state.global.login);
  const user = useSelector((state) => state.global.user);
  const chatClient = useSelector((state) => state.chat.chatClient);
  const { logout } = loginData || {};
  const type = searchCode("type", window.location.href);
  const hbLogoutError = type === "hb_logout";

  useEffect(() => {
    if (user) {
      if (chatClient) {
        chatClient.disconnect();
      }
      onLogout();
    }
  }, [onLogout, dispatch, chatClient, user]);

  // If using static data you can remove this useEffect function.
  useEffect(() => {
    if (!loginData) {
      dispatch(getPayload(dataTypes.loginForm));
    }
  }, [loginData, dispatch]);

  if (!loginData) {
    return <Loader />;
  }

  return (
    <div
      className={loginStyles.loginWrapper}
      style={getFormStyles(loginData.logout)}
    >
      <Meta pageTitle="Logout" />
      <div
        className={`${loginRectangleStyles.loginRectangle} ${loginRectangleStyles.center}`}
      >
        <div>
          {logout.primaryText && (
            <h2 className={logoutStyles.logoutTitle}>{logout.primaryText}</h2>
          )}
          {logout.subtext && (
            <p className={logoutStyles.logoutCopy}>{logout.subtext}</p>
          )}
          {hbLogoutError && (
            <div className={loginRectangleStyles.multipleLoginError}>
              <span>
                You are signed in from another device, please sign out from that
                device and sign back in here - if this is an error, please
                contact technical support.
              </span>
            </div>
          )}
          <LifeRayAuthMessage />
          {logout.buttonURL && (
            <div className={loginRectangleStyles.loginButtons}>
              <LinkWrapper
                to={logout.buttonURL}
                className={loginRectangleStyles.loginSubmitButton}
                page="networking"
                componentType="button"
                trackingUrl={logout.buttonURL}
                componentName={logout.buttonLabel}
              >
                {logout.buttonLabel}
              </LinkWrapper>
            </div>
          )}
          <div
            className={loginRectangleStyles.notes}
            style={{ textAlign: "center" }}
          >
            <TechnicalSupportModal
              classes={loginRectangleStyles.technicalSupport}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;

import {
  LOGIN_URL,
  REDIRECT_ENABLE,
  REDIRECT_REFRESH_RATE,
  REDIRECT_URL,
} from "../../services/Auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import redirectPageStyles from "./scss/redirect-page.module.scss";
import LifeRayAuthMessage from "./LifeRayAuthMessage";
import TechnicalSupportModal from "Components/TechnicalSupport/TechnicalSupportModal";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import getFormStyles from "./utils/getFormStyles";

export default function RedirectPage({ location }) {
  const dispatch = useDispatch();
  // To use staticData and not liferay data replace this variable use staticData.logInData
  const loginData = useSelector((state) => state.global.login);
  const { redirect } = loginData || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!REDIRECT_ENABLE) {
      return;
    }
    const countdownTimeout = setTimeout(() => {
      window.location.href = LOGIN_URL;
    }, REDIRECT_REFRESH_RATE);
    return () => clearTimeout(countdownTimeout);
  }, []);

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
    <div className={redirectPageStyles.holder} style={getFormStyles(redirect)}>
      <div className={redirectPageStyles.redirectWrapper}>
        <div className={redirectPageStyles.redirectRectangle}>
          <div className={redirectPageStyles.redirectForm}>
            <h1>{redirect.title}</h1>
            <p>{redirect.subtitle}</p>
            <LifeRayAuthMessage />
            <LinkWrapper
              to={redirect.loginURL || REDIRECT_URL}
              external={true}
              className={redirectPageStyles.loginButton}
              page="Redirect Page"
              componentType="Button"
              trackingUrl={redirect.loginURL}
              componentName={redirect.loginLabel}
            >
              {redirect.loginLabel}
            </LinkWrapper>
            <LinkWrapper
              to={redirect.registerURL}
              className={redirectPageStyles.redirectButton}
              external={true}
              page="Redirect Page"
              componentType="Button"
              trackingUrl={redirect.registerURL}
              componentName={redirect.registerLabel}
            >
              {redirect.registerLabel}
            </LinkWrapper>
            <div
              className={redirectPageStyles.techSupportLink}
              style={{ textAlign: "center" }}
            >
              <TechnicalSupportModal
                classes={redirectPageStyles.technicalSupport}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

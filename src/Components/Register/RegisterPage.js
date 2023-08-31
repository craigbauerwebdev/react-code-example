import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import LoginForm from "../Auth/LoginForm";
import Meta from "../Meta";
import { dataTypes } from "store/utils/dataTypes";
import getFormStyles from "Components/Auth/utils/getFormStyles";
import { getPayload } from "store/actions";
import registerPageStyles from "./scss/register.module.scss";

// import staticData from "util/staticData/Components/LoginForm/LoginForm.data";

/**
 * Login data coming from Liferay
 * @param {function} onLogin
 */
const RegisterPage = ({ onLogin }) => {
  const dispatch = useDispatch();
  // To use staticData and not liferay data replace this variable use staticData.logInData
  const loginData = useSelector((state) => state.global.login);

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
      className={registerPageStyles.registerPage}
      style={getFormStyles(loginData.settings)}
    >
      <Meta pageTitle="Register" />
      <div className={registerPageStyles.registerPageContent}>
        <LoginForm
          onLogin={onLogin}
          loginData={loginData.login}
          errorMessage={loginData.messages}
          alignment={loginData.login.pageSettings.loginFormAlignment}
          transparentFormBox={true}
        />
      </div>
    </div>
  );
};

export default RegisterPage;

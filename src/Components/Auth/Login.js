import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import LoginForm from "./LoginForm";
import Meta from "../Meta";
import { dataTypes } from "store/utils/dataTypes";
import getFormStyles from "./utils/getFormStyles";
import { getPayload } from "store/actions";
import loginStyles from "./scss/login.module.scss";

// import staticData from "util/staticData/Components/LoginForm/LoginForm.data";

/**
 * Login data coming from Liferay
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Login-and-Logout-page
 * @param {function} onLogin
 */
const Login = ({ onLogin }) => {
  const dispatch = useDispatch();
  // To use staticData and not liferay data replace this variable use staticData.logInData
  const loginData = useSelector((state) => state.global.login);

  // If using static data you can remove this useEffect.
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
      style={getFormStyles(loginData.settings)}
    >
      <Meta pageTitle="Login" />
      <LoginForm
        onLogin={onLogin}
        loginData={loginData.login}
        errorMessage={loginData.messages}
        alignment={loginData.login.pageSettings.loginFormAlignment}
      />
    </div>
  );
};

export default Login;

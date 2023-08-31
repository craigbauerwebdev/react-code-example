import "./css/style.scss";

import Auth, { AUTH_TYPE, AutoAuth, getResponseMessage } from "./services/Auth";
import React, { useCallback, useEffect } from "react";
import { Route, Switch } from "react-router";
import {
  emptyGlobalStore,
  getPayload,
  resetAuth,
  setTimeZone,
  setUser,
  updateAuth,
} from "store/actions";
import { emptyProfile, setShow } from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import AppRoute from "./routes.js";
import AuthRender from "./Components/Auth/AuthRender";
import { BrowserRouter } from "react-router-dom";
import ConfigService from "services/ConfigService";
import ContentWrapper from "Components/ContentWrapper/ContentWrapper";
import Debug from "debug";
import Logger from "js-logger";
import Notifications from "Components/Notifications/Notifications";
import TagManager from "react-gtm-module";
import axios from "axios";
import { dataTypes } from "./store/utils/dataTypes";
import { initializeOEPA } from "./Components/OEPAnalytics";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import useNotificationWebSocket from "hooks/useNotificationWebSocket";
import useOverlordPermissions from "hooks/useOverlordPermissions";

const TagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_CODE,
  dataLayerName: "dataLayer",
};
TagManager.initialize(TagManagerArgs);

initializeOEPA();

export const debug = new Debug("onlineeventpro:");

if (
  process.env.REACT_APP_ENV !== "prod" ||
  process.env.REACT_APP_LOGGER_ON === "true"
) {
  Logger.useDefaults();
} else {
  Logger.setLevel(Logger.OFF);
}

const sendWs = (user, token, status) => {
  axios.patch(`${process.env.REACT_APP_API_HOST}/account/status`, {
    status: status,
  });
  const localHost = process.env.REACT_APP_API_HOST.indexOf("//localhost");
  //assume localhost http otherwise https
  const ws = new WebSocket(
    localHost >= 0
      ? "ws://" + process.env.REACT_APP_API_HOST.split("http://")[1]
      : "wss://" + process.env.REACT_APP_API_HOST.split("https://")[1],
    [token]
  );

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        request: "publish",
        message: { user: user?.fuzion_attendee_id, status: status },
      })
    );
    ws.close();
  };
};

let sendWsRef = null;

export default function App() {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.global.login);
  const user = useSelector((state) => state.global.user);
  const token = Auth.getMiddlewareAPIAccessToken();

  useEffect(() => {
    if (!loginData) {
      dispatch(getPayload(dataTypes.loginForm));
    }
  }, [loginData, dispatch]);

  const login = async (data) => {
    dispatch(resetAuth());
    Auth.ForceHeartBeatLogin(true);
    const user = await Auth.login(
      data,
      process.env.REACT_APP_AUTH_ACTION_TYPE || AUTH_TYPE.DEFAULT
    );
    if (user && !user.isError) {
      updateUser(user);
      debug("log in user");
    }
    dispatch(setShow(false));
    return user;
  };
  const logout = useCallback(() => {
    Auth.logout();
    dispatch(emptyGlobalStore());
    dispatch(emptyProfile());
    debug("logout user");
  }, [dispatch]);
  const loadUser = () => {
    return Auth.load();
  };
  const updateUser = (data) => {
    debug("update the user with", data);
    Auth.refreshExp();
    const user = Auth.updateUser(data);
    if (user) {
      dispatch(setUser(user));
    }
  };

  // Set Notification websocket
  useNotificationWebSocket();

  // Set overlord permission settings
  useOverlordPermissions();

  /**
   * Get user on app load
   */
  useEffect(() => {
    if (!user) {
      dispatch(setUser(Auth.isLoggedIn()));
    }
  }, [dispatch, user]);

  /**
   * Check to see if user should be logged out of session
   */
  useEffect(() => {
    if (Auth.autoLogout()) {
      logout();
    }
  }, [logout]);

  /**
   * Set user timezone and default site timezone
   * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Timezone
   */
  useEffect(() => {
    dispatch(
      setTimeZone(
        ConfigService.runValues.enableUserBrowserTimezone
          ? moment.tz.guess() // Set timezone to user's browser setting
          : ConfigService.runValues.momentTimezone // Use the event timezone
      )
    );
  }, [dispatch]);

  (async () => {
    const {
      user = null,
      inProgress,
      isStarted,
      isError,
      errorType,
      response_type,
    } = await AutoAuth();

    if (user && !isEmpty(user)) {
      updateUser(user);
    }

    if (isStarted && !inProgress && loginData && isError) {
      // getResponseMessage(response_type, loginData.messages) ||
      dispatch(
        updateAuth({
          inProgress,
          isStarted,
          isError,
          message:
            response_type &&
            loginData &&
            getResponseMessage(response_type, loginData.messages),
          errorType,
          response_type,
        })
      );
    }

    dispatch(
      updateAuth({
        inProgress,
        isStarted,
        isError,
        message:
          response_type &&
          loginData &&
          getResponseMessage(response_type, loginData.messages),
        errorType,
      })
    );
  })();

  /**
   * Event listener for browser close to send logged out socket
   */
  useEffect(() => {
    if (user && process.env.REACT_APP_ENABLE_ONLINE_STATUS) {
      sendWsRef = sendWs.bind(null, user, token, "offline");
      window.addEventListener("beforeunload", sendWsRef);
      sendWs(user, token, "online");
    }
  }, [user, token]);

  return (
    <BrowserRouter>
      <AuthRender onLogout={logout} updateUser={updateUser}>
        <ContentWrapper>
          <Notifications /> {/* Liferay Site wide Notification */}
          <main id="content" role="main" aria-label="Main Content">
            <AppRoute
              onLogin={login}
              onLogout={logout}
              onLoadUser={loadUser}
              setUser={setUser}
              updateUser={updateUser}
            />
          </main>
        </ContentWrapper>
        <Switch>
          <Route path="/login" />
          <Route path="/pre-event" />
          <Route path="/single-file-viewer/:id" />
          <Route path="/" />
        </Switch>
      </AuthRender>
    </BrowserRouter>
  );
}

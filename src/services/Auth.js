import * as SecureLS from "secure-ls";

import { addHours, differenceInSeconds, isAfter, parseISO } from "date-fns";
import { decode, sign } from "jsonwebtoken";
import { get, isEmpty, throttle } from "lodash";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { debug } from "../App";
import { loginActionTypes } from "../Components/Auth/reducer";
import { nanoid } from "nanoid";
import { searchCode } from "./Route";
import { useLocation } from "react-router-dom";

const IS_SERVERLESS = process.env.REACT_APP_SERVERLESS;

const ls = new SecureLS({ encodingType: "aes" });

const SESSION_TOKEN = "SESSION_TOKEN";

const userSessionKey = "userSession";
const userPreSessionKey = "userPreSession";
const userSettings = "userSettings";
export const REDIRECT_URI = "redirect_uri";
export const LOGIN_URL = process.env.REACT_APP_URL_LOGIN || "/login";
export const REDIRECT_URL = process.env.REACT_APP_AUTH_REDIRECT || LOGIN_URL;
export const AUTH_TYPE = {
  DEFAULT: "default",
  INTERNAL: "internal",
  EXTERNAL: "external",
  REDIRECT: "redirect",
};
export const AUTH_SSO_RESPONSE = {
  AUTHENTICATION_ERROR: 0,
  NOT_AUTHENTICATED: 1,
  USER_GENERATION: 2,
  BASIC_AUTHORIZATION: 3,
  AUTHORIZATION_ERROR: 4,
  NOT_AUTHORIZED: 5,
  EVENT_COMING_SOON: 6,
  EVENT_CLOSED: 7,
  AUTHORIZED_REDIRECT: 8,
  BASIC_AUTHORIZATION_PATH: 9,
};
export const AUTH_HEART_BEAT_ACTIONS = {
  NONE: 0,
  FORCE_LOGIN: 1,
  FORCE_LOGOUT: 2,
  CONFIRM_PAGE: 3,
};
/**
 * Refresh rate in minutes
 * @type {number}
 */
const REFRESH_RATE = process.env.REACT_APP_AUTH_SESSION_REFRESH || 12;
export const REDIRECT_REFRESH_RATE =
  process.env.REACT_APP_AUTH_REDIRECT_REFRESH_RATE || 1000;
export const REDIRECT_COUNTDOWN =
  process.env.REACT_APP_AUTH_REDIRECT_COUNTDOWN || 5;
export const REDIRECT_ENABLE =
  process.env.REACT_APP_AUTH_REDIRECT_ENABLE &&
  JSON.parse(process.env.REACT_APP_AUTH_REDIRECT_ENABLE);

export const AUTO_AUTH_REDUCER_TYPES = {
  LOGIN_BY_SSO: "LOGIN_BY_SSO",
  LOGIN_BY_EMAIL_ATTENDEEID: "LOGIN_BY_EMAIL_ATTENDEEID",
  LOGIN_BY_CODE_STATE: "LOGIN_BY_CODE_STATE",
  LOGIN_BY_REG_ID_EVENT_ID: "LOGIN_BY_REG_ID_EVENT_ID",
  LOGIN_BY_BADGE_ID_EMAIL: "LOGIN_BY_BADGE_ID_EMAIL",
  LOGIN_BY_REG_ID_EMAIL: "LOGIN_BY_REG_ID_EMAIL",
  AUTH_IN_PROGRESS: "AUTH_IN_PROGRESS",
  AUTH_STARTED: "AUTH_STARTED",
  AUTH_UPDATE_USER: "AUTH_UPDATE_USER",
};
const sendWs = async (user, token, status) => {
  const headers = { "x-oep-auth": token };
  axios.patch(
    `${process.env.REACT_APP_API_HOST}/account/status`,
    {
      status: status,
    },
    { headers: headers }
  );
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

/**
 * Auth service
 */
export default class Auth {
  static ForceHeartBeatLogin(heart_beat_force = false) {
    Auth.saveOptions({ heart_beat_force });
  }

  /**
   * Log the user in using backend auth
   * @param payload
   * @param authType
   * @param payload.userName String The users email or user name
   * @param payload.password String The users email or user name
   * @returns {Promise<AxiosResponse<any>|{isError: boolean, message: *}>}
   */
  static async login(payload, authType = AUTH_TYPE.DEFAULT) {
    try {
      let user;
      switch (authType) {
        case AUTH_TYPE.EXTERNAL:
          user = await Auth.externalLogin(payload);
          break;
        case AUTH_TYPE.INTERNAL:
        case AUTH_TYPE.DEFAULT:
        case "default":
          user = await Auth.localLogin(payload);
          break;
        default:
          break;
      }

      const canSave = ![user.isError].every((user) => user);
      if (canSave) {
        Auth.save(user);
        Auth.refreshExp();
      }
      debug(user);
      return user;
    } catch ({ response }) {
      const { data } = response || {
        isError: true,
        errorMessage: "",
      };

      const cleanError =
        typeof data === "object" && data.isError
          ? data
          : {
              isError: true,
              errorMessage: data,
            };

      return cleanError;
    }
  }

  static async loginSSO({ userName: username, password }) {
    const pwf_token = sign(
      {
        username,
        password,
      },
      nanoid()
    );

    window.location = `${process.env.REACT_APP_URL_LOGIN}?pwf_token=${pwf_token}&state=${process.env.REACT_APP_EVENT_URL}`;
    return {};
  }

  static externalLogin({ userName: UserName, password: Password }) {
    const path = process.env.REACT_APP_LOGIN_URL;
    debug("auth to ", path);
    return axios
      .post(path, {
        UserName,
        Password,
      })
      .then((res) => res.data);
  }

  static async localLogin({
    userName: UserName,
    password: Password,
    type,
    recapToken,
  }) {
    try {
      debug("loading user", process.env.REACT_APP_LOGIN_URL);
      const lp = process.env.REACT_APP_LOGIN_URL;
      const { data: user } = await axios.post(
        `${process.env.REACT_APP_API_HOST}${lp || "/login"}`,
        {
          UserName,
          Password,
          type:
            type || process.env.REACT_APP_AUTH_LOGIN_TYPE || "email_badge_id",
          recapToken,
        }
      );
      return user;
    } catch (e) {
      debug(e);
      return {
        isError: true,
        message: e.message,
        response_type: AUTH_SSO_RESPONSE.AUTHENTICATION_ERROR,
      };
    }
  }

  static async oAuthLogin({ code }) {
    try {
      debug("loading user with", code);
      const user = await axios
        .post(`${process.env.REACT_APP_API_HOST}/user`, {
          code,
        })
        .then((res) => res.data);
      if (!user.error) {
        Auth.save(user);
        Auth.refreshExp();
      }
      return user;
    } catch (e) {
      debug(e);
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  static async userByRegId({ regId, eventId }) {
    try {
      let user = await axios
        .get(
          `${process.env.REACT_APP_API_HOST}/singleAttendeeByRegistrationNumber`,
          {
            params: {
              eventId,
              id: regId,
            },
          }
        )
        .then((res) => res.data);

      Auth.save(user);
      Auth.refreshExp();

      return user;
    } catch (e) {
      debug("login error", e);
      return {
        error: true,
        isError: true,
        message: e.message,
      };
    }
  }

  static async userById({ fuzion_attendee_id }) {
    try {
      let user = await axios
        .post(`${process.env.REACT_APP_API_HOST}/login`, {
          type: "attendee_id",
          fuzion_attendee_id,
        })
        .then((res) => res.data);

      if (!user || user.error || user.isError) {
        return {
          ...user,
          isError: true,
          response_type: AUTH_SSO_RESPONSE.NOT_AUTHENTICATED,
          error: true,
        };
      }

      Auth.save(user);
      Auth.refreshExp();
      return user;
    } catch (e) {
      debug("login error", e);
      return {
        error: true,
        message: e.message,
      };
    }
  }

  /**
   * Log user out of application
   */
  static logout() {
    debug("User logged out");
    if (process.env.REACT_APP_ENABLE_ONLINE_STATUS) {
      const loggedOutUser = ls.get(userSessionKey);
      sendWs(loggedOutUser, Auth.getMiddlewareAPIAccessToken(), "offline");
    }
    ls.remove(userSessionKey);
    ls.remove(userPreSessionKey);
    ls.remove(userSettings);
    ls.remove("lobbyVideo");
    Auth.clearSessionToken();
  }

  /**
   * Based on ${REFRESH_RATE} and exp setting check to see if user should be logged out of the app
   * @returns {boolean}
   */
  static autoLogout() {
    const user = Auth.load();
    if (!user) {
      return false;
    }

    const options = Auth.loadOptions();
    if (!options || !options.exp) {
      Auth.refreshExp();
      return false;
    }
    const { exp } = options;
    const now = Date.now();

    return isAfter(now, parseISO(exp));
  }

  /**
   * Reset the user settings expire time
   */
  static refreshExp() {
    Auth.saveOptions({ exp: addHours(Date.now(), REFRESH_RATE) });
  }

  /**
   * Load user options
   * @returns {any}
   */
  static loadOptions() {
    return ls.get(userSettings);
  }

  /**
   * Save user options
   * @param payload {Object}
   */
  static saveOptions(payload) {
    const o = Auth.loadOptions();
    return ls.set(userSettings, {
      ...o,
      ...payload,
    });
  }

  static resetUserOptions() {
    Auth.refreshExp();
    Auth.saveOptions({ session_id: null });
  }

  static saveSessionToken(token) {
    localStorage.setItem(SESSION_TOKEN, token);
  }

  static clearSessionToken() {
    localStorage.removeItem(SESSION_TOKEN);
  }

  static getSessionToken() {
    const token = localStorage.getItem(SESSION_TOKEN);

    if (!token) {
      debug("no user token");
      return null;
    }

    const { exp } = decode(token);
    const expiredToken = isAfter(Date.now() / 1000, exp);

    if (expiredToken) {
      throw Error("user token expired");
    }
    return token;
  }

  /**
   * Checks if user JWT token is expired
   * @returns {boolean}
   */
  static checkIfUserTokenIsExpired() {
    const user = Auth.load();

    if (!user) {
      return false;
    }

    const { authToken } = user;
    const { exp } = decode(authToken);
    const isExpired = isAfter(Date.now() / 1000, exp);

    return isExpired;
  }

  /**
   * Check if user is logged in and reutrn user object
   * @returns {object | null}
   */
  static isLoggedIn() {
    const userFromLS = Auth.load();
    return isEmpty(userFromLS) ? null : userFromLS;
  }

  /**
   * Save user data to encrypted storage
   * @param user
   */
  static save(user) {
    ls.set(userSessionKey, user);
    return user;
  }

  static updateUser(data) {
    try {
      debug("save user", data);
      const savedUser = Auth.load() || {};
      return Auth.save({
        ...savedUser,
        ...data,
      });
    } catch (e) {
      debug("failed to update user", e);
      return false;
    }
  }

  /**
   * Load user data from encrypted storage
   * @returns {any}
   */
  static load() {
    return ls.get(userSessionKey);
  }

  static async redirectQueryAuth({
    email,
    fuzion_attendee_id,
    registration_number,
  }) {
    debug("auth query verify");
    try {
      const user = await axios
        .post(`${process.env.REACT_APP_API_HOST}/login`, {
          fuzion_attendee_id,
          registration_number,
          email: decodeURIComponent(email),
          type: fuzion_attendee_id ? "attendee_id" : "email_reg_number",
        })
        .then((res) => res.data);
      if (!user.isError) {
        Auth.save(user);
        Auth.refreshExp();
      }
      return user;
    } catch (e) {
      debug(e);
      return e;
    }
  }

  static async reloadUser() {
    try {
      return axios
        .post(`${process.env.REACT_APP_API_HOST}/singleAttendeeByAttendeeId`)
        .then((u) => u.data)

        .then((updatedUser) => {
          if (updatedUser.isError) {
            return null;
          }

          Auth.updateUser(updatedUser);
          return updatedUser;
        });
    } catch (e) {
      debug("Update user error", e);
      return null;
    }
  }

  /**
   * Middleware auth
   * @returns {any}
   */
  static async middlewareAuth() {
    try {
      debug("invoking middleware authenticate API");
      let accessToken = Auth.getMiddlewareAPIAccessToken();

      const userCred = {
        app_client_id: `${process.env.REACT_APP_COGNITO_APP_CLIENT_ID}`,
        app_client_secret: `${process.env.REACT_APP_COGNITO_APP_CLIENT_SECRET}`,
      };
      if (!accessToken || Auth.isAccessTokenExpired()) {
        accessToken = await axios
          .post(`${process.env.REACT_APP_API_HOST}/authenticate`, userCred)
          .then((res) => {
            return res.data.access_token;
          });
        if (!accessToken.error) {
          ls.set(userPreSessionKey, { cognitoAuth: accessToken });
          Auth.refreshTokenExp();
        }
      }
      return accessToken;
    } catch (e) {
      debug(e);
      ls.remove(userPreSessionKey);
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  /**
   * Reset the user settings expire time
   */
  static refreshTokenExp() {
    Auth.saveOptions({ expAccessTokenTime: addHours(Date.now(), 1) });
  }

  /**
   * Checks saved token expiration time
   * @returns {boolean}
   */
  static isAccessTokenExpired() {
    const options = Auth.loadOptions();
    const { expAccessTokenTime } = options;
    const now = addHours(Date.now(), 0);
    let diff = differenceInSeconds(parseISO(expAccessTokenTime), now);
    diff = diff / 60; // minutes
    return diff <= 1;
  }

  /**
   * Retrive Middleware AccessToken
   * @returns {any}
   */
  static getMiddlewareAPIAccessToken() {
    let userDataObj = ls.get(userSessionKey);
    if (Object.prototype.hasOwnProperty.call(userDataObj, "authToken")) {
      return userDataObj.authToken;
    } else {
      return false;
    }
  }

  /**
   * Return Middleware header option access token
   * @returns {Object}
   */
  static async getMiddlewareAPIHeaders() {
    return Auth.middlewareAuth().then((accessToken) => {
      if (accessToken.isError) {
        return accessToken;
      }
      return {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
    });
  }
}

export const loginByEmailAttendeeId = ({
  email,
  fuzion_attendee_id,
  registration_number,
}) => {
  return Auth.redirectQueryAuth({
    email,
    fuzion_attendee_id,
    registration_number,
  });
};

export const authUrlKeys = () => {
  const url = window.location.href;
  const code = searchCode("code", url);
  const state = searchCode("state", url);

  const eventId = searchCode("eventId", url);

  const email = searchCode("email", url);
  const id = searchCode("id", url);
  const fuzion_attendee_id =
    searchCode("fuzion_attendee_id", url) || searchCode("attID", url);
  const registration_number =
    searchCode("registration_number", url) || searchCode("regId", url) || id;

  const response_type = searchCode("response_type", url);
  const response_message = searchCode("response_message", url);
  const ssoUrl = searchCode("url", url);
  const redirect_url = searchCode("redirect_url", url);

  const errorMessage = searchCode("errorMessage", url);
  const errorType = searchCode("errorType", url);

  const hasLogin = [
    response_type,
    response_message,
    registration_number,
    email,
    eventId,
    code,
    state,
    fuzion_attendee_id,
    id,
    ssoUrl,
    redirect_url,
    errorMessage,
    errorType,
  ].some((data) => data);

  return {
    hasLogin,
    data: {
      response_type,
      response_message,
      registration_number,
      email,
      eventId,
      code,
      state,
      fuzion_attendee_id,
      id,
      ssoUrl,
      redirect_url,
      errorMessage,
      errorType,
    },
  };
};

/**
 * Automatic authenication.
 * Works for SSO andFast URL
 * @param {*} cb callback function to process login
 *
 */
export const AutoAuth = async () => {
  try {
    /**
     * Get all url based state varibalbes
     */
    const url = window.location.href;
    const code = searchCode("code", url);
    const state = searchCode("state", url);

    const eventId = searchCode("eventId", url);

    const email = searchCode("email", url);
    const id = searchCode("id", url);
    const fuzion_attendee_id =
      searchCode("fuzion_attendee_id", url) || searchCode("attID", url);
    const registration_number =
      searchCode("registration_number", url) || searchCode("regId", url) || id;

    const response_type = searchCode("response_type", url);
    const response_message = searchCode("response_message", url);
    const ssoUrl = searchCode("url", url);
    const redirect_url = searchCode("redirect_url", url);

    const errorMessage = searchCode("errorMessage", url);
    const errorType = searchCode("errorType", url);

    /**
     * If SSO returns returns an error message in the url
     */
    if (errorMessage || errorType) {
      return {
        user: null,
        inProgress: false,
        isStarted: true,
        isError: true,
        message: errorMessage,
        errorType,
        response_type: errorType || AUTH_SSO_RESPONSE.NOT_AUTHENTICATED,
      };
    }

    /**
     * Log in is not happening alert routes file
     */
    if (
      ![
        response_type,
        response_message,
        registration_number,
        email,
        eventId,
        code,
        state,
        fuzion_attendee_id,
        id,
      ].some((data) => data)
    ) {
      return {
        user: null,
        inProgress: false,
        isStarted: false,
        isError: false,
        message: errorMessage,
        errorType,
        response_type,
      };
    }

    /**
     * Single Session Login enable heartbeat override
     */
    Auth.ForceHeartBeatLogin(true);

    /**
     * Trigger callback that login progress has started
     */

    /**
     * Login with fuzion attendee id
     */
    if (fuzion_attendee_id) {
      const user = await Auth.userById({
        fuzion_attendee_id,
      });
      return {
        user,
        inProgress: false,
        isStarted: true,
      };
    }

    /**
     * @depracated
     * OLD SSO version, still supported but no longer the main way to process SSO
     */
    if (code && state) {
      const user = await Auth.oAuthLogin({ code });

      return {
        user,
        inProgress: false,
        isStarted: true,
      };
    }

    if (registration_number && eventId) {
      const user = Auth.userByRegId({ regId: registration_number, eventId });
      return {
        user,
        inProgress: false,
        isStarted: true,
      };
    }

    /**
     * Login via id = registration_number based on process.env.REACT_APP_AUTH_LOGIN_TYPE and the attendee email
     */
    if (id && email) {
      const user = await Auth.login(
        {
          userName: email,
          password: id,
          type: "email_reg_number",
        },
        process.env.REACT_APP_AUTH_ACTION_TYPE || AUTH_TYPE.DEFAULT
      );
      return {
        user,
        inProgress: false,
        isStarted: true,
        isError: user.isError || user.error || false,
        response_type: user.response_type,
        errorType: user.response_type,
      };
    }
    /**
     * Main SSO login with ENUMS for response types and messages
     */
    if (response_type && response_message) {
      const { fuzion_attendee_id } = decode(response_message) || {};

      let res;
      let token;
      switch (parseInt(response_type)) {
        case AUTH_SSO_RESPONSE.BASIC_AUTHORIZATION:
        case AUTH_SSO_RESPONSE.BASIC_AUTHORIZATION_PATH:
        case AUTH_SSO_RESPONSE.AUTHORIZED_REDIRECT:
          if (IS_SERVERLESS) {
            debug("load serverless user", fuzion_attendee_id);

            Auth.saveSessionToken(response_message);

            const response = await axios.post(
              `${process.env.REACT_APP_API_HOST}/sso-login`,
              {
                token: response_message,
              }
            );

            const user = response.data.data;

            if (redirect_url) {
              window.location.href = `${redirect_url}&fuzionID=${user.fuzion_attendee_id}`;
              return;
            }

            return {
              user,
              inProgress: false,
              isStarted: true,
              response_type,
            };
          } else {
            const { data: user } = Auth.userById({
              fuzion_attendee_id,
            });

            return {
              user,
              inProgress: false,
              isStarted: true,
              isError: user.isError || user.error || false,
              response_type,
            };
          }
        case AUTH_SSO_RESPONSE.USER_GENERATION:
          res = await axios.post(ssoUrl, {
            user_token: response_message,
          });
          token = (res.headers && res.headers.token) || "";
          if (token) {
            Auth.saveSessionToken(token);
          }
          return {
            user: res.data,
          };

        case AUTH_SSO_RESPONSE.AUTHENTICATION_ERROR:
        case AUTH_SSO_RESPONSE.NOT_AUTHENTICATED:
        case AUTH_SSO_RESPONSE.AUTHORIZATION_ERROR:
        case AUTH_SSO_RESPONSE.NOT_AUTHORIZED:
        default:
          debug("Error loading", "redirect to error page");
          return {
            user: null,
            inProgress: false,
            isStarted: true,
            isError: true,
            message: response_message,
            errorType: response_type,
            response_type,
          };
      }
    }
    return;
  } catch (e) {
    /**
     * Opps something went wrong login failed
     */

    return {
      user: null,
      inProgress: false,
      isStarted: true,
      isError: true,
      message: e.message,
      errorType: null,
      response_type: AUTH_SSO_RESPONSE.AUTHENTICATION_ERROR,
    };
  }
};

export const useSyncUser = (cb, user) => {
  const location = useLocation();
  useEffect(() => {
    const timeout = 60000;
    const id = setInterval(() => {
      if (isEmpty(user)) {
        debug("no user to sync");
        return;
      }
      const path = location.pathname;

      if (
        [["/"].includes(path), path.includes("/sessions")].some((t) => t) &&
        user
      ) {
        Auth.reloadUser(user.fuzion_attendee_id)
          .then((userData) => {
            if (userData && userData.isError) {
              debug("error loading user for reload", userData);
              return;
            }
            cb(userData);
          })
          .catch((e) => debug(e));
      }
    }, timeout);
    return () => clearInterval(id);
  }, [location.pathname, user, cb]);
};

/**
 * Log user in by email and attID
 *
 * USE AUTH redirectQueryAuth Directly
 */

export const useAuthHeartBeatProcess = () => {
  const [action, setAction] = useState(AUTH_HEART_BEAT_ACTIONS.NONE);

  const { userAgent } = navigator || {};

  const execute = async ({ user, enabled }) => {
    const fuzion_attendee_id = get(user, "fuzion_attendee_id", "");
    const custom_attributes = get(user, "custom_attributes", "");
    let sid = null;
    const { session_id, heart_beat_force } = Auth.loadOptions();

    if (!session_id) {
      sid = nanoid();
      Auth.saveOptions({ session_id: sid });
      debug("create heartbeat session id", sid);
    }

    let multi_access;

    if (custom_attributes) {
      const cJson =
        custom_attributes && typeof custom_attributes === "string"
          ? JSON.parse(custom_attributes)
          : custom_attributes;
      const pass = get(cJson, "multi_access", "");
      multi_access = [pass === "true", pass === "1"].some((v) => v);
    }

    if (!enabled || !fuzion_attendee_id || multi_access) {
      debug("skip hb", enabled, fuzion_attendee_id, multi_access);
      setAction(AUTH_HEART_BEAT_ACTIONS.NONE);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_HOST}/auth-hb`, {
        fuzion_attendee_id,
        fuzion_event_id: process.env.REACT_APP_FUZION_EVENT_ID,
        session_id: session_id || sid,
        userAgent,
        force: heart_beat_force,
      })
      .then(({ data }) => {
        const { action = "" } = data;
        if (heart_beat_force) {
          Auth.ForceHeartBeatLogin(false);
        }
        switch (action.toLowerCase()) {
          case "login":
            setAction(AUTH_HEART_BEAT_ACTIONS.FORCE_LOGOUT);
            break;

          default:
            setAction(AUTH_HEART_BEAT_ACTIONS.NONE);
            break;
        }
      })
      .catch((e) => {
        Auth.ForceHeartBeatLogin(false);
        debug(e);
      });
  };

  return { action, execute };
};

export const useAuthHeartBeat = ({ user, enabled, location }) => {
  const delay = 2000; // Allow heartbeat to run once every 2 seconds
  const { action, execute } = useAuthHeartBeatProcess();
  let heartBeatThrottle = useRef(throttle((opt) => execute(opt), delay))
    .current;
  useEffect(() => {
    if (!enabled) {
      return;
    }

    heartBeatThrottle({ user, enabled });
  }, [user, enabled, execute, location, heartBeatThrottle]);

  return { action };
};
// Match error response type type with message object.
export const errorMessageMap = new Map([
  [0, "1_authentication_error"],
  [1, "2_non_authenticated"],
  [2, "3_user_generation"],
  [3, "4_basic_authentication"],
  [4, "5_authorization_error"],
  [5, "6_non_authorized"],
  [6, "7_event_coming_soon"],
  [7, "8_event_closed"],
  [8, "9_recap_not_verified"],
]);

export const getResponseMessage = (response_type, errorMessage = {}) => {
  const res = parseInt(response_type);
  return response_type && errorMessageMap.has(res)
    ? errorMessage[errorMessageMap.get(res)]
    : null;
};

export const LifeRayErrorMessageDispatch = ({
  response_type,
  message,
  errorMessage,
}) => {
  return {
    type: loginActionTypes.ERROR_MESSAGE,
    payload:
      response_type && errorMessageMap.has(response_type)
        ? errorMessage[errorMessageMap.get(response_type)]
        : message,
  };
};

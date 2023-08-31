import Auth, {
  AUTH_HEART_BEAT_ACTIONS,
  LOGIN_URL,
  REDIRECT_ENABLE,
  REDIRECT_URI,
  authUrlKeys,
  useAuthHeartBeat,
} from "../../services/Auth";
import { addSeconds, differenceInSeconds, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import ConfigService from "services/ConfigService";
import attendance from "../../util/attendance";
import { debug } from "../../App";
import { isEmpty } from "lodash";
import isURL from "validator/es/lib/isURL";
import { searchCode } from "../../services/Route";
import { useSelector } from "react-redux";

const redirectPath = process.env.REACT_APP_AUTH_REDIRECT || LOGIN_URL;
const isExternalRedirect = redirectPath.charAt(0) !== "/";

const AuthRender = ({ children, onLogout, updateUser }) => {
  const safePages = [
    "/logout",
    "/temp-login",
    "/redirect",
    "/login",
    redirectPath,
  ];
  let history = useHistory();
  let location = useLocation();
  const authMeta = useSelector((state) => state.global.auth);
  const user = useSelector((state) => state.global.user);
  const [firstRun, setFirstRun] = useState(false);
  const [safe, setSafe] = useState(false);

  /**
   * Auth
   * Feature: Start auth on page load. If url contains auth basad query params start the auth process
   */
  useEffect(() => {
    if (firstRun) {
      debug("first run", Date.now());
      return;
    }
    const {
      hasLogin,
      data: { redirect_url },
    } = authUrlKeys();
    const { inProgress, isStarted, isError, message, errorType } = authMeta;
    const localUser = Auth.isLoggedIn();
    const pathname = window.location.pathname;

    /**
     * user is logged in already auth has been processed clear url params
     */
    if (
      [hasLogin, !inProgress, isStarted, !isEmpty(localUser)].every(
        (test) => test
      )
    ) {
      debug("redirect_url post login", redirect_url);

      history.push({
        pathname: history.location.pathname,
      });
    }

    /**
     * Prevent redirect loop for auth safe pages
     * Stop any login process when the user
     */
    if (safePages.includes(pathname)) {
      debug("on safe page");
      return;
    }

    /**
     * Error during login attempt redirect the user to logout page with error info
     */
    if (isError && !safePages.includes(pathname)) {
      debug("error loading user", message, user);

      if (!isEmpty(localUser)) {
        debug(
          "bad state logout user due to looping possibility",
          message,
          user
        );
        onLogout();
      }

      history.push({
        pathname: isExternalRedirect ? "/logout" : redirectPath,
        search: `?errorType=${errorType}&errorMessage=${message}`,
      });
      return;
    }

    /**
     * Auth is not happening and there is no local user
     */
    if (
      !isStarted &&
      !inProgress &&
      isEmpty(localUser) &&
      !ConfigService.runValues.isAuthRequired
    ) {
      debug("auth is not happening, redirect");
      return;
    }
    /**
     * Gating required and you're not logged in
     * Support redirect_uri
     */

    if (
      !inProgress &&
      ConfigService.runValues.isAuthRequired &&
      isEmpty(user)
    ) {
      debug("user not logged in gating required", REDIRECT_ENABLE);

      if (isExternalRedirect && REDIRECT_ENABLE) {
        return (window.location = redirectPath);
      }

      history.push({
        pathname: isExternalRedirect ? "/redirect" : redirectPath,
        search: `${REDIRECT_URI}=${history.location.pathname}`,
        hash: history.location.hash,
      });
    }
  }, [authMeta, user, firstRun, setFirstRun, history, safePages, onLogout]);

  /**
   * Redirect the user to the redirect page if they are not logged in
   */
  useEffect(() => {
    const isSafePage = safePages.includes(history.location.pathname);
    const canRenderPage = !safe && isSafePage && isEmpty(user);
    if (canRenderPage) {
      setSafe(true);
    } else if (
      !authMeta.inProgress &&
      !isSafePage &&
      isEmpty(user) &&
      ConfigService.runValues.isAuthRequired
    ) {
      setSafe(false);
      if (isExternalRedirect && REDIRECT_ENABLE) {
        return (window.location = redirectPath);
      }

      history.push({
        pathname: isExternalRedirect ? "/redirect" : redirectPath,
        search: `${REDIRECT_URI}=${history.location.pathname}`,
        hash: history.location.hash,
      });
    }
  }, [
    setSafe,
    history,
    location.pathname,
    safe,
    user,
    safePages,
    authMeta.inProgress,
  ]);

  /**
   * Auth Heartbeat feature single session login
   */

  const { action: authHeartbeatAction } = useAuthHeartBeat({
    user,
    enabled: ConfigService.runValues.enableHeartBeat,
    location,
  });

  /**
   * Auth
   * Feature: Heartbeat single session login. only allow one attendee per browser
   */
  useEffect(() => {
    const logoutPage = "/logout";
    const redirectMessage = "You are signed in already";
    const actionType = "hb_logout";
    switch (authHeartbeatAction) {
      case AUTH_HEART_BEAT_ACTIONS.FORCE_LOGOUT:
        /**
         * If not on the logout page send the user to the logout page. Someone else has already logged in.
         * If there is a new page for the logout design make sure to change the logoutPage const
         */
        onLogout();
        if (!history.location.pathname.includes(logoutPage)) {
          history.push({
            pathname: logoutPage,
            search: `type=${actionType}&message=${redirectMessage}`,
          });
        }
        break;

      case AUTH_HEART_BEAT_ACTIONS.NONE:
      default:
        break;
    }
  }, [authHeartbeatAction, history, onLogout]);

  /**
   * Update attendee data on page load. Used in place of a websocket connection for updating data on serverless update
   * @returns {Promise<void>}
   */
  const updateAttendee = async () => {
    const fuzionUser = Auth.isLoggedIn();
    let result = await attendance.updateAttendee(fuzionUser);
    if (result && !result.data.isError) {
      Auth.reloadUser(fuzionUser.fuzion_attendee_id);
    }
  };

  /**
   * Auth
   * Feature: Check on user attendance verification in Fuzion
   * Feature: Update UI Run Config values if TTL has expired
   */
  useEffect(() => {
    updateAttendee();
    // Run config will not be refetched unless it is past TTL time or if {forceRefresh: true} optional flag is passed
    ConfigService.setRunValues();
  }, [location, history]);

  /**
   * Auth Token Check
   * Feature: Check if user token expired
   */
  useEffect(() => {
    try {
      Auth.getSessionToken();
    } catch (e) {
      debug("Token Heartbeat failed", "logout user");
      onLogout();
    }
  }, [location, onLogout]);

  /**
   * JWT User Token Check
   * Feature: Check if user token is expired
   */
  useEffect(() => {
    const isExpired = Auth.checkIfUserTokenIsExpired();
    if (isExpired) {
      debug("User JWT token is expired", "logout user");
      onLogout();
    }
  }, [location.pathname, onLogout]);

  /**
   * Auth
   * Feature: Redirect logged in user to home page
   */
  useEffect(() => {
    const existingRedirect = searchCode(REDIRECT_URI) || ""; // passing null to isURL will cause crash
    const hash = location.state?.hash || location.hash;
    const afterLoginPath = `${existingRedirect || "/"}${
      existingRedirect ? hash : ""
    }`;

    if (Auth.isLoggedIn() && location.pathname.includes(redirectPath)) {
      const isRedirectToExternal = isURL(existingRedirect);

      if (isRedirectToExternal) {
        history.push("/");
      } else {
        history.push(afterLoginPath);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, location.pathname, history, location.hash]);

  /**
   * Auth
   * Check to see if user should be logged out of session. This is time based
   */
  useEffect(() => {
    if (Auth.autoLogout()) {
      onLogout();
    }
  });
  /**
   * Auth
   * Feature: Reload user data on page load
   */

  /**
   * TODO: Fix, reload user loads the user to much
   */

  useEffect(() => {
    const path = location.pathname;
    const now = Date.now();
    const user = Auth.load();
    const delay = 120;
    const isReloadPage = [
      ["/"].includes(path),
      path.includes("/sessions"),
    ].some((t) => t);
    const { reloadAt = new Date().toISOString() } = Auth.loadOptions() || {};
    const delta = differenceInSeconds(now, parseISO(reloadAt));
    const canReload = delta >= 0;

    if (isEmpty(user) || !isReloadPage || !canReload) {
      return;
    }

    Auth.saveOptions({ reloadAt: addSeconds(Date.now(), delay) });
    Auth.reloadUser().then((userData) => {
      if (userData && userData.isError) {
        debug("error loading user for reload", userData);
        return;
      }
      debug("set global user state", userData);
      updateUser(userData);
    });
  }, [location, updateUser]);

  /**
   * Renderer
   * Show or hide the site content based on ConfigService.runValues.isAuthRequired and user logged in
   * Feature added to prevent site from showing while auth is in progress and auth is required
   * excluding safe pages
   */
  if (
    (!ConfigService.runValues.isAuthRequired && !authMeta.inProgress) ||
    (!authMeta.inProgress && user) ||
    safe
  ) {
    return [children];
  } else {
    /**
     * Show nothing while auth is processing
     */
    return "";
  }
};

export default AuthRender;

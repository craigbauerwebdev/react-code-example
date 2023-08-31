import Auth from "services/Auth";
import ConfigService from "services/ConfigService";
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import detect from "detect.js";
import moment from "moment-timezone";
import store from "../index";

class OEPAnalytics extends React.Component {
  renderChild = () => {
    const child = this.props.children;
    React.Children.only(child);

    let _onClick = () => saveAnalytic(this.props);
    if (child.props.onClick) {
      _onClick = (e) => {
        child.props.onClick(e);
        saveAnalytic(this.props);
      };
    }

    return React.cloneElement(child, { onClick: _onClick });
  };

  render() {
    return this.renderChild();
  }
}

let currentSession = {
  sessionId: null,
  sessionTrack: null,
  sessionType: null,
};

const mapSateToProps = (state) => ({
  user: state.global.user,
});

export default connect(mapSateToProps)(OEPAnalytics);

//let ip;
let timezone;
let apiToken;

export const createAnalyticPayload = (
  page,
  pageId,
  componentType,
  url,
  user,
  source,
  leaderboardIdentifier,
  vimeoTimeObject,
  quality,
  playbackRate,
  action,
  timeWatched,
  componentName,
  sessionId,
  subSessionId,
  exhibitorId,
  adId,
  posterId
) => {
  if (!user) {
    user = (store && store.getState().global.user) || {};
  }
  const oepa_nav_pathname = sessionStorage.getItem("oepa_nav_pathname");
  const analytics_seq = {
    page: page,
    component_page_id: pageId,
    component_type: componentType,
    component_url: url,
    component_name: componentName,
  };
  const ip_timezone = {
    timezone: timezone || "-n/a-",
  };
  const timeStamp = moment()
    .tz(ConfigService.runValues.momentTimezone)
    .format();
  const {
    fuzion_attendee_id,
    badge_number,
    custom_attributes,
    attendee_type_flag,
    analytics_opt_in_flag,
    attendance_verification_flag,
  } = user;
  const userContact = (user && user["contact"]) || {};
  const {
    first_name,
    last_name,
    email,
    company,
    phone_number,
    title,
  } = userContact;
  const userAddress = (user && user["address"]) || {};
  const {
    address_line_one,
    city,
    postal_code,
    state_province,
    country,
  } = userAddress;
  const usercustom = custom_attributes ? JSON.parse(custom_attributes) : [];
  const unwrappedUserCustomData = usercustom[0] || usercustom;
  const customData = {
    ...unwrappedUserCustomData,
    ...getCurrentSession(),
    ...ip_timezone,
  };
  const videoAttributes = vimeoTimeObject
    ? {
        ...vimeoTimeObject,
        quality,
        playbackRate,
        action,
        timeWatched,
      }
    : {};
  //insert Leaderboard gating check/verification for user here
  //let participateInGamification = false;

  const ua = detect.parse(navigator.userAgent);
  const device =
    ua.device.type.toLowerCase() === "desktop"
      ? "desktop"
      : ua.os.family.toLowerCase() === "android"
      ? ua.os.name
      : ua.device.name;

  /**
   * Valid values to send to Analytics for analytics_opt_in are:
   * "1", "0", "-1", or "-n/a-" (all strings)
   * but neither strings nor numbers can be guaranteed
   * to be retrieved from Fuzion
   *
   * @param {String|Number} flag
   * @returns {String}
   */
  const coerceOptInFlag = (flag) => {
    if (typeof flag === "number") {
      return flag.toString();
    } else {
      return flag ? flag : "-n/a-";
    }
  };

  return {
    orchestrate_poster_id: posterId == null ? "-n/a-" : String(posterId),
    ad_id: typeof adId === "number" ? String(adId) : "-n/a-",
    exhibitor_fuzion_id: exhibitorId == null ? "-n/a-" : String(exhibitorId),
    orchestrate_session_id: sessionId ? String(sessionId) : "-n/a-",
    orchestrate_subsession_id: subSessionId ? String(subSessionId) : "-n/a-",
    analytics_opt_in: coerceOptInFlag(analytics_opt_in_flag),
    attendance_verification_flag:
      String(attendance_verification_flag) || "-n/a-",
    timestamp: timeStamp,
    fuzion_attendee_id: fuzion_attendee_id || "-n/a-",
    first_name: first_name || "-n/a-",
    last_name: last_name || "-n/a-",
    email: email || "-n/a-",
    address_line_one: address_line_one || "-n/a-",
    city: city || "-n/a-",
    postal_code: postal_code || "-n/a-",
    state_province: state_province || "-n/a-",
    country: country || "-n/a-",
    custom_attributes:
      Object.keys(customData).length > 0 ? JSON.stringify(customData) : "-n/a-",
    video_attributes:
      Object.keys(videoAttributes).length > 0
        ? JSON.stringify(videoAttributes)
        : "-n/a-",
    company: company || "-n/a-",
    phone_number: phone_number || "-n/a-",
    title: title || "-n/a-",
    attendee_type_flag: attendee_type_flag || "-n/a-",
    badge_number: badge_number || "-n/a-",
    nav_appv: window.navigator.appVersion,
    nav_lang: navigator.language,
    nav_plat: navigator.platform,
    nav_pathname: oepa_nav_pathname || "-n/a-",
    ...(leaderboardIdentifier
      ? { leaderboard_identifier: leaderboardIdentifier }
      : {}),
    //uncomment to send user's flag when needed for leaderboard
    //leaderboard_opt_in: participateInGamification,
    source: source || "OEP",
    user_device: String(device),
    user_browser: String(ua.browser.name),
    ...analytics_seq,
  };
};

export const createIbmAnalyticPayload = ({
  sessionId,
  subSessionId,
  fuzionEventId,
  fuzionAttendeeId,
  sessionStreamType,
  captionsEnabled,
  timeWatchedSeconds,
  playerEventType,
}) => {
  const payload = {
    orchestrate_session_id: String(sessionId),
    orchestrate_subsession_id: String(subSessionId),
    fuzion_event_id: fuzionEventId,
    fuzion_attendee_id: fuzionAttendeeId,
    session_stream_type: sessionStreamType,
    captions_enabled: captionsEnabled,
    time_watched_seconds: timeWatchedSeconds,
    player_event_type: playerEventType,
  };
  return payload;
};

export const setCurrentSession = (session) => {
  if (session) {
    const {
      sessionId,
      sessionTrack,
      sessionType: { sessionTypeName },
    } = session;
    currentSession = {
      sessionId,
      sessionTrack,
      sessionType: sessionTypeName,
    };
  } else {
    currentSession = {
      sessionId: null,
      sessionTrack: null,
      sessionType: null,
    };
  }
};

const getCurrentSession = () => {
  const { sessionId, sessionTrack, sessionType } = currentSession;
  const sessionData = {
    sessionId,
    sessionTrack,
    sessionType,
  };

  return sessionData;
};

const formatPageId = (page) =>
  document.title
    ?.replace(`${process.env.REACT_APP_META_TITLE}`, "")
    ?.replace("|", "")
    ?.trim()
    ?.toLowerCase() || page.toLowerCase();

const saveAnalytic = async ({
  page,
  componentType,
  url,
  user,
  source,
  leaderboardIdentifier,
  vimeoTimeObject,
  quality,
  playbackRate,
  action,
  timeWatched,
  componentName,
  sessionId,
  subSessionId,
  exhibitorId,
  adId,
  posterId,
}) => {
  const analyticPayload = createAnalyticPayload(
    page,
    formatPageId(page),
    componentType,
    url,
    user,
    source,
    leaderboardIdentifier,
    vimeoTimeObject,
    quality,
    playbackRate,
    action,
    timeWatched,
    componentName,
    sessionId,
    subSessionId,
    exhibitorId,
    adId,
    posterId
  );
  // lowercase values for https://freemandigital.atlassian.net/browse/OEP-5334
  analyticPayload.component_type = analyticPayload?.component_type?.toLowerCase();
  analyticPayload.page = analyticPayload?.page?.toLowerCase();
  analyticPayload.component_name = analyticPayload?.component_name?.toLowerCase();
  await axios
    .post(`${process.env.REACT_APP_API_HOST}/analytics`, {
      ea: analyticPayload,
    })
    .then(function () {})
    .catch(function () {});
};

const saveIbmAnalytic = async ({
  sessionId,
  subSessionId,
  fuzionEventId = process.env.REACT_APP_FUZION_EVENT_ID,
  fuzionAttendeeId,
  sessionStreamType,
  captionsEnabled,
  timeWatchedSeconds,
  playerEventType,
}) => {
  const ibmAnalyticPayload = createIbmAnalyticPayload({
    sessionId,
    subSessionId,
    fuzionEventId,
    fuzionAttendeeId,
    sessionStreamType,
    captionsEnabled,
    timeWatchedSeconds,
    playerEventType,
  });

  await axios
    .post(`${process.env.REACT_APP_API_HOST}/ibmAnalytics`, {
      ea: ibmAnalyticPayload,
    })
    .then(function () {})
    .catch(function () {});
};

const handleAnalyticPageChange = async () => {
  const oepa_nav_pathname = sessionStorage.getItem("oepa_nav_pathname");
  if (oepa_nav_pathname && oepa_nav_pathname !== window.location.pathname) {
    await saveAnalytic({
      page: "-n/a-",
      pageId: "-n/a-",
      componentType: "page_duration",
      url: oepa_nav_pathname,
      componentName: "-n/a-",
    });
  }
  sessionStorage.setItem("oepa_page_load_time", new Date());
  sessionStorage.setItem("oepa_nav_pathname", window.location.pathname);
};

async function getUsersIpAndGuessTimezone() {
  //uses a webservice that gives the browser's external ip
  // const IpResponse = await axios.get("https://api.ipify.org/?format=json");
  // ip = IpResponse?.data?.ip;
  timezone = moment.tz.guess();
}

export function beforeUnloadSynchronousRequest(oepaPayload) {
  if (apiToken) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("x-oep-auth", `Bearer ${apiToken}`);

    fetch(`${process.env.REACT_APP_API_HOST}/analytics`, {
      method: "POST",
      keepalive: true, // synchronous
      headers: headers,
      body: JSON.stringify({ ea: oepaPayload }),
    })
      .then(() => {})
      .catch(() => {});
  }
}

function initializeOEPA() {
  getUsersIpAndGuessTimezone();
  apiToken = Auth.getMiddlewareAPIAccessToken();
  sessionStorage.setItem("oepa_unload_event_fired", false);
  const handler = () => {
    if (sessionStorage.getItem("oepa_unload_event_fired") === "true") return;
    sessionStorage.setItem("oepa_unload_event_fired", true);
    // navigator.sendBeacon might have payload size limitations, so let's fallback to fetch()
    const oepa_nav_pathname =
      sessionStorage.getItem("oepa_nav_pathname") || window.location.pathname;
    const analyticPayload = createAnalyticPayload(
      "-n/a-",
      "-n/a-",
      "page_unload",
      oepa_nav_pathname
    );
    beforeUnloadSynchronousRequest(analyticPayload);
  };
  window.addEventListener("beforeunload", handler);
}

export {
  saveAnalytic,
  saveIbmAnalytic,
  handleAnalyticPageChange,
  initializeOEPA,
};

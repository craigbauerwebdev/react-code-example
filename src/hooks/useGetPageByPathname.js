import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import { useLocation } from "react-router-dom";

export const pageTitles = {
  onDemand: "On Demand",
  sessions: "Sessions",
  speakers: "Speakers",
  networkingAttendees: "Networking Attendees",
  homepage: "Homepage",
  search: "Search",
  favorites: "Account Favorites",
};

export const pageBanners = {
  sessions: "sessions",
  networkingAttendees: "meet_attendees",
  networkingExhibitors: "meet_exhibitors",
  networkingShowcases: "showcases",
  favorites: "favorites",
  schedule: "my_schedule",
  profile: "my_profile",
  technicalSupport: "technical_support_form",
  search: "global_search",
  singleSession: "single_session",
  singleSubSession: "single_sub_session",
  globalSearch: "global_search",
  publicProfileAttendee: "public_profile_attendee",
};

/**
 * Path names get converted from /sessions/on-demand to sessions on-demand.
 * Deep paths like sessions/filters/Marketing will output as sessions filters Marketing.
 * if you care about the full path you can test for it,
 * but if you only care about the base you can do a test for that as well.
 * Example below for "sessions filter"
 */
const pathName = {
  onDemand: "sessions on-demand",
  sessions: "sessions",
  speakers: "speakers",
  sessionsFilter: "sessions filter",
  home: "home",
  preEvent: "pre-event",
  login: process.env.REACT_APP_URL_LOGIN || "login",
  register: "register",
  redirect: "redirect",
  logOut: "logout",
  meeting: "meeting",
  productShowcase: "product-showcase",
  productShowcaseVideo: "product-showcase-video",
  accountSchedule: "account schedule",
  networkingAttendees: "networking attendees",
  networkingExhibitors: "networking exhibitors",
  networkingShowcases: "networking showcases",
  favorites: "account favorites",
  schedule: "account schedule",
  profile: "account profile",
  technicalSupport: "support",
  search: "search",
  singleLiveStream: "livestream",
};

/**
 * @typedef {Object} pageSettings
 * @property {string} pageTitle - Page Title
 * @property {Boolean} isOnDemand - Is on Demand Page
 * @property {Boolean} preEvent - Is Pre-Event Page
 * @property {string} breadcrumbs - What page should the breadcrumbs go back to
 */

/**
 * Support Multiple pages that use the same component
 * ie(Session, On Demand)
 * @returns {pageSettings}
 */
export default function useGetPageByPathname() {
  const { pathname } = useLocation();
  const pageSettings = {};
  const cleanPathname = pathname.split("/").join(" ").trim();
  const sessionsFilterMatch = new RegExp("^(sessions filter)");
  const singleFileViewerMatch = new RegExp("^(single-file-viewer [0-9])");
  const sessionDeepPage = sessionsFilterMatch.test(cleanPathname);
  const singleFileViewer = singleFileViewerMatch.test(cleanPathname);

  const isHomepage = pathname === "/";

  if (isHomepage) {
    pageSettings.pageTitle = pageTitles.homepage;
    return pageSettings;
  }

  if (sessionDeepPage) {
    // Anything with /sessions/filters will get this title
    pageSettings.pageTitle = pageTitles.sessions;
    pageSettings.breadcrumbs = pathname;
    return pageSettings;
  }

  // Single file viewer page hide nav and footer
  if (singleFileViewer) {
    pageSettings.hideNav = true;
    pageSettings.hideFooter = true;
    pageSettings.hideChatBot = true;
    pageSettings.hideNowPlaying = true;
  }

  // If we are on /meeting/:meetId then do not show the now playing bar
  // Other routes also start with /meeting which is why .startsWith was not used
  if (
    cleanPathname.split(" ")[0] === pathName.meeting ||
    cleanPathname.split(" ")[0] === pathName.productShowcase ||
    cleanPathname.split(" ")[0] === pathName.productShowcaseVideo
  ) {
    pageSettings.hideChatBot = true;
    pageSettings.hideNowPlaying = true;
  }

  if (cleanPathname) {
    switch (cleanPathname.toLowerCase()) {
      case pathName.onDemand.toLowerCase():
        pageSettings.pageTitle = pageTitles.onDemand;
        pageSettings.breadcrumbs = pathname;
        pageSettings.isOnDemand = true;
        break;
      case pathName.sessions.toLowerCase():
        pageSettings.pageTitle = pageTitles.sessions;
        pageSettings.heroBannerName = pageBanners.sessions;
        break;
      case pathName.speakers.toLowerCase():
        pageSettings.pageTitle = pageTitles.speakers;
        break;
      case pathName.networkingAttendees.toLowerCase():
        pageSettings.pageTitle = pageTitles.networkingAttendees;
        pageSettings.pageBanner = pageBanners.sessions;
        pageSettings.heroBannerName = pageBanners.networkingAttendees;
        pageSettings.towerBannerName = pageBanners.networkingAttendees;
        pageSettings.horizontalBannerName = pageBanners.networkingAttendees;
        break;
      case pathName.networkingExhibitors.toLowerCase():
        pageSettings.heroBannerName = pageBanners.networkingExhibitors;
        pageSettings.towerBannerName = pageBanners.networkingExhibitors;
        pageSettings.horizontalBannerName = pageBanners.networkingExhibitors;
        break;
      case pathName.networkingShowcases.toLowerCase():
        pageSettings.heroBannerName = pageBanners.networkingShowcases;
        pageSettings.horizontalBannerName = pageBanners.networkingShowcases;
        pageSettings.towerBannerName = pageBanners.networkingShowcases;
        break;
      case pathName.favorites.toLowerCase():
        pageSettings.heroBannerName = pageBanners.favorites;
        pageSettings.towerBannerName = pageBanners.favorites;
        pageSettings.horizontalBannerName = pageBanners.favorites;
        pageSettings.pageTitle = pageTitles.favorites;
        break;
      case pathName.schedule.toLowerCase():
        pageSettings.heroBannerName = pageBanners.schedule;
        pageSettings.towerBannerName = pageBanners.schedule;
        pageSettings.horizontalBannerName = pageBanners.schedule;
        break;
      case pathName.profile.toLowerCase():
        pageSettings.heroBannerName = pageBanners.profile;
        pageSettings.towerBannerName = pageBanners.profile;
        pageSettings.horizontalBannerName = pageBanners.profile;
        break;
      case pathName.technicalSupport.toLowerCase():
        pageSettings.heroBannerName = pageBanners.technicalSupport;
        pageSettings.towerBannerName = pageBanners.technicalSupport;
        pageSettings.horizontalBannerName = pageBanners.technicalSupport;
        break;
      case pathName.search.toLowerCase():
        pageSettings.heroBannerName = pageBanners.search;
        pageSettings.pageTitle = pageTitles.search;
        break;
      case pathName.preEvent:
        pageSettings.preEvent = true;
        break;
      case pathName.login:
        pageSettings.hideNowPlaying = true;
        pageSettings.hideNav = true;
        pageSettings.hideFooter = true;
        break;
      case pathName.register:
      case pathName.redirect:
      case pathName.logOut:
        pageSettings.hideNowPlaying = true;
        break;
      case pathName.accountSchedule:
        pageSettings.fetchSchedule = true;
        break;
      default:
        pageSettings.pageTitle = startCase(toLower(cleanPathname));
    }
  }

  return pageSettings;
}

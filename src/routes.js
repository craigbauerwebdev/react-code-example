import Auth, { LOGIN_URL } from "./services/Auth";
import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { TIME_CHECKS, checkTime } from "util/timeCheck";

import AttendeeProfile from "Components/Profile/AttendeeProfile";
import BecomeAnExhibitorPage from "Components/Exhibitor/BecomeAnExhibitorPage";
import CalendarPage from "Components/CalendarView/CalendarPage";
import ConfigService from "services/ConfigService";
import DirectChatPage from "./Components/Chat/DirectChatPage";
import ExhibitorLevelsPage from "Components/Exhibitor/ExhibitorsWithLevelsPage";
import FAQsPage from "Components/FAQ/FAQsPage";
import InProgressVideoConference from "Components/Meeting/VideoConferencing/InProgressVideoConference";
import LeaderBoardPage from "Components/LeaderBoard/LeaderBoardPage";
import Login from "Components/Auth/Login";
import Logout from "Components/Auth/Logout";
import Main from "./Components/Home/Main";
import MapPage from "Components/Maps/MapPage";
import MeetingEndedPage from "./Components/Meeting/MeetingEndedPage";
import MeetingFullPage from "Components/Meeting/MeetingFullPage";
import MeetingNotInvitedPage from "./Components/Meeting/MeetingNotInvitedPage";
import MeetingPage from "Components/Meeting/MeetingPage";
import NetworkPage from "Components/Network/NetworkPage";
import Posters from "Components/Poster/Posters";
import PreEvent from "Components/PreEvent/PreEvent";
import ProfilePage from "Components/Profile/ProfilePage";
import RedirectPage from "Components/Auth/RedirectPage";
import RegisterPage from "./Components/Register/RegisterPage";
import RemovedFromMeetingPage from "./Components/Meeting/RemovedFromMeetingPage";
import SearchResultsPage from "Components/Search/SearchResultsPage";
import Sessions from "./Components/Session/Sessions";
import SingleExhibitorPage from "Components/Exhibitor/SingleExhibitorPage";
import SingleFileViewerPage from "./Components/FileViewer/SingleFileViewerPage";
import SingleLiveStreamPage from "Components/Livestream/SingleLiveStreamPage";
import SinglePosterPage from "Components/Poster/SinglePosterPage";
import SingleSessionPage from "Components/Session/SingleSessionPage";
import SingleSpeakerPage from "Components/Speaker/SingleSpeakerPage";
import SingleSubLiveStreamPage from "Components/Livestream/SingleSubLiveStreamPage";
import SingleWhereby from "./Components/Livestream/SingleWhereby";
import SiteMapPage from "Components/SiteMap/SiteMapPage";
import SorryPage from "Components/404/404Page";
import Speakers from "./Components/Speaker/Speakers";
import TechnicalSupportPage from "Components/TechnicalSupport/TechnicalSupportPage";
import { handleAnalyticPageChange } from "Components/OEPAnalytics";
import { searchCode } from "./services/Route";
import useNavGuarding from "hooks/useNavGuarding";
import { useSelector } from "react-redux";

const preEvent = process.env.REACT_APP_ENABLE_PRE_EVENT === "true";

let routes_with_components = [
  {
    path: "/",
    exact: true,
    component: Main,
    params: {
      reloadUser: true,
    },
  },
  {
    path: "/networking/:section?/:id?",
    exact: true,
    component: NetworkPage,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/account/:section?",
    exact: true,
    component: ProfilePage,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/attendee/:id?/:source?",
    exact: true,
    component: AttendeeProfile,
    params: {
      isAuth: true,
    },
  },
  {
    path: LOGIN_URL,
    exact: true,
    component: Login,
    params: {
      isAuth: false,
    },
  },
  {
    path: "/logout",
    component: Logout,
    params: {
      isAuth: false,
    },
  },
  {
    path: "/support",
    exact: true,
    component: TechnicalSupportPage,
  },
  {
    path: "/home-login",
    exact: true,
    component: Main,
    params: {
      isAuth: false,
    },
  },
  {
    path: "/home-locked",
    exact: true,
    component: Main,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/sessions",
    exact: true,
    component: Sessions,
  },
  {
    path: "/sessions/filter/:filter",
    exact: true,
    component: Sessions,
  },
  {
    path: "/sessions/:page",
    exact: true,
    component: Sessions,
  },
  {
    path: "/sessions/:id/:name",
    exact: true,
    component: SingleSessionPage,
  },

  {
    path: `/${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}`,
    exact: true,
    component: Speakers,
  },
  {
    path: `/${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}/:id/:name`,
    exact: true,
    component: SingleSpeakerPage,
  },
  {
    path: "/faqs",
    exacty: true,
    component: FAQsPage,
  },
  {
    path: "/live-stream/:id/:name/",
    exact: true,
    component: SingleLiveStreamPage,
    params: {
      isAuth: false,
      // use process.env.NODE_ENV === "development" ? false : true if you want to toggle value
    },
  },
  //Path for if originating from mention notification
  {
    path: "/live-stream/:id/:name/:ismention",
    exact: true,
    component: SingleLiveStreamPage,
    params: {
      isAuth: false,
      // use process.env.NODE_ENV === "development" ? false : true if you want to toggle value
    },
  },
  {
    path: "/product-showcase/:id/:name",
    exact: true,
    component: MeetingPage,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/product-showcase-video/:id/:name",
    exact: true,
    component: InProgressVideoConference,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/search",
    exact: true,
    component: SearchResultsPage,
  },
  {
    path: "/become-an-exhibitor",
    exact: true,
    component: BecomeAnExhibitorPage,
  },
  {
    path: "/map",
    exact: true,
    component: MapPage,
  },
  {
    path: "/register",
    exact: true,
    component: RegisterPage,
  },
  {
    path: "/directchat",
    exact: true,
    component: DirectChatPage,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/directchat/:cid",
    exact: true,
    component: DirectChatPage,
    params: {
      isAuth: true,
    },
  },
  // {
  //   path: "/file-viewer",
  //   exact: true,
  //   component: FileViewerPage,
  // },
  {
    path: "/redirect",
    exact: true,
    component: RedirectPage,
  },
  {
    path: "/pre-event",
    exact: true,
    component: PreEvent,
  },
  // {
  //   path: "/createchannels",
  //   exact: true,
  //   component: CreateChannels,
  // },
  // {
  //   path: "/home-calendar",
  //   exact: true,
  //   component: Main,
  // },
  {
    path: "/calendar",
    exact: true,
    component: CalendarPage,
  },
  {
    path: "/single-file-viewer/:id",
    exact: true,
    component: SingleFileViewerPage,
  },
  {
    path: "/leaderboard",
    exact: true,
    component: LeaderBoardPage,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/sitemap",
    exact: true,
    component: SiteMapPage,
  },
  {
    path: "/removed",
    exact: true,
    component: RemovedFromMeetingPage,
  },
  {
    path: "/meeting-ended",
    exact: true,
    component: MeetingEndedPage,
  },
  {
    path: "/meeting-full",
    exact: true,
    component: MeetingFullPage,
  },
  {
    path: "/meeting-not-invited",
    exact: true,
    component: MeetingNotInvitedPage,
  },
  {
    path: "/meeting/:id",
    exact: true,
    component: MeetingPage,
    params: {
      isAuth: true,
    },
  },
  {
    path: "/meeting/test/:id",
    exact: true,
    component: MeetingPage,
    params: {
      isAuth: true,
    },
  },
  {
    path: "*",
    component: SorryPage,
  },
];

if (ConfigService.runValues.hasSubSessions) {
  routes_with_components = [
    {
      path: "/sessions/:id/subsession/:subSessionId/:name",
      exact: true,
      component: SingleSessionPage,
    },
    {
      path: "/live-stream/:id/subsession/:subLiveId/:name",
      exact: true,
      component: SingleSubLiveStreamPage,
      params: {
        isAuth: false,
        // use process.env.NODE_ENV === "development" ? false : true if you want to toggle value
      },
    },
    //Path for if originating from mention notification
    {
      path: "/live-stream/:id/subsession/:subLiveId/:name/:ismention",
      exact: true,
      component: SingleSubLiveStreamPage,
      params: {
        isAuth: false,
        // use process.env.NODE_ENV === "development" ? false : true if you want to toggle value
      },
    },
    ...routes_with_components,
  ];
}

if (ConfigService.runValues.hasPosters) {
  routes_with_components = [
    {
      path: "/posters",
      exact: true,
      component: Posters,
    },
    {
      path: "/posters/:id/:name",
      exact: true,
      component: SinglePosterPage,
    },
    //Path for if originating from mention notification
    {
      path: "/posters/:id/:name/:ismention",
      exact: true,
      component: SinglePosterPage,
    },
    ...routes_with_components,
  ];
}

if (ConfigService.runValues.hasShowcases) {
  routes_with_components = [
    {
      path: "/showcases/:id/:name",
      exact: true,
      component: SingleWhereby,
      params: {
        isAuth: true,
        // use process.env.NODE_ENV === "development" ? false : true if you want to toggle value
      },
    },
    //Path for if originating from mention notification
    {
      path: "/showcases/:id/:name/:ismention",
      exact: true,
      component: SingleWhereby,
      params: {
        isAuth: true,
        // use process.env.NODE_ENV === "development" ? false : true if you want to toggle value
      },
    },
    ...routes_with_components,
  ];
}

if (ConfigService.runValues.hasExhibitors) {
  routes_with_components = [
    {
      path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
      exact: true,
      component: ExhibitorLevelsPage,
    },
    {
      path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/:id/:name`,
      exact: true,
      component: SingleExhibitorPage,
    },
    //Path for if originating from mention notification
    {
      path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/:id/:name/:ismention`,
      exact: true,
      component: SingleExhibitorPage,
    },
    ...routes_with_components,
  ];
}

if (preEvent) {
  routes_with_components = [
    {
      path: "/",
      exact: true,
      component: PreEvent,
    },
    {
      path: LOGIN_URL,
      exact: true,
      component: Login,
      params: {
        isAuth: false,
      },
    },
    {
      path: "/logout",
      component: Logout,
      params: {
        isAuth: false,
      },
    },
    {
      path: "/support",
      exact: true,
      component: TechnicalSupportPage,
    },
    {
      path: "*",
      component: SorryPage,
    },
  ];
}

const REDIRECT_URI = "redirect_uri";
export default ({ onLogin, onLogout, onLoadUser, updateUser, setUser }) => {
  let location = useLocation();

  const redirectPath = process.env.REACT_APP_AUTH_REDIRECT || LOGIN_URL;
  /** @type {User} */
  const user = useSelector((state) => state.global.user);

  //*** get nav data start ***/
  const blockedNetworkRoutes = useSelector(
    (state) => state.global.permissions.blockedNetworkRoutes
  );

  const topNavData = useSelector((state) => state.global.topNav);
  let topNav = preEvent ? topNavData?.preEvent : topNavData?.mainNav;
  topNav = useNavGuarding(topNav, blockedNetworkRoutes);

  const footerNavData = useSelector((state) => state.global.footer);
  let footerNav = preEvent ? footerNavData?.preEvent : footerNavData?.mainNav;
  footerNav = useNavGuarding(footerNav, blockedNetworkRoutes);
  const navData = [...(topNav || []), ...(footerNav || [])].flat();
  //*** get nav data end***/

  useEffect(() => {
    window.scrollTo(0, 0);
    handleAnalyticPageChange();
  }, [location.pathname]);

  //function to check if route is accessible using LR end and start dates.
  //can use this function to do other checks if needed
  const checkRouteAccess = (pathName) => {
    const subNavs = navData?.map((nav) => nav?.submenus)?.flat();
    const mainNavs = navData?.filter((nav) => nav?.submenus?.length === 0);
    let routeNavs = [...subNavs, ...mainNavs];

    const currentRoute = routeNavs?.find((r) => r.link === pathName);
    if (!currentRoute) return true; //no matching LR route found for the pathName

    const currentRouteStart = currentRoute?.starts; //sample value: "4/23/2021 12:00 am"
    const currentRouteEnd = currentRoute?.ends;

    //if route has start date set in LR and current date is before start date,
    //then no route access
    if (currentRouteStart && !checkTime(TIME_CHECKS.start, currentRouteStart)) {
      return false;
    }

    //if route has end date set in LifeRay and current date is after end date,
    //then no route access
    if (currentRouteEnd && !checkTime(TIME_CHECKS.end, currentRouteEnd)) {
      return false;
    }

    return true; //default allow route access
  };

  return (
    <Switch>
      {routes_with_components.map((route, i) => (
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          render={(props) => {
            const { isAuth = false } = route.params || {};
            // const isRedirectPage = props.location.pathname === redirectPath;

            const pathName = props.location.pathname;
            const hash = props.location.hash;
            const isRedirectPage = pathName === redirectPath;

            if (isAuth && !Auth.isLoggedIn() && !isRedirectPage) {
              const existingRedirect = searchCode(REDIRECT_URI);
              const afterLoginPath = `${
                existingRedirect || pathName || "/"
              }${hash}`;

              return (
                <Redirect
                  to={{
                    pathname: redirectPath,
                    search: `?${REDIRECT_URI}=${afterLoginPath}`,
                    state: { from: props.location, hash },
                  }}
                />
              );
            }
            const isAllowRoute = checkRouteAccess(pathName);

            if (!isAllowRoute) {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location },
                  }}
                />
              );
            }

            return (
              <route.component
                onLogin={onLogin}
                onLogout={onLogout}
                onLoadUser={onLoadUser}
                user={user}
                updateUser={updateUser}
                {...props}
              />
            );
          }}
        />
      ))}
    </Switch>
  );
};

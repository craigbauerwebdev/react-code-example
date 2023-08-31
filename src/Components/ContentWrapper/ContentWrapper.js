import React, { useEffect } from "react";
import { getPayload, setTimeZone } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import ChatBot from "Components/ChatBot/ChatBot";
import ChatPopUp from "Components/Chat/ChatPopUp";
import ConfigService from "services/ConfigService";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";
import FooterWrapper from "Components/Footer/FooterWrapper";
import { Fragment } from "react";
import HeaderWrapper from "Components/Header/HeaderWrapper";
import NotificationBanner from "Components/UserNotification/NotificationBanner";
import NowPlayingDrawer from "Components/NowPlayingDrawer/NowPlayingDrawer";
import PropTypes from "prop-types";
import appStyles from "./scss/app.module.scss";
import { dataTypes } from "store/utils/dataTypes";
import { getProfileData } from "Components/Profile/store/actions";
import moment from "moment-timezone";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import { profileTimezoneValues } from "util/profileTimezoneValues";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import useGetPageByPathname from "hooks/useGetPageByPathname";

const ContentWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const {
    hideFooter,
    hideNav,
    hideChatBot,
    fetchSchedule,
    hideNowPlaying,
  } = useGetPageByPathname();
  const permissions = useSelector((state) => state.global.permissions);
  const preEvent = useSelector((state) => state.global.isPreventOn);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const blockedNetworkRoutes = useSelector(
    (state) => state.global.permissions.blockedNetworkRoutes
  );
  const blockedProfileRoutes = useSelector(
    (state) => state.global.permissions.blockedProfileRoutes
  );
  const networkSettings = useSelector((state) => state.global.networkSettings);

  const blockedRoutes = [...blockedNetworkRoutes, ...blockedProfileRoutes];
  const history = useHistory();
  const { pathname } = useLocation();
  /* Removed event chat toggle check to enable previously scheduled chats when the event chat toggle is on */
  const blockChat =
    networkSettings?.eventNetworking && networkSettings?.allowChat;
  /**
   * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Site-Config
   * This will pull Grip Link setting from Liferay
   */
  useEffect(() => {
    dispatch(getPayload(dataTypes.siteConfig));
  }, [dispatch]);

  // Get user profile data
  useEffect(() => {
    if (user && !retrievedPayloads.has(profileLookupKey.accountProfile)) {
      dispatch(
        getProfileData(
          dataTypes.accountProfile,
          profileLookupKey.accountProfile
        )
      );
    }
  }, [user, dispatch]);

  /**
   * Set timezone based on user profile settings
   * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Timezone
   */
  useEffect(() => {
    if (accountProfile && accountProfile.useEventTimezone) {
      if (accountProfile.useEventTimezone !== profileTimezoneValues.DEFAULT) {
        dispatch(
          setTimeZone(
            accountProfile.useEventTimezone === profileTimezoneValues.ACTIVE
              ? ConfigService.runValues.momentTimezone
              : moment.tz.guess()
          )
        );
      }
    }
  }, [accountProfile, dispatch]);

  /**
   * Get user schedule.
   * Re-fetch user schedule when user is on the account/schedule page.
   * This is to get the latest schedule data. i.e if a meeting has ended or been deleted.
   */
  useEffect(() => {
    if (user && !retrievedPayloads.has(profileLookupKey.schedule)) {
      dispatch(
        getProfileData(
          dataTypes.schedule,
          profileLookupKey.schedule,
          fetchSchedule // Handles if data should be re-fetched.
        )
      );
    }
  }, [dispatch, user, fetchSchedule]);

  useEffect(() => {
    if (
      blockedRoutes.find(
        (b) => b.link === pathname || pathname.startsWith(b.link)
      )
    ) {
      history.push({
        pathname: "/page-not-found",
        state: {
          message: "Sorry you need to upgrade your account to see that page",
          title: "Restricted Access",
        },
      });
    }
  }, [pathname, user, history, blockedRoutes]);

  return (
    <section className={preEvent ? appStyles.appStickyHeader : ""}>
      {!hideNav && (
        <Fragment>
          <HeaderWrapper />

          {permissions.allowNotifications && <NotificationBanner />}
        </Fragment>
      )}
      <ErrorBoundary>{children}</ErrorBoundary>
      {user && blockChat && <ChatPopUp />}
      {!hideFooter && <FooterWrapper />}
      {!hideChatBot && ConfigService.runValues.enableChatbot && <ChatBot />}
      {ConfigService.runValues.enableNowPlayingDrawer && (
        <>{(!preEvent || !hideNowPlaying) && <NowPlayingDrawer />}</>
      )}
    </section>
  );
};

export default ContentWrapper;

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

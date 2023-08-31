import HeaderDropdown, { HEADER_DROPDOWN_TYPES } from "./HeaderDropdown";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DropdownNotification from "Components/UserNotification/DropdownNotification";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import SvgTypes from "Components/SVG/SvgTypes";
import { dataTypes } from "store/utils/dataTypes";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getProfileData } from "Components/Profile/store/actions";
import notificationIconStyles from "./scss/notification-icon.module.scss";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import { useHeaderDropdownContext } from "Components/Context/HeaderDropdownContext";
import { useLocation } from "react-router-dom";
import useNotificationsList from "hooks/useNotificationsList";

const NotificationIcon = ({ mobile }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const topNav = useSelector((state) => state.global.topNav);
  const notifications = useSelector((state) => state.profile.notifications);
  const guestProfiles = useSelector((state) => state.profile.guestProfiles);
  const [unReadNotifications, setUnreadNotifications] = useState(false);
  const joinedNotificationsList = useNotificationsList(notifications);
  const [list, setList] = useState(null);
  const [tabId, setTabId] = useState("tab6");
  const { onClose } = useHeaderDropdownContext(tabId);

  // Get user profile notifications data
  useEffect(() => {
    if (user && !retrievedPayloads.has(profileLookupKey.notifications)) {
      dispatch(
        getProfileData(
          dataTypes.accountNotifications,
          profileLookupKey.notifications
        )
      );
    }

    setTabId(`tab${topNav.mainNav?.length + 1}`);
  }, [user, dispatch, topNav]);

  useEffect(() => {
    if (notifications) {
      const hasUnread = (list || []).filter(
        (notification) => !notification.notificationRead
      );
      setUnreadNotifications(hasUnread.length > 0 ? true : false);
    }
  }, [notifications, list]);

  useEffect(() => {
    if (joinedNotificationsList) {
      const list = joinedNotificationsList
        .sort((x, y) => {
          const normalizedTimestampX = x.sk || Number(x.timestamp);
          const normalizedTimestampY = y.sk || Number(y.timestamp);
          return normalizedTimestampY - normalizedTimestampX;
        })
        .slice(0, 10);
      setList(list.length > 0 ? list : null);
    }
  }, [joinedNotificationsList]);

  return (
    <Fragment>
      {!mobile && (
        <>
          <HeaderDropdown
            hideCaret={true}
            tabName={tabId}
            title="Notifications"
            titleNode={
              <>
                <OEPAnalytics
                  page={getAnalyticsPage(location.pathname)}
                  componentType="Navigation Item"
                  url="notifications"
                  componentName="Notifications"
                >
                  <div
                    data-tip={"Notifications"}
                    className={`${notificationIconStyles.iconHolder} ${
                      unReadNotifications && notificationIconStyles.active
                    }`}
                  >
                    <SvgTypes name="notification" />
                    <span className="sr-only">Notifications</span>
                  </div>
                </OEPAnalytics>

                <ReactTooltip />
              </>
            }
            headerDropdownType={HEADER_DROPDOWN_TYPES.notifications}
          >
            <div id={`menu-${tabId}`} aria-labelledby={`menu-button-${tabId}`}>
              <h2 className={notificationIconStyles.title}>Notifications</h2>
              {notifications && (
                <ul className={notificationIconStyles.list}>
                  {list && guestProfiles.length === 0 ? (
                    <Loader />
                  ) : list ? (
                    list.map((e, i) => {
                      return (
                        <DropdownNotification
                          closeNav={onClose}
                          sender={`${`${
                            e.guestProfile?.preferredName ||
                            e.guestProfile?.firstName
                          } ${e.guestProfile?.lastName}`}`}
                          senderFirstName={
                            e.guestProfile?.preferredName ||
                            e.guestProfile?.firstName
                          }
                          senderLastName={e.guestProfile?.lastName}
                          company={`${e.guestProfile?.company}`}
                          avatar={e.guestProfile?.avatar}
                          timestamp={e.sk}
                          notification={e}
                          key={e.id}
                        />
                      );
                    })
                  ) : (
                    <h4 style={{ textAlign: "center" }}>
                      No notifications at this time
                    </h4>
                  )}
                  <li>
                    <LinkWrapper
                      to={"/account/notifications"}
                      page="Header"
                      pageId="Notifications"
                      componentType="Button"
                      trackingUrl="All Notifications"
                      className={notificationIconStyles.allNotificationsButton}
                    >
                      All Notifications
                    </LinkWrapper>
                  </li>
                </ul>
              )}
            </div>
          </HeaderDropdown>
        </>
      )}
      {mobile && (
        <LinkWrapper
          to={"/account/notifications"}
          page={getAnalyticsPage(location.pathname)}
          componentType="Button"
          trackingUrl="All Notifications"
          className={`${notificationIconStyles.popUpButton}  ${
            unReadNotifications && notificationIconStyles.active
          }`}
          componentName="All Notifications"
        >
          <SvgTypes name="notification" />
        </LinkWrapper>
      )}
    </Fragment>
  );
};

NotificationIcon.propTypes = {
  onClick: PropTypes.func,
};

NotificationIcon.defaultProps = {
  onClick: () => {},
};

export default NotificationIcon;

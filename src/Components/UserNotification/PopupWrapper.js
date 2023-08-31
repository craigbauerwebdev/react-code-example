import React, { useCallback, useEffect, useRef } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import notificationBannerStyles from "./scss/notification-banner.module.scss";
import { notificationNotNew } from "Components/Profile/store/actions";
import { useDispatch } from "react-redux";

// import {
//   notificationNotNew,
//   updateNotificationRead,
// } from "Components/Profile/store/actions";

const PopupWrapper = ({
  notification,
  children,
  stopTimer,
  removeNotification,
}) => {
  const dispatch = useDispatch();
  const onClickDismiss = useCallback(() => {
    dispatch(notificationNotNew(notification));
    // FEATURE: uncomment this to mark new notifications as read after closing "new notification banner"
    // if (!notification.notificationRead) {
    //   dispatch(updateNotificationRead(notification));
    // }
  }, [dispatch, notification]);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      onClickDismiss();
    }, 10000);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [notification, dispatch, onClickDismiss]);

  useEffect(() => {
    if (stopTimer) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }
  }, [stopTimer]);

  useEffect(() => {
    if (removeNotification) {
      onClickDismiss();
    }
  }, [removeNotification, onClickDismiss]);

  return (
    <div className={notificationBannerStyles.popupCard}>
      <OEPAnalytics
        componentType="Button"
        page="notifications list"
        url="Close notification"
        componentName="Close notification"
      >
        <button
          onClick={onClickDismiss}
          className={notificationBannerStyles.close}
          type="button"
        >
          <SvgTypes name="close-icon" />
        </button>
      </OEPAnalytics>
      {children}
    </div>
  );
};

export default PopupWrapper;

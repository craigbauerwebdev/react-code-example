import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import lodash from "lodash";
import notificationsStyles from "./scss/notifications.module.scss";

/**
 * Liferay site wide notifications
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Notification
 */
const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.global.notifications);
  const [closeDisplay, setCloseDisplay] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState(false);

  const closeNotifications = () => {
    setCloseDisplay(true);
  };

  useEffect(() => {
    // Avoid memory leak issue
    // https://www.debuggr.io/react-update-unmounted-component/
    let mounted = true;

    if (!notifications) {
      dispatch(getPayload(dataTypes.notifications));
    } else {
      if (lodash.isEmpty(notifications)) {
        setActiveNotifications(false);
      } else {
        setActiveNotifications(true);

        setTimeout(() => {
          if (mounted) {
            setActiveDisplay(true);
          }
        }, 2500);
      }
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, notifications]);

  if (!activeNotifications) {
    return null;
  }

  return (
    <section
      className={`${notificationsStyles.notifications} ${
        closeDisplay && notificationsStyles.close
      } ${activeDisplay && notificationsStyles.active}`}
    >
      <article>
        <p
          dangerouslySetInnerHTML={{
            __html: notifications?.text,
          }}
        />
        <OEPAnalytics
          componentType="Button"
          page="notifications list"
          url="Close notification"
          componentName="Close notification"
        >
          <button type="button" onClick={closeNotifications}>
            <img src="/images/icon-close-dark.svg" alt="close notification" />
          </button>
        </OEPAnalytics>
      </article>
    </section>
  );
};

export default Notifications;

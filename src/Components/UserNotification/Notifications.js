import React, { useEffect, useReducer, useState } from "react";
import {
  paginationReducer,
  paginationState,
} from "Components/Paginate/reducer";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import PageNotification from "./PageNotification";
import { Paginate } from "../Paginate/Paginate";
import { dataTypes } from "store/utils/dataTypes";
import { getProfileData } from "Components/Profile/store/actions";
import notificationsStyles from "./scss/notifications.module.scss";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import useNotificationsList from "hooks/useNotificationsList";

/**
 * Compare Notifications time
 * @param {Notification} a
 * @param {Notification} b
 * @param {Boolean} newestFirst
 * @returns {Notification} sorted by time.
 */
const compareNotifications = (a, b, newestFirst = true) => {
  const aTime = a.sk || a.timestamp;
  const bTime = b.sk || b.timestamp;

  if (newestFirst) {
    return aTime < bTime ? 1 : -1;
  }

  return aTime > bTime ? 1 : -1;
};

const Notifications = () => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const notifications = useSelector((state) => state.profile.notifications);
  const [noData, setNoData] = useState(false);
  const joinedNotificationsList = useNotificationsList(
    notifications ? notifications.sort(compareNotifications) : []
  );
  const [statePaginationState, dispatchPagination] = useReducer(
    paginationReducer,
    paginationState
  );
  const listRef = React.createRef();

  // Get user profile data
  useEffect(() => {
    if (notifications && notifications.length <= 0) {
      setNoData(true);
    }
  }, [user, notifications]);

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
  }, [user, dispatch]);

  if (!joinedNotificationsList && !noData) {
    return <Loader />;
  }

  return (
    <div className={notificationsStyles.card}>
      <div className={notificationsStyles.notificationsListHeaderWrapper}>
        <div className={notificationsStyles.notificationsListHeader}>
          <h2 className={notificationsStyles.innerHeader}>Notifications</h2>
        </div>
      </div>
      {joinedNotificationsList && joinedNotificationsList.length > 0 && (
        <ul
          className={notificationsStyles.notificationsListHolder}
          autoFocus={true}
          ref={listRef}
          tabIndex="-1"
        >
          {joinedNotificationsList
            .slice(
              statePaginationState.startIndex,
              statePaginationState.endIndex
            )
            .map((e) => (
              <PageNotification
                sender={`${
                  e.guestProfile?.preferredName || e.guestProfile?.firstName
                } ${e.guestProfile?.lastName}`}
                senderFirstName={e.guestProfile?.firstName}
                senderLastName={e.guestProfile?.lastName}
                company={`${e.guestProfile?.company}`}
                avatar={e.guestProfile?.avatar}
                timestamp={e.sk}
                notification={e}
                key={`${e.pkguestProfile?.attendeeId} ${e.sk} ${e.timestamp}`}
              />
            ))}
        </ul>
      )}
      {(noData || joinedNotificationsList.length <= 0) && (
        <p>No Notifications at this time.</p>
      )}
      {joinedNotificationsList && joinedNotificationsList.length > 0 && (
        <Paginate
          large
          inc={20}
          total={joinedNotificationsList.length}
          startIndex={statePaginationState.startIndex}
          dispatch={dispatchPagination}
          listRef={listRef}
          pageTitle="Notifications"
          page="notifications list"
        />
      )}
    </div>
  );
};

export default Notifications;

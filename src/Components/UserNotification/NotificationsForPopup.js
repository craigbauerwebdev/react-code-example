import React, { useEffect, useState } from "react";

import PopupNotification from "Components/UserNotification/PopupNotification";
import PopupWrapper from "./PopupWrapper";
import PropTypes from "prop-types";
import useNotificationsList from "hooks/useNotificationsList";

const NotificationsForPopup = ({ newNotifications }) => {
  const joinedNotificationsList = useNotificationsList(newNotifications);
  const [list, setList] = useState(null);
  const [stopTimer, setStopTimer] = useState(false);
  const [removeNotification, setRemoveNotification] = useState(false);
  const popUpOpen = () => {
    setStopTimer(true);
  };
  const closeNotification = () => {
    setRemoveNotification(true);
  };
  useEffect(() => {
    if (joinedNotificationsList) {
      /**
       * Adam Watkins 3:25 PM 4/2/21
       * There are two levels right now zero and one.
       * Zero means it’s a notification that will populate in the drop down or on the notifications page.
       * One means that it will go to both of those places as well, but will generate a pop up.
       */
      const listData = joinedNotificationsList
        .filter((n) => n.level === "1")
        .sort((x, y) => {
          return y.sk - x.sk;
        })
        .slice(0, 10)
        .reverse();

      setList(listData.length > 0 ? listData : null);
    }
  }, [joinedNotificationsList]);

  // condition is added to check list has at least one element, So that it will not render the empty elements (PJX-521)
  return (
    list && (
      <div>
        <ul>
          {list.map((e) => (
            <PopupWrapper
              notification={e}
              key={`${e.guestProfile?.attendeeId} ${e.sk} ${e.timestamp}`}
              stopTimer={stopTimer}
              removeNotification={removeNotification}
            >
              <PopupNotification
                closeNotification={closeNotification}
                callback={popUpOpen}
                sender={`${`${
                  e.guestProfile?.preferredName || e.guestProfile?.firstName
                } ${e.guestProfile?.lastName}`}`}
                senderFirstName={
                  e.guestProfile?.preferredName || e.guestProfile?.firstName
                }
                senderLastName={e.guestProfile?.lastName}
                company={`${e.guestProfile?.company}`}
                avatar={e.guestProfile?.avatar}
                timestamp={Number.parseFloat(e.timestamp)}
                notification={e}
                key={`${e.pkguestProfile?.attendeeId} ${e.sk} ${e.timestamp}`}
              />
            </PopupWrapper>
          ))}
        </ul>
      </div>
    )
  );
};

NotificationsForPopup.propTypes = {
  onClick: PropTypes.func,
};

NotificationsForPopup.defaultProps = {
  onClick: () => {},
};

export default NotificationsForPopup;

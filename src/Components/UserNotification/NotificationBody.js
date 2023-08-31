import React from "react";
import moment from "moment-timezone";
import notificationsBodyStyles from "./scss/notification-body.module.scss";
import { useSelector } from "react-redux";

/**
 *
 * @param {object} props
 * @param {Node} props.children
 * @param {String} props.company
 * @param {String} props.message
 * @param {String} props.sender
 * @param {String} props.timestamp
 * @param {boolean} props.inNav
 * @param {object} props.attr
 *
 * @returns {JSX.Element}
 */
const NotificationBody = ({
  children,
  company,
  sender,
  message,
  timestamp,
  inNav,
  className,
}) => {
  const userTimezone = useSelector((state) => state.global.timezone);
  const getClassNames = () => {
    if (className) {
      return `${notificationsBodyStyles.bodyHolder} ${className} ${
        inNav ? notificationsBodyStyles.small : null
      }`;
    }

    return "";
  };

  return (
    <div className={getClassNames()}>
      {sender !== "undefined undefined" && (
        <h4 className={notificationsBodyStyles.bodyTitle}>
          {sender} {company !== "" && <span>from</span>} {company}
        </h4>
      )}
      <p className={notificationsBodyStyles.bodyContent}>{message}</p>
      <time
        className={notificationsBodyStyles.time}
        dateTime={moment
          .tz(timestamp, userTimezone)
          .format("YYYY-MM-DD hh:mm a")}
      >
        {moment.tz(timestamp, userTimezone).fromNow()}
      </time>
      {children}
    </div>
  );
};

export default NotificationBody;

import ConfigService from "services/ConfigService";
import { LOGIN_URL } from "services/Auth";
import React from "react";

const EVENTS_URL = "https://matchmaking.grip.events";

const getBaseLink = (fuzionAttendeeId) => {
  const { REACT_APP_FUZION_EVENT_ID } = process.env;
  return `${EVENTS_URL}/${ConfigService.runValues.gripEventName}/freemanpass?id=${fuzionAttendeeId}&event_id=${REACT_APP_FUZION_EVENT_ID}`;
};

const GripLink = ({ children, userSession, deepLink, ...otherProps }) => {
  const { fuzion_attendee_id, fuzionAttendeeId } = userSession || {};
  const fuz = fuzion_attendee_id || fuzionAttendeeId;

  let url = fuz ? getBaseLink(fuz) : LOGIN_URL;
  if (deepLink) {
    const thing_id =
      deepLink.lastIndexOf("/") !== -1
        ? deepLink.substring(deepLink.lastIndexOf("/") + 1)
        : deepLink;
    url = `${url}&thing_id=${thing_id}`;
  }

  const target = url === LOGIN_URL;

  return (
    <a
      href={url}
      target={target ? "_self" : "_blank"}
      {...otherProps}
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default GripLink;

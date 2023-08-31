import React from "react";
import modalStyles from "./scss/meeting-invite-popup.module.scss";

const AttendeesList = ({ list }) => {
  if (list.length <= 0) {
    return null;
  }
  return (
    <div className={`${modalStyles.rightSide} ${modalStyles.grayedOut} `}>
      <ul className={modalStyles.invitees}>
        {list.map((invitee) => {
          return (
            <li key={invitee.name}>
              {`${invitee.preferredName || invitee.name}`} - {invitee.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AttendeesList;

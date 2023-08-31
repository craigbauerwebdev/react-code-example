import ProfileAvatar from "Components/Profile/ProfileAvatar";
import React from "react";
import modalStyles from "./scss/meeting-modals.module.scss";
import renderSpeakerName from "util/renderSpeakerName";

/**
 * TODO: fill out prop types!!
 * @param {*} param0
 */
const MultiSelectItem = ({ item }) => {
  return (
    <div className={modalStyles.multiSelectItemWrapper}>
      <span>
        <ProfileAvatar
          url={item.avatar}
          firstName={item.firstName}
          preferredName={item.preferredName}
          lastName={item.lastName}
          size={20}
        />
      </span>

      <div className={modalStyles.attendeeName}>
        <strong>{renderSpeakerName(item)}</strong>
      </div>

      <div className={modalStyles.attendeeInfo}>
        {item.title} - {item.company}
      </div>
    </div>
  );
};

export default MultiSelectItem;

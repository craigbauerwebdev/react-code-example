import ProfileAvatar from "Components/Profile/ProfileAvatar";
import React from "react";
import modalStyles from "./scss/meeting-modals.module.scss";

const CustomTag = ({ tag }) => {
  return (
    <div className={modalStyles.imageIcon}>
      <ProfileAvatar
        url={tag.avatar}
        firstName={tag.firstName}
        preferredName={tag.preferredName}
        lastName={tag.lastName}
        size={20}
      />
    </div>
  );
};

export default CustomTag;

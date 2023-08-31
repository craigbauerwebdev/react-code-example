import React, { MouseEventHandler, useEffect, useState } from "react";

import SvgTypes from "Components/SVG/SvgTypes";
import profileAvatarStyles from "./scss/profile-avatar.module.scss";

const HEIGHT_TO_FONT_SIZE_RATIO = 1 / 35;
const TRANSFORMS = "fl_lossy,f_auto";
const displayOptions = {
  ICON: "ICON",
  CLOUDINARY: "CLOUDINARY",
  INITIALS: "INITIALS",
};

export interface AvatarIconProps {
  className?: string;
  style?: any;
  children?: any;
}

export const AvatarIcon: React.SFC<AvatarIconProps> = ({
  style,
  className,
  children,
}) => {
  return (
    <div style={style} className={`${className} profile-avatar`}>
      <SvgTypes name="profile" />
      <span className="sr-only">{children}</span>
    </div>
  );
};

export interface ProfileAvatarProps {
  url?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  preferredName?: string;
  name?: string;
  size?: number;
  status?: string;
  isSquare?: boolean;
  isLink?: boolean;
  isAttendeeList?: boolean;
  listStyle?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
// https://github.com/Klowd/onlineeventpro-product-ui/wiki/Profile-Avatar
const ProfileAvatar: React.SFC<ProfileAvatarProps> = ({
  url,
  image,
  firstName,
  lastName,
  preferredName,
  name,
  size = 50,
  status,
  isSquare,
  isLink,
  listStyle,
  onClick,
}) => {
  const [display, setDisplay] = useState(displayOptions.INITIALS);
  const fallbackInitials = name
    ? name.charAt(0).toUpperCase()
    : `${
        preferredName
          ? preferredName.charAt(0).toUpperCase()
          : firstName && firstName.charAt(0).toUpperCase()
      }${(lastName && lastName.charAt(0).toUpperCase()) || ""}`;
  const fallbackFontSize = {
    fontSize: `${size * HEIGHT_TO_FONT_SIZE_RATIO}rem`,
  };
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const styleOnline = {
    width: `${size}px`,
    height: `${size}px`,
    border: "6px #3ae43a solid",
    boxShadow: "rgb(58 228 58) 0px 0px 12px 2px",
  };

  const styleOffline = {
    width: `${size}px`,
    height: `${size}px`,
    border: "6px #989898 solid",
    boxShadow: "gray 0px 0px 12px 2px",
  };

  const listOnline = {
    width: `${size}px`,
    height: `${size}px`,
    border: "4px #3ae43a solid",
    //boxShadow: "rgb(58 228 58) 0px 0px 12px 2px",
  };

  const listOffline = {
    width: `${size}px`,
    height: `${size}px`,
    border: "4px #989898 solid",
    //boxShadow: "gray 0px 0px 12px 2px",
  };

  const iconStyles =
    display === displayOptions.ICON
      ? profileAvatarStyles.icon
      : display === displayOptions.INITIALS
      ? profileAvatarStyles.placeholder
      : "";
  const avatarCssClass = `
  ${iconStyles}
  ${isSquare ? "" : profileAvatarStyles.circle}
  ${isLink ? profileAvatarStyles.hov : ""}
`;

  useEffect(() => {
    if (url || image) {
      setDisplay(displayOptions.CLOUDINARY);
    } else if (!firstName && !lastName && !name) {
      setDisplay(displayOptions.ICON);
    } else {
      setDisplay(displayOptions.INITIALS);
    }
  }, [url, firstName, lastName, image, name]);

  const avatarStyle =
    status === "online"
      ? listStyle
        ? listOnline
        : styleOnline
      : status === "offline"
      ? listStyle
        ? listOffline
        : styleOffline
      : style;

  const cloudinaryUrl = `https://res.cloudinary.com/${
    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  }/image/upload/${TRANSFORMS}/${url || image}`;

  const avatarMap = {
    [displayOptions.ICON]: (
      <AvatarIcon className={avatarCssClass} style={avatarStyle}>
        {firstName} {lastName} avatar
      </AvatarIcon>
    ),
    [displayOptions.CLOUDINARY]: (
      <img
        src={cloudinaryUrl}
        alt={`${firstName} ${lastName} avatar`}
        style={avatarStyle}
        className={avatarCssClass}
      />
    ),
    [displayOptions.INITIALS]: (
      <div className={avatarCssClass} style={avatarStyle}>
        <div style={fallbackFontSize}>{fallbackInitials}</div>
      </div>
    ),
  };

  return (
    <div
      className={`${profileAvatarStyles.wrapper} profile-avatar-wrapper`}
      onClick={onClick}
    >
      {avatarMap[display] || null}
    </div>
  );
};
export default ProfileAvatar;

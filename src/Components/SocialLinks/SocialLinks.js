import React, { useEffect, useState } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import socialLinkStyles from "./scss/social-links.module.scss";

const SocialLinks = ({
  faceBook,
  twitter,
  linkedIn,
  instagram,
  snapchat,
  youtube,
  page,
  type = "dark",
  exhibitorId,
}) => {
  const [socialLinks, setSocialLinks] = useState([]);
  const getListType = (params) => {
    switch (type) {
      case "dark":
        return socialLinkStyles.linkListItem;
      case "primary":
        return socialLinkStyles.linkListItemPrimary;
      default:
        break;
    }
  };

  useEffect(() => {
    const socialData = [];
    if (faceBook) {
      socialData.push({
        name: "Facebook",
        url: faceBook,
        icon: "facebook-white.svg",
      });
    }
    if (twitter) {
      socialData.push({
        name: "Twitter",
        url: twitter,
        icon: "twitter-white.svg",
      });
    }
    if (linkedIn) {
      socialData.push({
        name: "LinkedIn",
        url: linkedIn,
        icon: "linkedin-white.svg",
      });
    }
    if (instagram) {
      socialData.push({
        name: "Instagram",
        url: instagram,
        icon: "instagram-white.svg",
      });
    }
    if (snapchat) {
      socialData.push({
        name: "SnapChat",
        url: snapchat,
        icon: "snapchat-white.svg",
      });
    }
    if (youtube) {
      socialData.push({
        name: "YouTube",
        url: youtube,
        icon: "youtube-white.svg",
      });
    }

    if (socialData.length > 0) {
      setSocialLinks(socialData);
    }
  }, [faceBook, twitter, linkedIn, instagram, snapchat, youtube]);

  if (socialLinks.length <= 0) {
    return null;
  }

  return (
    <ul className={socialLinkStyles.linkList}>
      {socialLinks.map((socialMedia) => (
        <li key={socialMedia.name} className={getListType()}>
          <LinkWrapper
            to={socialMedia.url}
            external={true}
            className="gtm-speaker-social"
            page={`${page}`}
            componentType="Social Media Icon"
            trackingUrl={socialMedia.url}
            componentName={socialMedia.name}
            exhibitorId={exhibitorId}
          >
            <img
              alt={socialMedia.name}
              src={`/images/social-icons/${socialMedia.icon}`}
            />
          </LinkWrapper>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;

SocialLinks.propTypes = {
  faceBook: PropTypes.string,
  twitter: PropTypes.string,
  linkedIn: PropTypes.string,
  instagram: PropTypes.string,
  snapchat: PropTypes.string,
  youtube: PropTypes.string,
  page: PropTypes.string.isRequired,
};

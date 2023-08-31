import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import React, { useEffect, useState } from "react";

import ConfigService from "services/ConfigService";
import OEPAnalytics from "Components/OEPAnalytics";
import { bpMap } from "util/bpMap";
import socialShareStyles from "./scss/social-share.module.scss";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const shareUrl = window.location.href;

const SocialShare = ({ isLiveStream, title, page }) => {
  const [active, setActive] = useState(false);
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const iconSize = isMobile ? 60 : 40;

  const showTwitterShare = () =>
    (isLiveStream && ConfigService.runValues.showLivestreamTwitter) ||
    (!isLiveStream && ConfigService.runValues.showOnDemandTwitter);

  const showLinkedInShare = () =>
    (isLiveStream && ConfigService.runValues.showLivestreamLinkedIn) ||
    (!isLiveStream && ConfigService.runValues.showOnDemandLinkedIn);

  useEffect(() => {
    const outOfBoundsClickHandler = (event) => {
      if (
        active &&
        !event.target.classList.contains(socialShareStyles.socialButton)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("click", outOfBoundsClickHandler);
    return () => {
      document.removeEventListener("click", outOfBoundsClickHandler);
    };
  }, [active]);

  return (
    <>
      {(showTwitterShare() || showLinkedInShare()) && (
        <div className={socialShareStyles.container} tabIndex="0">
          <OEPAnalytics
            page={page}
            componentType="Button"
            url="Share Menu Tray"
            componentName="Share Menu Tray"
          >
            <div
              className={socialShareStyles.shareButton}
              onClick={() => setActive(!active)}
            >
              <img
                className={socialShareStyles.shareIcon}
                src="/images/icons/social-share.svg"
                alt="social share"
              />
            </div>
          </OEPAnalytics>

          <div
            className={`${socialShareStyles.dropdown} ${
              active && socialShareStyles.dropdownActive
            }`}
          >
            {showTwitterShare() && (
              <OEPAnalytics
                page={page}
                componentType="Button"
                url="Twitter Share Button"
                componentName="Twitter Share Button"
              >
                <TwitterShareButton
                  className={socialShareStyles.socialButton}
                  url={shareUrl}
                  title={title}
                >
                  <TwitterIcon
                    className={socialShareStyles.socialIcon}
                    size={iconSize}
                    bgStyle={{ fill: "#0066b2" }}
                  />
                </TwitterShareButton>
              </OEPAnalytics>
            )}
            {showLinkedInShare() && (
              <OEPAnalytics
                page={page}
                componentType="Button"
                url="Linkedin Share Button"
                componentName="Linkedin Share Button"
              >
                <LinkedinShareButton
                  className={socialShareStyles.socialButton}
                  url={shareUrl}
                  title={title}
                >
                  <LinkedinIcon
                    className={socialShareStyles.socialIcon}
                    size={iconSize}
                    bgStyle={{ fill: "#0066b2" }}
                  />
                </LinkedinShareButton>
              </OEPAnalytics>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SocialShare;

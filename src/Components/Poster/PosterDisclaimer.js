import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, {
  ALIGNMENT_TYPES,
  BUTTON_TYPES,
} from "Components/Modal/ModalButtons";
import React, { Fragment, useState } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import { checkForCookieLearnMore } from "util/checkForBrowser";
import checkForIPhone from "util/checkForIPhone";
import checkForSafariMac from "util/checkForSafariMac";
import posterDisclaimerStyles from "./scss/poster-disclaimer.module.scss";

const getFormattedLevel = (level) => {
  let formattedLevel = level;
  switch (level) {
    case "President's Circle":
    case "General Session":
      formattedLevel = level;
      break;
    default:
      formattedLevel = "Competition Finalist";
      break;
  }
  return formattedLevel;
};

const getLevelImage = (level) => {
  let image = "";
  switch (level) {
    case "President's Circle":
      image = "/images/poster-levels/iconStar.svg";
      break;
    case "Competition Finalist":
      image = "/images/poster-levels/iconRibbon.png";
      break;
    default:
      break;
  }
  return image;
};

const PosterDisclaimer = ({ fileViewerURL, poster }) => {
  const isMobileDevice = checkForIPhone();
  const isMacDevice = checkForSafariMac();
  const [showCookieModal, setShowCookieModal] = useState(false);
  const cookieLearnMoreUrl = checkForCookieLearnMore();
  const posterLevel = getFormattedLevel(poster.SubSessionType.trim());
  const posterLevelIcon = getLevelImage(posterLevel);
  const closeCookieModal = () => {
    setShowCookieModal(false);
  };

  const openCookieModal = () => {
    setShowCookieModal(true);
  };
  return (
    <div className={posterDisclaimerStyles.posterPillDisclaimer}>
      {posterLevelIcon && (
        <div className={posterDisclaimerStyles.posterLevel}>
          {posterLevelIcon && (
            <img src={posterLevelIcon} alt="" role="presentation" />
          )}
          <span>{posterLevel}</span>
        </div>
      )}
      {!isMobileDevice && !isMacDevice && fileViewerURL && (
        <Fragment>
          <div className={posterDisclaimerStyles.fileViewer}>
            <img
              src="/images/icons/disclosure-icon.svg"
              alt=""
              role="presentation"
            />
            <span>
              Not seeing the poster?
              <OEPAnalytics
                page="Click here for help for Single Poster"
                componentType="Button"
                url="Cookies Statement Modal"
                componentName="Cookies Statement Modal"
              >
                <button
                  onClick={(e) => {
                    openCookieModal(e);
                  }}
                >
                  Click here for help
                </button>
              </OEPAnalytics>
            </span>
          </div>
          <Modal
            closeCallback={closeCookieModal}
            active={showCookieModal}
            modalType={MODAL_TYPES.short}
            button={[
              <ModalButtons
                alignment={ALIGNMENT_TYPES.center}
                type={BUTTON_TYPES.confirmation}
                key={BUTTON_TYPES.confirmation}
                page="Single Poster"
                componentType="Link"
                url="Close cookies Statement Modal"
                componentName="Close cookies Statement Modal"
              />,
            ]}
          >
            <ModalBody title="This site uses cookies">
              <p>
                This site uses cookies and other technologies to deliver an
                engaging virtual event experience. To gain full access to all of
                the functionality of this site, cookies must be turned on in
                your browser.
              </p>
              {cookieLearnMoreUrl && (
                <p>
                  <LinkWrapper
                    to={cookieLearnMoreUrl}
                    external={true}
                    componentName="learn more"
                  >
                    Learn More
                  </LinkWrapper>
                </p>
              )}
            </ModalBody>
          </Modal>
        </Fragment>
      )}
    </div>
  );
};

export default PosterDisclaimer;

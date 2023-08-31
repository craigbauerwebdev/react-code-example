import React, {
  Children,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";

import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import modalStyles from "./scss/modal-overlay.module.scss";

export const MODAL_TYPES = {
  wide: "wide",
  form: "form",
  short: "short",
  smallBorder: "smallBorder",
  fullscreen: "fullscreen",
  leaderBoard: "leaderBoard",
  survey: "survey",
  filters: "filters",
};
/**
 * Modal window
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Site-Modal
 * @param {string} title title to be displayed in modal window
 * @param {ReactNode} children component to be displayed in modal window as the content
 * @param {boolean} active toggle display of modal
 * @param {function} closeCallback call parent component to close modal window
 * @param {array} button array of react components
 * @param {string} modalType class names that change the modal display
 * @param {boolean} preventUserClose disable user closing modal through click/escape key
 * @param {string} customClass for filters
 */
const Modal = ({
  children,
  active = false,
  closeCallback,
  button,
  techSupportStyle,
  modalType,
  closeInside = false,
  preventUserClose = false,
  customClass,
  page = null,
  disableParentPageScroll = true,
}) => {
  const [activeModal, setActiveModal] = useState(null);
  const [el, setEl] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [buttonPassedVal, setButtonPassedVal] = useState(null);

  const closeModal = (e, val) => {
    enableParentScroll();
    setButtonPassedVal(val);
    setFadeIn(false);
  };

  const handleAnimationEnd = (e) => {
    // Once fade out is done we call the parent component to remove modal from the DOM
    e.persist();
    const name = e.animationName.split("_");

    if (name.includes("fadeOut")) {
      setActiveModal(false);
      closeCallback(e, buttonPassedVal);
      enableParentScroll();
    }
  };

  const keyDownEvt = useCallback(
    (e) => {
      if (e.key === "Escape" && !preventUserClose) {
        setFadeIn(false);
      }
    },
    [preventUserClose]
  );

  const onRefChange = useCallback((node) => {
    // ADA focus on modal window to tab through modal component
    if (node) {
      node.focus();
    }
  }, []);

  const disableParentScroll = () => {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "overflow: hidden");
  };

  const enableParentScroll = () => {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "overflow: visible");
  };

  useEffect(() => {
    if (activeModal) {
      // Add div to DOM so react has a place to portal in content
      const body = document.querySelector("body");
      const el = document.createElement("div");

      el.setAttribute("id", "modal-overlay");
      body.appendChild(el);

      setEl(el);
    }
  }, [activeModal]);

  useEffect(() => {
    setActiveModal(active);

    if (active) {
      // Set up is done now we show the modal
      setFadeIn(true);
      if (disableParentPageScroll) {
        disableParentScroll();
      }
    }
  }, [active, disableParentPageScroll]);

  useEffect(() => {
    // Add event listeners to close modal window ADA
    window.addEventListener("keydown", keyDownEvt);

    return () => {
      window.removeEventListener("keydown", keyDownEvt);
    };
  }, [keyDownEvt]);

  if (!el || !activeModal) {
    return null;
  }

  return ReactDOM.createPortal(
    <Fragment>
      <div
        ref={onRefChange}
        role="button"
        onKeyDown={keyDownEvt}
        tabIndex="0"
        onClick={preventUserClose ? () => {} : closeModal}
        className={`${modalStyles.scrim} ${
          fadeIn ? modalStyles.active : modalStyles.inActive
        }`}
      ></div>
      <div className={modalStyles.outerHolder}>
        <div
          onAnimationEnd={handleAnimationEnd}
          className={`${modalStyles.modalHolder} ${
            customClass ? modalStyles[customClass] : ""
          } ${
            fadeIn
              ? modalStyles.activeModalContent
              : modalStyles.inactiveModalContent
          } ${modalType === MODAL_TYPES.fullscreen && modalStyles.fullscreen}`}
        >
          <div
            className={`${modalStyles.modalHolderInner} ${
              modalStyles[modalType]
            } ${
              page === "VimeoFullscreenPlayer" && modalStyles.vimeoFullscreen
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal_label"
            aria-describedby="modal_desc"
            style={
              techSupportStyle
                ? { maxHeight: "initial", marginTop: "25rem", height: "90vh" }
                : null
            }
          >
            <div>
              <div>
                {Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(
                      child,
                      closeInside
                        ? {
                            clickEvt: closeModal,
                          }
                        : {}
                    );
                  }
                })}
              </div>

              {button &&
                Children.map(button, (buttonType) => {
                  if (React.isValidElement(buttonType)) {
                    return React.cloneElement(buttonType, {
                      clickEvt: closeModal,
                    });
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>,
    el
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeCallback: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  button: PropTypes.arrayOf(PropTypes.node.isRequired),
};

export default Modal;

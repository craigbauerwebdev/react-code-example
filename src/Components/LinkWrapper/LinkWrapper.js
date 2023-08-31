import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, {
  ALIGNMENT_TYPES,
  BUTTON_TYPES,
} from "Components/Modal/ModalButtons";
import React, { Fragment, useEffect, useState } from "react";
import formatUrl, { isExternalUrl } from "util/formatter";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import { LOGIN_URL } from "services/Auth";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import { setModalFlag } from "../../store/actions/index";

// File extension abbreviation values
const extType = new Map([
  ["ODT", "Open Document Text"],
  ["PDF", "Portable Document Format"],
  ["DOC", "Microsoft Word Document"],
  ["DOCX", "Microsoft Word Document"],
  ["PPT", "PowerPoint Presentation"],
]);

const getBaseLink = (base, fuzionAttendeeId, gripId) => {
  return `${base}/freemanpass?id=${fuzionAttendeeId}&event_id=${gripId}`;
};

/**
 * This function will use the Link component for internal links.
 * Pass external as a prop with a value of true to open in new window
 * All link attributes can be passed as props
 * @param {to, children, external, ...attrs } props
 */
export default function LinkWrapper({
  to,
  external = isExternalUrl(to),
  externalModal = ConfigService.runValues.enableExternalModal,
  children,
  isFile = false,
  grip,
  voidLink,
  onClick,
  page,
  componentType,
  componentName,
  trackingUrl,
  role,
  exhibitorId,
  sessionId,
  subSessionId,
  adId,
  posterId,
  ...attrs
}) {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const gripSettings = useSelector((state) => state.global.siteConfig);
  const matchSpecialPrefix = new RegExp("^(mailto|tel)", "i");
  const [hasSpecialPrefix, setHasSpecialPrefix] = useState(false);
  const [modal, setModal] = useState(false);
  const leavingMessage = `You are now navigating away from ${process.env.REACT_APP_META_TITLE} and any content associated with the conference.`;
  const abbrContent = (extVal, ext) =>
    extVal ? <abbr title={extVal}>{ext}</abbr> : `(${ext})`;
  const getExtType = (path) => {
    const ext = path.split(".").pop().toUpperCase();
    const extVal = extType.get(ext);

    return <span className="sr-only">{abbrContent(extVal, ext)}</span>;
  };
  const closeModal = () => {
    setModal(false);
    dispatch(setModalFlag(false));
  };
  const modalLink = (e) => {
    e.preventDefault();
    setModal(true);
    dispatch(setModalFlag(true));
  };

  useEffect(() => {
    if (matchSpecialPrefix.test(to)) {
      setHasSpecialPrefix(true);
    }
  }, [to, matchSpecialPrefix]);

  if (!to && !grip) {
    return null;
  }

  // File Links
  // Screen reader example for know file types: "Download Example File (Portable Document Format)"
  // Screen reader example for un-know file types: "Download Example File (PDF)"
  if (isFile) {
    return (
      <OEPAnalytics
        page={page}
        componentType={componentType}
        url={trackingUrl}
        componentName={componentName}
        exhibitorId={exhibitorId}
        posterId={posterId}
      >
        <a href={formatUrl(to)} download {...attrs}>
          <span className="sr-only">Download </span>
          {children} {getExtType(to)}
        </a>
      </OEPAnalytics>
    );
  }

  // Special Prefix Links - e.g. mailto and tel
  if (hasSpecialPrefix) {
    return (
      <OEPAnalytics
        page={page}
        componentType={componentType}
        url={trackingUrl}
        componentName={componentName}
        exhibitorId={exhibitorId}
        posterId={posterId}
      >
        <a href={to} {...attrs} target="_blank" rel="noopener noreferrer">
          {children}
          <span className="sr-only"> (Opens in a new tab)</span>
        </a>
      </OEPAnalytics>
    );
  }

  // External Links
  // Screen reader example: "Example Link (Opens in a new tab)"
  if (external && !grip && !externalModal) {
    return (
      <OEPAnalytics
        page={page}
        componentType={componentType}
        url={trackingUrl}
        componentName={componentName}
        exhibitorId={exhibitorId}
        adId={adId}
      >
        <a
          href={formatUrl(to)}
          {...attrs}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <span className="sr-only"> (Opens in a new tab)</span>
        </a>
      </OEPAnalytics>
    );
  }

  // GripLinks
  // https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
  if (grip) {
    const { fuzion_attendee_id, fuzionAttendeeId } = user || {};
    const fuz = fuzion_attendee_id || fuzionAttendeeId;
    const url = () => {
      if (grip.deepLink) {
        const thing_id =
          grip.deepLink.lastIndexOf("/") !== -1
            ? grip.deepLink.substring(grip.deepLink.lastIndexOf("/") + 1)
            : grip.deepLink;

        return `${getBaseLink(
          gripSettings.grip.url,
          fuz,
          gripSettings.grip.id
        )}&thing_id=${thing_id}`;
      }

      return getBaseLink(gripSettings.grip.url, fuz, gripSettings.grip.id);
    };
    const gripLink = url();
    const returnGripLink = () => {
      if (externalModal) {
        return (
          <Fragment>
            <Modal
              closeCallback={closeModal}
              active={modal}
              modalType={MODAL_TYPES.smallBorder}
              button={[
                <ModalButtons
                  type={BUTTON_TYPES.externalSite}
                  key={BUTTON_TYPES.externalSite}
                  cbValue={gripLink}
                  alignment={ALIGNMENT_TYPES.center}
                  url={trackingUrl}
                  componentType={componentType}
                  componentName={componentName}
                  page={page}
                />,
                <ModalButtons
                  type={BUTTON_TYPES.closeIcon}
                  key={BUTTON_TYPES.closeIcon}
                />,
              ]}
            >
              <ModalBody title="Leaving Site">{leavingMessage}</ModalBody>
            </Modal>

            <a href={gripLink} {...attrs} onClick={modalLink}>
              {children}
              <span className="sr-only"> (Opens Modal)</span>
            </a>
          </Fragment>
        );
      }

      return (
        <OEPAnalytics
          page={page}
          componentType={componentType}
          url={trackingUrl}
          componentName={componentName}
          exhibitorId={exhibitorId}
          adId={adId}
          posterId={posterId}
        >
          <a
            href={gripLink}
            target="_blank"
            {...attrs}
            rel="noopener noreferrer"
          >
            {children}
          </a>
        </OEPAnalytics>
      );
    };

    if (!fuz) {
      return (
        <OEPAnalytics
          page={page}
          componentType={componentType}
          url={trackingUrl}
          componentName={componentName}
          exhibitorId={exhibitorId}
          adId={adId}
          posterId={posterId}
        >
          <Link to={LOGIN_URL} {...attrs}>
            {children}
          </Link>
        </OEPAnalytics>
      );
    }

    return returnGripLink();
  }

  if (voidLink) {
    return (
      <OEPAnalytics
        componentType="Button"
        page={page}
        componentName={componentName}
        exhibitorId={exhibitorId}
        adId={adId}
        posterId={posterId}
      >
        <button {...attrs}>{children}</button>;
      </OEPAnalytics>
    );
  }

  if (external && externalModal) {
    return (
      <Fragment>
        <Modal
          closeCallback={closeModal}
          active={modal}
          modalType={MODAL_TYPES.smallBorder}
          button={[
            <ModalButtons
              type={BUTTON_TYPES.externalSite}
              key={BUTTON_TYPES.externalSite}
              cbValue={formatUrl(to)}
              alignment={ALIGNMENT_TYPES.center}
              url={trackingUrl}
              componentType={componentType}
              page={page}
              componentName={componentName}
            />,
            <ModalButtons
              type={BUTTON_TYPES.closeIcon}
              key={BUTTON_TYPES.closeIcon}
            />,
          ]}
          title="Leaving Site"
        >
          <span>{leavingMessage}</span>
        </Modal>

        <a href={formatUrl(to)} {...attrs} onClick={modalLink}>
          {children}
          <span className="sr-only"> (Opens Modal)</span>
        </a>
      </Fragment>
    );
  }

  // Standard Link
  if (role) {
    return (
      <OEPAnalytics
        page={page}
        componentType={componentType}
        url={trackingUrl}
        componentName={componentName}
        sessionId={sessionId}
        subSessionId={subSessionId}
        exhibitorId={exhibitorId}
        adId={adId}
        posterId={posterId}
      >
        <Link to={to} {...attrs} role={role}>
          {children}
        </Link>
      </OEPAnalytics>
    );
  }
  return (
    to && (
      <OEPAnalytics
        page={page}
        componentType={componentType}
        url={trackingUrl}
        componentName={componentName}
        sessionId={sessionId}
        subSessionId={subSessionId}
        exhibitorId={exhibitorId}
        adId={adId}
        posterId={posterId}
      >
        <Link to={to} {...attrs} onClick={onClick}>
          {children}
        </Link>
      </OEPAnalytics>
    )
  );
}

LinkWrapper.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  external: PropTypes.bool,
  externalModal: PropTypes.bool,
  voidLink: PropTypes.bool,
};

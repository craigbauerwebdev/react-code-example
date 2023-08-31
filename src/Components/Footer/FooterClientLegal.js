import React, { useEffect, useState } from "react";

import FooterLegalList from "./FooterLegalList";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import footerStyles from "./scss/footer.module.scss";
import formatNavData from "util/formatNavData";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const FooterClientLegal = ({ footerData }) => {
  const location = useLocation();
  // https://github.com/Klowd/onlineeventpro-product-ui/wiki/Site-Config
  const eventName = useSelector((state) => state.global.siteConfig);
  const [trackingLink, setTrackingLink] = useState("");
  /** @type {[[], Function]} */
  const [legalRight, setLegalRight] = useState(null);
  /** @type {[[], Function]} */
  const [legalLeft, setLegalLeft] = useState(null);

  useEffect(() => {
    const siteName =
      eventName?.eventInfo?.name || process.env.REACT_APP_EVENT_NAME;
    if (siteName) {
      setTrackingLink(
        `https://www.freeman.com/online-event/?utm_source=${siteName}-Virtual-Event-Site&utm_medium=footer-logo&utm_campaign=client-website-link`
      );
    }
  }, [eventName]);

  useEffect(() => {
    setLegalLeft(formatNavData(footerData.legalLeft));
    setLegalRight(formatNavData(footerData.legalRight));
  }, [footerData]);

  if (!footerData || !eventName) {
    return null;
  }

  return (
    <section className={footerStyles.footerClientLegal}>
      <div className={footerData.left ? footerStyles.hasLeft : ""}>
        {legalLeft && legalLeft.length > 0 && (
          <div className={footerStyles.footerClientLegalLeft}>
            <FooterLegalList list={legalLeft} />
          </div>
        )}
        <div className={footerStyles.footerClientLegalRight}>
          {legalRight && legalRight.length > 0 && (
            <FooterLegalList list={legalRight} />
          )}
          {trackingLink && (
            <LinkWrapper
              to={trackingLink}
              external={true}
              className={footerStyles.oepLink}
              page={getAnalyticsPage(location.pathname)}
              componentType="Link"
              trackingUrl={trackingLink}
              componentName="OEP Logo"
            >
              <img
                src="/images/OnlineEventPro-logo.svg"
                alt="Powered by Online Event Pro"
              />
            </LinkWrapper>
          )}
        </div>
      </div>
    </section>
  );
};

export default FooterClientLegal;

FooterClientLegal.propTypes = {
  footerData: PropTypes.shape({
    legalRight: PropTypes.array.isRequired,
    legalLeft: PropTypes.array.isRequired,
  }).isRequired,
};

import FooterClientLegal from "./FooterClientLegal";
import FooterLogo from "./FooterLogo.js";
import FooterNav from "./FooterNav";
import FooterSocial from "./FooterSocial";
import FreemanFooter from "Components/Footer/FreemanFooter";
import React from "react";
import footerStyles from "./scss/footer.module.scss";
import useNavGuarding from "hooks/useNavGuarding";
import { useSelector } from "react-redux";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Footer
 * This component is pulling data from Liferay by default.
 * If this is not the desired outcome you can replace it with static data.
 */
const Footer = ({ nav, socialLinks, logo, legal }) => {
  const preEvent = useSelector((state) => state.global.isPreventOn);
  const blockedNetworkRoutes = useSelector(
    (state) => state.global.permissions.blockedNetworkRoutes
  );
  const navData = useNavGuarding(nav, blockedNetworkRoutes);

  if (!navData) {
    return null;
  }

  return (
    <section
      className={`${footerStyles.footer} ${
        preEvent ? footerStyles.preEvent : ""
      }`}
      role="contentinfo"
    >
      <div className={footerStyles.footerWrapper}>
        <div className={footerStyles.innerFooterWrapper}>
          <div className={footerStyles.footerContainer}>
            <section>
              <FooterLogo logo={logo} />
              <FooterSocial socialLinks={socialLinks} />
            </section>
            <FooterNav navData={nav} />
          </div>
          <FooterClientLegal footerData={legal} />
        </div>
      </div>
      <FreemanFooter />
    </section>
  );
};

export default Footer;

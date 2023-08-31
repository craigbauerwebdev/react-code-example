import FooterOEPLink from "./FooterOEPLink";
import React from "react";
import footerStyles from "./scss/footer.module.scss";
import lodash from "lodash";

const FooterSocial = ({ socialLinks }) => {
  if (lodash.isEmpty(socialLinks)) {
    return null;
  }
  return (
    <nav
      className={footerStyles.footerSocialContainer}
      aria-label="Event Social Media"
    >
      <ul>
        {socialLinks.map((social) => (
          <li key={social.altText} className={footerStyles.footerSocialItem}>
            <FooterOEPLink
              key={social.altText}
              href={social.linkURL}
              componentType="Social Media Icon"
              componentName={social.altText}
              className={`${footerStyles.footerSocial} gtm-footer-social`}
            >
              <img alt={social.altText} src={social.imageURL} />
            </FooterOEPLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterSocial;

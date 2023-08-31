import FooterOEPLink from "./FooterOEPLink";
import React from "react";
import footerStyles from "./scss/footer.module.scss";
import lodash from "lodash";

const FooterNav = ({ navData }) => {
  if (lodash.isEmpty(navData)) {
    return null;
  }

  return (
    <section className={footerStyles.linksHolder}>
      <nav
        className={footerStyles.innerWrapper}
        aria-label="Secondary"
        role="navigation"
      >
        <ul className={`${footerStyles.navList}`}>
          {navData.map((link) => {
            if (!link.submenus) {
              return (
                <li key={link.menuLabel} className={`${footerStyles.noSubNav}`}>
                  <FooterOEPLink href={link.link}>
                    <span
                      dangerouslySetInnerHTML={{ __html: link.menuLabel }}
                    />
                  </FooterOEPLink>
                </li>
              );
            }
            return (
              <li key={link.menuLabel} className={`${footerStyles.navSection}`}>
                <div className={`${footerStyles.navSectionHeader}`}>
                  <span dangerouslySetInnerHTML={{ __html: link.menuLabel }} />
                </div>
                <ul className={footerStyles.subItems}>
                  {link.submenus.map((subNav) => (
                    <li key={subNav.menuLabel}>
                      {/* For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip */}
                      <FooterOEPLink
                        href={subNav.link}
                        grip={subNav.type === "grip"}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: subNav.menuLabel }}
                        />
                      </FooterOEPLink>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default FooterNav;

import FreemanFooter from "Components/Footer/FreemanFooter";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";

export const PreEventFooter = (props) => {
  const socialLinkTemplet = () => {
    return props.socialLinks.map((icon) => (
      <LinkWrapper
        to={icon.link}
        className="footer-social gtm-footer-social"
        external={true}
        key={icon.alt}
        page="PreEvent Footer"
        componentType="Social Icon"
        trackingUrl={icon.link}
      >
        <img alt={icon.alt} src={`/images/social-icons/${icon.img}`} />
      </LinkWrapper>
    ));
  };
  return (
    <div className="preevent-footer-wrapper">
      <div className="footer-container flexwrap">
        <img
          id="footer-logo"
          alt="Freeman"
          src="/images/your-event-white.png"
        />
        <div className="footer-social-container flex1">
          {socialLinkTemplet()}
        </div>
      </div>
      <div className="footer-copy-wrapper">
        <section className="preevent-footer-copy">
          <ul>
            <li>© Your Event Company 2020</li>
            <li>
              <LinkWrapper
                to="https://www.freeman.com/privacy-policy"
                external={true}
                page="PreEvent Footer"
                componentType="Code of Conduct"
                trackingUrl="https://www.freeman.com/privacy-policy"
                componentName="code of conduct"
              >
                Code of Conduct
              </LinkWrapper>
            </li>
            <li>
              <LinkWrapper
                to="https://www.freeman.com/terms-of-use"
                external={true}
                page="PreEvent Footer"
                componentType="Terms and Conditions"
                trackingUrl="https://www.freeman.com/terms-of-use"
                componentName="Terms and Conditions"
              >
                Terms and Conditions
              </LinkWrapper>
            </li>
          </ul>
        </section>
        <LinkWrapper
          to="https://www.freeman.com/online-event/?utm_source=OEPDEMO-Virtual-Event-Site&utm_medium=footer-logo&utm_campaign=client-website-link"
          external={true}
          page="PreEvent Footer"
          componentType="Home"
          trackingUrl="/"
          componentName="Home"
        >
          <img src="/images/online-event-pro.svg" alt="Online Event Pro" />
        </LinkWrapper>
      </div>
      <FreemanFooter />
    </div>
  );
};

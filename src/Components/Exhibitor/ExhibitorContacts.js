import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import getAnalyticsPage from "util/getAnalyticsPage";
import sideBarStyles from "../Sidebar/scss/single-side-bar.module.scss";
import { useLocation } from "react-router-dom";

const ExhibitorContacts = ({
  contact,
  exhibitor: {
    custom_attributes: { phone },
    exhibitor_name,
  },
  boothStyle = "",
}) => {
  const location = useLocation();
  const phoneNumber = (contactInfo) =>
    phone || contactInfo.mobile_number || contactInfo.other_phone_number;
  const email = (contactInfo) => contactInfo.email || contactInfo.email_two;

  return contact && contact.length ? (
    <section
      className={`${sideBarStyles.sessionMeta} ${
        boothStyle === "Dark Mode" && sideBarStyles.darkMode
      }`}
    >
      <h2>Representative Contact</h2>
      {contact.map((contactInfo) => (
        <ul key={contactInfo.first_name + contactInfo.last_name}>
          <li>
            {contactInfo.first_name} {contactInfo.last_name}
          </li>
          {contactInfo.title && <li>{contactInfo.title}</li>}
          {phoneNumber(contactInfo) && (
            <li>
              <LinkWrapper
                to={`tel:${phoneNumber(contactInfo)}`}
                componentType="Link"
                page={getAnalyticsPage(location.pathname)}
                trackingUrl={phoneNumber(contactInfo)}
                componentName="Representative Contact"
              >
                <span>{phoneNumber(contactInfo)}</span>
              </LinkWrapper>
            </li>
          )}
          {email(contactInfo) && (
            <li
              className={`${sideBarStyles.sessionMetaEmail} ${
                boothStyle === "Dark Mode" && sideBarStyles.darkMode
              }`}
            >
              <LinkWrapper
                to={`mailto:${email(contactInfo)}`}
                className="gtm-exhibitor-contact"
                componentType="Link"
                page={getAnalyticsPage(location.pathname)}
                trackingUrl={email(contactInfo)}
                componentName="Representative Contact"
              >
                <span>{email(contactInfo)}</span>
              </LinkWrapper>
            </li>
          )}
        </ul>
      ))}
    </section>
  ) : (
    <div />
  );
};

export default ExhibitorContacts;

ExhibitorContacts.propTypes = {
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      email_two: PropTypes.string,
      first_name: PropTypes.string.isRequired,
      title: PropTypes.string,
      last_name: PropTypes.string.isRequired,
      mobile_number: PropTypes.string,
      other_phone_number: PropTypes.string,
    })
  ).isRequired,
  exhibitor: PropTypes.shape({
    exhibitor_name: PropTypes.string.isRequired,
    custom_attributes: PropTypes.shape({
      phone: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

import EditItem from "./EditItem";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import React from "react";
import accountProfileStyles from "./scss/account-profile.module.scss";
import profilePageStyles from "./scss/profile-page.module.scss";

const AttendeeProfileDetails = ({ attendeeProfile, profileConfigurations }) => {
  const renderAttendeeName = () => {
    const prefix = !profileConfigurations?.basic.prefix.hide
      ? attendeeProfile?.prefix
      : "";
    const firstName =
      attendeeProfile?.preferredName.length > 0 &&
      !profileConfigurations?.basic.preferredName.hide
        ? attendeeProfile?.preferredName
        : !profileConfigurations?.basic.firstName.hide
        ? attendeeProfile?.firstName
        : "";
    const lastName = !profileConfigurations?.basic.lastName.hide
      ? attendeeProfile?.lastName
      : "";
    const suffix = !profileConfigurations?.basic.suffix.hide
      ? attendeeProfile?.suffix
      : "";
    const fullName = prefix + " " + firstName + " " + lastName + " " + suffix;
    return fullName;
  };

  if (attendeeProfile && profileConfigurations) {
    return (
      <>
        <div
          className={accountProfileStyles.attendeeName}
          aria-label={renderAttendeeName()}
        >
          {renderAttendeeName()}
        </div>
        <div style={{ display: "flex" }}>
          {!profileConfigurations.company.jobTitle.hide && (
            <EditItem
              name={attendeeProfile?.title}
              className={profilePageStyles.title}
            />
          )}
          {!profileConfigurations.company.jobTitle.hide &&
            attendeeProfile?.title && (
              <div>
                {attendeeProfile?.occupation &&
                !profileConfigurations.company.occupation.hide ? (
                  <div style={{ marginTop: "10px" }}>&nbsp;/&nbsp;</div>
                ) : (
                  ""
                )}
              </div>
            )}
          {!profileConfigurations.company.occupation.hide && (
            <EditItem
              name={attendeeProfile?.occupation}
              className={profilePageStyles.title}
            />
          )}
        </div>
        <div style={{ display: "flex" }}>
          {!profileConfigurations.company.companyName.hide && (
            <EditItem
              // label="Company"
              name={attendeeProfile?.company}
              className={profilePageStyles.company}
              noMargin={true}
            />
          )}
          {!attendeeProfile.company ||
            profileConfigurations.company.companyName.hide ||
            (!profileConfigurations.company.website.hide &&
              attendeeProfile.social.website && <>&nbsp; | &nbsp;</>)}
          {!profileConfigurations.company.website.hide &&
            attendeeProfile.social.website && (
              <>
                <EditItem
                  // label="Company"
                  name={attendeeProfile.social.website}
                  link={attendeeProfile.social.website}
                  className={profilePageStyles.company}
                  url={attendeeProfile.social.website}
                  external
                  replaceName
                  wordBreak
                />
              </>
            )}
        </div>
        <div className={accountProfileStyles.region}>
          {!profileConfigurations.location.city.hide &&
            attendeeProfile.address?.city && (
              <span>
                {attendeeProfile.address.city}
                {(!profileConfigurations.location.state.hide ||
                  !profileConfigurations.location.country.hide) && (
                  <span>,</span>
                )}{" "}
              </span>
            )}
          {!profileConfigurations.location.state.hide &&
            attendeeProfile.address?.state && (
              <span>
                {attendeeProfile.address.state}
                {!profileConfigurations.location.country.hide && <span>,</span>}
              </span>
            )}
          {!profileConfigurations.location.country.hide &&
            attendeeProfile.address?.country && (
              <span> {attendeeProfile.address.country} </span>
            )}

          {!profileConfigurations?.location?.region?.hide &&
            attendeeProfile.region && (
              <div>
                <span>
                  {" "}
                  <img
                    alt={"map-icon"}
                    src={"/images/icons/map-marker-alt-solid.svg"}
                  />{" "}
                  {attendeeProfile.region}{" "}
                </span>
              </div>
            )}

          {!profileConfigurations?.location?.language?.hide &&
            attendeeProfile.language && (
              <div class="flex-container">
                <div class="flex-child">
                  <span> Language : </span>
                </div>
                <div class="flex-child">{attendeeProfile.language}</div>
              </div>
            )}
        </div>
        <div className={profilePageStyles.pageGridForm}>
          {!profileConfigurations.social.facebook.hide &&
            attendeeProfile.social.facebook && (
              <div className={profilePageStyles.social}>
                <LinkWrapper
                  to={attendeeProfile.social.facebook}
                  page={"attendee info"}
                  componentType={"social media icon"}
                  componentName={"facebook icon"}
                  trackingUrl={attendeeProfile.social.facebook}
                  external
                >
                  <img alt={"facebook"} src={"/images/icons/facebook.svg"} />
                </LinkWrapper>
              </div>
            )}
          {!profileConfigurations.social.instagram.hide &&
            attendeeProfile.social.instagram && (
              <div className={profilePageStyles.social}>
                <LinkWrapper
                  to={attendeeProfile.social.instagram}
                  page={"attendee info"}
                  componentType={"social media icon"}
                  componentName={"instagram icon"}
                  trackingUrl={attendeeProfile.social.instagram}
                  external
                >
                  <img alt={"instagram"} src={"/images/icons/instagram.svg"} />
                </LinkWrapper>
              </div>
            )}
          {!profileConfigurations.social.linkedin.hide &&
            attendeeProfile.social.linkedin && (
              <div className={profilePageStyles.social}>
                <LinkWrapper
                  to={attendeeProfile.social.linkedin}
                  page={"attendee info"}
                  componentType={"social media icon"}
                  componentName={"linkedin icon"}
                  trackingUrl={attendeeProfile.social.linkedin}
                  external
                >
                  <img alt={"linkedin"} src={"/images/icons/linked-in.svg"} />
                </LinkWrapper>
              </div>
            )}
          {!profileConfigurations.social.twitter.hide &&
            attendeeProfile.social.twitter && (
              <div className={profilePageStyles.social}>
                <LinkWrapper
                  to={attendeeProfile.social.twitter}
                  page={"attendee info"}
                  componentType={"social media icon"}
                  componentName={"twitter icon"}
                  trackingUrl={attendeeProfile.social.twitter}
                  external
                >
                  <img alt={"twitter"} src={"/images/icons/twitter.svg"} />
                </LinkWrapper>
              </div>
            )}
          {!profileConfigurations.social.snapchat.hide &&
            attendeeProfile.social.snapchat && (
              <div className={profilePageStyles.social}>
                <LinkWrapper
                  to={attendeeProfile.social.snapchat}
                  page={"attendee info"}
                  componentType={"social media icon"}
                  componentName={"snapchat icon"}
                  trackingUrl={attendeeProfile.social.snapchat}
                  external
                >
                  <img
                    alt={"snapchat"}
                    src={"/images/icons/snapchat-brands.svg"}
                  />
                </LinkWrapper>
              </div>
            )}
        </div>
      </>
    );
  } else {
    return null;
  }
};
export default AttendeeProfileDetails;

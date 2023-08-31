import React from "react";
import profilePageStyles from "./scss/profile-page.module.scss";

const AttendeeProfileCustomFields = ({ attendeeProfile, isMobile }) => {
  if (isMobile && attendeeProfile?.attributes?.length > 0) {
    return (
      <div className={profilePageStyles.customContainer}>
        {attendeeProfile.attributes.length > 0 && (
          <h4
            aria-label={"Custom Profile"}
            className={profilePageStyles.customHeader}
          >
            Custom Profile
          </h4>
        )}
        {attendeeProfile.attributes.map((attr) => {
          return (
            <div className={profilePageStyles.attributes}>
              <div
                lassName={profilePageStyles.customLabel}
                aria-label={attr.label}
                style={{ fontWeight: "lighter", color: "grey" }}
              >
                {attr.label}
              </div>
              <div
                aria-label={attr.value}
                className={profilePageStyles.customValue}
              >
                {typeof attr.value === "object"
                  ? attr.value.map((attrVal) => {
                      return <span>{attrVal}, &nbsp;</span>;
                    })
                  : attr.value}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};
export default AttendeeProfileCustomFields;

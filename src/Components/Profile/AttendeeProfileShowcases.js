import React from "react";
import profilePageStyles from "./scss/profile-page.module.scss";
import webinarPageStyles from "../Network/Webinars/scss/webinar-page.module.scss";
import ExpandToggle from "Components/Buttons/ExpandToggle";
import WherebyTab from "../Session/WherebyTab";

const AttendeeProfileShowcases = ({
  attendeeProfile,
  filteredShowcases,
  openSection,
  toggleSection,
  exhibitor,
}) => {
  if (attendeeProfile) {
    return (
      <>
        {filteredShowcases &&
          filteredShowcases.length > 0 &&
          attendeeProfile?.companyId !== "" &&
          exhibitor && (
            <div style={{ padding: "0px 30px 0px 30px" }}>
              <h2
                className={profilePageStyles.showcaseTitle}
                aria-label={"Live Showcases"}
                style={{ padding: "0px", marginTop: "0px" }}
              >
                Live Showcases
                <ExpandToggle
                  expanded={openSection}
                  page={"Attendee Info"}
                  pageId="Filters"
                  handleClick={toggleSection}
                  ariaLabel={["filter collapse", "filter expand"]}
                  ariaControls="filter-Date"
                  classList={["profileTab"]}
                />
              </h2>
            </div>
          )}
        {filteredShowcases &&
        filteredShowcases.length > 0 &&
        attendeeProfile.companyId !== "" &&
        openSection
          ? filteredShowcases.map((event) => {
              return (
                <div
                  className={webinarPageStyles.showcaseWrapper}
                  style={{ padding: "0px 30px 30px 30px" }}
                >
                  <WherebyTab
                    data={event}
                    key={event.sessionId}
                    isWebinar
                    page="attendee info"
                  />
                </div>
              );
            })
          : null}
      </>
    );
  } else {
    return null;
  }
};
export default AttendeeProfileShowcases;

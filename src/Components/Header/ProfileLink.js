import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import React from "react";
import ReactTooltip from "react-tooltip";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const ProfileLink = ({ onClick, location }) => {
  const accountProfile = useSelector((state) => state.profile.accountProfile);

  return (
    <>
      <LinkWrapper
        data-tip="Go to account profile"
        to="/account/profile"
        page={getAnalyticsPage(location.pathname)}
        pageId="Nav"
        componentType="Navigation Item"
        trackingUrl="/account/profile"
        title={`Go to account profile`}
        aria-label={`Go to account profile`}
        onClick={onClick}
        componentName="Go to account profile"
      >
        <ProfileAvatar
          url={accountProfile && accountProfile.avatar}
          firstName={accountProfile && accountProfile.firstName}
          preferredName={accountProfile && accountProfile.preferredName}
          lastName={accountProfile && accountProfile.lastName}
          size={24}
          isLink={true}
        />
      </LinkWrapper>
      <ReactTooltip />
    </>
  );
};

export default withRouter(ProfileLink);

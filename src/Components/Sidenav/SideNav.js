import ConfigService from "services/ConfigService";
import React from "react";
import SideNavCard from "./SideNavCard";
import SideNavSection from "./SideNavSection";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { bpMap } from "./../../util/bpMap";
import lodash from "lodash";
import styles from "./scss/sidenav.module.scss";
import useGetPageByPathname from "hooks/useGetPageByPathname";
import { useSelector } from "react-redux";
import useToggleDisplayMQ from "./../../hooks/useToggleDisplayMQ";
import { withRouter } from "react-router-dom";

const SideNav = ({ data, location, sectionRef, filters }) => {
  const permissions = useSelector((state) => state.global.permissions);
  const { towerBannerName } = useGetPageByPathname();
  const showcasePermissions = useSelector(
    (state) =>
      state.global.networkSettings?.networkingMeetings.meetingFormats
        .productShowcase
  );
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const isMobile = useToggleDisplayMQ(bpMap.midpoint);
  const eventNotificationPermissions = useSelector(
    (state) => state.global.networkSettings?.enableNotifications
  );

  const checkIsActive = (subPath) => {
    if (
      location.pathname === "/account/blocked-users" ||
      location.pathname === "/account/muted-users"
    ) {
      return "/account/settings" === subPath;
    }

    return location.pathname === subPath;
  };

  // recursive function
  const getSidenavSection = (section, isNested) => {
    const isShowcase =
      section.menuLabel === "Showcases" ||
      section.link === "/networking/showcases";

    if (isShowcase && !ConfigService.runValues.hasShowcases) {
      return null;
    }

    const isExhibitor =
      section.menuLabel === "Exhibitors" ||
      section.link === "/networking/exhibitors" ||
      section.slug === "exhibitor_management";

    if (isExhibitor && !ConfigService.runValues.hasExhibitors) {
      return null;
    }
    if (section.requiredRoles) {
      if (lodash.isEmpty(accountProfile)) {
        return null;
      }
    }

    if (section.link && section.icons) {
      if (section.menuLabel === "Showcase Setup" && !showcasePermissions) {
        return null;
      }
      if (
        section.menuLabel === "Notifications" &&
        !eventNotificationPermissions
      ) {
        return null;
      }
      return (
        <SideNavCard
          linkUrl={section.link}
          title={section.menuLabel}
          iconUrl={section.icons}
          active={checkIsActive(section.link)}
          key={section.menuLabel}
          isNested={isNested}
          sectionRef={sectionRef}
        />
      );
    }

    if (section.nestedMenu?.length) {
      return (
        <SideNavSection
          title={section.menuLabel}
          iconUrl={section.icons}
          key={section.menuLabel}
          active={false}
        >
          {/* Build out nest nav by calling it's self until if runs out of items */}
          {section.nestedMenu.map((e) => getSidenavSection(e, true))}
        </SideNavSection>
      );
    }
  };

  const filterNavForEventStatus = (d) => {
    if (!permissions.allowNetworking) {
      const blockedNavSlugs = ["exhibitor_management"];
      return d?.filter((navItem) => !blockedNavSlugs.includes(navItem.slug));
    }

    if (!eventNotificationPermissions) {
      const blockedNavSlugs = ["notifications"];
      return d?.filter((navItem) => !blockedNavSlugs.includes(navItem.slug));
    }

    if (!permissions.allowUserNetworking) {
      const blockedNavSlugs = ["exhibitor_management"];
      return d?.filter((navItem) => !blockedNavSlugs.includes(navItem.slug));
    }

    return d;
  };
  return (
    <div className={styles.sideBar}>
      {filterNavForEventStatus(data)?.map(getSidenavSection)}
      {!isMobile && <div>{filters}</div>}
      {!isMobile && <VerticalSponsorBanner pageName={towerBannerName} />}
    </div>
  );
};

export default withRouter(SideNav);

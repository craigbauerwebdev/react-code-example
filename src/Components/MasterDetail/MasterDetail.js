import React, { useEffect, useState } from "react";
import { Redirect, useLocation, withRouter } from "react-router-dom";

import AttendeeSearch from "Components/Attendees/AttendeeSearch";
import FiltersSectionContainer from "Components/Filters/FiltersSectionContainer";
import FiltersSectionMobileButton from "Components/Filters/FiltersSectionMobileButton";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import ScopedSearch from "Components/Search/ScopedSearch";
import SideNav from "../Sidenav/SideNav";
import attendeeListStyles from "Components/Attendees/scss/attendee-list.module.scss";
import { bpMap } from "util/bpMap";
import filterStyles from "Components/Filters/scss/filters.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import masterDetailStyles from "./scss/master-detail.module.scss";
import sessionsListStyles from "../Session/scss/sessions-list.module.scss";
import useAlgoliaSetting from "hooks/useAlgoliaSetting";
import { useBoolean } from "hooks/useToggle";
import useGetPageByPathname from "hooks/useGetPageByPathname";
import useNavGuarding from "hooks/useNavGuarding";
import useSaveBreadcrumbs from "hooks/useSaveBreadcrumbs";
import useSearch from "hooks/useSearch";
import { useSelector } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const MasterDetail = ({
  heading,
  baseRoute,
  routes,
  components,
  match,
  blockedRoutes,
}) => {
  const attendeeIndex = useSelector(
    (state) => state.profile.algoliaSearchIndex.attendeeData
  );
  const isMobile = useToggleDisplayMQ(bpMap.midpoint);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sectionComponent = match.params && match.params.section;
  const Section = components[sectionComponent];

  useSaveBreadcrumbs();
  const location = useLocation();
  const sectionRef = React.createRef();
  const navData = useNavGuarding(routes, blockedRoutes);
  const { horizontalBannerName } = useGetPageByPathname();
  const { searchState, dispatchSearchState } = useSearch(attendeeIndex);

  const [
    isMobileFilterOpen,
    { on: openMobileFilterSection, toggle: toggleMobileFilterSection },
  ] = useBoolean();

  const redirectPath = () => {
    if (!Section) {
      const defaultComponentIndex = routes.map((z) => z.default).indexOf(true);
      if (defaultComponentIndex > -1) {
        return <Redirect to={`${routes[defaultComponentIndex].link}`} />;
      } else {
        // If no default is defined, default to the first route in the list
        return <Redirect to={`${routes[0].link}`} />;
      }
    }

    return null;
  };

  const getAttendeeFilters = (sectionComponent) => (
    <AttendeeSearch
      searchState={searchState}
      dispatchSearchState={dispatchSearchState}
      searchPlaceholder={"Name, Company, Title"}
      section={sectionComponent}
      filter
      page={
        sectionComponent === "attendee list"
          ? "attendees"
          : sectionComponent === "representative-setup"
          ? "representative setup"
          : sectionComponent === "showcases"
          ? "Webinars"
          : sectionComponent === "favorites"
          ? "favorites"
          : sectionComponent === "schedule"
          ? "My Schedule"
          : getAnalyticsPage(location.pathname)
      }
    />
  );

  const getExhibitorFilters = () => (
    <div className={attendeeListStyles.innerFlex}>
      <div
        className={`${filterStyles.filterWithBorder} ${attendeeListStyles.filterContainer}`}
      >
        <ScopedSearch
          withClearButton
          page={getAnalyticsPage(location.pathname)}
        />
      </div>
    </div>
  );

  const getShowcaseFilters = () => (
    <div className={attendeeListStyles.innerFlex}>
      <div
        className={`${filterStyles.filterWithBorder} ${attendeeListStyles.filterContainer}`}
      >
        <ScopedSearch
          withClearButton={true}
          disableSearchIcon={isMobile}
          isMobile={isMobile}
          page={
            sectionComponent === "attendee list"
              ? "attendees"
              : sectionComponent === "representative-setup"
              ? "representative setup"
              : sectionComponent === "showcases"
              ? "Webinars"
              : sectionComponent === "favorites"
              ? "favorites"
              : sectionComponent === "schedule"
              ? "My Schedule"
              : getAnalyticsPage(location.pathname)
          }
        />
      </div>
    </div>
  );

  const getFilter = () => {
    if (
      sectionComponent === "attendees" ||
      sectionComponent === "representative-setup"
    ) {
      return getAttendeeFilters(sectionComponent);
    }
    if (
      sectionComponent === "showcases" ||
      sectionComponent === "favorites" ||
      sectionComponent === "schedule"
    ) {
      return getShowcaseFilters();
    }
    if (sectionComponent === "exhibitors") {
      return getExhibitorFilters();
    }
    return null;
  };

  const mobileFilters = () => {
    return (
      <>
        <FiltersSectionMobileButton
          isMobileFilterOpen={isMobileFilterOpen}
          toggleMobileFilterSection={toggleMobileFilterSection}
        />
        <FiltersSectionContainer
          showOnMobileOnly
          isMobileFilterOpen={isMobileFilterOpen}
          openMobileFilterSection={openMobileFilterSection}
          searchState={searchState}
        >
          <div className={sessionsListStyles.innerFlexNetworking}>
            {getFilter()}
          </div>
        </FiltersSectionContainer>
      </>
    );
  };

  useAlgoliaSetting();

  useEffect(() => {
    return () => {
      if (modalIsOpen && sectionComponent !== "attendees") {
        if (sectionComponent !== "representative-setup") {
          //
          setModalIsOpen(false);
        }
      }
    };
  });

  return (
    <React.Fragment>
      {!isMobile && heading}
      <div className={masterDetailStyles.main}>
        <SideNav
          sideNavPath={baseRoute}
          data={navData}
          sectionRef={sectionRef}
          filters={getFilter()}
        />

        <div
          className={masterDetailStyles.sectionWrapper}
          autoFocus={true}
          ref={sectionRef}
          tabIndex="-1"
        >
          {isMobile && heading}
          {Section && (
            <Section
              searchState={searchState}
              dispatchSearchState={dispatchSearchState}
              mobileFilter={mobileFilters}
            />
          )}
          {redirectPath()}
        </div>
      </div>
      <HorizontalSponsorBanner pageName={horizontalBannerName} />
    </React.Fragment>
  );
};

export default withRouter(MasterDetail);

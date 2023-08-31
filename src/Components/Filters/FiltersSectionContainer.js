import React, { useEffect } from "react";

import { bpMap } from "util/bpMap";
import clsx from "clsx";
import styles from "./scss/filters.module.scss";
import { useLocation } from "react-router";
import { useQueryState } from "use-location-state";
import { useSelector } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

export default function FiltersSectionContainer({
  children,
  isMobileFilterOpen,
  openMobileFilterSection,
  showOnMobileOnly = false,
  searchState,
}) {
  const activeFilters = useSelector((state) => state.filters.activeFilterList);

  const location = useLocation();
  const isNetworkingOrAccount =
    location.pathname.includes("networking") ||
    location.pathname.includes("account");
  const breakpoint = isNetworkingOrAccount ? bpMap.midpoint : bpMap.tablet;
  const isMobile = useToggleDisplayMQ(breakpoint);
  const [urlSearchQuery] = useQueryState("Search", "");

  const mobileFilterClasses = clsx({
    [styles.mobileFilterSection]: true,
    [styles.expanded]: isMobileFilterOpen,
    [styles.collapsed]: !isMobileFilterOpen,
  });

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const hasNetworkingPageFilters =
      (searchState &&
        (searchState.searchQuery ||
          searchState.filterbyStatus !== "All" ||
          searchState.filterbyType !== "All")) ||
      urlSearchQuery;

    const hasActiveFilters =
      Object.getOwnPropertyNames(activeFilters).filter((key) => key !== "Day")
        .length > 0;

    if (hasActiveFilters || hasNetworkingPageFilters) {
      openMobileFilterSection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, activeFilters, searchState]);

  return (
    <>
      {isMobile ? (
        <div className={mobileFilterClasses}>{children}</div>
      ) : (
        <>{!showOnMobileOnly && children}</>
      )}
    </>
  );
}

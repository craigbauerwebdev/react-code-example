import React from "react";
import { bpMap } from "util/bpMap";
import clsx from "clsx";
import styles from "./scss/filters.module.scss";
import { useLocation } from "react-router";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

export default function FiltersSectionMobileButton({
  isMobileFilterOpen,
  toggleMobileFilterSection,
}) {
  const location = useLocation();
  const isNetworkingOrAccount =
    location.pathname.includes("networking") ||
    location.pathname.includes("account");
  const breakpoint = isNetworkingOrAccount ? bpMap.midpoint : bpMap.tablet;
  const isMobile = useToggleDisplayMQ(breakpoint);

  const mobileButtonClasses = clsx({
    [styles.mobileFilterButton]: !isNetworkingOrAccount,
    [styles.mobileFilterButtonNetworking]: isNetworkingOrAccount,
  });

  const mobileChevronIconClasses = clsx({
    [styles.mobileFilterButtonIcon]: true,
    [styles.mobileFilterButtonIconOpened]: isMobileFilterOpen,
  });

  if (!isMobile) {
    return null;
  }

  return (
    <button onClick={toggleMobileFilterSection} className={mobileButtonClasses}>
      <span>Filters</span>
      <img
        className={mobileChevronIconClasses}
        src={"/images/icons/chevron-down.svg"}
        alt=""
        role="presentation"
      />
    </button>
  );
}

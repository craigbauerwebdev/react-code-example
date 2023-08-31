import React, { Suspense, lazy, useEffect, useState } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import ConfigService from "services/ConfigService";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import lodash from "lodash";
import { profileTimezoneValues } from "util/profileTimezoneValues";
import { useSelector } from "react-redux";

const CalendarHolder = lazy(() => import("./CalendarHolder"));

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Calendar
 * Calendar page
 */
const CalendarPage = () => {
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const [userTimezone, setUserTimezone] = useState(null);
  const defaultSetting = ConfigService.runValues.enableUserBrowserTimezone;

  // Get users profile setting for timezone or use env var defaults.
  useEffect(() => {
    if (!lodash.isEmpty(accountProfile)) {
      if (accountProfile.useEventTimezone !== profileTimezoneValues.DEFAULT) {
        setUserTimezone(
          accountProfile.useEventTimezone === profileTimezoneValues.INACTIVE
        );
      } else {
        setUserTimezone(defaultSetting);
      }
    }
  }, [accountProfile, defaultSetting]);

  useEffect(() => {
    if (!user && lodash.isEmpty(accountProfile)) {
      setUserTimezone(defaultSetting);
    }
  }, [user, defaultSetting, accountProfile]);

  // Wait for userTimezone to resolve before loading page.
  if (userTimezone === null) {
    return <Loader />;
  }

  return (
    <div>
      <Meta pageTitle="Calendar" />
      <BannerWrapper pageName="calendar" />
      <Suspense fallback={<Loader />}>
        {userTimezone && <CalendarHolder userTimezone={userTimezone} />}
      </Suspense>
    </div>
  );
};

export default CalendarPage;

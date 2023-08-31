import React, { useEffect, useState } from "react";

import Attendees from "Components/Attendees/Attendees";
import BannerWrapper from "Components/Banners/BannerWrapper";
import ConfigService from "services/ConfigService";
import ExhibitorList from "./ExhibitorList";
import Loader from "Components/Loader";
import MasterDetail from "../MasterDetail/MasterDetail";
import { Suspense } from "react";
import Webinars from "../Network/Webinars/Webinars";
import formatNavData from "util/formatNavData";
import networkingStyles from "./scss/networking-page.module.scss";
import useGetPageByPathname from "hooks/useGetPageByPathname";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const components = {
  recommended: Webinars,
  showcases: ConfigService.runValues.hasShowcases ? Webinars : null,
  attendees: Attendees,
  exhibitors: ConfigService.runValues.hasExhibitors ? ExhibitorList : null,
};

const NetworkPage = () => {
  const blockedRoutes = useSelector(
    (state) => state.global.permissions.blockedNetworkRoutes
  );
  const topNav = useSelector((state) => state.global.topNav);
  const { heroBannerName } = useGetPageByPathname();
  const [nav, setNav] = useState(null);

  useEffect(() => {
    if (topNav) {
      setNav(formatNavData(topNav.networking));
    }
  }, [topNav]);

  if (!nav) {
    return null;
  }

  return (
    <div className={networkingStyles.background}>
      <BannerWrapper pageName={heroBannerName} key={heroBannerName} />
      <div className={networkingStyles.main}>
        <div className={networkingStyles.networkingPage}>
          <Suspense fallback={<Loader />}>
            <h1 className={networkingStyles.h1}>Network</h1>
            <MasterDetail
              baseRoute="/networking"
              routes={nav}
              components={components}
              blockedRoutes={blockedRoutes}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NetworkPage);

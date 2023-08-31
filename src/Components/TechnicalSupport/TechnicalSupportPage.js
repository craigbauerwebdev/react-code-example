import BannerWrapper from "Components/Banners/BannerWrapper";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner.js";
import Meta from "Components/Meta";
import React from "react";
import TechnicalSupportForm from "./TechnicalSupportForm.js";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner.js";
import staticData from "./TechnicalSupport.data.js";
import technicalSupportStyles from "./scss/technical-support.module.scss";
import useGetPageByPathname from "hooks/useGetPageByPathname.js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Renders the Technical Support Form as a stand-alone page.
 * A referrer URL can be assigned as a URL param whether you link to this page.
 *
 * Example:
 * /support?referrer=/exhibitors will set /exhibitors as the referrer URL
 */
const TechnicalSupportPage = () => {
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const {
    heroBannerName,
    towerBannerName,
    horizontalBannerName,
  } = useGetPageByPathname();
  const query = new URLSearchParams(useLocation().search);
  const referrerUrl = query.get("referrer");

  return (
    <React.Fragment>
      <Meta pageTitle={staticData.technicalSupportFormTitle} />
      <BannerWrapper pageName={heroBannerName} />
      <div className={technicalSupportStyles.supportPageWrapper}>
        <VerticalSponsorBanner pageName={towerBannerName} />
        <TechnicalSupportForm user={user} referrerUrl={referrerUrl} />
        <HorizontalSponsorBanner pageName={horizontalBannerName} />
      </div>
    </React.Fragment>
  );
};

export default TechnicalSupportPage;

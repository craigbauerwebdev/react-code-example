import BannerWrapper from "Components/Banners/BannerWrapper";
import ConfigService from "services/ConfigService";
// import CalendarHolder from "Components/CalendarView/CalendarHolder";
import FeaturedPosters from "Components/Poster/FeaturedPosters";
import FeaturedSessions from "../Session/FeaturedSessions";
import FeaturedSpeakers from "../Speaker/FeaturedSpeakers";
import Feed from "./Feed";
import HorizontalSponsorBanner from "../Banners/HorizontalSponsorBanner";
import LinkPageWrapper from "./LinkPageWrapper";
import Meta from "../Meta";
import MetaTags from "react-meta-tags";
import NowPlaying from "../NowPlaying/NowPlaying";
import React from "react";
import VerticalSponsorBanner from "../Banners/VerticalSponsorBanner";
import mainStyles from "./scss/main.module.scss";
import useSaveBreadcrumbs from "hooks/useSaveBreadcrumbs";
import { useSelector } from "react-redux";

const Main = () => {
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  useSaveBreadcrumbs();

  return (
    <div>
      <Meta pageTitle="" />
      <MetaTags>
        <script type="text/javascript">
          {`ADRUM.command("addUserData", "username", "${user?.email}");`}
        </script>
      </MetaTags>
      <h1 className="sr-only">Homepage</h1>
      <BannerWrapper pageName="homepage" />
      <div className={mainStyles.mainWrapper}>
        <div className={mainStyles.homepageMidTop}>
          {/* <LinkPageCards /> */}
          <LinkPageWrapper />
          <VerticalSponsorBanner pageName="homepage" />
        </div>
        <div className={mainStyles.homeNowPlaying}>
          <NowPlaying />
          <Feed />
        </div>
        <HorizontalSponsorBanner
          pageName="homepage"
          intervalName="middle-banner"
        />
        {/* <CalendarHolder /> */}
        <FeaturedSessions byDay />
        <FeaturedSpeakers byDay />
        {ConfigService.runValues.hasPosters && <FeaturedPosters byDay />}
        <HorizontalSponsorBanner
          pageName="homepage_bottom"
          intervalName="bottom-banner"
        />
      </div>
    </div>
  );
};

export default Main;

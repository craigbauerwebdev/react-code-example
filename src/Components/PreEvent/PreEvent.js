import React, { Fragment, Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "../Meta";
import preEventStyles from "./scss/pre-event.module.scss";

const About = lazy(() => import("./About"));
const PreEventSessionsList = lazy(() => import("./PreEventSessionsList"));
const FAQs = lazy(() => import("Components/FAQ/FAQs"));
const SponsorCards = lazy(() => import("./SponsorCards"));

const PreEvent = () => {
  return (
    <Fragment>
      <Meta pageTitle="PreEvent" />
      <BannerWrapper pageName="pre_event" />
      <Suspense
        fallback={
          <div className={preEventStyles.main}>
            <Loader />
          </div>
        }
      >
        <div className={preEventStyles.main}>
          <About />
          <PreEventSessionsList />
          <FAQs preevent pageName="preevent" />
          <SponsorCards />
        </div>
      </Suspense>
    </Fragment>
  );
};

export default PreEvent;

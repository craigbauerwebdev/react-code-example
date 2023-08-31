import React, { Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "../Meta";
import { capitalize } from "lodash";
import speakersStyles from "./scss/speakers.module.scss";

const SpeakersList = lazy(() => import("./SpeakersList"));

const Speakers = () => {
  return (
    <div>
      <BannerWrapper pageName="speakers" />
      <div className={speakersStyles.mainWrapper}>
        <Meta
          pageTitle={capitalize(
            process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
          )}
        />
        <Suspense fallback={<Loader />}>
          <SpeakersList />
        </Suspense>
      </div>
    </div>
  );
};

export default Speakers;

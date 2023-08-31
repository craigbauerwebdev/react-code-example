import React, { Suspense, lazy } from "react";

// import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import matchMakingStyles from "./scss/match-making.module.scss";

const MatchMaking = lazy(() => import("./MatchMaking"));
export default function MatchMakingPage() {
  return (
    <div>
      <Meta pageTitle="Matchmaking" />
      {/* <BannerWrapper pageName="matchmaking" /> */}
      <Suspense
        fallback={
          <div className={matchMakingStyles.loaderHolder}>
            <Loader />
          </div>
        }
      >
        <MatchMaking />
      </Suspense>
    </div>
  );
}

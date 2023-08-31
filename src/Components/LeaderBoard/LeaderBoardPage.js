import React, { Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import leaderBoarderStyles from "./scss/leader-board.module.scss";

const LeaderBoard = lazy(() => import("./LeaderBoard"));

const LeaderBoardPage = () => {
  return (
    <div>
      <BannerWrapper pageName="leaderboard" />
      <Meta pageTitle="Leaderboard" />
      <div className={leaderBoarderStyles.holder}>
        <Suspense fallback={<Loader />}>
          <LeaderBoard />
        </Suspense>
      </div>
    </div>
  );
};

export default LeaderBoardPage;

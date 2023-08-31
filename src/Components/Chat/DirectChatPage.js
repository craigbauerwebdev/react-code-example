import React, { Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "../Meta";
import directChatPageStyles from "./scss/direct-chat-page.module.scss";

const DirectChat = lazy(() => import("./DirectChat"));

const DirectChatPage = ({ match }) => {
  return (
    <div>
      <Meta pageTitle="Channel Chat" />
      <BannerWrapper pageName="chat" />
      <div className={directChatPageStyles.chatPageWrapper}>
        <Suspense fallback={<Loader loaderType="chat" />}>
          <DirectChat match={match} />
        </Suspense>
      </div>
    </div>
  );
};

export default DirectChatPage;

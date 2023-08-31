import React, { Fragment, Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "../Meta";
import sessionsStyles from "./scss/sessions.module.scss";
import useGetPageByPathname from "hooks/useGetPageByPathname";

const SessionsList = lazy(() => import("./SessionsList"));

export default function Sessions() {
  const { pageTitle, heroBannerName } = useGetPageByPathname();
  return (
    <Fragment>
      <BannerWrapper pageName={heroBannerName} />
      <div className={sessionsStyles.main} aria-label="Sessions List">
        <Meta pageTitle={pageTitle} />
        <Suspense fallback={<Loader />}>
          <SessionsList key={window.location.href} />
        </Suspense>
      </div>
    </Fragment>
  );
}

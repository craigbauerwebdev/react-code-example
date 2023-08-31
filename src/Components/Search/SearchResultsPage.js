import React, { Fragment, Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import resultsStyles from "./scss/results.module.scss";
import useGetPageByPathname from "hooks/useGetPageByPathname";

const Results = lazy(() => import("./Results"));

const SearchResultsPage = () => {
  const { heroBannerName, pageTitle } = useGetPageByPathname();
  return (
    <Fragment>
      <Meta pageTitle={pageTitle} />
      <BannerWrapper pageName={heroBannerName} />
      <div className={resultsStyles.main}>
        <Suspense fallback={<Loader />}>
          <Results />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default SearchResultsPage;

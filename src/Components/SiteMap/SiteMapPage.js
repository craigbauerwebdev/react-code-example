import React, { Fragment, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import Meta from "Components/Meta";
import SiteMap from "./SiteMap";
import { dataTypes } from "store/utils/dataTypes";
import formatNavData from "util/formatNavData";
import { getPayload } from "store/actions";

const SiteMapPage = () => {
  const dispatch = useDispatch();
  const topNav = useSelector((state) => state.global.topNav);
  const [siteMap, setSiteMap] = useState(null);

  useEffect(() => {
    if (!topNav) {
      dispatch(getPayload(dataTypes.topNav));
    } else {
      setSiteMap(formatNavData(topNav.mainNav));
    }
  }, [dispatch, topNav]);

  if (!siteMap) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Meta pageTitle="Sitemap" />
      <Suspense fallback={<Loader />}>
        <SiteMap nav={siteMap} />
      </Suspense>
    </Fragment>
  );
};

export default SiteMapPage;

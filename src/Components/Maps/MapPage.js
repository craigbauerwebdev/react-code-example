import React, { Suspense, lazy } from "react";

// import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import mapStyles from "./scss/maps.module.scss";

const Map = lazy(() => import("./Map"));

export default function MapPage() {
  return (
    <div>
      <Meta pageTitle="Map" />
      {/* <BannerWrapper pageName="map" /> */}
      <Suspense
        fallback={
          <div className={mapStyles.loaderHolder}>
            <Loader />
          </div>
        }
      >
        <Map />
      </Suspense>
    </div>
  );
}

import React, { lazy } from "react";

import { Fragment } from "react";
import Meta from "Components/Meta";

const FavoritesList = lazy(() => import("./FavoritesList"));
const FavoritesListPage = ({ mobileFilter }) => {
  return (
    <Fragment>
      <Meta pageTitle="My Favorites" />
      <FavoritesList mobileFilter={mobileFilter} />
    </Fragment>
  );
};

export default FavoritesListPage;

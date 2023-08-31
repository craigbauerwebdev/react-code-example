import React, { lazy } from "react";

import { Fragment } from "react";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import { useSelector } from "react-redux";

const Notifications = lazy(() => import("./Notifications"));
const NotificationsPage = () => {
  const permissions = useSelector((state) => state.global.permissions);

  if (!permissions.allowNotifications) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Meta pageTitle="Notifications" />
      <Notifications />
    </Fragment>
  );
};

export default NotificationsPage;

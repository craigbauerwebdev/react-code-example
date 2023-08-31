import AccountProfilePage from "./AccountProfilePage";
import AvailabilityPage from "./AvailabilityPage";
import BannerWrapper from "Components/Banners/BannerWrapper";
import BlockedUsersPage from "../BlockedUser/BlockedUsersPage";
import FavoritesListPage from "Components/Favorites/FavoritesListPage";
import Loader from "Components/Loader";
import MasterDetail from "../MasterDetail/MasterDetail";
import NotificationsPage from "../UserNotification/NotificationsPage";
import React from "react";
import RepresentativeSetupPage from "./RepresentativeSetupPage";
import SchedulePage from "Components/Schedule/SchedulePage";
import SettingsPage from "Components/Settings/SettingsPage";
import StaticData from "../../util/staticData/Components/Profile/Subnav.data";
import { Suspense } from "react";
import WebinarSetupPage from "./WebinarSetupPage";
import profilePageStyles from "./scss/profile-page.module.scss";
import useGetPageByPathname from "hooks/useGetPageByPathname";
import { useSelector } from "react-redux";

const components = {
  profile: AccountProfilePage,
  settings: SettingsPage,
  schedule: SchedulePage,
  favorites: FavoritesListPage,
  notifications: NotificationsPage,
  availability: AvailabilityPage,
  "representative-setup": RepresentativeSetupPage,
  "product-showcase-setup": WebinarSetupPage,
  "blocked-users": BlockedUsersPage,
  //"muted-users": BlockedUsersPage,
};

const ProfilePage = () => {
  const { heroBannerName } = useGetPageByPathname();
  const blockedRoutes = useSelector(
    (state) => state.global.permissions.blockedProfileRoutes
  );
  return (
    <div className={profilePageStyles.background}>
      <BannerWrapper pageName={heroBannerName} key={heroBannerName} />
      <div className={profilePageStyles.main}>
        <Suspense fallback={<Loader />}>
          <div className={profilePageStyles.profilePage}>
            <MasterDetail
              heading={
                <h1 className={profilePageStyles.accountHeading}>Account</h1>
              }
              baseRoute="/account"
              routes={StaticData}
              components={components}
              blockedRoutes={blockedRoutes}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;

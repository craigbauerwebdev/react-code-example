import React, { useState } from "react";

import HeaderOEPLink from "./HeaderOEPLink";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import LoginButton from "./LoginButton";
import LogoutRegisterBtn from "./LogoutRegisterBtn";
import MessagesList from "Components/Chat/MessagesList";
import MobileHeaderDropdown from "./MobileHeaderDropdown";
import NotificationIcon from "./NotificationIcon";
import OEPAnalytics from "Components/OEPAnalytics";
import ProfileLink from "./ProfileLink";
import SearchButton from "./SearchButton";
import checkNetworkingPermissions from "../../util/checkNetworkingPermissions";
import getAnalyticsPage from "util/getAnalyticsPage";
import mobileHeaderStyles from "./scss/mobile.module.scss";
import sharedHeaderStyle from "./scss/shared.module.scss";
import { useLocation } from "react-router-dom";
import useNavGuarding from "hooks/useNavGuarding";
import { useSelector } from "react-redux";

const MobileHeader = ({ nav, logo }) => {
  const location = useLocation();
  /** @type {User} */
  const permissions = useSelector((state) => state.global.permissions);
  const user = useSelector((state) => state.global.user);
  const preEvent = useSelector((state) => state.global.isPreventOn);
  const [openMenu, setOpenMenu] = useState(false);
  const blockedNetworkRoutes = useSelector(
    (state) => state.global.permissions.blockedNetworkRoutes
  );
  const navData = useNavGuarding(nav, blockedNetworkRoutes);
  const chatClientStore = useSelector((state) => state.chat.chatClient);
  const enableNotifications = useSelector(
    (state) => state.global.networkSettings?.enableNotifications
  );
  /**
   * Nav template
   * <MobileHeaderNavItem>
      <HeaderOEPLink href="/" onClick={this.toggleMenu}>
        Nav Item
      </HeaderOEPLink>
    </MobileHeaderNavItem>
   * @param {*} nav
   */

  const allowChat = () => {
    if (preEvent || !user || !chatClientStore) {
      //if event is preEvent, or there is no user set, or if the chat client is not set, return false
      return false;
    }
    //if the above checks pass, use a util to check the user's permissions
    return checkNetworkingPermissions(permissions).directChat;
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const getNav = (nav) => {
    if (preEvent) {
      return null;
    }

    return navData.map((navItem, i) => {
      if (!navItem.submenus) {
        return (
          <HeaderOEPLink
            href={navItem.link}
            onClick={toggleMenu}
            key={navItem.menuLabel}
            className={mobileHeaderStyles.mainLink}
          >
            <span dangerouslySetInnerHTML={{ __html: navItem.menuLabel }} />
          </HeaderOEPLink>
        );
      }

      return (
        <MobileHeaderDropdown
          title={navItem.menuLabel}
          tabName={`tab${i + 1}`}
          key={navItem.menuLabel}
        >
          {/* For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip */}
          {navItem.submenus.map((subItem) => (
            <HeaderOEPLink
              href={subItem.link}
              key={subItem.menuLabel}
              onClick={toggleMenu}
              grip={subItem.type === "grip"}
            >
              <span dangerouslySetInnerHTML={{ __html: subItem.menuLabel }} />
            </HeaderOEPLink>
          ))}
        </MobileHeaderDropdown>
      );
    });
  };

  return (
    <div
      className={`${mobileHeaderStyles.headerContainer} ${
        preEvent ? mobileHeaderStyles.preEvent : ""
      }`}
    >
      <section className={mobileHeaderStyles.mobileInnerHolder}>
        <div className={mobileHeaderStyles.headerLogoWrapper}>
          <LinkWrapper
            className={sharedHeaderStyle.headerLogo}
            onClick={closeMenu}
            to={logo.link}
            external={logo.target === "_blank"}
            page={getAnalyticsPage(location.pathname)}
            componentType="Logo"
            trackingUrl={logo.link}
            componentName="oep logo"
          >
            <img src={logo.imageURL} alt={logo.altText} />
          </LinkWrapper>
        </div>
        <OEPAnalytics
          componentType="Button"
          page={getAnalyticsPage(location.pathname)}
          url={`${!openMenu ? "Open Menu" : "Close Menu"}`}
          componentName="Toggle Primary Menu"
        >
          <button
            className={mobileHeaderStyles.imgButton}
            onClick={toggleMenu}
            title="Toggle Primary Menu"
          >
            <img
              className={mobileHeaderStyles.hamburgerIcon}
              alt="Toggle Primary Menu"
              src="/images/icons/menu.png"
            />
          </button>
        </OEPAnalytics>
      </section>
      {openMenu && (
        <nav aria-label="Primary" role="navigation">
          {getNav(nav)}
          <div className={mobileHeaderStyles.userActionItems}>
            <LogoutRegisterBtn />
            {!user && <LoginButton onClick={toggleMenu} />}
            {!preEvent && <SearchButton onClick={toggleMenu} page="Header" />}
            {allowChat() && <MessagesList />}
            {!preEvent && user && enableNotifications && (
              <NotificationIcon mobile={true} />
            )}
            {user && (
              <div className={mobileHeaderStyles.profileLink}>
                <ProfileLink onClick={closeMenu} />
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileHeader;

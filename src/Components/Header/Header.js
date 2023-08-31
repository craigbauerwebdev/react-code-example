import HeaderDropdown from "./HeaderDropdown";
import HeaderOEPLink from "./HeaderOEPLink";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import LoginButton from "./LoginButton";
import LogoutRegisterBtn from "./LogoutRegisterBtn";
import MessagesList from "Components/Chat/MessagesList";
import NotificationIcon from "./NotificationIcon";
import ProfileLink from "./ProfileLink";
import React from "react";
import SearchButton from "./SearchButton";
import checkNetworkingPermissions from "../../util/checkNetworkingPermissions";
import getAnalyticsPage from "util/getAnalyticsPage";
import headerStyles from "./scss/desktop.module.scss";
import lodash from "lodash";
import sharedStyles from "./scss/shared.module.scss";
import { useLocation } from "react-router-dom";
import useNavGuarding from "hooks/useNavGuarding";
import { useSelector } from "react-redux";

export const Header = ({ nav, logo }) => {
  /** @type {User} */
  const location = useLocation();
  const permissions = useSelector((state) => state.global.permissions);
  const user = useSelector((state) => state.global.user);
  const preEvent = useSelector((state) => state.global.isPreventOn);
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
   * <HeaderNavItem><HeaderOEPLink href="/">Nav Item</HeaderOEPLink></HeaderNavItem>
   *
   */

  const allowChat = () => {
    if (preEvent || !user || !chatClientStore) {
      //if event is preEvent, or there is no user set, or if the chat client is not set, return false
      return false;
    }
    //if the above checks pass, use a util to check the user's permissions
    return checkNetworkingPermissions(permissions).directChat;
  };

  const getNav = () => {
    if (lodash.isEmpty(nav)) {
      return null;
    }

    return (
      <ul className={`${headerStyles.mainNav}`}>
        {navData?.map((item, i) => {
          if (!item.submenus) {
            return (
              <li key={item.menuLabel} role="none">
                <HeaderOEPLink
                  href={item.link}
                  key={item.menuLabel}
                  className={headerStyles.mainLink}
                  role="menuitem"
                >
                  <span dangerouslySetInnerHTML={{ __html: item.menuLabel }} />
                </HeaderOEPLink>
              </li>
            );
          }
          return (
            <li key={item.menuLabel} role="none">
              {" "}
              <HeaderDropdown
                title={item.menuLabel}
                tabName={`tab${i + 1}`}
                key={item.menuLabel}
              >
                <ul
                  id={`menu-tab${i + 1}`}
                  role="menu"
                  aria-labelledby={`menu-button-tab${i + 1}`}
                >
                  {item.submenus.map((dropdown) => (
                    // For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
                    <li key={dropdown.menuLabel} role="menuitem">
                      <HeaderOEPLink
                        href={dropdown.link}
                        key={dropdown.menuLabel}
                        grip={dropdown.type === "grip"}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: dropdown.menuLabel,
                          }}
                        />
                      </HeaderOEPLink>
                    </li>
                  ))}
                </ul>
              </HeaderDropdown>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={`${headerStyles.headerContainer} ${
        preEvent ? headerStyles.preEvent : ""
      }`}
    >
      <div className={headerStyles.headerInterior}>
        <div className={headerStyles.headerLogoWrapper}>
          {logo.link && (
            <LinkWrapper
              className={`${sharedStyles.headerLogo} ${
                preEvent && sharedStyles.preEvent
              }`}
              to={logo.link}
              external={logo.target === "_blank"}
              page={getAnalyticsPage(location.pathname)}
              componentType="Logo"
              trackingUrl={logo.link}
              componentName="oep logo"
            >
              <img src={logo.imageURL} alt={logo.altText} />
            </LinkWrapper>
          )}
        </div>
        <nav
          className={headerStyles.headerInteriorRight}
          aria-label="Primary"
          role="navigation"
        >
          {getNav()}
          <LogoutRegisterBtn user={user} />
          {!user && <LoginButton />}
          <div className={headerStyles.iconHolder}>
            {!preEvent && <SearchButton page="Header" />}
            {allowChat() && <MessagesList />}
            {/*
             * Show notification icon when event level notifications is on
             * regardless of any other attendee/exhibitor/event network flag
             */}
            {!preEvent && user && enableNotifications && (
              <NotificationIcon mobile={false} />
            )}
          </div>
          {!preEvent && user && (
            <div className={headerStyles.avatar}>
              <ProfileLink />
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

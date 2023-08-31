import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import siteMapStyles from "./scss/sitemap.module.scss";
import useNavGuarding from "hooks/useNavGuarding";
import { useSelector } from "react-redux";

const SiteMap = ({ nav }) => {
  const blockedNetworkRoutes = useSelector(
    (state) => state.global.permissions.blockedNetworkRoutes
  );
  const navData = useNavGuarding(nav, blockedNetworkRoutes);
  const getTitle = (title, link, linkType) => {
    if (link) {
      // For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
      return (
        <LinkWrapper
          to={link}
          external={linkType === "_blank"}
          grip={linkType === "grip"}
          componentName={title}
        >
          {title}
        </LinkWrapper>
      );
    }

    return title;
  };

  return (
    <div className={siteMapStyles.sitemap}>
      <h1 className={siteMapStyles.title}>Site Map</h1>
      <div className={siteMapStyles.holder}>
        {navData.map((nav) => (
          <div className={siteMapStyles.linkList} key={nav.menuLabel}>
            <h3>{getTitle(nav.menuLabel, nav.link, nav.type)}</h3>
            {nav.submenus && (
              <ul>
                {nav.submenus.map((item) => (
                  // For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
                  <li key={item.menuLabel}>
                    <LinkWrapper
                      to={item.link}
                      external={item.type === "_blank"}
                      grip={item.type === "grip"}
                    >
                      {item.menuLabel}
                    </LinkWrapper>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteMap;

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import getAnalyticsPage from "util/getAnalyticsPage";
import lodash from "lodash";
import { useLocation } from "react-router-dom";

const FooterLegalList = ({ list }) => {
  const location = useLocation();
  const getCopyRight = () => {
    const d = new Date();
    const copy = `&copy; ${d.getFullYear()} `;

    return <span dangerouslySetInnerHTML={{ __html: copy }} />;
  };

  if (lodash.isEmpty(list)) {
    return null;
  }

  return (
    <ul>
      {list.map((item) => {
        if (item.link) {
          return (
            <li key={item.menuLabel}>
              <LinkWrapper
                to={item.link}
                external={item.external}
                page={getAnalyticsPage(location.pathname)}
                componentType="Link"
                trackingUrl={item.link}
                componentName={item.menuLabel}
              >
                <span dangerouslySetInnerHTML={{ __html: item.menuLabel }} />
              </LinkWrapper>
            </li>
          );
        }

        return (
          <li key={item.menuLabel}>
            {item.copyRight && getCopyRight()}
            <span dangerouslySetInnerHTML={{ __html: item.menuLabel }} />
          </li>
        );
      })}
    </ul>
  );
};

export default FooterLegalList;

FooterLegalList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      menuLabel: PropTypes.string,
      link: PropTypes.string,
    })
  ),
};

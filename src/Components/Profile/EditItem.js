import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import accountProfileStyles from "./scss/account-profile.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";

/**
 * TODO: fill out prop types
 * @param {*} param0
 */
const EditItem = ({
  label,
  name,
  link,
  url,
  className,
  external,
  replaceName,
  noMargin,
  wordBreak,
}) => {
  const location = useLocation();
  return (
    <div className={className}>
      <div className={accountProfileStyles.labels}>{label}</div>
      {!link && (
        <div className={`${!noMargin ? accountProfileStyles.name : ""}`}>
          {name}
        </div>
      )}
      {link && (
        <div style={wordBreak ? { wordBreak: "break-all" } : null}>
          <LinkWrapper
            to={link}
            page={getAnalyticsPage(location.pathname)}
            componentType="Link"
            trackingUrl={url}
            componentName={replaceName ? "attendee website link" : name}
            external={external}
          >
            {name}
          </LinkWrapper>
        </div>
      )}
    </div>
  );
};

export default EditItem;

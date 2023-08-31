import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import viewAllStyles from "./scss/view-all.module.scss";

const ViewAll = ({ homepage, data, path, type, isTextLink }) => {
  if (!homepage && !data.length) {
    return null;
  }
  return (
    <div
      className={
        isTextLink
          ? viewAllStyles.paginateContainer
          : viewAllStyles.paginateButtonContainer
      }
    >
      <LinkWrapper
        to={path}
        page="homepage"
        componentType="button"
        trackingUrl={path}
        componentName="view all"
      >
        View All
      </LinkWrapper>
    </div>
  );
};

export default ViewAll;

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import ReactTooltip from "react-tooltip";
import SvgTypes from "Components/SVG/SvgTypes";
import getAnalyticsPage from "util/getAnalyticsPage";
import sharedStyles from "./scss/shared.module.scss";
import { useLocation } from "react-router-dom";

const SearchButton = ({ onClick }) => {
  const location = useLocation();
  return (
    <>
      <LinkWrapper
        data-tip={"Search Site"}
        to="/search"
        className={sharedStyles.searchIcon}
        onClick={onClick}
        title="Search Site"
        aria-label="Search Site"
        page={getAnalyticsPage(location.pathname)}
        componentType="Icon"
        trackingUrl="Search"
        componentName="Search"
      >
        <SvgTypes name="search" />
      </LinkWrapper>
      <ReactTooltip />
    </>
  );
};

SearchButton.propTypes = {
  onClick: PropTypes.func,
};

SearchButton.defaultProps = {
  onClick: () => {},
};

export default SearchButton;

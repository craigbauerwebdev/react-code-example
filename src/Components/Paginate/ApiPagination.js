import React, { useEffect } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import paginationStyles from "./scss/api-pagination.module.scss";
import { searchActionTypes } from "Components/AttendeeSearch/AttendeeSearchReducer";
import { useQueryState } from "use-location-state";

/**
 * Dynamic pagination for algolia search results
 * @param {number} totalPages
 * @param {number} currentPage
 * @param {function} dispatchSearchState
 * @param {string} pageTitle
 */
const Pagination = ({
  totalPages,
  currentPage,
  dispatchSearchState,
  listRef,
  pageTitle,
}) => {
  const [currentUrlPage, updateCurrentUrlPage] = useQueryState("Page", 0);

  const changePage = (pageVal) => {
    window.scrollTo(0, 0);
    listRef.current.focus();
    // Change page on button click
    dispatchSearchState({
      type: searchActionTypes.SET_PAGE,
      payload: pageVal,
    });
    updateCurrentUrlPage(pageVal);
  };

  useEffect(() => {
    if (currentPage !== currentUrlPage) {
      changePage(currentUrlPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={paginationStyles.holder}>
      {currentPage > 0 && (
        <OEPAnalytics
          page={pageTitle}
          componentType="Button"
          url="View previous page"
          componentName="View previous page"
        >
          <button
            className={`${paginationStyles.page} ${
              currentPage === 0 && paginationStyles.hidden
            }`}
            type="button"
            onClick={changePage.bind(
              null,
              currentPage > 0 ? currentPage - 1 : null
            )}
            tabIndex={currentPage === 0 ? -1 : 0}
            aria-hidden={currentPage === 0}
            aria-label={`Go to Previous ${pageTitle}`}
          >
            <SvgTypes name="pagination-arrow-left" />
            <span>Previous</span>
          </button>
        </OEPAnalytics>
      )}
      {currentPage + 1 < totalPages && (
        <OEPAnalytics
          page={`${pageTitle}`}
          componentType="Button"
          url="View next page"
          componentName="View next page"
        >
          <button
            aria-label={`Go to Next ${pageTitle}`}
            className={`${paginationStyles.page} ${
              currentPage === totalPages - 1 && paginationStyles.hidden
            }`}
            type="button"
            onClick={changePage.bind(null, currentPage + 1)}
            tabIndex={currentPage === totalPages - 1 ? -1 : 0}
            aria-hidden={currentPage === totalPages - 1}
          >
            <span>Next</span>
            <SvgTypes name="pagination-arrow-right" />
          </button>
        </OEPAnalytics>
      )}
    </div>
  );
};

export default Pagination;

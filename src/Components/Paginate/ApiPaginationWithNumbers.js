import React, { Fragment, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import styles from "./scss/api-pagination.module.scss";

const MAX_VISIBLE_PAGES = 6;
const SCROLL_DOWN_AT = 2;
const SCROLL_UP_AT = 3;

/**
 * Pagination with number < 1,2,3 .. >
 * Prototype for dynamic data not being used
 * @param {number} totalPages
 * @param {number} currentPage
 * @param {number} setCurrentPage
 */
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const getArrayInRange = (min, size) => {
    return [...Array(size).keys()].map((i) => i + min);
  };
  const getInitialPagesToDisplay = () => {
    return getArrayInRange(0, Math.min(totalPages, MAX_VISIBLE_PAGES));
  };
  const [pagesToDisplay, setPagesToDisplay] = useState(
    getInitialPagesToDisplay()
  );

  if (totalPages > MAX_VISIBLE_PAGES) {
    const index = pagesToDisplay.indexOf(currentPage);

    if (index === -1) {
      const getTopPage = () => {
        const topPage = Math.min(totalPages - 1, currentPage + SCROLL_UP_AT);

        if (topPage < MAX_VISIBLE_PAGES - 1) {
          return MAX_VISIBLE_PAGES - 1;
        }

        return topPage;
      };

      setPagesToDisplay(
        getArrayInRange(getTopPage() - MAX_VISIBLE_PAGES + 1, MAX_VISIBLE_PAGES)
      );
    } else {
      if (index < SCROLL_DOWN_AT || index > SCROLL_UP_AT) {
        let bottomPage = Math.max(0, currentPage - SCROLL_DOWN_AT);
        let size = Math.min(totalPages - bottomPage, MAX_VISIBLE_PAGES);
        if (size < MAX_VISIBLE_PAGES && totalPages > MAX_VISIBLE_PAGES) {
          bottomPage = totalPages - MAX_VISIBLE_PAGES;
          size = MAX_VISIBLE_PAGES;
        }
        if (bottomPage !== pagesToDisplay[0]) {
          setPagesToDisplay(getArrayInRange(bottomPage, size));
        }
      }
    }
  }

  return (
    <Fragment>
      {!pagesToDisplay.includes(0) && (
        <OEPAnalytics
          componentType="Button"
          page="Pagination"
          url="View first page"
          componentName="View first page"
        >
          <button
            className={`${styles.page}`}
            onClick={() => setCurrentPage(0)}
          >
            First
          </button>
        </OEPAnalytics>
      )}
      {pagesToDisplay.map((i) => {
        return (
          <OEPAnalytics
            componentType="Button"
            page="Pagination"
            url="View next page"
            componentName="View next page"
          >
            <button
              className={`
                ${styles.page}
                ${currentPage === i ? styles.pageActive : ""}
              `}
              disabled={currentPage === i}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
          </OEPAnalytics>
        );
      })}
      {!pagesToDisplay.includes(totalPages - 1) && (
        <OEPAnalytics
          componentType="Button"
          page="Pagination"
          url="View previous page"
          componentName="View previous page"
        >
          <button
            className={`${styles.page}`}
            onClick={() => setCurrentPage(totalPages - 1)}
          >
            Last
          </button>
        </OEPAnalytics>
      )}
    </Fragment>
  );
};

export default Pagination;

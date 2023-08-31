import React, { useEffect } from "react";

import OEPAnalytics from "../OEPAnalytics";
import PropTypes from "prop-types";
import SvgTypes from "Components/SVG/SvgTypes";
import { actionTypesPagination } from "./reducer";
import paginateStyles from "./scss/paginate.module.scss";
import { useQueryState } from "use-location-state";

export const Paginate = ({
  large,
  total,
  inc = 10,
  startIndex,
  dispatch,
  listRef,
  pageTitle,
  page,
}) => {
  const [currentStartIndex, updateCurrentStartIndex] = useQueryState(
    "PageStartIndex",
    0
  );
  const [currentEndIndex, updateCurrentEndIndex] = useQueryState(
    "PageEndIndex",
    inc
  );
  const multiplePages = total > inc;

  const next = () => {
    window.scrollTo(0, 0);
    listRef.current.focus();

    dispatch({
      type: actionTypesPagination.NEXT_PAGE,
      payload: { total, updateCurrentStartIndex, updateCurrentEndIndex },
    });
  };

  const prev = () => {
    window.scrollTo(0, 0);
    listRef.current.focus();

    dispatch({
      type: actionTypesPagination.PREV_PAGE,
      payload: { total, updateCurrentStartIndex, updateCurrentEndIndex },
    });
  };

  useEffect(() => {
    dispatch({
      type: actionTypesPagination.SET_END,
      payload: inc,
    });
  }, [total, dispatch, inc]);

  // Reset PAGINATION on data change if it is shorted then the inc value
  useEffect(() => {
    if (total < inc) {
      dispatch({
        type: actionTypesPagination.RESET_PAGINATION,
      });
    }
  }, [total, inc, dispatch]);

  useEffect(() => {
    dispatch({
      type: actionTypesPagination.SET_START_AND_END_INDEX,
      payload: { startIndex: currentStartIndex, endIndex: currentEndIndex },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStartIndex, currentEndIndex]);

  // Show nothing if the total is less then the inc
  if (total < inc) {
    return null;
  }

  return large ? (
    <div className={paginateStyles.paginateContainerLarge}>
      {startIndex !== 0 && (
        <OEPAnalytics
          page={page}
          componentType="Button"
          url="View previous page"
          componentName="view previous page"
        >
          <button
            onClick={prev}
            aria-label={`Go to Previous ${pageTitle} Page`}
          >
            <SvgTypes name="pagination-arrow-left" />
            <span>Previous</span>
          </button>
        </OEPAnalytics>
      )}
      {startIndex + inc < total && multiplePages && (
        <OEPAnalytics
          page={page}
          componentType="Button"
          url="View next page"
          componentName="view next page"
        >
          <button onClick={next} aria-label={`Go to Next ${pageTitle} Page`}>
            <span>Next</span>
            <SvgTypes name="pagination-arrow-right" />
          </button>
        </OEPAnalytics>
      )}
    </div>
  ) : (
    <div className={paginateStyles.paginateContainer}>
      {startIndex + inc < total && (
        <OEPAnalytics
          page={page}
          componentType="Button"
          url="View next page"
          componentName="view next page"
        >
          <button onClick={next} aria-label={`Go to Next ${pageTitle} Page`}>
            Next
          </button>
        </OEPAnalytics>
      )}
      {startIndex !== 0 && (
        <OEPAnalytics
          page={page}
          componentType="Button"
          url="View previous page"
          componentName="view previous page"
        >
          <button
            onClick={prev}
            aria-label={`Go to Previous ${pageTitle} Page`}
          >
            Previous
          </button>
        </OEPAnalytics>
      )}
    </div>
  );
};

Paginate.propTypes = {
  large: PropTypes.bool,
  total: PropTypes.number.isRequired,
  inc: PropTypes.number,
};

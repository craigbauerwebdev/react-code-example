import { actionTypesPagination } from "Components/Paginate/reducer";
import lodash from "lodash";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Reset Pagination on clearing of filters
 * @param {function} dispatchPagination
 */
const useClearPagination = (dispatchPagination) => {
  const activeFilterList = useSelector(
    (state) => state.filters.activeFilterList
  );
  useEffect(() => {
    // Reset Pagination on clearing of filters
    if (lodash.isEmpty(activeFilterList)) {
      dispatchPagination({
        type: actionTypesPagination.RESET_PAGINATION,
      });
    }
  }, [activeFilterList, dispatchPagination]);
};

export default useClearPagination;

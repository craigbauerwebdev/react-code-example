import "../../css/kendo/subset.scss";

import React, { Fragment, useEffect, useReducer, useState } from "react";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";
import {
  paginationReducer,
  paginationState,
} from "Components/Paginate/reducer";
import { useDispatch, useSelector } from "react-redux";

import ExhibitorListBody from "./ExhibitorListBody";
import Loader from "Components/Loader";
import MeetingScheduler from "Components/Exhibitor/MeetingScheduler";
import Meta from "Components/Meta";
import MyScheduleDropdown from "Components/Network/Webinars/WebinarContent/MyScheduleDropdown";
import { Paginate } from "../Paginate/Paginate";
import { getPayload } from "store/actions";
import { bpMap } from "util/bpMap";
import exhibitorListStyles from "./scss/exhibitor-list.module.scss";
import { filterDataNonConcatenating } from "../Filters/store/actions";
import { pageTypes } from "Components/Filters/store/reducer";
import representativeSetupStyles from "../Profile/scss/representative-setup.module.scss";
import { setFullList } from "Components/Filters/store/actions";
import sortExhibitors from "util/sortExhibitors";
import useGetPageByPathname from "hooks/useGetPageByPathname";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import { dataTypes } from "store/utils/dataTypes";

const ExhibitorList = ({ mobileFilter }) => {
  const dispatch = useDispatch();
  const isMobile = useToggleDisplayMQ(bpMap.tabletSmall);
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const filteredData = useSelector((state) => state.filters.filteredData);
  const isSearching = useSelector((state) => state.filters.fuzzySearching);

  const pageType = useSelector((state) => state.filters.pageType);
  const [filteredExhibitors, setFilteredExhibitors] = useState([]);
  const [exhibitorToSchedule, setExhibitorToSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  const [exhibitorPaginationState, dispatchPagination] = useReducer(
    paginationReducer,
    paginationState
  );
  const tableRef = React.createRef();
  const { pageTitle } = useGetPageByPathname();

  const toggleMeetingScheduler = (exhibitor) => {
    setExhibitorToSchedule(exhibitorToSchedule ? null : exhibitor);
    if (exhibitorToSchedule) {
      enableParentPageScroll();
    } else {
      disableParentPageScroll();
    }
  };

  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    } else {
      dispatch(
        setFullList({
          data: exhibitors,
          page: pageTypes.EXHIBITOR_NETWORKING,
        })
      );
    }
    setLoading(false);
    if (pageType === pageTypes.WEBINARS) {
      dispatch(filterDataNonConcatenating("clear"));
    }
    setFilteredExhibitors(
      isSearching ? filteredData : filteredData?.sort(sortExhibitors)
    );
  }, [filteredData, exhibitors, dispatch, pageType, isSearching]);

  return (
    <div>
      <Meta pageTitle={pageTitle} />
      <div className={exhibitorListStyles.headerWrapper}>
        <h2 className={exhibitorListStyles.title}>Exhibitors</h2>
        <MyScheduleDropdown />
      </div>
      {mobileFilter()}
      <div className={exhibitorListStyles.main}>
        {!loading ? (
          <Fragment>
            {filteredExhibitors && filteredExhibitors.length > 0 ? (
              <div className={exhibitorListStyles.scrollingContentHolder}>
                <div className={exhibitorListStyles.scrollingContent}>
                  <table
                    className={exhibitorListStyles.table}
                    ref={tableRef}
                    autoFocus={true}
                    tabIndex="-1"
                  >
                    <thead
                      className={`${
                        isMobile && representativeSetupStyles.tableHeader
                      }`}
                    >
                      <tr>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Logo
                        </th>
                        <th scope="col">Exhibitor Name</th>
                        <th scope="col">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <ExhibitorListBody
                      exhibitors={filteredExhibitors}
                      paginationState={exhibitorPaginationState}
                      toggleMeetingScheduler={toggleMeetingScheduler}
                    />
                  </table>
                  <Paginate
                    large
                    inc={20}
                    total={filteredExhibitors.length}
                    startIndex={exhibitorPaginationState.startIndex}
                    dispatch={dispatchPagination}
                    listRef={tableRef}
                    pageTitle="Exhibitors"
                    page="exhibitors list"
                  />
                </div>
                {exhibitorToSchedule && (
                  <MeetingScheduler
                    closeCallback={toggleMeetingScheduler}
                    exhibitor={exhibitorToSchedule}
                    page="Exhibitors List"
                  />
                )}
              </div>
            ) : (
              <p> Sorry there are no results for your search.</p>
            )}
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ExhibitorList;

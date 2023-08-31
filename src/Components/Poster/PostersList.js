import React, { useCallback, useEffect, useReducer, useState } from "react";
import { emptyFilterData, setFullList } from "Components/Filters/store/actions";
import {
  paginationReducer,
  paginationState,
} from "Components/Paginate/reducer";
import sortResults, { sortTypes } from "util/sortResults";
import { useDispatch, useSelector } from "react-redux";

import FilterWrapper from "Components/Filters/FilterWrapper";
import FiltersSectionContainer from "Components/Filters/FiltersSectionContainer";
import FiltersSectionMobileButton from "Components/Filters/FiltersSectionMobileButton";
import FiltersWithSubFilters from "Components/Filters/FiltersWithSubFilters";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import Loader from "Components/Loader";
import { Paginate } from "../Paginate/Paginate";
import { PosterCard } from "./PosterCard";
import ScopedSearch from "Components/Search/ScopedSearch";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { dataTypes } from "store/utils/dataTypes";
import { filtersConfig } from "../../util/staticData/Components/Filters/Filters";
import { getPayload } from "store/actions";
import lodash from "lodash";
import { pageTypes } from "Components/Filters/store/reducer";
import postersListStyles from "./scss/posters-list.module.scss";
import { useBoolean } from "hooks/useToggle";
import useClearPagination from "hooks/useClearPagination";
import useSaveBreadcrumbs from "hooks/useSaveBreadcrumbs";

const PostersList = () => {
  const dispatch = useDispatch();
  useSaveBreadcrumbs();
  /**@type {Poster[]} */
  const posters = useSelector((state) => state.global.posters);
  /**@type {Poster[]} */
  const fuzzySearch = useSelector((state) => state.filters.fuzzySearching);
  const filteredPosters = useSelector((state) => state.filters.filteredData);
  const [statePaginationState, dispatchPagination] = useReducer(
    paginationReducer,
    paginationState
  );
  const [displayPage, setDisplayPage] = useState(false);
  const [
    isMobileFilterOpen,
    { on: openMobileFilterSection, toggle: toggleMobileFilterSection },
  ] = useBoolean();
  const listRef = React.createRef();

  const fetchPosters = useCallback(
    (originalPosters) => {
      if (!filteredPosters) {
        dispatch(
          setFullList({
            data: originalPosters,
            page: pageTypes.POSTER,
          })
        );
        setDisplayPage(true);
      } else if (filteredPosters && !displayPage) {
        dispatch(emptyFilterData());
      }
    },
    [dispatch, filteredPosters, displayPage]
  );
  const getTopics = (settings) => {
    return lodash.uniqBy(
      posters
        .map((poster) => ({
          name: poster.subSessionType,
          active: false,
          ...settings,
        }))
        .filter((filterOption) => filterOption.name),
      "name"
    );
  };

  /**
   * Sort poster data for display
   *
   * @param {Poster[]} posters
   *
   * @returns {Poster[]} sorted array of posters by subSessionName or sorted by search relevance
   */
  const sortAndFilter = (posters) => {
    if (fuzzySearch) {
      return posters;
    }

    return sortResults(posters, sortTypes.subSessionName);
  };

  const getFilter = () => (
    <FilterWrapper
      page="Posters List"
      filterBar={[
        <FiltersWithSubFilters
          key={filtersConfig.sessionTopic.name}
          name={filtersConfig.sessionTopic.name}
          filterBy={filtersConfig.sessionTopic.subFilterSetting.key}
          subFilters={getTopics(filtersConfig.sessionTopic.subFilterSetting)}
          page="Posters List"
        />,
      ]}
      search={<ScopedSearch page="Posters List" withClearButton={true} />}
    />
  );

  useEffect(() => {
    if (!posters) {
      dispatch(getPayload(dataTypes.posters));
    } else {
      fetchPosters(posters);
    }
  }, [posters, fetchPosters, dispatch]);

  useClearPagination(dispatchPagination);

  if (!posters || !displayPage) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className={postersListStyles.title}>
        Posters
        <FiltersSectionMobileButton
          isMobileFilterOpen={isMobileFilterOpen}
          toggleMobileFilterSection={toggleMobileFilterSection}
        />
      </h1>
      <div className={postersListStyles.flex}>
        {/* This <div /> is a container for layout since we are using flex and need to render the banner below the filters */}
        <div>
          <FiltersSectionContainer
            isMobileFilterOpen={isMobileFilterOpen}
            openMobileFilterSection={openMobileFilterSection}
          >
            <div className={postersListStyles.innerFlex}>{getFilter()}</div>
          </FiltersSectionContainer>
          <VerticalSponsorBanner pageName="posters" />
        </div>

        <div
          className={postersListStyles.postersListHolder}
          autoFocus={true}
          ref={listRef}
          tabIndex="-1"
        >
          {!filteredPosters.length &&
            "There are no posters that match your search"}
          {filteredPosters.length > 0 &&
            sortAndFilter(filteredPosters)
              .slice(
                statePaginationState.startIndex,
                statePaginationState.endIndex
              )
              .map((data, index) => (
                <PosterCard
                  data={data}
                  key={`${data.subSessionName}-${index}`}
                  page="Posters List"
                />
              ))}
        </div>
      </div>

      <Paginate
        large
        total={filteredPosters.length}
        startIndex={statePaginationState.startIndex}
        dispatch={dispatchPagination}
        listRef={listRef}
        pageTile="Posters"
        page="posters list"
      />
      <HorizontalSponsorBanner pageName="posters" />
    </div>
  );
};

export default PostersList;

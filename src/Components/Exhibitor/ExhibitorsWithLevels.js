import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { emptyFilterData, setFullList } from "Components/Filters/store/actions";
import {
  getCategoryList,
  getLevelsList,
  getLocationsList,
} from "./utils/getLists";
import lodash, { capitalize } from "lodash";
import {
  paginationReducer,
  paginationState,
} from "Components/Paginate/reducer";
import { useDispatch, useSelector } from "react-redux";

import { ExhibitorLevelCard } from "./ExhibitorLevelCard";
import FilterWrapper from "Components/Filters/FilterWrapper";
import FiltersSectionContainer from "Components/Filters/FiltersSectionContainer";
import FiltersSectionMobileButton from "Components/Filters/FiltersSectionMobileButton";
import FiltersWithSubFilters from "Components/Filters/FiltersWithSubFilters";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import Loader from "Components/Loader";
import { Paginate } from "../Paginate/Paginate";
import ScopedSearch from "Components/Search/ScopedSearch";
import SvgTypes from "Components/SVG/SvgTypes";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { dataTypes } from "store/utils/dataTypes";
import exhibitorsWithLevelsStyles from "./scss/exhibitors-with-levels.module.scss";
import { filtersConfig } from "../../util/staticData/Components/Filters/Filters";
import getLevels from "./utils/getLevels";
import { getPayload } from "store/actions";
import { labelData } from "../../util/staticData/Components/Exhibitor/ExhibitorsWithLevels";
import { pageTypes } from "Components/Filters/store/reducer";
import { useBoolean } from "hooks/useToggle";
import useClearPagination from "hooks/useClearPagination";
import useSaveBreadcrumbs from "hooks/useSaveBreadcrumbs";

const ExhibitorLevels = () => {
  const dispatch = useDispatch();
  useSaveBreadcrumbs();
  /**@type {Exhibitor[]} */
  const exhibitors = useSelector((state) => state.global.exhibitors);
  /**@type {Exhibitor[]} */
  const fuzzySearch = useSelector((state) => state.filters.fuzzySearching);
  const filteredExhibitors = useSelector((state) => state.filters.filteredData);
  const [defaultLevels, setDefaultLevels] = useState(null);
  const [locations, setLocations] = useState(null);
  const [statePaginationState, dispatchPagination] = useReducer(
    paginationReducer,
    paginationState
  );
  const [
    isMobileFilterOpen,
    { on: openMobileFilterSection, toggle: toggleMobileFilterSection },
  ] = useBoolean();

  const [displayPage, setDisplayPage] = useState(false);
  const listRef = React.createRef();

  /**
   * Sort Exhibitors
   *
   * @param {Exhibitor} exhibitors
   *
   * @returns {Exhibitor[]} sorted exhibitors by exhibitor_name
   */

  const sortExhibitors = (exhibitors) => {
    // Sort Exhibitors and flatten array so its one big array pre ordered and sorted by exhibitor_name.
    return fuzzySearch
      ? exhibitors
      : lodash.flatMap(
          exhibitors.map(
            (exhibitor) =>
              lodash.orderBy(exhibitor, [
                (exhibitor) => exhibitor.exhibitor_name.toLowerCase(),
              ]) // Case insensitive orderBy.
          )
        );
  };

  const filterExhibitors = (exhibitors) => {
    // Make Exhibitors in groups based on levels
    const exhibitorGroups = defaultLevels.map((level) =>
      exhibitors.filter(
        (exhibitor) =>
          exhibitor.custom_attributes?.custom_fields?.Exhibitor_type ===
            level || exhibitor.membership_level === level
      )
    );
    // NO Levels
    const exhibitorNoLevels = exhibitors.filter(
      (exhibitor) =>
        !exhibitor.custom_attributes?.custom_fields?.Exhibitor_type &&
        !exhibitor.membership_level
    );
    if (fuzzySearch) {
      // if Fuzzy searching we don't care to group leave alone
      return exhibitors;
    }
    // Array of exhibitors
    return [...exhibitorGroups, exhibitorNoLevels];
  };

  const fetchExhibitors = useCallback(
    (exhibitorsData) => {
      const levels = getLevels(exhibitorsData);
      const locationsList = getLocationsList(
        exhibitorsData,
        filtersConfig.location.subFilterSetting
      );
      setDefaultLevels(levels);

      if (!filteredExhibitors) {
        dispatch(
          setFullList({
            data: exhibitorsData,
            page: pageTypes.EXHIBITOR,
          })
        );
        setDisplayPage(true);
      } else if (filteredExhibitors && !displayPage) {
        dispatch(emptyFilterData());
      }

      setLocations(locationsList.length > 0 ? locationsList : null);
    },
    [dispatch, filteredExhibitors, displayPage]
  );

  /**
   * Rows of Exhibitor cards by tier
   *
   * @param {Exhibitor[]} data
   *
   * @returns {JSX.Element} array of exhibitor cards
   */
  const getRows = (data) => {
    /**
     * After we slice the data we group the cards by there Level.
     * Make each row for each level. This mean we Paginate the data set and not each level.
     */
    const groupData = lodash.groupBy(data, "membership_level");
    const groupKeys = Object.keys(groupData);

    if (fuzzySearch) {
      return (
        <div className={exhibitorsWithLevelsStyles.exhibitorLevelRow}>
          {data.map((data) => (
            <ExhibitorLevelCard data={data} key={data.exhibitor_name} />
          ))}
        </div>
      );
    }

    return groupKeys.map((key) => {
      return (
        <div key={key} className={exhibitorsWithLevelsStyles.exhibitorLevelRow}>
          {groupData[key].map((data) => (
            <ExhibitorLevelCard data={data} key={data.exhibitor_name} />
          ))}
        </div>
      );
    });
  };

  const getFilter = () => (
    <FilterWrapper
      page="Exhibitors List"
      filterBar={[
        <FiltersWithSubFilters
          key={filtersConfig.sponsor.name}
          name={filtersConfig.sponsor.name}
          filterBy={filtersConfig.sponsor.subFilterSetting.key}
          byPassSort={true}
          subFilters={getLevelsList(
            defaultLevels,
            filtersConfig.sponsor.subFilterSetting
          )}
        />,
        locations ? (
          <FiltersWithSubFilters
            key={filtersConfig.location.name}
            name={filtersConfig.location.name}
            filterBy={filtersConfig.location.subFilterSetting.key}
            subFilters={locations}
          />
        ) : null,
        <FiltersWithSubFilters
          key={filtersConfig.category.name}
          name={filtersConfig.category.name}
          filterBy={filtersConfig.category.subFilterSetting.key}
          subFilters={getCategoryList(
            exhibitors,
            filtersConfig.category.subFilterSetting
          )}
        />,
      ].filter(Boolean)}
      search={<ScopedSearch page="Exhibitors List" withClearButton={true} />} // Back edit from https://github.com/Klowd/onlineeventpro-aapa21-ui/pull/115/files: src/Components/Exhibitor/ExhibitorsWithLevels.js
    />
  );

  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    } else {
      fetchExhibitors(exhibitors);
    }
  }, [exhibitors, dispatch, fetchExhibitors]);

  useClearPagination(dispatchPagination);

  if (!filteredExhibitors || !displayPage) {
    return (
      <div className={exhibitorsWithLevelsStyles.exhibitors}>
        <Loader />
      </div>
    );
  }

  return displayPage ? (
    <div className={exhibitorsWithLevelsStyles.exhibitors}>
      <div>
        <h1 className={exhibitorsWithLevelsStyles.title}>
          {capitalize(process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE)}
          <FiltersSectionMobileButton
            isMobileFilterOpen={isMobileFilterOpen}
            toggleMobileFilterSection={toggleMobileFilterSection}
          />
        </h1>
        <div className={exhibitorsWithLevelsStyles.subTitle}>
          {labelData.map((label) => (
            <div
              key={label.name}
              className={exhibitorsWithLevelsStyles.exhibitorsLevel}
            >
              <SvgTypes name={label.name?.toLocaleLowerCase()} />
              {label.name}
            </div>
          ))}
        </div>
        <div className={exhibitorsWithLevelsStyles.flex}>
          {/* This <div /> is a container for layout since we are using flex and need to render the banner below the filters */}
          <div>
            <FiltersSectionContainer
              isMobileFilterOpen={isMobileFilterOpen}
              openMobileFilterSection={openMobileFilterSection}
            >
              <div className={exhibitorsWithLevelsStyles.innerFlex}>
                {getFilter()}
              </div>
            </FiltersSectionContainer>
            <VerticalSponsorBanner pageName="exhibitors" />
          </div>

          {filteredExhibitors.length > 0 ? (
            <Fragment>
              <div
                className={exhibitorsWithLevelsStyles.exhibitorsListHolder}
                autoFocus={true}
                ref={listRef}
                tabIndex="-1"
              >
                {getRows(
                  sortExhibitors(filterExhibitors(filteredExhibitors)).slice(
                    statePaginationState.startIndex,
                    statePaginationState.endIndex
                  )
                )}
                <Paginate
                  large
                  total={filteredExhibitors.length}
                  startIndex={statePaginationState.startIndex}
                  dispatch={dispatchPagination}
                  listRef={listRef}
                  pageTitle={process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}
                  page="exhibitors list"
                />
              </div>
            </Fragment>
          ) : (
            <p className={exhibitorsWithLevelsStyles.noResults}>
              There are no exhibitors that match your search
            </p>
          )}
        </div>
      </div>
      <HorizontalSponsorBanner pageName="exhibitors" />
    </div>
  ) : (
    <Loader />
  );
};

export default ExhibitorLevels;

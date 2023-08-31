import React, { useEffect, useState } from "react";
import {
  emptyFilterData,
  setFullList,
  updateFullList,
} from "Components/Filters/store/actions";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import FavoriteExhibitorCard from "./FavoriteExhibitorCard";
import FavoritePosterCard from "./FavoritePosterCard";
import FavoriteSessionCard from "./FavoriteSessionCard";
import FavoriteSpeakerCard from "./FavoriteSpeakerCard";
import FavoritesListSection from "./FavoritesListSection";
import Loader from "Components/Loader";
import SvgTypes from "Components/SVG/SvgTypes";
import { capitalize } from "lodash";
// import TabFiltersConcat from "Components/Filters/TabFiltersConcat";
import favoritesListStyles from "./scss/favorites-list.module.scss";
import { pageTypes } from "Components/Filters/store/reducer";
import { result } from "Components/Search/utils/searchHelpers";
import { setFuzzySearch } from "../Filters/store/actions";
import useMyFavorites from "hooks/useMyFavorites";
import { useQueryState } from "use-location-state";

const FavoritesList = ({ mobileFilter }) => {
  const dispatch = useDispatch();

  const pageType = useSelector((state) => state.filters.pageType);
  const filteredFavoritesList = useSelector(
    (state) => state.filters.filteredData
  );
  const searchTerm = useSelector((state) => state.filters.searchTerm);
  const fuzzySearchResult = useSelector(
    (state) => state.filters.fuzzySearchResult
  );

  const [editFilterData, setEditFilterData] = useState(false);
  const { noDisplayData, favoriteLoaded, fullList } = useMyFavorites();

  const [urlSearchQuery] = useQueryState("Search", "");
  const [urlCategoryFilter] = useQueryState("Category", "");

  const getSectionContent = (type, items) => {
    if (!items || (items && !items.length)) return null;
    switch (type?.toLowerCase()) {
      case "sessions":
      case "sessions & subsessions": {
        const sectionTitle = type.replace(/\w+/g, capitalize);
        return (
          <FavoritesListSection
            title={sectionTitle}
            data={items}
            Card={FavoriteSessionCard}
            id={"sessionId"}
            key="sessions"
          />
        );
      }

      case "posters": {
        if (ConfigService.runValues.hasPosters) {
          return (
            <FavoritesListSection
              title={"Posters"}
              data={items}
              Card={FavoritePosterCard}
              id={"subSessionId"}
              key="posters"
            />
          );
        } else break;
      }
      case "exhibitors":
        if (ConfigService.runValues.hasExhibitors) {
          return (
            <FavoritesListSection
              title={"Exhibitors"}
              data={items}
              Card={FavoriteExhibitorCard}
              id={"fuzion_exhibitor_id"}
              key="exhibitors"
            />
          );
        } else break;
      case "speakers":
        return (
          <FavoritesListSection
            title={"Speakers"}
            data={items}
            Card={FavoriteSpeakerCard}
            id={"username"}
            key="speakers"
          />
        );
      default:
        return null;
    }
  };

  //update filters if full list changes (memoized in hook)
  useEffect(() => {
    if (!fullList) {
      return;
    }

    if (editFilterData) {
      const normalizedSearchTerm = searchTerm || urlSearchQuery;

      dispatch(updateFullList(fullList));
      dispatch(
        setFuzzySearch({
          data: result({
            data: fullList,
            type: urlCategoryFilter,
            pageType,
            searchTerm: normalizedSearchTerm,
          }),
          isSearching: normalizedSearchTerm.trim() !== "",
          term: normalizedSearchTerm,
          callerId: "FavoritesList: useEffect: editFilterData",
        })
      );
    } else {
      dispatch(emptyFilterData());
      dispatch(setFullList({ data: fullList, page: pageTypes.FAVORITES }));
      setEditFilterData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fullList, editFilterData]);

  if (!favoriteLoaded) {
    return <Loader />;
  }

  const displayNoResultsMessage = (list) => {
    const flattendResults = [].concat.apply(
      [],
      list.map((l) => l.items)
    );
    return !flattendResults.length;
  };

  const renderContent = fuzzySearchResult
    ? fuzzySearchResult
    : filteredFavoritesList;

  return (
    <div className={favoritesListStyles.favoritesList}>
      <div className={favoritesListStyles.favoritesListHeaderWrapper}>
        <div className={favoritesListStyles.favoritesListHeader}>
          <h2 className={favoritesListStyles.innerHeader}>My Favorites</h2>
        </div>
      </div>
      <div className={favoritesListStyles.filterWrapper}>
        {!noDisplayData && mobileFilter && mobileFilter()}
      </div>
      {renderContent?.map((section) =>
        getSectionContent(section.type, section.items)
      )}
      {fuzzySearchResult &&
        !noDisplayData &&
        displayNoResultsMessage(fuzzySearchResult) && (
          <p className={favoritesListStyles.noResults}>
            There are no results that match your search
          </p>
        )}
      {noDisplayData && (
        <div>
          Click <SvgTypes name="heart" /> throughout the site to store and save
          your favorite speakers, sessions and more.
        </div>
      )}
    </div>
  );
};

export default FavoritesList;

import React, { useEffect, useState } from "react";

import ClearSearch from "./ClearSearch";
import ConfigService from "services/ConfigService";
import OEPAnalytics from "Components/OEPAnalytics";
import SearchService from "services/SearchService";
import searchStyles from "./scss/search.module.scss";
import { useQueryState } from "use-location-state";

export default function Search({
  exhibitors,
  posters,
  sessions,
  speakers,
  filterSessions,
  filterSpeakers,
  filterExhibitors,
  filterPosters,
  passSearch,
  page,
}) {
  const [search, setSearch] = useState("");
  const [currentUrlSearchTerm, updateUrlSearchTerm] = useQueryState(
    "Global Search",
    ""
  );

  const onChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    updateUrlSearchTerm(value);
  };

  const clearCurrentSearch = () => {
    setSearch("");
    updateUrlSearchTerm("");
    passSearch("");

    filterSessions([]);
    ConfigService.runValues.hasExhibitors && filterExhibitors([]);
    filterSpeakers([]);
    ConfigService.runValues.hasExhibitors && filterPosters([]);
  };

  const triggerSearch = (e, urlSearchTerm = "") => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    // Clean up the search value before sending it to the search service
    const trimmedSearchTerm = urlSearchTerm?.trim() || search.trim();
    setSearch(trimmedSearchTerm);
    updateUrlSearchTerm(trimmedSearchTerm);

    if (trimmedSearchTerm) {
      passSearch(trimmedSearchTerm);
      filterSessions(
        SearchService.searchSessions({
          searchTerm: trimmedSearchTerm,
          data: sessions,
        })
      );
      ConfigService.runValues.hasExhibitors &&
        filterExhibitors(
          SearchService.searchExhibitors({
            searchTerm: trimmedSearchTerm,
            data: exhibitors,
          })
        );
      filterSpeakers(
        SearchService.searchSpeakers({
          searchTerm: trimmedSearchTerm,
          data: speakers,
        })
      );
      ConfigService.runValues.hasPosters &&
        filterPosters(
          SearchService.searchPosters({
            searchTerm: trimmedSearchTerm,
            data: posters,
          })
        );
    }
  };

  useEffect(() => {
    if (
      (ConfigService.runValues.hasExhibitors && !exhibitors) ||
      (ConfigService.runValues.hasPosters && !posters) ||
      !sessions ||
      !speakers
    ) {
      // this will prevent attempt to search before data is ready on page reload
      return;
    }

    if (currentUrlSearchTerm) {
      triggerSearch(null, currentUrlSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exhibitors, posters, sessions, speakers]);

  return (
    <section>
      <form className={searchStyles.searchWrapper} onSubmit={triggerSearch}>
        <label htmlFor="search-input" className="sr-only">
          Site Search
        </label>
        <div className={searchStyles.inputWrapper}>
          <div className={searchStyles.inputHolder}>
            <input
              id="search-input"
              type="search"
              onChange={onChange}
              value={search}
              placeholder="Search"
            />
            {search.length >= 1 && (
              <ClearSearch clearSearch={clearCurrentSearch} page={page} />
            )}
          </div>
        </div>
        <OEPAnalytics
          page={page}
          componentType="Search"
          url={`Search for '${search}'`}
          componentName="Search"
        >
          <button
            type="submit"
            className={`${searchStyles.submit} gtm-search-text`}
          >
            Search
          </button>
        </OEPAnalytics>
      </form>
    </section>
  );
}

import React, { useCallback } from "react";

import { AppContext } from "Components/Context/AppContext";
import { ExhibitorCard } from "./ExhibitorCard";
import ExhibitorFilters from "./ExhibitorFilters";
import Loader from "../Loader";
import Meta from "../Meta";
import { Paginate } from "../Paginate/Paginate";
import { capitalize } from "lodash";

const ExhibitorLevels = () => {
  const [fuzzySearch, setFuzzySearch] = React.useState([]);
  let [startIndex, setStartIndex] = React.useState(0);
  let [endIndex, setEndIndex] = React.useState(40);
  const [filteredExhibitors, setFilteredExhibitors] = React.useState(null);
  const [defaultLocations, setDefaultLocations] = React.useState(null);
  const [defaultCategories, setDefaultCategories] = React.useState(null);
  // context wrapper
  const { exhibitors } = React.useContext(AppContext);

  const prev = () => {
    if (endIndex - 40 > 0) {
      setStartIndex((startIndex -= 40));
      setEndIndex((endIndex -= 40));
    }
  };

  const next = () => {
    window.scrollTo(0, 0);
    const maxIndex = Math.ceil(exhibitors.length);

    if (startIndex + 40 <= maxIndex) {
      setStartIndex((startIndex += 40));
      setEndIndex((endIndex += 40));
    }
  };

  const resetExhibitors = () => {
    setStartIndex(0);
    setEndIndex(40);
    setFuzzySearch([]);
    setFilteredExhibitors(exhibitors);
  };

  const sortAndFilter = (exhibitors, filter) => {
    // If there's a filter - Platinum, Gold, Silver, Bronze
    if (filter) {
      return fuzzySearch.length
        ? [...exhibitors]
        : [...exhibitors].sort((a, b) => {
            if (
              a.exhibitor_name.toLowerCase() < b.exhibitor_name.toLowerCase()
            ) {
              return -1;
            }
            if (
              a.exhibitor_name.toLowerCase() > b.exhibitor_name.toLowerCase()
            ) {
              return 1;
            }
            return 0;
          });
    } else {
      // No filter
      return fuzzySearch.length
        ? [...exhibitors]
        : [...exhibitors].sort((a, b) => {
            if (
              a.exhibitor_name.toLowerCase() < b.exhibitor_name.toLowerCase()
            ) {
              return -1;
            }
            if (
              a.exhibitor_name.toLowerCase() > b.exhibitor_name.toLowerCase()
            ) {
              return 1;
            }
            return 0;
          });
    }
  };

  const filterExhibitors = (filters) => {
    const { locations, categories, user_search } = filters;
    const data = user_search ? fuzzySearch : exhibitors;

    const selectedLocations = Object.entries(locations)
      .map((data) => (data[1] === true ? data[0] : null))
      .filter(Boolean);

    const selectedCategories = Object.entries(categories)
      .map((data) => (data[1] === true ? data[0] : null))
      .filter(Boolean);

    const filteredExhibitors = data
      .filter((exhibitor) =>
        selectedLocations.length
          ? selectedLocations.includes(
              exhibitor.custom_attributes?.custom_fields?.Country
            )
          : exhibitor
      )
      .map((exhibitor) => {
        if (selectedCategories.length) {
          if (
            selectedCategories.every((i) =>
              exhibitor.industry_category.includes(i)
            )
          ) {
            return exhibitor;
          } else {
            return null;
          }
        } else {
          return exhibitor;
        }
      })
      .filter(Boolean);

    setStartIndex(0);
    setEndIndex(40);
    setFilteredExhibitors(filteredExhibitors);
  };
  const fetchExhibitors = useCallback(() => {
    const formattedExhibitors = exhibitors.map((exhibitor) => {
      exhibitor.industry_category =
        exhibitor.industry_category !== null &&
        !Array.isArray(exhibitor.industry_category)
          ? exhibitor.industry_category.split("|")
          : exhibitor.industry_category || [];
      exhibitor.custom_attributes =
        typeof exhibitor.custom_attributes == "object"
          ? exhibitor.custom_attributes
          : JSON.parse(exhibitor.custom_attributes);
      if (
        exhibitor.company_info.website_url &&
        exhibitor.company_info.website_url.includes("http")
      ) {
        return exhibitor;
      } else if (
        exhibitor.company_info.website_url &&
        !exhibitor.company_info.website_url.includes("http")
      ) {
        exhibitor.company_info.website_url = `https://${exhibitor.company_info.website_url}`;
        return exhibitor;
      } else {
        return exhibitor;
      }
    });

    const locations = exhibitors
      .map((exhibitor) => exhibitor.custom_attributes?.custom_fields?.Country)
      .filter(Boolean);
    const categories = [];
    exhibitors.map(
      (exhibitor) =>
        exhibitor.industry_category &&
        categories.push(...exhibitor.industry_category)
    );

    setDefaultCategories([...new Set(categories)]);
    setFilteredExhibitors(formattedExhibitors);
    setDefaultLocations([...new Set(locations)]);
  }, [exhibitors]);

  const passFuzzySearch = (data) => {
    setFuzzySearch(data);
  };

  const renderChildren = () => {
    return filteredExhibitors.length
      ? sortAndFilter(filteredExhibitors).slice(startIndex, endIndex)
      : [];
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (exhibitors && exhibitors.length) fetchExhibitors();
  }, [exhibitors, fetchExhibitors]);

  return filteredExhibitors ? (
    <div className="main-wrapper">
      <Meta
        pageTitle={capitalize(process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE)}
      />
      <div className="grid-wrapper">
        <h1 className="grid-title">
          {capitalize(process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE)}
        </h1>
        <ExhibitorFilters
          defaultLocations={defaultLocations}
          defaultCategories={defaultCategories}
          resetExhibitors={resetExhibitors}
          filterExhibitors={filterExhibitors}
          exhibitors={filteredExhibitors}
          fuzzySearch={passFuzzySearch}
        />
        <div className="grid-flex exhibitor-level-row">
          {!filteredExhibitors.length &&
            `There are no ${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE} that match your search`}
          {filteredExhibitors.length
            ? sortAndFilter(filteredExhibitors)
                .slice(startIndex, endIndex)
                .map((data, i) => <ExhibitorCard data={data} key={i} />)
            : ""}
        </div>
      </div>

      <Paginate
        renderChildren={renderChildren}
        large
        next={next}
        prev={prev}
        startIndex={startIndex}
        endIndex={endIndex}
        inc={40}
        maxIndex={Math.ceil(filteredExhibitors.length)}
        pageTitle="Exhibitors"
        page="exhibitors list"
      />
    </div>
  ) : (
    <Loader />
  );
};

export default ExhibitorLevels;

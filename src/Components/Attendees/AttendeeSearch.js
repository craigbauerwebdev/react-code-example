import OEPAnalytics, { saveAnalytic } from "Components/OEPAnalytics";
import React, { useEffect, useState, useRef } from "react";

import ExpandToggle from "Components/Buttons/ExpandToggle";
import SvgTypes from "Components/SVG/SvgTypes";
import attendeeListStyles from "./scss/attendee-list.module.scss";
import filterStyles from "Components/Filters/scss/filters.module.scss";
import scopedSearchStyles from "Components/Search/scss/scoped-search.module.scss";
import { searchActionTypes } from "Components/AttendeeSearch/AttendeeSearchReducer";
import { setAttendeeByValue } from "Components/Filters/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useQueryState } from "use-location-state";
import AttendeeCustomFilter from "./AttendeeCustomFilter";

const DEFAULT_FILTER_EVENT = { target: { value: "All" } };

const parseCustomFilter = (queryString) => {
  const lookup = {};
  let splitQuery = queryString.split(";");
  for (let i = 0; i < splitQuery.length; i++) {
    const q = splitQuery[i].split("=");
    const key = q[0];
    const value = q[1];
    lookup[key] = {};
    const values = value.split(",");
    values.forEach((v) => {
      lookup[key][v] = true;
    });
  }
  return lookup;
};

const extractCustomFieldsToRender = (attributes, lookup) => {
  const customFields = attributes.filter((a) => {
    return a.checkboxFilter;
  });
  for (let c = 0; c < customFields.length; c++) {
    for (let cc = 0; cc < customFields[c].checkboxSchema.length; cc++) {
      const key = customFields[c].attr;
      let value = false;
      const obj = lookup ? lookup[key] : null;
      if (obj) {
        value = !!lookup[key][customFields[c].checkboxSchema[cc]];
      }
      if (typeof customFields[c].checkboxSchema[cc] !== "object") {
        customFields[c].checkboxSchema[cc] = {
          key: customFields[c].checkboxSchema[cc],
          value,
        };
      }
    }
  }
  return customFields;
};

const initShowMore = (customFields, lookupKeys) => {
  const showMore = [];
  customFields.forEach((field) => {
    showMore.push(field.checkboxSchema.length > 5);
  });
  if (lookupKeys) {
    lookupKeys.forEach((key) => {
      customFields.forEach((field, idx) => {
        if (field.attr === key) {
          showMore[idx] = false;
        }
      });
    });
  }
  return showMore;
};

const AttendeeSearch = ({
  searchState,
  dispatchSearchState,
  section,
  searchPlaceholder,
  page,
}) => {
  const dispatch = useDispatch();
  const [openSection, setOpenSection] = useState(false);
  const [openStatusSection, setOpenStatusSection] = useState(false);
  const [attendeeType, setAttendeeType] = useState("");
  const [status, setStatus] = useState("");

  const [urlSearchQuery, updateUrlSearchQuery] = useQueryState("Search", "");
  const [, updateCurrentUrlPage] = useQueryState("Page", 0);
  const [urlAttendeeTypeFilter, updateUrlAttendeeTypeFilter] = useQueryState(
    "Attendee Type",
    ""
  );
  const [urlStatusFilter, updateUrlStatusFilter] = useQueryState("Status", "");
  const [urlCustomQuery, updateUrlCustomQuery] = useQueryState("Custom", "");
  const filtersList = ["All", "Attendee", "Exhibitor"];
  const filterStatusList = ["All", "Online", "Offline"];
  const profileConfigurations = useSelector(
    (state) => state.global.profileConfigurations
  );
  const customFieldsToRender = useRef();
  const [customFields, setCustomFields] = useState(null);
  const [customFilterToggle, setCustomFilterToggle] = useState([]);
  const [previousFilter, setPreviousFilter] = useState(null);
  const [checkboxFilter, setCheckboxFilter] = useState(null);
  const [showMore, setShowMore] = useState([]);

  const onChange = (event) => {
    const { value } = event.target;
    dispatchSearchState({
      type: searchActionTypes.SET_QUERY,
      payload: value,
    });
    updateUrlSearchQuery(value);
  };

  const toggleSection = () => setOpenSection((openSection) => !openSection);

  // eslint-disable-next-line no-unused-vars
  const toggleStatusSection = () =>
    setOpenStatusSection((openStatusSection) => !openStatusSection);

  // eslint-disable-next-line no-unused-vars
  const toggleCustomSection = (idx) => {
    const csCopy = JSON.parse(JSON.stringify(customFilterToggle));
    csCopy[idx] = !csCopy[idx];
    setCustomFilterToggle(csCopy);
  };

  const clearSearch = () => {
    dispatchSearchState({
      type: searchActionTypes.CLEAR_SEARCH,
    });
    if (section !== "representative-setup") {
      handleFilterChange(DEFAULT_FILTER_EVENT);
      handleStatusFilterChange(DEFAULT_FILTER_EVENT);
      handleCustomFilterChange("reset");
      customFieldsToRender.current = extractCustomFieldsToRender(
        profileConfigurations.attributes
      );
    }
    updateUrlSearchQuery("");
    updateUrlAttendeeTypeFilter("All");
    updateUrlStatusFilter("All");
    updateCurrentUrlPage(0);
  };

  const submitForm = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    saveAnalytic({
      page: page,
      pageId: "Attendee List",
      componentType: "Search",
      componentName: "Search",
      url: searchState.query || "Search",
    });
    dispatchSearchState({
      type: searchActionTypes.SET_SEARCH_QUERY,
      payload: searchState.query,
    });
    updateCurrentUrlPage(0);
  };

  /* PJX-484 networking.isVIP.BOOL = 0 added on Attendee List, VIP should not be visible on list
   * PJX-1177 networking.allowNetworking.BOOL need to be true for any result given back from algolia.
   * Boolean values true/false is not working properly with algolia,
   * where boolean (0 or 1 for true/false) are returning exact matching results
   */
  const getFilter = (selectedFilter) => {
    switch (selectedFilter) {
      case "Attendee":
        return "networking.boothStaff.BOOL = 0 AND networking.isVIP.BOOL = 0 AND networking.allowNetworking.BOOL = 1 AND networking.allowUserNetworking.BOOL = 1";
      case "Exhibitor":
        return "networking.boothStaff.BOOL = 1 AND networking.isVIP.BOOL = 0 AND networking.allowNetworking.BOOL = 1 AND networking.allowUserNetworking.BOOL = 1";
      case "Staff":
        return `attributes.AttendeeTypeName:"STAFF"`;
      case "All":
      default:
        return "networking.allowUserNetworking.BOOL = 1 AND networking.isVIP.BOOL = 0 AND networking.allowNetworking.BOOL = 1";
    }
  };

  const getStatusFilter = (selectedFilter) => {
    switch (selectedFilter) {
      case "All":
        return "networking.allowUserNetworking.BOOL = 1 AND networking.isVIP.BOOL = 0 AND networking.allowNetworking.BOOL = 1";
      case "Online":
        return `onlineStatus:"online" AND networking.allowNetworking.BOOL = 1 AND networking.allowUserNetworking.BOOL = 1`;
      case "Offline":
        return `onlineStatus:"offline" AND networking.allowNetworking.BOOL = 1 AND networking.allowUserNetworking.BOOL = 1`;
      default:
        return "networking.boothStaff.BOOL = 0 AND networking.isVIP.BOOL = 0 AND networking.allowNetworking.BOOL = 1 AND networking.allowUserNetworking.BOOL = 1";
    }
  };

  const handleFilterChange = (event) => {
    const { value: filterbyType } = event.target;
    let filter = getFilter(filterbyType);

    setAttendeeType(filter);
    if (status.length > 0) {
      filter = filter + " AND " + status;
    }
    dispatchSearchState({
      type: searchActionTypes.SET_FILTER,
      payload: { filter, filterbyType },
    });
    dispatch(
      setAttendeeByValue({
        active: false,
      })
    );
    setPreviousFilter(filter);
    updateUrlAttendeeTypeFilter(filterbyType);
  };

  // eslint-disable-next-line no-unused-vars
  const handleStatusFilterChange = (event) => {
    const { value: filterbyStatus } = event.target;
    let filter = getStatusFilter(filterbyStatus);

    setStatus(filter);
    if (attendeeType.length > 0) {
      filter = filter + " AND " + attendeeType;
    }
    if (checkboxFilter) {
      filter = filter + " AND " + checkboxFilter;
    }
    dispatchSearchState({
      type: searchActionTypes.SET_FILTER,
      payload: { filter, filterbyStatus },
    });
    dispatch(
      setAttendeeByValue({
        active: false,
      })
    );
    setPreviousFilter(filter);
    updateUrlStatusFilter(filterbyStatus);
  };

  // build algolia filter string from custom fields
  const buildAlgoliaFilter = (customFields) => {
    let customFilter = "";
    let count = 0;
    if (!previousFilter) {
      return;
    }
    for (let c in customFields) {
      for (let cc in customFields[c].checkboxSchema) {
        if (customFields[c].checkboxSchema[cc].value && count >= 1) {
          customFilter +=
            " OR " +
            "attributes." +
            customFields[c].attr +
            ":" +
            '"' +
            customFields[c].checkboxSchema[cc].key +
            '"';
          count = count + 1;
        } else if (customFields[c].checkboxSchema[cc].value && count < 1) {
          //do not include "OR" operator if single checkbox is selected
          customFilter +=
            "attributes." +
            customFields[c].attr +
            ":" +
            '"' +
            customFields[c].checkboxSchema[cc].key +
            '"';
          count = count + 1;
        }
      }
    }
    if (customFilter) {
      setCheckboxFilter("(" + customFilter + ")");
      // eslint-disable-next-line no-useless-concat
      customFilter = previousFilter + " AND " + "(" + customFilter + ")";
    } else {
      customFilter = previousFilter.split("AND (")[0];
      setCheckboxFilter(null);
    }

    // dispatch to algolia
    dispatchSearchState({
      type: searchActionTypes.SET_FILTER,
      payload: customFilter,
    });
  };

  const toggleShowMore = (idx) => {
    let newShowMore = { ...showMore };
    newShowMore[idx] = !newShowMore[idx];
    setShowMore(newShowMore);
  };

  const handleCustomFilterChange = (field, idx, checkIdx, event) => {
    let customFieldsCopy = [...customFields];
    let customFilter = "";
    if (field === "reset") {
      //clean filter
      customFilter = previousFilter?.split("AND (")[0];
      customFilter = customFilter?.replace('onlineStatus:"offline" AND ', "");
      customFilter = customFilter?.replace('onlineStatus:"online" AND ', "");
      customFilter = customFilter?.replace(
        customFieldsCopy.map((cf) =>
          cf.checkboxSchema.map((cb) => (cb.value = false))
        )
      );
      setCheckboxFilter(null);
      // dispatch to algolia reset filter
      dispatchSearchState({
        type: searchActionTypes.SET_FILTER,
        payload: customFilter,
      });
      updateUrlCustomQuery("");
    } else {
      customFieldsCopy[idx].checkboxSchema[checkIdx].value = !!event.target
        .checked;
      //build the algolia filter string from the selected checkboxes
      buildAlgoliaFilter(customFieldsCopy);
      let fullQueryString = "";
      for (let c in customFieldsCopy) {
        let queryString = "";
        for (let cc in customFieldsCopy[c].checkboxSchema) {
          if (customFieldsCopy[c].checkboxSchema[cc].value) {
            queryString += customFieldsCopy[c].checkboxSchema[cc].key + ",";
          }
        }
        if (queryString !== "") {
          queryString = customFieldsCopy[c].attr + "=" + queryString;
          //remove the last ,
          queryString = queryString.substring(0, queryString.length - 1);
          fullQueryString += queryString + ";";
        }
      }
      //remove the last ;
      fullQueryString = fullQueryString.substring(
        0,
        fullQueryString.length - 1
      );
      updateUrlCustomQuery(fullQueryString);
    }
  };

  useEffect(() => {
    if (
      urlAttendeeTypeFilter &&
      (!searchState.filter ||
        !searchState.filter?.includes(getFilter(urlAttendeeTypeFilter)))
    ) {
      setOpenSection(true);
      handleFilterChange({ target: { value: urlAttendeeTypeFilter } });
    }
    if (urlSearchQuery && searchState.searchQuery !== urlSearchQuery) {
      dispatchSearchState({
        type: searchActionTypes.SET_QUERY,
        payload: urlSearchQuery,
      });
      submitForm();
    }
    if (
      urlStatusFilter &&
      (!searchState.filter ||
        !searchState.filter?.includes(getStatusFilter(urlStatusFilter)))
    ) {
      setOpenStatusSection(true);
      handleStatusFilterChange({ target: { value: urlStatusFilter } });
    }
    if (
      (!urlAttendeeTypeFilter && !searchState.filter) ||
      urlAttendeeTypeFilter === ""
    ) {
      handleFilterChange(DEFAULT_FILTER_EVENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState.searchQuery, searchState.filter]);

  useEffect(() => {
    if (profileConfigurations) {
      let lookup = {};
      if (urlCustomQuery) {
        lookup = parseCustomFilter(urlCustomQuery);
      }
      customFieldsToRender.current = extractCustomFieldsToRender(
        profileConfigurations.attributes,
        lookup
      );
      let show = initShowMore(customFieldsToRender.current);
      if (urlCustomQuery) {
        let lookupKeys = Object.keys(lookup);
        show = initShowMore(customFieldsToRender.current, lookupKeys);
      }
      setShowMore(show);
      setCustomFields(customFieldsToRender.current);
      let customToggleArray = Array(customFieldsToRender.current.length).fill(
        false
      );
      if (customFieldsToRender.current.length) {
        if (Object.keys(lookup).length) {
          customFieldsToRender.current.forEach((field, i) => {
            Object.keys(lookup).forEach((key) => {
              if (field.attr === key) {
                customToggleArray.splice(i, 0, true);
              }
            });
          });
          setCustomFilterToggle(customToggleArray);
        } else {
          setCustomFilterToggle(
            Array(customFieldsToRender.current.length).fill(false)
          );
        }
      }
      if (previousFilter) {
        buildAlgoliaFilter(customFieldsToRender.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileConfigurations, previousFilter]);

  return (
    <div
      className={attendeeListStyles.innerFlex}
      style={{ padding: "0.75rem" }}
    >
      <div
        className={`${filterStyles.filterWithBorder} ${attendeeListStyles.filterContainer}`}
      >
        <div>
          <section className={scopedSearchStyles.header}>
            <h4>Filters</h4>
            <OEPAnalytics
              page={page}
              pageId="Filter"
              componentType="Button"
              url="Clear Filters"
              componentName="Clear Filters"
            >
              <button
                className={filterStyles.clearButton}
                onClick={clearSearch}
              >
                Clear Filters
              </button>
            </OEPAnalytics>
          </section>
          <form
            onSubmit={submitForm}
            className={scopedSearchStyles.scopedSearch}
          >
            <div className={scopedSearchStyles.inputWrapper}>
              <label htmlFor="Attendee-input" className="sr-only">
                Search
              </label>
              <div className={scopedSearchStyles.inputHolder}>
                <input
                  id="Attendee-input"
                  name="Attendee-input"
                  placeholder={searchPlaceholder}
                  value={searchState.query}
                  onChange={onChange}
                  type="search"
                  className={`${
                    searchState.query?.length > 0 &&
                    attendeeListStyles.withClear
                  }`}
                />
              </div>
            </div>
            <div onClick={submitForm}>
              <OEPAnalytics
                page={page}
                pageId="Search"
                componentType="Button"
                url={"Attendees Search"}
                componentName="Search"
              >
                <SvgTypes name="search" />
              </OEPAnalytics>
            </div>
          </form>
        </div>
        {section !== "representative-setup" && (
          <div className={filterStyles.filterWithBorder}>
            <h4 className={filterStyles.title}>
              Attendee Type
              <ExpandToggle
                expanded={openSection}
                page={page}
                pageId="Filters"
                handleClick={() => {
                  toggleSection();
                }}
                ariaLabel={["filter collapse", "filter expand"]}
                ariaControls="filter-Date"
                classList={["sessionTab"]}
                sessionName="Collapsed toggle"
              />
            </h4>
            {openSection && (
              <div
                className={`${filterStyles.filterSubFilterHolder} ${filterStyles.active}`}
              >
                <div className={filterStyles.list}>
                  {filtersList.map((filter) => (
                    <OEPAnalytics
                      page={page}
                      pageId="Filters"
                      componentType="Button"
                      key={filter}
                      url={`Select ${filter}`}
                      componentName={filter}
                    >
                      <div>
                        <input
                          id={filter}
                          name="attendeeType"
                          type="radio"
                          value={filter}
                          checked={filter === searchState.filterbyType}
                          onChange={handleFilterChange}
                          className={filterStyles.active}
                        />
                        <label htmlFor={filter}>{filter}</label>
                      </div>
                    </OEPAnalytics>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {section !== "representative-setup" && (
          <div className={filterStyles.filterWithBorder}>
            <h4 className={filterStyles.title}>
              Status
              <ExpandToggle
                expanded={openStatusSection}
                page={page}
                pageId="Filters"
                handleClick={toggleStatusSection}
                ariaLabel={["filter collapse", "filter expand"]}
                ariaControls="filter-Date"
                classList={["sessionTab"]}
                sessionName="Collapsed toggle"
              />
            </h4>
            {openStatusSection && (
              <div
                className={`${filterStyles.filterSubFilterHolder} ${filterStyles.active}`}
              >
                <div className={filterStyles.list}>
                  {filterStatusList.map((filter) => (
                    <OEPAnalytics
                      page={page}
                      pageId="Filters"
                      componentType="Button"
                      key={filter}
                      url={`Select ${filter}`}
                      componentName={filter}
                    >
                      <div>
                        <input
                          id={filter + "Status"}
                          name="status"
                          type="radio"
                          value={filter}
                          checked={filter === searchState.filterbyStatus}
                          onClick={handleStatusFilterChange}
                          onChange={() => {}}
                          className={filterStyles.active}
                        />
                        <label htmlFor={filter + "Status"}>{filter}</label>
                      </div>
                    </OEPAnalytics>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {section !== "representative-setup" && (
          <AttendeeCustomFilter
            customFields={customFields}
            customFilterToggle={customFilterToggle}
            showMore={showMore}
            page={page}
            onToggleShowMore={toggleShowMore}
            onToggleCustomSection={toggleCustomSection}
            onHandleCustomFilterChange={handleCustomFilterChange}
          />
        )}
      </div>
    </div>
  );
};

export default AttendeeSearch;

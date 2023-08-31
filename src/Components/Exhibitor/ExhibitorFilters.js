import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import ScopedSearch from "../Search/ScopedSearch";
import { levelsIndex } from "./utils/getLevels";

export default class ExhibitorFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLevels: [],
      defaultLocations: [],
      defaultCategories: [],
      user_search: null,
      toggleLevelFilters: false,
      toggleCategoryFilters: false,
      toggleLocationFilters: false,
      levels: {},
      categories: {},
      locations: {},
      clearState: false,
      exhibitors: null,
    };
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const {
      defaultLevels,
      defaultLocations,
      defaultCategories,
      exhibitors,
    } = this.props;
    const levels = {};
    const categories = {};
    const locations = {};

    defaultLevels && defaultLevels.forEach((data) => (levels[data] = false));

    defaultLocations &&
      defaultLocations.forEach((data) => (locations[data] = false));

    defaultCategories &&
      defaultCategories.forEach((data) => (categories[data] = false));

    this.setState({
      defaultLevels: defaultLevels,
      defaultLocations: defaultLocations,
      defaultCategories: defaultCategories,
      levels: levels,
      categories: categories,
      locations: locations,
      exhibitors: exhibitors,
    });
  }

  clearFilters = () => {
    const { defaultLevels, defaultLocations, defaultCategories } = this.props;
    const levels = {};
    const categories = {};
    const locations = {};

    defaultLevels.forEach((data) => (levels[data] = false));

    defaultLocations.forEach((data) => (locations[data] = false));

    defaultCategories.forEach((data) => (categories[data] = false));

    this.setState({
      defaultLevels: defaultLevels,
      defaultLocations: defaultLocations,
      defaultCategories: defaultCategories,
      categories: categories,
      locations: locations,
      toggleLevelFilters: false,
      toggleLocationFilters: false,
      toggleCategoryFilters: false,
      clearState: true,
      user_search: null,
    });

    this.props.resetExhibitors();

    this.searchInputRef.current.clearSearch();
  };

  toggleLevel = (filter) => {
    const { levels } = this.state;
    levels[filter] = !levels[filter];

    this.setState(
      {
        levels: levels,
      },
      () => this.props.filterExhibitors(this.state)
    );
  };

  toggleLocation = (filter) => {
    const { locations } = this.state;
    locations[filter] = !locations[filter];

    this.setState(
      {
        locations: locations,
      },
      () => this.props.filterExhibitors(this.state)
    );
  };

  toggleCategory = (filter) => {
    const { categories } = this.state;
    categories[filter] = !categories[filter];

    this.setState(
      {
        categories: categories,
      },
      () => this.props.filterExhibitors(this.state)
    );
  };

  getLevelClass = (data) => {
    const { levels } = this.state;
    return levels[data] === true
      ? "filter-button filter-button-active"
      : "filter-button gtm-exhibitor-filter";
  };

  getLocationClass = (data) => {
    const { locations } = this.state;
    return locations[data] === true
      ? "filter-button filter-button-active"
      : "filter-button gtm-exhibitor-filter";
  };

  getCategoryClass = (data) => {
    const { categories } = this.state;
    return categories[data] === true
      ? "filter-button filter-button-active"
      : "filter-button gtm-exhibitor-filter";
  };

  ExhibitorByName = (exhibitorName) => {
    const user_search = exhibitorName.toLowerCase();

    this.setState(
      {
        user_search: user_search,
        toggleLevelFilters: false,
        toggleLocationFilters: false,
        toggleCategoryFilters: false,
        clearState: false,
      },
      () => this.props.filterExhibitors(this.state)
    );
  };

  toggleLevelFilters = () => {
    this.setState({
      toggleLevelFilters: !this.state.toggleLevelFilters,
      toggleCategoryFilters: false,
      toggleLocationFilters: false,
    });
  };

  toggleCategoryFilters = () => {
    this.setState({
      toggleCategoryFilters: !this.state.toggleCategoryFilters,
      toggleLocationFilters: false,
      toggleLevelFilters: false,
    });
  };

  toggleLocationFilters = () => {
    this.setState({
      toggleLocationFilters: !this.state.toggleLocationFilters,
      toggleCategoryFilters: false,
      toggleLevelFilters: false,
    });
  };

  displayName(name) {
    switch (name) {
      case levelsIndex.TIER_1:
        return levelsIndex.PLATINUM;
      case levelsIndex.TIER_2:
        return levelsIndex.GOLD;
      case levelsIndex.TIER_3:
        return levelsIndex.SILVER;
      case levelsIndex.TIER_4:
        return levelsIndex.BRONZE;
      default:
        return name;
    }
  }

  render() {
    const {
      defaultLevels,
      defaultCategories,
      defaultLocations,
      toggleLevelFilters,
      toggleCategoryFilters,
      toggleLocationFilters,
      exhibitors,
    } = this.state;
    const { hideSearch, alignLeft } = this.props;
    return (
      <div>
        <div
          className="grid-filter-wrapper"
          style={{ justifyContent: `${alignLeft ? "flex-start" : "center"}` }}
        >
          <OEPAnalytics
            page="Exhibitors List"
            componentType="Button"
            url="Filter by Sponsor Level"
            componentName="Filter by Sponsor Level"
          >
            <button
              className={
                this.state.toggleLevelFilters
                  ? "details-filter-button gtm-exhibitors-level-filter details-filter-button-active"
                  : "details-filter-button gtm-exhibitors-level-filter"
              }
              onClick={this.toggleLevelFilters}
            >
              Filter by Sponsor Level
            </button>
          </OEPAnalytics>
          <OEPAnalytics
            page="Exhibitors List"
            componentType="Button"
            url="Filter by Location"
            componentName="Filter by Location"
          >
            <button
              className={
                this.state.toggleLocationFilters
                  ? "details-filter-button gtm-exhibitors-location-filter details-filter-button-active"
                  : "details-filter-button gtm-exhibitors-location-filter"
              }
              onClick={this.toggleLocationFilters}
            >
              Filter by Location
            </button>
          </OEPAnalytics>
          <OEPAnalytics
            page="Exhibitors List"
            componentType="Button"
            url="Filter by Category"
            componentName="Filter by Category"
          >
            <button
              className={
                this.state.toggleCategoryFilters
                  ? "details-filter-button gtm-exhibitors-category-filter details-filter-button-active"
                  : "details-filter-button gtm-exhibitors-category-filter"
              }
              onClick={this.toggleCategoryFilters}
            >
              Filter by Category
            </button>
          </OEPAnalytics>
          <OEPAnalytics
            page="Exhibitors List"
            componentType="Button"
            url="Clear Filters"
            componentName="Clear Filters"
          >
            <button
              className="details-filter-button gtm-exhibitors-clear-filter"
              onClick={this.clearFilters}
            >
              Clear Filters
            </button>
          </OEPAnalytics>
        </div>
        {toggleLocationFilters && (
          <div
            className="filter-flex-wrapper"
            style={{ justifyContent: `${alignLeft ? "flex-start" : "center"}` }}
          >
            {defaultLocations.map((data, i) => (
              <OEPAnalytics
                page="Exhibitors List"
                componentType="Button"
                url={data}
                key={`location-${data - i}`}
                componentName={data}
              >
                <button
                  key={i}
                  className={this.getLocationClass(data)}
                  onClick={() => this.toggleLocation(data)}
                >
                  {data}
                </button>
              </OEPAnalytics>
            ))}
          </div>
        )}
        {toggleCategoryFilters && (
          <div
            className="filter-flex-wrapper"
            style={{ justifyContent: `${alignLeft ? "flex-start" : "center"}` }}
          >
            {defaultCategories.map((data, i) => (
              <OEPAnalytics
                page="Exhibitors List"
                componentType="Button"
                url={data}
                key={`category-${data - i}`}
                componentName={data}
              >
                <button
                  key={i}
                  className={this.getCategoryClass(data)}
                  onClick={() => this.toggleCategory(data)}
                >
                  {data}
                </button>
              </OEPAnalytics>
            ))}
          </div>
        )}
        {toggleLevelFilters && (
          <div
            className="filter-flex-wrapper"
            style={{ justifyContent: `${alignLeft ? "flex-start" : "center"}` }}
          >
            {defaultLevels.map((data, i) => (
              <OEPAnalytics
                page="Exhibitors List"
                componentType="Button"
                url={data}
                key={`${data - i}`}
                componentName={data}
              >
                <button
                  key={i}
                  className={this.getLevelClass(data)}
                  onClick={() => this.toggleLevel(data)}
                >
                  {this.displayName(data)}
                </button>
              </OEPAnalytics>
            ))}
          </div>
        )}
        {hideSearch ? (
          <div style={{ marginBottom: "100px" }} />
        ) : (
          <ScopedSearch
            page="Exhibitors List"
            passSearch={this.ExhibitorByName}
            fullSearch
            data={exhibitors}
            filterData={this.props.fuzzySearch}
            type="exhibitor"
            searchType="Exhibitor Filter"
            ref={this.searchInputRef}
          />
        )}
      </div>
    );
  }
}

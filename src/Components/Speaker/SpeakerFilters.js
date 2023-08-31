import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import ScopedSearch from "../Search/ScopedSearch";
import { capitalize } from "lodash";

export default class SpeakerFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: `All ${capitalize(
        process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
      )}`,
      user_search: null,
      clearState: false,
      speakers: null,
      toggleTypeFilters: false,
      defaultTypes: null,
      types: {},
    };
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const { defaultTypes, speakers } = this.props;
    const types = {};

    defaultTypes && defaultTypes.forEach((type) => (types[type] = false));

    this.setState({
      types: types,
      speakers: speakers,
      defaultTypes: defaultTypes,
    });
  }

  clearFilters = async () => {
    const { defaultTypes } = this.props;
    const types = {};
    defaultTypes.forEach((type) => (types[type] = false));

    await this.setState({
      filter: `All ${capitalize(
        process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
      )}`,
      clearState: true,
      user_search: null,
      toggleTypeFilters: false,
      types: types,
    });

    this.props.resetSpeakers();

    this.searchInputRef.current.clearSearch();
  };

  updateFilter = async (filter) => {
    await this.setState({
      filter: filter,
      toggleTypeFilters: false,
    });
    this.props.filterSpeakers(this.state);
  };

  speakerByName = (speakerName) => {
    const user_search = speakerName.toLowerCase();
    this.setState(
      {
        user_search: user_search,
      },
      () => this.props.filterSpeakers(this.state)
    );
  };

  toggleTypeFilters = () => {
    this.setState({
      toggleTypeFilters: !this.state.toggleTypeFilters,
      filter: this.state.toggleTypeFilters ? "" : "Type",
    });
  };

  getTypeClass = (data) => {
    const { types } = this.state;
    return types[data] === true
      ? "filter-button filter-button-active"
      : "filter-button gtm-session-filter";
  };

  toggleType = (filter) => {
    const { types } = this.state;
    types[filter] = !types[filter];

    this.setState(
      {
        types: types,
      },
      () => this.props.filterSpeakers(this.state)
    );
  };

  render() {
    const { filter, speakers } = this.state;
    const { homepage } = this.props;

    if (homepage) {
      return null;
    }

    return (
      <div className="grid-filter-wrapper" style={{ justifyContent: "center" }}>
        {/*<div className="filters-wrapper-large">*/}
        <OEPAnalytics
          page={`${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE} List`}
          componentType="Button"
          url={`All ${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}`}
          componentName={`All ${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}`}
        >
          <button
            className={`details-filter-button gtm-speaker-all-filter ${
              filter ===
              `All ${capitalize(
                process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
              )}`
                ? "details-filter-button-active"
                : ""
            }`}
            onClick={() =>
              this.updateFilter(
                `All ${capitalize(
                  process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
                )}`
              )
            }
          >
            All {capitalize(process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE)}
          </button>
        </OEPAnalytics>
        <OEPAnalytics
          page={`${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE} List`}
          componentType="Button"
          url="Filter by Type"
          componentName="Filter by Type"
        >
          <button
            className={`details-filter-button gtm-speaker-keynote-filter ${
              filter ===
              `Keynote ${capitalize(
                process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
              )}`
                ? "details-filter-button-active"
                : ""
            }`}
            onClick={() =>
              this.updateFilter(
                `Keynote ${capitalize(
                  process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
                )}`
              )
            }
          >
            Filter by Keynote
          </button>
        </OEPAnalytics>
        <OEPAnalytics
          page={`${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE} List`}
          componentType="Button"
          url="Clear Filters"
          componentName="Clear Filters"
        >
          <button
            className="details-filter-button gtm-speaker-clear-filter"
            onClick={this.clearFilters}
          >
            Clear Filters
          </button>
        </OEPAnalytics>
        <ScopedSearch
          passSearch={this.speakerByName}
          fullSearch
          data={speakers}
          filterData={this.props.fuzzySearch}
          searchType={`${capitalize(
            process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
          )} Filter`}
          type={process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}
          ref={this.searchInputRef}
          page="Speakers List"
        />
      </div>
    );
  }
}

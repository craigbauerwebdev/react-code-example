import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import ScopedSearch from "../Search/ScopedSearch";
export default class SessionFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDays: [],
      defaultTypes: [],
      defaultTracks: [],
      day: null,
      user_search: null,
      toggleTrackFilters: false,
      toggleTypeFilters: false,
      types: {},
      tracks: {},
      clearState: false,
      sessions: null,
      toggleOnDemand: false,
      toggleLiveSessions: false,
      defaultActiveFilter: false,
    };
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const {
      defaultDays,
      defaultTypes,
      defaultTracks,
      day,
      sessions,
    } = this.props;
    const types = {};
    const tracks = {};

    defaultTypes && defaultTypes.forEach((type) => (types[type] = false));
    defaultTracks && defaultTracks.forEach((track) => (tracks[track] = false));

    this.setState({
      defaultDays: defaultDays,
      defaultTypes: defaultTypes,
      defaultTracks: defaultTracks,
      day: day,
      types: types,
      tracks: tracks,
      sessions: sessions,
    });
    const { defaultActiveFilter } = this.props;

    if (defaultActiveFilter) {
      const checkForDay = defaultDays.filter(
        (day) => day === defaultActiveFilter
      );
      if (checkForDay.length > 0) {
        this.setDayFilter(checkForDay[0]);
      } else {
        this.setDayFilter("All");
      }
    }
  }

  clearFilters = () => {
    const { defaultTypes, defaultTracks } = this.props;
    const types = {};
    const tracks = {};

    defaultTypes.forEach((type) => (types[type] = false));
    defaultTracks.forEach((track) => (tracks[track] = false));

    this.setState({
      toggleTypeFilters: false,
      toggleTrackFilters: false,
      toggleLiveSessions: false,
      toggleOnDemand: false,
      types: types,
      tracks: tracks,
      day: "All",
      clearState: true,
      user_search: null,
    });

    this.props.resetSessions();

    this.searchInputRef.current.clearSearch();
  };

  toggleType = (filter) => {
    const { types } = this.state;
    types[filter] = !types[filter];

    this.setState(
      {
        types: types,
      },
      () => this.props.filterSessions(this.state)
    );
  };

  toggleTrack = (filter) => {
    const { tracks } = this.state;
    tracks[filter] = !tracks[filter];

    this.setState(
      {
        tracks: tracks,
      },
      () => this.props.filterSessions(this.state)
    );
  };

  getTypeClass = (data) => {
    const { types } = this.state;
    return types[data] === true
      ? "filter-button filter-button-active"
      : "filter-button gtm-session-filter";
  };

  getTrackClass = (data) => {
    const { tracks } = this.state;
    return tracks[data] === true
      ? "filter-button filter-button-active"
      : "filter-button gtm-session-filter";
  };

  setDayFilter = (day) => {
    this.setState(
      {
        day: day,
        toggleTypeFilters: false,
        toggleTrackFilters: false,
      },
      () => this.props.filterSessions(this.state)
    );
  };

  sessionByName = (sessionName) => {
    const user_search = sessionName.toLowerCase();

    this.setState(
      {
        user_search: user_search,
        toggleTypeFilters: false,
        toggleTrackFilters: false,
      },
      () => this.props.filterSessions(this.state)
    );
  };

  toggleTrackFilters = () => {
    this.setState({
      toggleTrackFilters: !this.state.toggleTrackFilters,
      toggleTypeFilters: false,
    });
  };

  toggleTypeFilters = () => {
    this.setState({
      toggleTypeFilters: !this.state.toggleTypeFilters,
      toggleTrackFilters: false,
    });
  };

  toggleLiveSessions = () => {
    this.setState(
      {
        toggleLiveSessions: !this.state.toggleLiveSessions,
        toggleTrackFilters: false,
        toggleTypeFilters: false,
        toggleOnDemand: false,
      },
      () => this.props.filterSessions(this.state)
    );
  };

  toggleOnDemand = () => {
    this.setState(
      {
        toggleOnDemand: !this.state.toggleOnDemand,
        toggleTrackFilters: false,
        toggleTypeFilters: false,
        toggleLiveSessions: false,
      },
      () => this.props.filterSessions(this.state)
    );
  };

  render() {
    const {
      defaultDays,
      defaultTypes,
      defaultTracks,
      day,
      toggleTrackFilters,
      toggleTypeFilters,
      toggleLiveSessions,
      sessions,
    } = this.state;
    const {
      hideSearch,
      alignLeft,
      hideFilters,
      homepage,
      onDemandOnly,
    } = this.props;

    return homepage ? (
      <div />
    ) : (
      <div>
        {!hideFilters && (
          <div>
            <div
              className="grid-filter-wrapper"
              style={{
                justifyContent: `${alignLeft ? "flex-start" : "center"}`,
              }}
            >
              {defaultDays.map((defaultDay, i) => (
                <OEPAnalytics
                  key={i}
                  page="Sessions List"
                  componentType="Button"
                  url="Filter by Day"
                  componentName="Filter by Day"
                >
                  <button
                    key={i}
                    className={
                      day === defaultDay
                        ? "details-filter-button gtm-session-day-filter details-filter-button-active"
                        : "details-filter-button gtm-session-day-filter"
                    }
                    onClick={() => this.setDayFilter(defaultDay)}
                  >
                    {defaultDay}
                  </button>
                </OEPAnalytics>
              ))}
            </div>
            <div></div>
            <div
              className="grid-filter-wrapper"
              style={{
                justifyContent: `${alignLeft ? "flex-start" : "center"}`,
              }}
            >
              <OEPAnalytics
                page="Sessions List"
                componentType="Button"
                url="Filter By Session Type"
                componentName="Filter By Session Type"
              >
                <button
                  className={
                    toggleTypeFilters
                      ? "details-filter-button gtm-session-type-filter details-filter-button-active"
                      : "details-filter-button gtm-session-type-filter"
                  }
                  onClick={this.toggleTypeFilters}
                >
                  Filter by Session Type
                </button>
              </OEPAnalytics>
              <OEPAnalytics
                page="Sessions List"
                componentType="Button"
                url="Filter By Topic"
                componentName="Filter By Topic"
              >
                <button
                  className={
                    toggleTrackFilters
                      ? "details-filter-button gtm-session-track-filter details-filter-button-active"
                      : "details-filter-button gtm-session-track-filter"
                  }
                  onClick={this.toggleTrackFilters}
                >
                  Filter by Topic
                </button>
              </OEPAnalytics>
              {!onDemandOnly && (
                <OEPAnalytics
                  page="Sessions List"
                  componentType="Button"
                  url="Filter By Live Stream"
                  componentName="Filter By Live Stream"
                >
                  <button
                    className={
                      toggleLiveSessions
                        ? "details-filter-button gtm-session-livestream-filter details-filter-button-active"
                        : "details-filter-button gtm-session-livestream-filter"
                    }
                    onClick={this.toggleLiveSessions}
                  >
                    Filter by Live Stream
                  </button>
                </OEPAnalytics>
              )}
              <OEPAnalytics
                page="Sessions List"
                componentType="Button"
                url="Clear Filters"
                componentName="Clear Filters"
              >
                <button
                  className="details-filter-button gtm-session-clear-filter"
                  onClick={this.clearFilters}
                >
                  Clear Filters
                </button>
              </OEPAnalytics>
            </div>
            {toggleTypeFilters && (
              <div
                className="filter-flex-wrapper"
                style={{
                  justifyContent: `${alignLeft ? "flex-start" : "center"}`,
                }}
              >
                {defaultTypes.map((data, i) => (
                  <OEPAnalytics
                    page="Sessions List"
                    componentType="Button"
                    url="Filter By Session Type"
                    componentName={data}
                    key={i}
                  >
                    <button
                      className={this.getTypeClass(data)}
                      onClick={() => this.toggleType(data)}
                    >
                      {data}
                    </button>
                  </OEPAnalytics>
                ))}
              </div>
            )}
            {toggleTrackFilters && (
              <div
                className="filter-flex-wrapper"
                style={{
                  justifyContent: `${alignLeft ? "flex-start" : "center"}`,
                }}
              >
                {defaultTracks.map((data, i) => (
                  <OEPAnalytics
                    page="Sessions List"
                    componentType="Button"
                    url="Filter By Session Track"
                    componentName={data}
                    key={i}
                  >
                    <button
                      className={this.getTrackClass(data)}
                      onClick={() => this.toggleTrack(data)}
                    >
                      {data}
                    </button>
                  </OEPAnalytics>
                ))}
              </div>
            )}
          </div>
        )}
        {hideSearch ? (
          ""
        ) : (
          <ScopedSearch
            passSearch={this.sessionByName}
            fullSearch
            data={sessions}
            filterData={this.props.fuzzySearch}
            searchType="Session Filter"
            type="session"
            ref={this.searchInputRef}
            page="Sessions List"
          />
        )}
      </div>
    );
  }
}

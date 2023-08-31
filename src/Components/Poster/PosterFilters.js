import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import ScopedSearch from "../Search/ScopedSearch";

export default class PosterFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTopics: [],
      user_search: null,
      toggleTopicFilters: false,
      topics: {},
      clearState: false,
      posters: null,
    };
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const { defaultTopics, posters } = this.props;
    const topics = {};

    defaultTopics && defaultTopics.forEach((data) => (topics[data] = false));

    this.setState({
      defaultTopics: defaultTopics,
      topics: topics,
      posters: posters,
    });
  }

  clearFilters = () => {
    const { defaultTopics } = this.props;
    const topics = {};

    defaultTopics.forEach((data) => (topics[data] = false));

    this.setState({
      defaultTopics: defaultTopics,
      topics: topics,
      toggleTopicFilters: false,
      clearState: true,
      user_search: "",
    });

    this.props.resetPosters();

    this.searchInputRef.current.clearSearch();
  };

  toggleTopic = (filter) => {
    const { topics } = this.state;
    topics[filter] = !topics[filter];
    this.setState(
      {
        topics: topics,
      },
      () => this.props.filterPosters(this.state)
    );
  };

  getTopicClass = (data) => {
    const { topics } = this.state;
    return topics[data] === true
      ? "filter-button filter-button-active"
      : "filter-button";
  };

  filterPosters = (posterTitle) => {
    const user_search = posterTitle.toLowerCase();

    this.setState(
      {
        user_search: user_search,
        toggleTopicFilters: false,
        clearState: false,
      },
      () => this.props.filterPosters(this.state)
    );
  };

  toggleTopicFilters = () => {
    this.setState({
      toggleTopicFilters: !this.state.toggleTopicFilters,
    });
  };

  render() {
    const { defaultTopics, toggleTopicFilters, posters } = this.state;
    const { hideSearch, alignLeft, homepage } = this.props;

    return homepage ? (
      <div />
    ) : (
      <div>
        <div
          className="grid-filter-wrapper"
          style={{ justifyContent: `${alignLeft ? "flex-start" : "center"}` }}
        >
          <OEPAnalytics
            page="Posters List"
            componentType="Button"
            url="Filter by Topic"
            componentName="Filter by Topic"
          >
            <button
              className={
                this.state.toggleTopicFilters
                  ? "details-filter-button gtm-poster-topic-filter details-filter-button-active"
                  : "details-filter-button gtm-poster-topic-filter"
              }
              onClick={this.toggleTopicFilters}
            >
              Filter by Topic
            </button>
          </OEPAnalytics>
          <OEPAnalytics
            page="Posters List"
            componentType="Button"
            url="Clear Filters"
            componentName="Clear Filters"
          >
            <button
              className="details-filter-button gtm-poster-clear-filter"
              onClick={(e) => {
                this.clearFilters();
              }}
            >
              Clear Filters
            </button>
          </OEPAnalytics>
        </div>
        {toggleTopicFilters && (
          <div
            className="filter-flex-wrapper"
            style={{ justifyContent: `${alignLeft ? "flex-start" : "center"}` }}
          >
            {defaultTopics.map((data, i) => (
              <OEPAnalytics
                page="Posters List"
                componentType="Button"
                url={data}
                key={data}
                componentName={data}
              >
                <button
                  key={i}
                  className={this.getTopicClass(data)}
                  onClick={this.toggleTopic.bind(this, data)}
                >
                  {data}
                </button>
              </OEPAnalytics>
            ))}
          </div>
        )}
        {hideSearch ? (
          ""
        ) : (
          <ScopedSearch
            passSearch={this.filterPosters}
            fullSearch
            data={posters}
            filterData={this.props.fuzzySearch}
            type="poster"
            ref={this.searchInputRef}
            page="Posters List"
          />
        )}
      </div>
    );
  }
}

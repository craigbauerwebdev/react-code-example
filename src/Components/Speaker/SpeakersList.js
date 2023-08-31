import React, { useCallback, useEffect, useReducer, useState } from "react";
import { emptyFilterData, setFullList } from "Components/Filters/store/actions";
import {
  paginationReducer,
  paginationState,
} from "Components/Paginate/reducer";
import sortResults, { sortTypes } from "util/sortResults";
import { useDispatch, useSelector } from "react-redux";

import DaysList from "Components/Filters/DaysList";
import FilterWrapper from "Components/Filters/FilterWrapper";
import FiltersSectionContainer from "Components/Filters/FiltersSectionContainer";
import FiltersSectionMobileButton from "Components/Filters/FiltersSectionMobileButton";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import Loader from "Components/Loader";
import { Paginate } from "../Paginate/Paginate";
import ScopedSearch from "Components/Search/ScopedSearch";
import SpeakerCardLarge from "./SpeakerCardLarge";
import TabFiltersConcat from "Components/Filters/TabFiltersConcat";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import { addTimes } from "./utils/addTimesToSpeaker";
import { dataTypes } from "store/utils/dataTypes";
import { filtersConfig } from "../../util/staticData/Components/Filters/Filters";
import { getPayload } from "store/actions";
import { pageTypes } from "Components/Filters/store/reducer";
import speakersListStyles from "./scss/speakers-list.module.scss";
import { useBoolean } from "hooks/useToggle";
import useClearPagination from "hooks/useClearPagination";
import useSaveBreadcrumbs from "hooks/useSaveBreadcrumbs";

const SpeakersList = () => {
  const dispatch = useDispatch();
  useSaveBreadcrumbs();
  const sessions = useSelector((state) => state.global.sessions);
  const speakers = useSelector((state) => state.global.speakers);
  const filteredSpeakers = addTimes(
    useSelector((state) => state.filters.filteredData),
    sessions
  );
  const fuzzySearch = useSelector((state) => state.filters.fuzzySearching);
  const [displayPage, setDisplayPage] = useState(false);
  const [statePaginationState, dispatchPagination] = useReducer(
    paginationReducer,
    paginationState
  );
  const [
    isMobileFilterOpen,
    { on: openMobileFilterSection, toggle: toggleMobileFilterSection },
  ] = useBoolean();
  const listRef = React.createRef();

  const fetchSpeakers = useCallback(
    (theSpeakers) => {
      /**
       * Array shuffle https://lodash.com/docs/#shuffle pulled from lodash
       */
      if (!filteredSpeakers) {
        const speakersWithName = theSpeakers.filter(
          (s) => s.firstName || s.lastName
        );

        dispatch(
          setFullList({
            data: speakersWithName,
            page: pageTypes.SPEAKER,
          })
        );
        setDisplayPage(true);
      } else if (filteredSpeakers && !displayPage) {
        dispatch(emptyFilterData());
      }
    },
    [dispatch, filteredSpeakers, displayPage]
  );

  /**
   * Sort speaker data for display
   *
   * @param {Speaker[]} speakers
   *
   * @returns {Speaker[]} sorted array of speakers by name or sorted by search relevance
   */
  const sortResultsInfo = (speakers) => {
    if (fuzzySearch) {
      return speakers;
    }
    return sortResults(speakers, sortTypes.name);
  };

  const getFilter = () => (
    <FilterWrapper
      page="Speakers List"
      days={<DaysList page="Speakers List" />}
      filterBar={[
        <TabFiltersConcat
          key={filtersConfig.keynote.name}
          name={filtersConfig.keynote.name}
          filterBy={filtersConfig.keynote.filterBy}
          deleteKeys={[filtersConfig.allSpeakers.filterBy]}
        />,
      ]}
      search={<ScopedSearch page="Speakers List" withClearButton={true} />}
    />
  );

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    }
    if (!speakers) {
      dispatch(getPayload(dataTypes.speakers));
    } else {
      fetchSpeakers(speakers);
    }
  }, [speakers, dispatch, sessions, fetchSpeakers]);

  useClearPagination(dispatchPagination);

  if (!speakers || !sessions || !displayPage) {
    return <Loader />;
  }

  return displayPage ? (
    <section>
      <h1 className={speakersListStyles.title}>
        <FiltersSectionMobileButton
          isMobileFilterOpen={isMobileFilterOpen}
          toggleMobileFilterSection={toggleMobileFilterSection}
        />
      </h1>
      <div className={speakersListStyles.flex}>
        {/* This <div /> is a container for layout since we are using flex and need to render the banner below the filters */}
        <div>
          <FiltersSectionContainer
            isMobileFilterOpen={isMobileFilterOpen}
            openMobileFilterSection={openMobileFilterSection}
          >
            <div className={speakersListStyles.innerFlex}>{getFilter()}</div>
          </FiltersSectionContainer>
          <VerticalSponsorBanner pageName="speakers" />
        </div>

        <div className={speakersListStyles.content}>
          <div
            className={speakersListStyles.speakerCardHolder}
            autoFocus={true}
            ref={listRef}
            tabIndex="-1"
          >
            {filteredSpeakers.length
              ? sortResultsInfo(filteredSpeakers)
                  .slice(
                    statePaginationState.startIndex,
                    statePaginationState.endIndex
                  )
                  .map((speaker) => (
                    <SpeakerCardLarge
                      key={speaker.username}
                      speaker={speaker}
                      page="Speakers List"
                    />
                  ))
              : "There are no speakers that match your search"}
          </div>
          <Paginate
            large
            total={filteredSpeakers.length}
            startIndex={statePaginationState.startIndex}
            dispatch={dispatchPagination}
            listRef={listRef}
            pageTitle={process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}
            page={`${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE} list`}
          />
        </div>
      </div>
      <HorizontalSponsorBanner pageName="speakers" />
    </section>
  ) : (
    <Loader />
  );
};

export default SpeakersList;

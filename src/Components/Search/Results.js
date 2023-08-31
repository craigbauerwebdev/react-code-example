import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import { ExhibitorCard } from "../Exhibitor/ExhibitorCard";
import HorizontalSponsorBanner from "Components/Banners/HorizontalSponsorBanner";
import { PosterCard } from "../Poster/PosterCard";
import Search from "./Search";
import { SessionCard } from "../Session/SessionCard";
import SpeakerCardLarge from "../Speaker/SpeakerCardLarge";
import { capitalize } from "lodash";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import { pageBanners } from "hooks/useGetPageByPathname";
import resultsStyles from "./scss/results.module.scss";
import useSaveBreadcrumbs from "hooks/useSaveBreadcrumbs";

const sortSessions = (data) => {
  return data.sort(function (a, b) {
    if (a.sessionName < b.sessionName && a.SortDate < b.SortDate) {
      return -1;
    }
    if (a.sessionName > b.sessionName && a.SortDate > b.SortDate) {
      return 1;
    }
    return 0;
  });
};
const sortPostersData = (a, b) => {
  if (a.PosterTitle < b.PosterTitle) {
    return -1;
  }
  if (a.PosterTitle > b.PosterTitle) {
    return 1;
  }
  return 0;
};
const sortPosters = (data) => data.sort(sortPostersData);

const Results = () => {
  const dispatch = useDispatch();
  useSaveBreadcrumbs();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const speakers = useSelector((state) => state.global.speakers);
  /**@type {Poster[]} */
  const posters = useSelector((state) => state.global.posters);
  const exhibitors = useSelector((state) => state.global.exhibitors);

  const [sessionResults, setSessionResults] = useState([]);
  const [speakerResults, setSpeakerResults] = useState([]);
  const [exhibitorResults, setExhibitorResults] = useState([]);
  const [posterResults, setPosterResults] = useState([]);
  const [filteredExhibitors, setFilteredExhibitors] = useState(null);
  const [filteredSessions, setFilteredSessions] = useState(null);
  const [filteredSpeakers, setFilteredSpeakers] = useState(null);
  const [filteredPosters, setFilteredPosters] = useState(null);
  const [search, setSearch] = useState(null);

  const searchExhibitors = (data) => {
    setFilteredExhibitors(data);
    setExhibitorResults(data);
  };

  const searchSessions = (data) => {
    setFilteredSessions(data);
    setSessionResults(data);
  };

  const searchSpeakers = (data) => {
    setFilteredSpeakers(data);
    setSpeakerResults(data);
  };

  const searchPosters = (data) => {
    setFilteredPosters(data);
    setPosterResults(data);
  };

  const passSearch = (data) => {
    setSearch(data);
  };

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    }
  }, [sessions, dispatch]);

  useEffect(() => {
    if (!speakers) {
      dispatch(getPayload(dataTypes.speakers));
    }
  }, [speakers, dispatch]);

  useEffect(() => {
    if (!posters) {
      dispatch(getPayload(dataTypes.posters));
    }
  }, [posters, dispatch]);

  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  }, [exhibitors, dispatch]);

  return (
    <Fragment>
      <Search
        page="Site Search"
        passSearch={passSearch}
        fullSearch
        sessions={sessions}
        speakers={speakers}
        exhibitors={exhibitors}
        posters={posters}
        filterSessions={searchSessions}
        filterSpeakers={searchSpeakers}
        filterExhibitors={searchExhibitors}
        filterPosters={searchPosters}
      />

      {search &&
        filteredSpeakers &&
        !filteredSpeakers.length &&
        filteredSessions &&
        !filteredSessions.length &&
        filteredExhibitors &&
        !filteredExhibitors.length &&
        filteredPosters &&
        !filteredPosters.length && (
          <div className={resultsStyles.searchError}>
            There are no results for {search}
          </div>
        )}

      {filteredSpeakers && speakerResults.length > 0 && (
        <div>
          {speakerResults && speakerResults.length && (
            <h2 className={resultsStyles.title}>
              {capitalize(process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE)}{" "}
              Results:
            </h2>
          )}
          <div
            className={`${resultsStyles.grid} ${resultsStyles.speakerCardHolder}`}
          >
            {filteredSpeakers
              ? filteredSpeakers.map((speaker, i) => (
                  <SpeakerCardLarge
                    key={i}
                    speaker={speaker}
                    page="Site Search"
                  />
                ))
              : "There are no results"}
          </div>
        </div>
      )}

      {filteredSessions && filteredSessions.length > 0 && (
        <div>
          {sessionResults && (
            <h2 className={resultsStyles.title}>Session Results:</h2>
          )}
          <div className={resultsStyles.grid}>
            {filteredSessions
              ? sortSessions(filteredSessions).map((session, i) => (
                  <SessionCard
                    classList="results"
                    data={session}
                    key={i}
                    page="Site Search"
                  />
                ))
              : "There are no results"}
          </div>
        </div>
      )}

      {ConfigService.runValues.hasPosters &&
        filteredPosters &&
        posterResults.length > 0 && (
          <div>
            {posterResults && (
              <h2 className={resultsStyles.title}>Poster Results:</h2>
            )}
            <div
              className={`${resultsStyles.grid} ${resultsStyles.posterList}`}
            >
              {filteredPosters
                ? sortPosters(filteredPosters).map((poster, i) => (
                    <PosterCard data={poster} key={i} page="Site Search" />
                  ))
                : "There are no results"}
            </div>
          </div>
        )}

      {ConfigService.runValues.hasExhibitors && filteredExhibitors?.length > 0 && (
        <div>
          {exhibitorResults && (
            <h2 className={resultsStyles.title}>
              {capitalize(process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE)}{" "}
              Results:
            </h2>
          )}
          <div className={resultsStyles.grid}>
            {filteredExhibitors
              ? filteredExhibitors.map((exhibitor, i) => (
                  <ExhibitorCard data={exhibitor} key={i} page="Site Search" />
                ))
              : "There are no results"}
          </div>
        </div>
      )}
      <HorizontalSponsorBanner pageName={pageBanners.globalSearch} />
    </Fragment>
  );
};

export default Results;

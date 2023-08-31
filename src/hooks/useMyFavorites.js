import sortResults, { sortTypes } from "util/sortResults";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import { getProfileData } from "Components/Profile/store/actions";
import lodash from "lodash";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/useMyFavorites
 *
 * @returns {JSX.Element}
 */
const useMyFavorites = () => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const favoriteIds = useSelector((state) => state.profile.favorites);
  const allSessions = useSelector((state) =>
    state.global.sessions
      ? sortResults(state.global.sessions, sortTypes.startEndTimeAndName)
      : null
  );
  const allPosters = useSelector((state) =>
    state.global.posters
      ? sortResults(state.global.posters, sortTypes.subSessionName)
      : null
  );
  const allExhibitors = useSelector((state) =>
    state.global.exhibitors
      ? state.global.exhibitors.sort((a, b) =>
          a.exhibitor_name.localeCompare(b.exhibitor_name)
        )
      : null
  );
  const allSpeakers = useSelector((state) =>
    state.global.speakers
      ? sortResults(state.global.speakers, sortTypes.name)
      : null
  );
  const [noDisplayData, setNoDisplayData] = useState(true);
  const [favoriteLoaded, setFavoriteLoaded] = useState(false);
  const [fullList, setFullList] = useState(null);
  const makeFullList = useCallback(
    (
      {
        sessionsFullList,
        postersFullList,
        exhibitorsFullList,
        speakersFullList,
      },
      {
        sessions = [],
        subsessions = [],
        speakers = [],
        exhibitors = [],
        posters = [],
      }
    ) => {
      const sessionItems = sessionsFullList
        .filter((s) => s.subSessions)
        .map((session) => {
          return {
            ...session,
            subSessions: session.subSessions.map((subSession) => ({
              ...subSession,
              isFavorited: subsessions?.includes(
                String(subSession.subSessionId)
              ),
            })),
          };
        });
      const sessionOrSubSessions = ConfigService.runValues.hasSubSessions
        ? "sessions & subsessions"
        : "sessions";
      // Make a list of favorite items per type for display.
      return [
        {
          type: sessionOrSubSessions,
          items: sessionItems.filter((session) =>
            sessions.includes(`${session.sessionId}`)
          ),
          filterKeyName: "favSessions",
        },
        {
          type: "posters",
          items: postersFullList?.filter((poster) =>
            posters.includes(`${poster.subSessionId}`)
          ),
          filterKeyName: "favPosters",
        },
        {
          type: "exhibitors",
          items: exhibitorsFullList.filter((exhibitor) =>
            exhibitors.includes(exhibitor.fuzion_exhibitor_id)
          ),
          filterKeyName: "favExhibitors",
        },
        {
          type: "speakers",
          items: speakersFullList.filter((speaker) =>
            speakers.includes(speaker.username)
          ),
          filterKeyName: "favSpeakers",
        },
      ];
    },
    []
  );

  //pull favorites
  useEffect(() => {
    if (user && !retrievedPayloads.has(profileLookupKey.favorites)) {
      dispatch(getProfileData(dataTypes.favorites, profileLookupKey.favorites));
    } else if (favoriteIds) {
      setFavoriteLoaded(true);
    }
  }, [favoriteIds, user, dispatch]);

  //pull posters
  useEffect(() => {
    if (ConfigService.runValues.hasPosters && !allPosters) {
      dispatch(getPayload(dataTypes.posters));
    }
  }, [allPosters, dispatch]);

  //pull exhibitors
  useEffect(() => {
    if (ConfigService.runValues.hasExhibitors && !allExhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  }, [allExhibitors, dispatch]);

  //pull speakers
  useEffect(() => {
    if (!allSpeakers) {
      dispatch(getPayload(dataTypes.speakers));
    }
  }, [allSpeakers, dispatch]);

  //pull Sessions
  useEffect(() => {
    if (!allSessions) {
      dispatch(getPayload(dataTypes.sessions));
    }
  }, [allSessions, dispatch]);
  /**
   *  Make list of items to be displayed.
   * This effect should only run when there is a change (ie a favorite item was un-favorite) to favoriteIds.
   */
  useEffect(() => {
    if (favoriteIds) {
      setFullList(
        makeFullList(
          {
            sessionsFullList: allSessions ? allSessions : [],
            speakersFullList: allSpeakers ? allSpeakers : [],
            exhibitorsFullList: allExhibitors ? allExhibitors : [],
            postersFullList: allPosters ? allPosters : [],
          },
          favoriteIds
        )
      );
    }
  }, [
    allSessions,
    allSpeakers,
    allExhibitors,
    allPosters,
    favoriteIds,
    makeFullList,
  ]);

  // Check to see if there is data or if all data was removed.
  useEffect(() => {
    const noPosters = ConfigService.runValues.hasPosters
      ? lodash.isEmpty(favoriteIds.posters)
      : true;
    const noExhibitors = ConfigService.runValues.hasExhibitors
      ? lodash.isEmpty(favoriteIds.exhibitors)
      : true;

    if (
      lodash.isEmpty(favoriteIds.sessions) &&
      noPosters &&
      noExhibitors &&
      lodash.isEmpty(favoriteIds.speakers)
    ) {
      setNoDisplayData(true);
    } else {
      setNoDisplayData(false);
    }
  }, [favoriteIds, favoriteLoaded]);

  return {
    noDisplayData,
    favoriteLoaded,
    fullList,
  };
};

export default useMyFavorites;

import React, { useEffect, useState } from "react";
import sortResults, { sortTypes } from "util/sortResults";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import { PosterCard } from "./PosterCard";
import ViewAll from "Components/Paginate/ViewAll";
import { checkIfTodayByCustomDate } from "util/checkIfTodayByCustomDate";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import postersListStyles from "./scss/posters-list.module.scss";

const FeaturedPosters = ({ byDay }) => {
  const dispatch = useDispatch();
  /**@type {Poster[]} */
  const posters = useSelector((state) => state.global.posters);
  const [displayPage, setDisplayPage] = useState(false);
  /**@type {[Poster[], Function]} */
  const [postersList, setPostersList] = useState(null);
  const timezone = useSelector((state) => state.global.timezone);

  useEffect(() => {
    const fetchPosters = (thePosters) => {
      // Filter for posters that are flagged as featured
      const featuredPosters = thePosters.filter(
        (poster) => poster.subSessionCustom3
      );

      // Sort all posters
      const sortAllPosters = sortResults(
        featuredPosters,
        sortTypes.startEndTimeAndName
      );

      if (sortAllPosters.length > 0) {
        if (byDay) {
          // Find posters that match today's date or are set for post event
          const todaysCustomDateFeaturedPosters = sortAllPosters.filter(
            (poster) => {
              // Accepted date format for byDay in subSessionCustom3:
              // "2021-09-20T00:00:00" or "Post Event" or "2021-09-20T00:00:00|2021-09-21T00:00:00|Post Event"
              const isToday = checkIfTodayByCustomDate(
                poster.subSessionCustom3,
                timezone
              );
              return isToday;
            }
          );
          if (todaysCustomDateFeaturedPosters.length) {
            return setPostersList(todaysCustomDateFeaturedPosters);
          }
        }
        // If not using a custom date or if there are no posters in todaysCustomDateFeaturedPosters,
        // return the first 4 posters that are flagged as featured
        return setPostersList(featuredPosters.slice(0, 4));
      }

      return setPostersList([]);
    };
    if (!posters) {
      dispatch(getPayload(dataTypes.posters));
    } else {
      fetchPosters(posters);
      setDisplayPage(true);
    }
  }, [posters, timezone, byDay, dispatch]);
  if (!posters || !displayPage) {
    return <Loader />;
  }
  if (!postersList?.length) {
    return null;
  }
  return (
    <div>
      <h1 className={postersListStyles.featuredTitle}>Featured Posters</h1>
      <ViewAll
        data={postersList}
        path="/posters"
        type="Posters"
        homepage={true}
      />
      <section
        className={`${postersListStyles.postersListHolder} ${postersListStyles.home}`}
      >
        {postersList?.map((data) => (
          <PosterCard
            data={data}
            key={data.clientSubSessionId}
            page="homepage"
          />
        ))}
      </section>
    </div>
  );
};
export default FeaturedPosters;

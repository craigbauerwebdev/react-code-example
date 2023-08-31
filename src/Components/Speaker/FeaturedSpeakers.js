import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import SpeakerCardLarge from "./SpeakerCardLarge";
import ViewAll from "Components/Paginate/ViewAll";
import { capitalize } from "lodash";
import { dataTypes } from "store/utils/dataTypes";
import featuredSpeakersStyles from "./scss/featured-speakers.module.scss";
import { getPayload } from "store/actions";
import groupBy from "lodash/groupBy";
import moment from "moment-timezone";

const FeaturedSpeakers = ({ byDay }) => {
  /**@type {Speaker[]} */
  const timezone = useSelector((state) => state.global.timezone);
  const speakers = useSelector((state) => state.global.speakers);
  const dispatch = useDispatch();
  /**@type {[Speaker[], Function]} */
  const [filteredSpeakers, setFilteredSpeakers] = useState(null);

  /**
   * Sort speaker list
   *
   * @param {Speaker[]} filteredSpeakers
   *
   * @returns {Speaker[]} sorted Speaker array
   */
  const sortFeatured = (data) => {
    return data.sort((a, b) => {
      const aTime = a.eventUserCustom4;
      const bTime = b.eventUserCustom4;

      if (aTime > bTime) {
        return 1;
      }

      if (aTime < bTime) {
        return -1;
      }

      if (aTime === bTime) {
        const aLastChar = a.lastName
          ? a.lastName
          : a.preferredName || a.firstName; //if last name doesn't exist, use first name as last name
        const bLastChar = b.lastName
          ? b.lastName
          : b.preferredName || b.firstName; //https://freemandigital.atlassian.net/browse/OE-2262

        if (aLastChar > bLastChar) {
          return 1;
        }

        if (aLastChar < bLastChar) {
          return -1;
        }
        const aFirstChar = a.preferredName || a.firstName;
        const bFirstChar = b.preferredName || b.firstName;

        if (aFirstChar > bFirstChar) {
          return 1;
        }

        if (aFirstChar < bFirstChar) {
          return -1;
        }
      }

      return 0;
    });
  };

  const validateTimestamp = (time) => {
    /*
     * https:stackoverflow.com/questions/12422918/how-to-validate-timestamp-in-javascript
     */
    const isValid = new Date(time).getTime() > 0;
    return isValid;
  };

  useEffect(() => {
    const fetchSpeakers = (theSpeakers) => {
      /*
       * Array shuffle https://lodash.com/docs/#shuffle pulled from lodash
       */
      const speakerList = theSpeakers;

      let featuredSpeakers = speakerList
        .filter((s) => s.isVip)
        .filter((s) => s.firstName || s.lastName)
        .filter((s) => validateTimestamp(s.eventUserCustom4));

      if (featuredSpeakers.length > 0) {
        featuredSpeakers = sortFeatured(featuredSpeakers);

        if (byDay) {
          const currentFeatured = featuredSpeakers.filter((s) => {
            const featuredDateTime = moment.tz(s.eventUserCustom4, timezone);
            return moment
              .tz(new Date(), timezone)
              .isSame(featuredDateTime, "day");
          });

          if (currentFeatured.length > 0) {
            return setFilteredSpeakers(currentFeatured);
          } else {
            // if there are not featured speakers for the current day
            // get the closest in the past
            let featuredByFirstDay = [...featuredSpeakers];
            featuredByFirstDay = groupBy(featuredByFirstDay, function (fs) {
              return moment(fs.eventUserCustom4).startOf("day").format();
            });

            // filter if date has passed
            const filterDatesNotInPast = Object.keys(featuredByFirstDay)
              .filter(
                (d) => !moment.tz(new Date(), timezone).isBefore(d),
                "day"
              )
              ?.sort();

            // get latest date that hasnt passed current
            const closestDate = filterDatesNotInPast?.pop();

            featuredByFirstDay = featuredByFirstDay[closestDate];
            return setFilteredSpeakers(featuredByFirstDay);
          }
        }
        return setFilteredSpeakers(featuredSpeakers);
      }

      return setFilteredSpeakers([]);
    };

    if (!speakers) {
      dispatch(getPayload(dataTypes.speakers));
    } else {
      fetchSpeakers(speakers);
    }
  }, [speakers, timezone, byDay, dispatch]);

  if (!filteredSpeakers) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className={featuredSpeakersStyles.title}>
        Featured {capitalize(process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE)}
      </h1>
      <ViewAll
        data={filteredSpeakers}
        path={`/${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}`}
        type={capitalize(process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE)}
        homepage={true}
      />
      <section className={featuredSpeakersStyles.featuredSpeakers}>
        {filteredSpeakers.length
          ? filteredSpeakers.map((speaker) => (
              <SpeakerCardLarge
                key={speaker.username}
                speaker={speaker}
                page="homepage"
                classNameProp="homeFeatured"
              />
            ))
          : "There are no speakers that match your search"}
      </section>
    </div>
  );
};

export default FeaturedSpeakers;

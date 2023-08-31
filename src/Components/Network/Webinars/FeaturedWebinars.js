import React, { useCallback, useEffect, useState } from "react";
import { emptyFilterData, setFullList } from "Components/Filters/store/actions";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import ViewAll from "../../Paginate/ViewAll";
import WebinarCard from "Components/Session/WebinarCard";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import { getPayload } from "store/actions";
import { pageTypes } from "Components/Filters/store/reducer";
import sortResults from "util/sortResults";
import useGuestProfiles from "hooks/useGuestProfiles";
import webinarsListStyles from "./scss/webinars-list.module.scss";

const FeaturedWebinars = () => {
  const sessions = useSelector((state) => state.global.showcaseSessions);
  const dispatch = useDispatch();
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const timezone = useSelector((state) => state.global.timezone);
  const guestProfiles = useSelector((state) => state.profile.guestProfiles);
  const [displayPage, setDisplayPage] = useState(false);
  const filteredWebinars = useSelector((state) => state.filters.filteredData);
  const { loadProfiles } = useGuestProfiles();
  const sortData = useCallback((data) => {
    return sortResults(data, "startEndTimeAndName");
  }, []);
  const groupWebinars = useCallback(
    (webinars) => {
      // Add formatted data to data to be grouped by.
      return webinars.map((event) => {
        event.day = formatDate(
          { date: event.sessionStart, format: "MM/DD/YYYY" },
          timezone
        );

        return event;
      });
    },
    [timezone]
  );

  useEffect(() => {
    if (filteredWebinars && exhibitors && displayPage) {
      // Group list by date and save it to state

      filteredWebinars.forEach((webinar) => {
        const exData = exhibitors.find(
          (z) => z.exhibitor_company_id === webinar.fuzionExhibitorId
        );
        webinar.exhibitor_name = exData?.exhibitor_name;

        if (guestProfiles) {
          guestProfiles.map((guest) => {
            guest.fullName = `${guest.firstName} ${guest.lastName}`;
            guest.preferredFullName = `${guest.preferredName} ${guest.lastName}`;
            return null;
          });
          const hostProfile = guestProfiles.find(
            (z) => z.attendeeId === webinar.host
          );
          webinar.hostProfile = hostProfile;
        }
      });
    }
  }, [filteredWebinars, groupWebinars, exhibitors, guestProfiles, displayPage]);

  //Get exhibitor data
  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  }, [exhibitors, dispatch]);

  useEffect(() => {
    if (!sessions || !exhibitors) {
      if (!sessions) {
        dispatch(getPayload(dataTypes.showcaseSessions));
      } else if (!exhibitors) {
        dispatch(getPayload(dataTypes.exhibitors));
      }
    }
  }, [sessions, exhibitors, dispatch]);

  //fetch host data
  useEffect(() => {
    if (sessions) {
      loadProfiles(sessions.map((z) => z.host));
    }
  }, [sessions, loadProfiles]);

  useEffect(() => {
    if (filteredWebinars && !displayPage) {
      // Empty filter store
      dispatch(emptyFilterData());
    } else if (!filteredWebinars && !displayPage && sessions) {
      // Set data to filter store
      dispatch(
        setFullList({ data: sortData(sessions), page: pageTypes.WEBINARS })
      );
      // Page can be displayed
      setDisplayPage(true);
    }
  }, [sessions, dispatch, displayPage, filteredWebinars, sortData]);

  if (!displayPage) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className={webinarsListStyles.title}>Showcases</h1>
      <section
        className={`${webinarsListStyles.postersListHolder} ${webinarsListStyles.home}`}
      >
        {sortData(filteredWebinars)
          ?.slice(0, 10)
          .map((data, i) => (
            <WebinarCard
              data={data}
              key={`${i}-${data.clientSubSessionId}`}
              page="homepage"
            />
          ))}
      </section>

      <ViewAll
        data={filteredWebinars}
        path="/networking/showcases"
        type="Showcases"
        homepage={true}
      />
    </div>
  );
};

export default FeaturedWebinars;

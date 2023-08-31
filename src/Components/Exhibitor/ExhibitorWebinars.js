import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { useCallback, useEffect, useState } from "react";
import { emptyFilterData, setFullList } from "Components/Filters/store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Carousel } from "react-responsive-carousel";
import ConfigService from "services/ConfigService";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import WebinarCard from "Components/Session/WebinarCard";
import { bpMap } from "util/bpMap";
import checkForWatchNow from "util/checkForWatchNow";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import moment from "moment-timezone";
import { pageTypes } from "Components/Filters/store/reducer";
import singleExhibitorStyles from "./scss/single-exhibitor.module.scss";
import sortResults from "util/sortResults";
import useGuestProfiles from "hooks/useGuestProfiles";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const current = moment.tz(
  new Date(),
  "MMM Do YYYY h:mmA",
  ConfigService.runValues.momentTimezone
);

export const ExhibitorWebinars = ({ exhibitor }) => {
  const dispatch = useDispatch();
  const showcaseSessions = useSelector(
    (state) => state.global.showcaseSessions
  );
  const guestProfiles = useSelector((state) => state.profile.guestProfiles);
  const [displayPage, setDisplayPage] = useState(false);
  const filteredWebinars = useSelector((state) => state.filters.filteredData);
  const [webinars, setWebinars] = useState(null);
  const { loadProfiles } = useGuestProfiles();
  const isMobile = useToggleDisplayMQ(bpMap.laptopWide);

  const sortData = useCallback((data) => {
    return sortResults(data, "startEndTimeAndName");
  }, []);

  useEffect(() => {
    if (filteredWebinars) {
      // get only webinars for current exhibitor
      const webinarsForExhibitor = filteredWebinars.filter(
        (webinar) =>
          exhibitor.exhibitor_name?.replace(/ /g, "")?.toLowerCase() ===
            webinar.sessionCustom5?.replace(/ /g, "")?.toLowerCase() ||
          exhibitor.exhibitor_company_id?.replace(/ /g, "")?.toLowerCase() ===
            webinar.sessionCustom5?.replace(/ /g, "")?.toLowerCase()
      );

      const nowPlayingOrNextWebinars = webinarsForExhibitor
        .map((session) => {
          const currentIsBeforeSessionStart = moment(current).isBefore(
            moment.tz(
              session.sessionStart,
              ConfigService.runValues.momentTimezone
            )
          );
          return currentIsBeforeSessionStart || checkForWatchNow(session)
            ? session
            : null;
        })
        .filter(Boolean);

      // map attendee profile to webinar
      const webinarsWithProfile = nowPlayingOrNextWebinars.map((webinar) => {
        if (guestProfiles) {
          const hostProfile = guestProfiles.find(
            (z) => z.attendeeId === webinar.host
          );
          webinar.hostProfile = hostProfile;
        }
        return webinar;
      });
      // sort and update webinar state
      setWebinars(sortResults(webinarsWithProfile, "startEndTimeAndName"));
    }
  }, [
    setWebinars,
    filteredWebinars,
    guestProfiles,
    exhibitor.exhibitor_name,
    exhibitor.fuzion_exhibitor_id,
    exhibitor.exhibitor_company_id,
  ]);

  // Get Webinar Data for endpoint
  useEffect(() => {
    dispatch(
      getPayload(
        dataTypes.webinars,
        process.env.REACT_APP_FUZION_EVENT_ID,
        true
      )
    );
  }, [dispatch]);

  //fetch host data
  useEffect(() => {
    if (showcaseSessions) {
      loadProfiles(showcaseSessions.map((z) => z.host));
    }
  }, [showcaseSessions, loadProfiles]);

  useEffect(() => {
    if (!showcaseSessions) {
      dispatch(getPayload(dataTypes.showcaseSessions));
    } else if (filteredWebinars && !displayPage) {
      // Empty filter store
      dispatch(emptyFilterData());
    } else if (!filteredWebinars && !displayPage && showcaseSessions) {
      // Set data to filter store
      dispatch(
        setFullList({
          data: sortData(showcaseSessions),
          page: pageTypes.WEBINARS,
        })
      );
      // Page can be displayed
      setDisplayPage(true);
    }
  }, [showcaseSessions, dispatch, displayPage, filteredWebinars, sortData]);

  const batchWebinarsForCarousel = (arr, width) =>
    arr.reduce(
      (rows, key, index) =>
        (index % width === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      []
    );

  const GenerateComponents = (w) => {
    const batchedData = batchWebinarsForCarousel(w, 2);

    return batchedData.map((d, i) => (
      <div className={singleExhibitorStyles.innerCarouselContainer} key={i}>
        <WebinarCard data={d[0]} />
        <WebinarCard data={d[1]} />
      </div>
    ));
  };

  if (!webinars) {
    return (
      <div className={singleExhibitorStyles.main}>
        <Loader />
      </div>
    );
  }

  const arrowStyles = {
    position: "absolute",
    top: "35%",
    zIndex: 1,
    background: "white",
    fontSize: "26px",
    marginTop: 0,
    padding: 0,
    border: "none",
    maxHeight: "26px",
  };

  const indicatorStyles = {
    background: "#d9d9d9",
    width: 10,
    height: 10,
    display: "inline-block",
    margin: "0 10px",
    borderRadius: "50%",
  };

  return webinars && webinars.length ? (
    <div className={singleExhibitorStyles.carouselContainer}>
      <div className={singleExhibitorStyles.carouselHeader}>
        <h2>Live Showcases</h2>
        <LinkWrapper
          to="/networking/showcases"
          page="Single Exhibitor"
          componentType="Link"
          trackingUrl="See All Live Showcases"
          componentName="See All Live Showcases"
        >
          See All
        </LinkWrapper>
      </div>
      <Carousel
        infiniteLoop={true}
        useKeyboardArrows={true}
        showStatus={false}
        showThumbs={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <OEPAnalytics
              componentType="Button"
              page="Single Exhibitor"
              url="Go to next page"
              componentName="Go to next page"
            >
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  ...arrowStyles,
                }}
              >
                <SvgTypes name="chevron-left" />
              </button>
            </OEPAnalytics>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <OEPAnalytics
              componentType="Button"
              page="Single Exhibitor"
              url="Go to previous page"
              componentName="Go to previous page"
            >
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  ...arrowStyles,
                  right: "2px",
                }}
              >
                <SvgTypes name="chevron-right" />
              </button>
            </OEPAnalytics>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{ ...indicatorStyles, background: "#606060" }}
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            );
          }
          return (
            <li
              style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {isMobile
          ? webinars.map((webinar, i) => <WebinarCard data={webinar} key={i} />)
          : GenerateComponents(webinars)}
      </Carousel>
    </div>
  ) : (
    <div />
  );
};

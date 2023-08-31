import "../../css/kendo/subset.scss";

import React, { useCallback, useEffect, useState } from "react";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";
import { useDispatch, useSelector } from "react-redux";

import AttendeeListBody from "./AttendeeListBody";
import Auth from "services/Auth";
import CreateMeetingModal from "Components/Profile/CreateMeetingModal";
import Loader from "Components/Loader";
import Logger from "js-logger";
import MyScheduleDropdown from "Components/Network/Webinars/WebinarContent/MyScheduleDropdown";
import Pagination from "Components/Paginate/ApiPagination";
import { algoliaSetting } from "Components/Profile/store/actions";
import attendeeListStyles from "./scss/attendee-list.module.scss";
import axios from "axios";
import { bpMap } from "util/bpMap";
import { emptyFilterData } from "Components/Filters/store/actions";
import representativeSetupStyles from "Components/Profile/scss/representative-setup.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";
import { searchActionTypes } from "Components/AttendeeSearch/AttendeeSearchReducer";
import { setOpenChat } from "Components/Profile/store/actions";
import { useHistory } from "react-router-dom";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

let unsubRef = null;
let ws;

const unsubscribeAndCloseSocket = (ws) => {
  ws.close();
};

const AttendeeList = ({ searchState, dispatchSearchState, mobileFilter }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useToggleDisplayMQ(bpMap.laptopWide);
  const [scheduleMeetingAttendee, setScheduleMeetingAttendee] = useState(false);
  const [attendeesFilterData, setAttendeesFilterData] = useState(null);
  const filteredData = useSelector((state) => state.filters.filteredData);
  const user = useSelector((state) => state.global.user);
  const [loading, setLoading] = useState(true);

  const tableRef = React.createRef();

  const toggleDialog = () => {
    setScheduleMeetingAttendee(null);
    enableParentPageScroll();
  };

  const handleClick = (attendee) => {
    setScheduleMeetingAttendee(attendee);
    disableParentPageScroll();
  };

  const handleProfileClick = (attendee) => {
    if (user.fuzion_attendee_id !== attendee.fuzionAttendeeId) {
      saveAnalytic({
        page: "Attendee Profile",
        pageId: "Attendee Profile",
        componentType: "Link",
        componentName: attendee.name,
        url: `/attendee/${attendee.fuzionAttendeeId}/attendees`,
      });
      history.push(`/attendee/${attendee.fuzionAttendeeId}/attendees`);
    }
  };

  const handleChatClick = (attendee) => {
    if (!attendee.id) {
      attendee.id = attendee.fuzionAttendeeId;
    }

    dispatch(
      setOpenChat({
        selectedAttendee: { id: attendee.id, Profile: attendee },
        isMinimized: false,
        show: true,
      })
    );
  };

  const openWebsocket = useCallback(() => {
    const token = Auth.getMiddlewareAPIAccessToken();
    const localHost = process.env.REACT_APP_API_HOST.indexOf("//localhost");
    ws = new WebSocket(
      localHost >= 0
        ? "ws://" + process.env.REACT_APP_API_HOST.split("http://")[1]
        : "wss://" + process.env.REACT_APP_API_HOST.split("https://")[1],
      [token]
    );
    ws.onopen = () => {
      unsubRef = unsubscribeAndCloseSocket.bind(null, ws);
      window.addEventListener("beforeunload", unsubRef);
      ws.send(
        JSON.stringify({
          request: "subscribe",
        })
      );
      ws.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        if (msg.request !== "healthcheck") {
          setTimeout(() => {
            dispatch(algoliaSetting("destroy"));
            dispatch(algoliaSetting("attendee"));
          }, 2500);
        }
      };
    };
    ws.onclose = (e) => {
      Logger.log("websocket close", e.code);
      if (e.code !== 1005 && e.code !== 1006) {
        setTimeout(() => {
          openWebsocket();
        }, 2 * 1000);
      }
    };
    return ws;
  }, [dispatch]);

  // PJX-484 VIP filter added on Attendee List, VIP should not be visible on list
  const searchStateFilter = searchState?.filter;
  useEffect(() => {
    if (!searchStateFilter) {
      dispatchSearchState({
        type: searchActionTypes.SET_FILTER,
        payload:
          "networking.allowUserNetworking.BOOL = 1 AND networking.isVIP.BOOL = 0 AND networking.allowNetworking.BOOL = 1", // Algolia converts boolean values to 0 or 1 so we filter by the converted value.
      });
    }
  }, [searchStateFilter, dispatchSearchState]);

  /**
   * Clean open or close websocket and clean up carried over filter data for previous page
   */
  useEffect(() => {
    openWebsocket();
    if (filteredData) {
      dispatch(emptyFilterData());
    }
    return () => {
      if (ws) {
        ws.close();
        window.removeEventListener("beforeunload", unsubRef);
        unsubRef = null;
      }
    };
  }, [filteredData, dispatch, openWebsocket]);

  //useAlgoliaSetting();

  // get filter buttons data form API
  useEffect(() => {
    if (!attendeesFilterData) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/attendee-filters`)
        .then((response) => {
          if (response && Array.isArray(response.data)) {
            const data = response.data.map((filter) => {
              if (filter.subfilters) {
                filter.subfilters = filter.subfilters
                  .split("|")
                  .map((subfilter) => (subfilter ? subfilter.trim() : ""))
                  .filter(Boolean);
              }
              return filter;
            });
            setAttendeesFilterData(data);
          }
        });
    }
  }, [attendeesFilterData]);

  useEffect(() => {
    if (searchState) {
      setLoading(false);
    }
  }, [searchState]);

  return (
    <div>
      <div className={attendeeListStyles.headerWrapper}>
        <h2 className={attendeeListStyles.title}>Attendees</h2>
        <MyScheduleDropdown />
      </div>
      {mobileFilter && mobileFilter()}
      {!loading ? (
        <div className={attendeeListStyles.main}>
          {searchState.hits && searchState.hits.length > 0 ? (
            <div className={attendeeListStyles.scrollingContentHolder}>
              <div
                className={`${
                  searchState.resultsInfo?.nbHits > 0 &&
                  attendeeListStyles.spacing
                } ${attendeeListStyles.scrollingContent}`}
              >
                <table
                  className={attendeeListStyles.table}
                  ref={tableRef}
                  autoFocus={true}
                  tabIndex="-1"
                >
                  <thead
                    className={`${
                      isMobile && representativeSetupStyles.tableHeader
                    }`}
                  >
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Exhibitor Rep</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  {searchState.hits && (
                    <AttendeeListBody
                      data={searchState.hits}
                      handleChatClick={handleChatClick}
                      handleClick={handleClick}
                      handleProfileClick={handleProfileClick}
                    />
                  )}
                </table>
              </div>
              {searchState.resultsInfo &&
                searchState.resultsInfo.nbHits > 0 && (
                  <Pagination
                    totalPages={searchState.resultsInfo.nbPages}
                    currentPage={searchState.page}
                    dispatchSearchState={dispatchSearchState}
                    listRef={tableRef}
                    pageTitle="Attendee List"
                  />
                )}
            </div>
          ) : (
            <p> Sorry there are no results for your search.</p>
          )}
          {scheduleMeetingAttendee && (
            <CreateMeetingModal
              toggleDialog={toggleDialog}
              preLoadedAttendeeProp={scheduleMeetingAttendee}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AttendeeList;

import React, { useEffect, useReducer } from "react";
import {
  paginationReducer,
  paginationState,
} from "Components/Paginate/reducer";
import sortResults, { sortTypes } from "util/sortResults";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import { Paginate } from "../Paginate/Paginate";
import PreEventSessionsTab from "./PreEventSessionsTab";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import preEventSessions from "./scss/pre-event-sessions-list.module.scss";

const SessionsList = () => {
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const [statePaginationState, dispatchPagination] = useReducer(
    paginationReducer,
    paginationState
  );
  const listRef = React.createRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    }
  }, [sessions, dispatch]);

  if (!sessions) {
    return <Loader />;
  }

  return (
    <section>
      <h1 className={preEventSessions.title}>Sessions</h1>

      <div
        className={preEventSessions.results}
        autoFocus={true}
        ref={listRef}
        tabIndex="-1"
      >
        {sortResults(sessions, sortTypes.time)
          .slice(statePaginationState.startIndex, statePaginationState.endIndex)
          .map((data, i) => (
            <PreEventSessionsTab data={data} key={i} index={i} />
          ))}
      </div>

      <Paginate
        large
        inc={7}
        total={sessions.length}
        startIndex={statePaginationState.startIndex}
        dispatch={dispatchPagination}
        listRef={listRef}
        pageTile="Sessions"
        page="preevent"
      />
    </section>
  );
};

export default SessionsList;

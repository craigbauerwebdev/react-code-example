import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, { BUTTON_TYPES } from "Components/Modal/ModalButtons";
import React, { useEffect, useReducer } from "react";
import {
  actionTypesCalendar,
  calendarReducer,
  calendarState,
} from "Components/CalendarView/reducer/calendar";
import { useDispatch, useSelector } from "react-redux";

import CalendarView from "./CalendarView";
import Loader from "Components/Loader";
import SessionTab from "Components/Session/SessionTab";
import WherebyTab from "Components/Session/WherebyTab";
import { bpMap } from "util/bpMap";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import holderStyles from "./scss/calendar-holder-home.module.scss";
import moment from "moment-timezone";
import { momentLocalizer } from "react-big-calendar";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Calendar
 * This version will display event in the users timezone.
 */
const CalendarHolder = ({ userTimezone }) => {
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const showcaseSessions = useSelector(
    (state) => state.global.showcaseSessions
  );
  const isMobile = useToggleDisplayMQ(bpMap.midpoint);
  const timezone = useSelector((state) => state.global.timezone);
  const [stateCalendar, dispatchCalendar] = useReducer(
    calendarReducer,
    calendarState
  );

  const checkForShowcase = ({ sessionType }) => {
    return (
      sessionType?.sessionTypeName === "Showcase" ||
      sessionType?.sessionTypeName === "Session Showcase"
    );
  };

  const selectEvent = (e) => {
    // Get event data to display in pop up
    const allSessions = [...sessions, ...showcaseSessions];
    const [getSession] = allSessions.filter((s) => s.sessionId === e.id);
    if (getSession) {
      dispatchCalendar({
        type: actionTypesCalendar.SET_MODAL,
        payload: {
          modalSession: getSession,
          modalActive: true,
        },
      });
    }
  };

  const getStartDay = () => {
    const [year, month, day] = stateCalendar.defaultDate;

    return new Date(year, month, day);
  };

  const closeModal = () => {
    dispatchCalendar({
      type: actionTypesCalendar.SET_MODAL,
      payload: {
        modalSession: null,
        modalActive: false,
      },
    });
  };

  // Turn off pop up for browser below 980px
  useEffect(() => {
    if (isMobile) {
      dispatchCalendar({
        type: actionTypesCalendar.SET_MODAL,
        payload: {
          modalSession: null,
          modalActive: false,
        },
      });
    }
  }, [isMobile]);

  useEffect(() => {
    if (!sessions || !showcaseSessions) {
      dispatch(getPayload(dataTypes.sessions));
      dispatch(getPayload(dataTypes.showcaseSessions));
    } else if (userTimezone && timezone) {
      // Set up all Calendar data
      dispatchCalendar({
        type: actionTypesCalendar.SET_EVENTS_LIST,
        payload: {
          data: [...sessions, ...showcaseSessions],
          tz: timezone,
        },
      });
    } else {
      dispatchCalendar({
        type: actionTypesCalendar.SET_EVENTS_LIST,
        payload: {
          data: [...sessions, ...showcaseSessions],
          tz: moment.tz.guess(),
        },
      });
    }
  }, [sessions, showcaseSessions, dispatch, timezone, userTimezone]);

  if (stateCalendar.noData) {
    return null;
  }

  if (!stateCalendar.events) {
    return <Loader />;
  }

  return (
    <div className={holderStyles.holder}>
      <CalendarView
        calendarEvent={stateCalendar.events}
        startDay={getStartDay()}
        eventSelect={selectEvent}
        min={stateCalendar.min}
        legend={stateCalendar.legend}
        rooms={stateCalendar.rooms}
        daysToolbar={stateCalendar.daysList}
        tz={timezone}
        localizer={momentLocalizer(moment.tz.setDefault(stateCalendar.tz))}
      />
      {stateCalendar.modalSession && (
        <Modal
          active={stateCalendar.modalActive}
          closeCallback={closeModal}
          button={[
            <ModalButtons
              type={BUTTON_TYPES.closeIcon}
              key={BUTTON_TYPES.closeIcon}
              page="Calendar"
              componentType="Calendar Session Modal"
              url="Calendar"
              componentName="Close modal"
            />,
          ]}
          modalType={MODAL_TYPES.wide}
        >
          {checkForShowcase(stateCalendar.modalSession) ? (
            <WherebyTab
              modal={true}
              data={stateCalendar.modalSession}
              isWebinar
              page="calendar"
            />
          ) : (
            <SessionTab
              modal={true}
              data={stateCalendar.modalSession}
              page="calendar"
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default CalendarHolder;

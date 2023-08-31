import React, { useCallback, useEffect, useReducer, useState } from "react";
import { actionTypes, alertReducer } from "./reducer";
import sortResults, { sortTypes } from "util/sortResults";
import { useDispatch, useSelector } from "react-redux";

import AlertItem from "./AlertItem";
import ConfigService from "services/ConfigService";
import { bpMap } from "util/bpMap";
import checkForLiveStream from "util/checkForLiveStream";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import { getPayload } from "store/actions";
import moment from "moment";
import nowPlayingAlertStyles from "./scss/now-playing-alert.module.scss";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const NowPlayingAlert = () => {
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const hideAlert = useSelector(
    (state) => state.global.hideLiveStreamAlertMessages
  );
  const [dataSet, setDataSet] = useState(false);
  const [alertState, dispatchAlertState] = useReducer(alertReducer, {
    sessionsDisplay: null,
    watchNow: null,
    timerEventSet: false,
  });

  /**
   * Creat a live stream queue
   * Find all live stream events that haven't happened already today and the next calendar day.
   */
  const watchNowData = useCallback((sessions) => {
    const nextDay = moment(new Date()).add(1, "d");
    const data = sessions
      .filter((s) => checkForLiveStream(s))
      .filter((s) => {
        return (
          formatDate({ date: new Date() }) ===
            formatDate({ date: s.SessionStart }) ||
          formatDate({ date: nextDay }) === formatDate({ date: s.SessionStart })
        );
      })
      .filter((s) => {
        const startTime = moment(s.SessionStart).tz(
          ConfigService.runValues.momentTimezone
        );

        return startTime.isSameOrAfter(
          moment.tz(
            new Date(),
            "MM/DD/YYYY h:mmA",
            ConfigService.runValues.momentTimezone
          )
        );
      })
      .map((s) => {
        s.active = true;
        return s;
      });

    dispatchAlertState({
      type: actionTypes.SET_WATCH_NOW,
      payload: {
        watchNow: sortResults(data, sortTypes.time),
      },
    });
  }, []);

  // Alert Time for live stream events
  const setTimer = useCallback((time, data) => {
    window.alertTimeout = setTimeout(() => {
      const setDisplay = data.filter((s) => {
        const start = s.SessionStart;

        return moment
          .tz(start, ConfigService.runValues.momentTimezone)
          .isBetween(new Date(), moment(new Date()).add(30, "s"));
      });

      dispatchAlertState({
        type: actionTypes.SET_SESSIONS_DISPLAY,
        payload: setDisplay,
      });
    }, time);
  }, []);
  const close = (item) => {
    dispatchAlertState({
      type: actionTypes.HIDE_SESSION,
      payload: item,
    });
  };
  const handleAnimationEvt = (session, e) => {
    e.persist();
    dispatchAlertState({
      type: actionTypes.REMOVE_SESSION,
      payload: {
        session,
        name: e.animationName,
      },
    });
  };

  // Get Data for Alerts
  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    } else if (!dataSet && !hideAlert && !isMobile) {
      watchNowData(sessions);
      setDataSet(true);
    } else if (hideAlert || isMobile) {
      clearTimeout(window.alertTimeout);
      setDataSet(false);
      dispatchAlertState({
        type: actionTypes.RESET,
      });
    }
  }, [sessions, dispatch, watchNowData, dataSet, hideAlert, isMobile]);

  // Get time in ms for when next live stream event will take place.
  useEffect(() => {
    if (
      alertState.watchNow &&
      alertState.watchNow.length > 0 &&
      !alertState.timerEventSet
    ) {
      const [firstUp] = alertState.watchNow;
      const now = moment.tz(new Date(), ConfigService.runValues.momentTimezone);
      const then = moment.tz(
        firstUp.SessionStart,
        ConfigService.runValues.momentTimezone
      );
      const sec = then.diff(now, "second");

      setTimer(sec * 1000, alertState.watchNow);

      dispatchAlertState({
        type: actionTypes.SET_TIMER_TO_EVENT,
        payload: true,
      });
    }
  }, [alertState.watchNow, setTimer, alertState.timerEventSet]);

  if (!alertState.sessionsDisplay || isMobile) {
    return null;
  }

  return (
    <div className={nowPlayingAlertStyles.alertHolder}>
      {alertState.sessionsDisplay.map((session, i) => (
        <AlertItem
          index={i}
          key={session.SessionName}
          session={session}
          animationEvt={handleAnimationEvt}
          closeEvt={close}
        />
      ))}
    </div>
  );
};

export default NowPlayingAlert;

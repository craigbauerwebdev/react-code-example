import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  actionTypesNowPlayingDrawer,
  nowPlayingIntState,
  nowPlayingReducer,
} from "./reducer";
import { getPayload, setNowPlayingDrawerIsOpen } from "store/actions";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import DrawerButton from "./DrawerButton";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import NowPlayingVideo from "./NowPlayingVideo";
import OEPAnalytics from "Components/OEPAnalytics";
import SessionSpeakers from "./SessionSpeakers";
import { bpMap } from "util/bpMap";
import checkForLiveStream from "util/checkForLiveStream";
import checkForWatchNow from "util/checkForWatchNow";
import { dataTypes } from "store/utils/dataTypes";
import getSessionUrl from "util/getSessionUrl";
import getUpcomingSessions from "util/getUpcomingSessions";
import lodash from "lodash";
import moment from "moment";
import nowPlayingDrawerStyles from "./scss/now-playing-drawer.module.scss";
import sortResults from "../../util/sortResults";
import useGetPageByPathname from "hooks/useGetPageByPathname";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const Hours_24 = 86400;

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Now-Playing-Drawer
 * Now Playing Drawer persistent footer.
 */
export default function NowPlayingDrawer() {
  const dispatch = useDispatch();
  const { hideNowPlaying, closeNowPlaying } = useGetPageByPathname();
  const [firstLoad, setFirstLoad] = useState(false);
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const isMobile = useToggleDisplayMQ(bpMap.phablet);
  /**@type {[NowPlayingState, Function]} */
  const [stateNowPlaying, dispatchNowPlaying] = useReducer(
    nowPlayingReducer,
    nowPlayingIntState
  );
  const [animationEnded, setAnimationEnded] = useState(false);
  /**
   * What session should display in the now playing drawer.
   * If a live stream session has started and has not yet ended display that sessions.
   * If no session has started yet but there is a live stream session for today display that.
   */
  const getSession = useCallback(
    (sessionsData) => {
      // Get current time remove 5 seconds to buffer time change
      const now = moment
        .tz(new Date(), ConfigService.runValues.momentTimezone)
        .subtract(5, "second");
      const liveStreamOnly = sortResults(
        sessionsData,
        "startEndTimeAndName"
      ).filter(checkForLiveStream);
      const [nowPlaying] = liveStreamOnly.filter(checkForWatchNow);
      const [nextSessions] = getUpcomingSessions(liveStreamOnly);
      const watchNowDur = () => {
        if (!lodash.isEmpty(nowPlaying)) {
          /**
           * Has live stream event currently playing.
           * Get the end time of the event.
           */
          return moment.tz(
            nowPlaying.sessionEnd,
            ConfigService.runValues.momentTimezone
          );
        }

        if (!lodash.isEmpty(nextSessions)) {
          /**
           * No Live stream event currently playing.
           * Get the start time of the next event.
           */
          return moment.tz(
            nextSessions.sessionStart,
            ConfigService.runValues.momentTimezone
          );
        }

        // No live stream data
        return null;
      };
      /**
       * Take the time return from watchNowDur() and get the time difference from now to the next change.
       * Change is either a live stream event has ended or one is about to begin.
       * Depends on if anything is in playing or nextSessions.
       */
      const currentDurSec = watchNowDur()
        ? watchNowDur().diff(now, "second")
        : null;
      const displayData = () => {
        if (!lodash.isEmpty(nowPlaying)) {
          return nowPlaying;
        }

        if (!lodash.isEmpty(nextSessions)) {
          return nextSessions;
        }

        return false;
      };

      if (currentDurSec) {
        dispatchNowPlaying({
          type: actionTypesNowPlayingDrawer.SET_VIDEO_AND_SESSION,
          payload: {
            watchNow: !lodash.isEmpty(nowPlaying),
            session: displayData(),
            /**
             * How long the timeout function should run before there is a change.
             * If time diff is larger then 24 hours use 24 hours as value to avoid infinite number
             */
            timeoutDur: currentDurSec >= Hours_24 ? Hours_24 : currentDurSec,
          },
        });
        dispatch(setNowPlayingDrawerIsOpen(true));
      } else {
        // No data to display
        dispatchNowPlaying({
          type: actionTypesNowPlayingDrawer.SET_VIDEO_AND_SESSION,
          payload: {
            watchNow: false,
            session: false,
            timeoutDur: null,
          },
        });
        dispatch(setNowPlayingDrawerIsOpen(false));
      }
    },
    [dispatch]
  );
  const videoToggleClickHandler = () => {
    dispatchNowPlaying({
      type: actionTypesNowPlayingDrawer.SET_BRAWER_AND_PLAYER,
      payload: {
        min: true,
        drawer: false,
      },
    });
  };
  const closeDrawer = () => {
    dispatchNowPlaying({
      type: actionTypesNowPlayingDrawer.SET_DRAWER,
      payload: false,
    });
  };
  const animationEvt = (e) => {
    e.persist();

    if (e.target.dataset.name === "draw") {
      setAnimationEnded(true);
    }
  };
  const setupTimeout = useCallback(
    (dur, data) => {
      let timeout;

      if (timeout) {
        // Clear out any timeout that are running just incase this function gets called more then once.
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        /**
         * Timeout has run there is a change in data.
         * Either the current event has ended or its about to begin.
         */
        getSession(data);
        dispatchNowPlaying({
          type: actionTypesNowPlayingDrawer.SET_TIMEOUT,
          payload: false, // Set stateNowPlaying.timeoutSet to false so the useEffect can run again if it needs to.
        });
      }, dur);
    },
    [getSession]
  );

  // Get sessions list
  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    }
  }, [dispatch, sessions]);

  // Run on change for stateNowPlaying.drawerIsOpen
  useEffect(() => {
    if (stateNowPlaying.drawerIsOpen) {
      // Track animation end event
      setAnimationEnded(false);
    }
  }, [stateNowPlaying]);

  useEffect(() => {
    if (sessions && !firstLoad) {
      // First load of Now playing drawer
      getSession(sessions);
      setFirstLoad(true);
    }
  }, [getSession, sessions, firstLoad]);

  // This will run every time the stateNowPlaying.timeoutDur and stateNowPlaying.timeoutSet values are changed
  useEffect(() => {
    if (!stateNowPlaying.timeoutSet && stateNowPlaying.timeoutDur && sessions) {
      // We have a time out so we set stateNowPlaying.timeoutSet to true so this function wont run again.
      dispatchNowPlaying({
        type: actionTypesNowPlayingDrawer.SET_TIMEOUT,
        payload: true,
      });

      setupTimeout(stateNowPlaying.timeoutDur * 1000, sessions);
    }
  }, [stateNowPlaying, sessions, setupTimeout]);

  useEffect(() => {
    if (closeNowPlaying) {
      dispatchNowPlaying({
        type: actionTypesNowPlayingDrawer.SET_DRAWER,
        payload: false,
      });
    }
  }, [closeNowPlaying]);

  if (!stateNowPlaying.session || hideNowPlaying) {
    return null;
  }

  return (
    <div
      className={`${nowPlayingDrawerStyles.nowPlayingDrawerWrapper} ${
        stateNowPlaying.drawerIsOpen
          ? nowPlayingDrawerStyles.open
          : nowPlayingDrawerStyles.closed
      } ${
        ConfigService.runValues.enableChatbot &&
        nowPlayingDrawerStyles.chatbotPadding
      }`}
      role="complementary"
      aria-label={`${
        stateNowPlaying.watchNow ? "Now Playing" : "Coming Up Next"
      } Drawer`}
      onTransitionEnd={animationEvt}
      data-name={`${!stateNowPlaying.drawerIsOpen && "draw"}`}
    >
      {stateNowPlaying.drawerIsOpen && (
        <Fragment>
          <OEPAnalytics
            componentType="Button"
            page="Now Playing"
            url="#after-now-playing-drawer"
            componentName="Skip to after"
          >
            <a href="#after-now-playing-drawer" className="sr-focusable">
              Skip to after{" "}
              {stateNowPlaying.watchNow ? "Now Playing" : "Coming Up Next"}
            </a>
          </OEPAnalytics>
          <div id="before-now-playing-drawer"></div>
        </Fragment>
      )}
      {!stateNowPlaying.removeVideoPlaying && (
        <NowPlayingVideo
          session={stateNowPlaying.session}
          dispatch={dispatchNowPlaying}
          state={stateNowPlaying}
        />
      )}
      <DrawerButton
        session={stateNowPlaying.session}
        dispatch={dispatchNowPlaying}
        state={stateNowPlaying}
      />
      <div
        className={`${nowPlayingDrawerStyles.nowPlayingDrawerContainer} ${
          !animationEnded && nowPlayingDrawerStyles.active
        }`}
        aria-hidden={animationEnded}
      >
        <section>
          {isMobile ? (
            <LinkWrapper
              to={getSessionUrl(stateNowPlaying.session)}
              trackingUrl={getSessionUrl(stateNowPlaying.session)}
              className={nowPlayingDrawerStyles.drawerVideoPlayLink}
              componentName="watch now"
            >
              <div className={nowPlayingDrawerStyles.drawerVideoPlay}>
                <span className="sr-only">
                  Watch Now - {stateNowPlaying.session.sessionName}
                </span>
              </div>
            </LinkWrapper>
          ) : (
            <OEPAnalytics
              componentType="now playing video"
              page="Now Playing"
              url={getSessionUrl(stateNowPlaying.session)}
              componentName="Play Video"
            >
              <button
                className={nowPlayingDrawerStyles.drawerVideoPlay}
                onClick={videoToggleClickHandler}
              >
                <span className="sr-only">Play video</span>
              </button>
            </OEPAnalytics>
          )}
          <div className={nowPlayingDrawerStyles.descriptionContainer}>
            <h1 className={nowPlayingDrawerStyles.nowPlayingDrawerTitle}>
              {stateNowPlaying.watchNow ? "Now Playing" : "Coming Up Next"}
            </h1>
            {isMobile ? (
              <LinkWrapper
                to={getSessionUrl(stateNowPlaying.session)}
                className={
                  nowPlayingDrawerStyles.nowPlayingDrawerSessionTitleLink
                }
                page="Now Playing"
                componentType="Text Link"
                trackingUrl={getSessionUrl(stateNowPlaying.session)}
                componentName={stateNowPlaying.session.sessionName}
              >
                <h2
                  className={
                    nowPlayingDrawerStyles.nowPlayingDrawerSessionTitle
                  }
                >
                  {stateNowPlaying.session.sessionName}
                </h2>
              </LinkWrapper>
            ) : (
              <h2
                className={nowPlayingDrawerStyles.nowPlayingDrawerSessionTitle}
              >
                <OEPAnalytics
                  page="Now Playing"
                  componentType="Button"
                  url={getSessionUrl(stateNowPlaying.session)}
                  componentName={stateNowPlaying.session.sessionName}
                >
                  <button onClick={videoToggleClickHandler}>
                    {stateNowPlaying.session.sessionName}
                  </button>
                </OEPAnalytics>
              </h2>
            )}
            <SessionSpeakers session={stateNowPlaying.session} />
          </div>
        </section>
        <div className={nowPlayingDrawerStyles.nowPlayingAllButtons}>
          <div className={nowPlayingDrawerStyles.nowPlayingButtonsContainer}>
            {stateNowPlaying.watchNow ? (
              <span>
                {isMobile ? (
                  <LinkWrapper
                    page="Now Playing"
                    componentType="Button"
                    to={getSessionUrl(stateNowPlaying.session)}
                    trackingUrl={getSessionUrl(stateNowPlaying.session)}
                    className={`${nowPlayingDrawerStyles.detailsButton} ${nowPlayingDrawerStyles.watchNow}`}
                    componentName="watch now"
                  >
                    Watch Now
                  </LinkWrapper>
                ) : (
                  <OEPAnalytics
                    page="Now Playing"
                    componentType="Button"
                    url={getSessionUrl(stateNowPlaying.session)}
                    componentName="watch now"
                  >
                    <button
                      onClick={videoToggleClickHandler}
                      className={`${nowPlayingDrawerStyles.detailsButton} ${nowPlayingDrawerStyles.watchNow}`}
                    >
                      Watch Now
                    </button>
                  </OEPAnalytics>
                )}
              </span>
            ) : (
              <span>
                {isMobile ? (
                  <LinkWrapper
                    to={getSessionUrl(stateNowPlaying.session)}
                    className={`${nowPlayingDrawerStyles.detailsButton} ${nowPlayingDrawerStyles.watchNow}`}
                    aria-label={`See Details for "${stateNowPlaying.session.sessionName}"`}
                    page="Now Playing"
                    componentType="Button"
                    trackingUrl={getSessionUrl(stateNowPlaying.session)}
                    componentName="see details"
                  >
                    See Details
                  </LinkWrapper>
                ) : (
                  <LinkWrapper
                    to={getSessionUrl(stateNowPlaying.session)}
                    className={`${nowPlayingDrawerStyles.detailsButton} ${nowPlayingDrawerStyles.watchNow}`}
                    aria-label={`See Details for "${stateNowPlaying.session.sessionName}"`}
                    page="Now Playing"
                    componentType="Button"
                    trackingUrl={getSessionUrl(stateNowPlaying.session)}
                    componentName="details"
                  >
                    Details
                  </LinkWrapper>
                )}
              </span>
            )}
          </div>
          <div className={nowPlayingDrawerStyles.nowPlayingButtonsContainer}>
            <OEPAnalytics
              page="Now Playing"
              componentType="Button"
              url={`Close ${stateNowPlaying.session.sessionName}`}
              componentName="Close now playing drawer"
            >
              <button
                className={nowPlayingDrawerStyles.detailsButton}
                onClick={closeDrawer}
                aria-label={`Close pop-up of ${stateNowPlaying.session.sessionName}`}
              >
                Close
              </button>
            </OEPAnalytics>
          </div>
        </div>
      </div>
      {stateNowPlaying.drawerIsOpen && (
        <Fragment>
          <OEPAnalytics
            page="Now Playing"
            componentType="Button"
            url="#before-now-playing-drawer"
            componentName="Skip to before"
          >
            <a href="#before-now-playing-drawer" className="sr-focusable">
              Skip to before{" "}
              {stateNowPlaying.watchNow ? "Now Playing" : "Coming Up Next"}
            </a>
          </OEPAnalytics>
          <div id="after-now-playing-drawer"></div>
        </Fragment>
      )}
    </div>
  );
}

import "./scss/add-to-calendar.scss";

import React, { useEffect, useState } from "react";

import ConfigService from "services/ConfigService";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "./SVG/SvgTypes";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import checkForShowcaseSession from "util/checkForShowcaseSession";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import getMeetingUrl from "util/getMeetingUrl";
import getSessionLink from "Components/Session/utils/getSessionLink";
import kebabCase from "lodash/kebabCase";
import lodash from "lodash";
import moment from "moment-timezone";
import webinarCardStyles from "Components/Session/scss/webinar-card.module.scss";

function handleOutsideClick({ target }) {
  const { classList } = target;
  if (!classList.contains("addeventatc")) {
    const visibleCalendarMenu = document.querySelector(
      '[id$="-drop"][id^="addeventatc"]'
    );
    if (visibleCalendarMenu) {
      visibleCalendarMenu.parentNode.removeChild(visibleCalendarMenu);
    }
  }
}

/**
 *
 * @param {Object} props
 * @param {Session} props.session
 * @param {boolean} props.iconOnly
 * @param {string} props.page
 * @param {string} props.userTz
 * @param {string} props.user
 * @returns
 */

export default function AddToCalendar({ session, iconOnly, page, userTz }) {
  const [focusState, setFocusState] = useState(false);
  const isShowcaseSession = checkForShowcaseSession(session);

  const formatSpeaker = (speaker) => {
    const fullName = [speaker.firstName, speaker.lastName].join(" ");
    return `${fullName}${
      speaker.organization ? `\n${speaker.organization}` : ""
    }`;
  };
  /**
   *
   * @param {Session} session
   * @returns {String} of Speaker and Moderators
   */
  const getSpeakersAndModeratorsList = (session) => {
    let moderatorPresenterList = [];

    if (session.moderators && session.moderators.length > 0) {
      moderatorPresenterList = moderatorPresenterList.concat(
        session.moderators.map((speaker) => formatSpeaker(speaker))
      );
    }

    if (session.subSessions) {
      const allSpeakers = lodash
        .flatten(session.subSessions.map((subSession) => subSession.presenters))
        .filter(Boolean);

      if (allSpeakers && allSpeakers.length > 0) {
        moderatorPresenterList = moderatorPresenterList.concat(
          allSpeakers.map((speaker) => formatSpeaker(speaker))
        );
      }
    }

    moderatorPresenterList = [...new Set(moderatorPresenterList)];

    return moderatorPresenterList.join("\n\n");
  };

  const noTextClassName = iconOnly ? "atc_button--no-text" : "";

  const getLocationUrl = () => {
    return checkForChimeMeeting(session)
      ? getMeetingUrl(session, isShowcaseSession)
      : getSessionLink(session, isShowcaseSession);
  };

  const descriptionText = `
  ${session.sessionName}
  ${session.description.replace(/<[^>]*>/g, " ")}
  ${formatDate({ date: session.sessionStart }, userTz)}
  ${formatTime(session, userTz)}

  Speakers:
  ${getSpeakersAndModeratorsList(session)}

  ${process.env.REACT_APP_EVENT_URL}${getLocationUrl()}
`;
  const handleFocus = () => {
    setFocusState(true);
  };
  const handleBlur = () => {
    setFocusState(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    const elem = document.getElementById("addEvt");

    if (!elem) {
      //Attach Script to head tag
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://addevent.com/libs/atc/1.6.1/atc.min.js";
      script.id = "addEvt";
      document.getElementsByTagName("head")[0].appendChild(script);

      window.addeventasync = function () {
        window.addeventatc.settings({
          css: false,
        });
      };
    }

    if (!window.addEvtLoaded && window.addeventatc) {
      window.addEvtLoaded = true;
      window.addeventatc.refresh();
    }

    return () => {
      //Remove Script from head tag
      const elem = document.getElementById("addEvt");
      if (elem) {
        elem.parentNode.removeChild(elem);
      }

      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const formatTimeForAddEvent = (d) => {
    const date = moment
      .tz(d, ConfigService.runValues.momentTimezone)
      .format("L");
    const time = moment
      .tz(d, ConfigService.runValues.momentTimezone)
      .format("LT");
    return `${date} ${time}`;
  };

  const titleId = kebabCase(session.sessionName?.slice(0, 30).trim());

  return (
    <OEPAnalytics
      page={`${page}`}
      componentType="Button"
      url="Exported to Calendar"
      componentName="Export to Calendar"
    >
      <div
        title="Export to Calendar"
        aria-describedby={titleId}
        role="button"
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        className={`addeventatc add-to-calendar-button ${
          iconOnly && webinarCardStyles.iconOnly
        } ${noTextClassName} ${focusState && "add-to-calendar-focus"}`}
      >
        <div className="atc_icon_holder">
          <span
            className={`atc_icon ${iconOnly && webinarCardStyles.iconOnlySVG}`}
          >
            <SvgTypes name="calendar" />
          </span>
          {!iconOnly ? (
            <span className="atc_title">Export to Calendar</span>
          ) : (
            <span className="sr-only">Export to Calendar</span>
          )}
        </div>
        <span className="start">
          {formatTimeForAddEvent(session.sessionStart)}
        </span>
        <span className="end">{formatTimeForAddEvent(session.sessionEnd)}</span>
        <span className="timezone">
          {ConfigService.runValues.momentTimezone}
        </span>
        <span className="title">
          {session.sessionName} | {process.env.REACT_APP_META_TITLE}
        </span>
        <span className="description">{descriptionText}</span>
        <span className="location">{`${
          process.env.REACT_APP_EVENT_URL
        }${getLocationUrl()}`}</span>
      </div>
    </OEPAnalytics>
  );
}

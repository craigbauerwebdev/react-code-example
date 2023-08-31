import ConfigService from "services/ConfigService";
import { LOGIN_URL } from "../../services/Auth";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import checkForLiveStream from "util/checkForLiveStream";
import checkForWatchNow from "util/checkForWatchNow";
import generatedName from "util/generatedName";
import moment from "moment-timezone";

export default class NowPlayingBanner extends React.Component {
  state = {
    banner: "now-playing-banner-wrapper",
    session: null,
    isLivestream: false,
  };

  componentDidMount() {
    const closedState = localStorage.getItem("closedState");
    if (closedState) {
      this.setState({ banner: "hide-now-playing-banner" });
    }
    this.fetchSessions();
  }

  closeBanner = () => {
    this.setState(
      {
        banner: "hide-now-playing-banner",
      },
      () => {
        this.setClosedStateInStorage();
      }
    );
  };

  setClosedStateInStorage = () => {
    localStorage.setItem("closedState", true);
  };

  getSessionStart = (sessionStart) => {
    const timestamp = sessionStart.split("T");
    const milliseconds = Date.parse(sessionStart);
    const newDate = new Date(milliseconds - 10 * 60 * 1000);
    const formattedNewDate = newDate.toString().split(" ")[4];
    return `${timestamp[0]}T${formattedNewDate}`;
  };

  fetchSessions = () => {
    const data = this.props.sessions;

    const livestreamOnly = data.filter(checkForLiveStream);

    const nowPlaying = livestreamOnly.filter((session) =>
      checkForWatchNow(session)
    );

    const current = moment.tz(
      new Date(),
      "MMM Do YYYY h:mmA",
      ConfigService.runValues.momentTimezone
    );
    const nextSessions = livestreamOnly
      .map((session) => {
        const currentIsBeforeSessionStart = moment(current).isBefore(
          moment.tz(
            session.SessionStart,
            ConfigService.runValues.momentTimezone
          )
        );
        return currentIsBeforeSessionStart ? session : null;
      })
      .filter(Boolean);

    this.setState({
      session: nowPlaying.length ? nowPlaying[0] : nextSessions[0],
      isLivestream: nowPlaying.length ? true : false,
    });
  };

  render() {
    if (window.location.pathname === LOGIN_URL) return null;

    const { session, isLivestream } = this.state;

    if (session) {
      return null;
    }

    return (
      <div className={this.state.banner} id="now-playing-banner">
        <div className="now-playing-banner-container">
          <section>
            <div className="description-container">
              <LinkWrapper
                to={
                  session.sessionVideoSource
                    ? `/live-stream/${session.sessionId}/${generatedName(
                        session.sessionName
                      )}`
                    : `/sessions/${session.SessionId}/${generatedName(
                        session.sessionName
                      )}`
                }
                page="Banner"
                componentType="Button"
                trackingUrl={
                  session.sessionVideoSource
                    ? `/live-stream/${session.sessionId}/${generatedName(
                        session.sessionName
                      )}`
                    : `/sessions/${session.SessionId}/${generatedName(
                        session.sessionName
                      )}`
                }
                componentName="Now Playing"
              >
                {isLivestream ? <h5>Now Playing</h5> : <h5>Coming Up Next</h5>}
              </LinkWrapper>
              <LinkWrapper
                to={
                  session.sessionVideoSource
                    ? `/live-stream/${session.sessionId}/${generatedName(
                        session.sessionName
                      )}`
                    : `/sessions/${session.sessionId}/${generatedName(
                        session.sessionName
                      )}`
                }
                page="Banner"
                componentType="Text Link"
                trackingUrl={
                  session.sessionVideoSource
                    ? `/live-stream/${session.sessionId}/${generatedName(
                        session.sessionName
                      )}`
                    : `/sessions/${session.sessionId}/${generatedName(
                        session.sessionName
                      )}`
                }
                componentName={session.sessionName}
              >
                <h1>
                  {session.clientSessionId} {session.sessionName}
                </h1>
              </LinkWrapper>
              <h6>{session.Speakers}</h6>
            </div>
          </section>
          <div className="now-playing-buttons-container">
            <div className="now-playing-buttons-container">
              <LinkWrapper
                to={`/live-stream/${session.sessionId}/${generatedName(
                  session.sessionName
                )}`}
                className="details-button watch-now-button"
                aria-label={`See Details for "${session.sessionName}"`}
                page="Banner"
                componentType="Button"
                trackingUrl={`/live-stream/${session.sessionId}/${generatedName(
                  session.sessionName
                )}`}
                componentName="details"
              >
                DETAILS
              </LinkWrapper>
            </div>
            <OEPAnalytics
              page="Banner"
              componentType="Button"
              url={`Close ${session.sessionName}`}
              componentName="Close now playing banner"
            >
              <button
                className="details-button watch-now-close-button"
                onClick={this.closeBanner}
              >
                Close
              </button>
            </OEPAnalytics>
          </div>
        </div>
      </div>
    );
  }
}

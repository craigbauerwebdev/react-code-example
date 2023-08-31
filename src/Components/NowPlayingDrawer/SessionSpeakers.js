import PropTypes from "prop-types";
import React from "react";
import getSpeakerNames from "util/getSpeakerNames";
import sessionStyles from "./scss/session-speakers.module.scss";

/**
 * List of session speakers
 *
 * @param {object} props
 * @param {Session} props.session
 *
 * @returns {JSX.Element}
 */
export default function SessionSpeakers({ session }) {
  if (session?.subSessions) {
    const speakers = getSpeakerNames(session.subSessions);

    return (
      speakers && (
        <h3 className={sessionStyles.nowPlayingDrawerSessionSpeakers}>
          {speakers}
        </h3>
      )
    );
  }

  return null;
}

SessionSpeakers.propTypes = {
  session: PropTypes.shape({
    subSessions: PropTypes.arrayOf(
      PropTypes.shape({
        presenters: PropTypes.arrayOf(
          PropTypes.shape({
            firstName: PropTypes.string,
            middleName: PropTypes.string,
            lastName: PropTypes.string,
            suffix: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
};

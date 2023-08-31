import PropTypes from "prop-types";
import React from "react";
import cropName from "util/cropName";
import leaderBoarderTableStyles from "./scss/leader-board-table.module.scss";
import { useSelector } from "react-redux";

/**
 * Leader Board data
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Leaderboard
 * @param {object} board
 */
const LeaderBoardTableBody = ({ board }) => {
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const isActive = (fuzionAttendeeId, rank) => {
    if (rank > 0 && rank <= 25) {
      //Is the logged in user in the top 25 is so return user highlight class
      return fuzionAttendeeId === user.fuzion_attendee_id
        ? leaderBoarderTableStyles.highlight
        : null;
    }

    return null;
  };
  return (
    <tbody>
      {board.map((userRank) => (
        <tr
          key={userRank.fuzionAttendeeId}
          className={`${isActive(userRank.fuzionAttendeeId, userRank.rank)} ${
            userRank.rank <= 3 &&
            userRank.rank > 0 &&
            leaderBoarderTableStyles.topThree
          }`}
        >
          <td>
            {userRank.rank > 0
              ? userRank.rank
              : "Keep exploring to earn your rank!"}
          </td>
          <td className={leaderBoarderTableStyles.name}>
            {userRank.firstName}{" "}
            {userRank.fuzionAttendeeId === user.fuzion_attendee_id
              ? userRank.lastName
              : cropName(userRank.lastName, 1, ".")}
          </td>
          <td className={leaderBoarderTableStyles.badges}>
            {userRank.badges && (
              <ul>
                {userRank.badges.map((badge) => (
                  <li key={badge.id}>
                    <img src={badge.imageURL} alt={badge.imageAltText} />
                  </li>
                ))}
              </ul>
            )}
          </td>
          <td>{userRank.score}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default LeaderBoardTableBody;

LeaderBoardTableBody.prototype = {
  board: PropTypes.shape({
    fuzionAttendeeId: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    badges: PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      imageAltText: PropTypes.string.isRequired,
    }),
    score: PropTypes.string.isRequired,
  }).isRequired,
};

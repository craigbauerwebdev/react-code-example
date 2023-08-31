import React, { useCallback, useEffect, useState } from "react";
import { filterBadgeScore, mapBadges } from "./utils/badgeDataSetup";
import { useDispatch, useSelector } from "react-redux";

import LeaderBoardTableBody from "./LeaderBoardTableBody";
import Loader from "Components/Loader";
import PropTypes from "prop-types";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import leaderBoarderTableStyles from "./scss/leader-board-table.module.scss";
import rankStyles from "./scss/your-rank.module.scss";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Leaderboard
 * Logged in user Ranking
 * @param {string} boardId
 * @param {object} boardId
 */
const YourRank = ({ boardId, badgesData }) => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const attendeeBoard = useSelector(
    (state) => state.global.attendeeLeaderBoards
  );
  const [changingBoard, setChangingBoard] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const [top25, setTop25] = useState(false);
  const [noData, setNoData] = useState(false);
  const setUserBoard = useCallback(
    (attendeeBoard, id, fname, lname, userId) => {
      const allBoards = attendeeBoard
        .filter((rank) => rank.leaderboardId === id) // Get rank for the currently selected board
        .map((rank) => {
          rank.badges = attendeeBoard
            .filter(filterBadgeScore(badgesData)) // Clear out badges that don't meet the points threshold
            .map(mapBadges(badgesData)); // Return the badge data need for the UI to display the badges.
          // Add user name to data to be displayed
          rank.firstName = fname;
          rank.lastName = lname;
          rank.fuzionAttendeeId = userId;
          return rank;
        });
      const [rank] = allBoards;

      if (!rank) {
        setNoData(true);
      } else {
        setUserRank(allBoards); // User data object for the requested board
        setTop25(rank.rank <= 25 && rank.rank > 0); // Check to see if user is in top 25
        setNoData(false); // no data
      }
    },
    [badgesData]
  );

  useEffect(() => {
    if (user && !attendeeBoard) {
      // Get user data
      // Since the data is constantly changes we get make the request every time the board is requested.
      dispatch(
        getPayload(
          dataTypes.attendeeLeaderBoards,
          `${user.fuzion_attendee_id}`,
          false
        )
      );
    }
  }, [attendeeBoard, user, dispatch]);

  useEffect(() => {
    setChangingBoard(true);
  }, [boardId]);

  useEffect(() => {
    if (attendeeBoard) {
      // Attendee Data has be received make user data object
      setUserBoard(
        attendeeBoard.attendee.leaderboards,
        boardId,
        user.contact.first_name,
        user.contact.last_name,
        user.fuzion_attendee_id
      );
      setChangingBoard(false);
    }
  }, [attendeeBoard, user, boardId, setUserBoard]);

  // Don't show anything if there is no user or no data
  if (!user || noData) {
    return null;
  }

  // Waiting for return show loader
  if (!userRank || changingBoard) {
    return <Loader />;
  }
  // Don't display anything if the user is in the top 25.
  if (top25) {
    return null;
  }

  return (
    <div className={rankStyles.yourRank}>
      <h3>Your Rank</h3>
      <table className={leaderBoarderTableStyles.board}>
        <LeaderBoardTableBody board={userRank} />
      </table>
    </div>
  );
};

export default YourRank;

YourRank.prototype = {
  boardId: PropTypes.string.isRequired,
  badgesData: PropTypes.shape({
    badges: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

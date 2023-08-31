import React, { useCallback, useEffect, useState } from "react";
import { filterBadgeScore, mapBadges } from "./utils/badgeDataSetup";
import { useDispatch, useSelector } from "react-redux";

import LeaderBoardSorry from "./LeaderBoardSorry";
import LeaderBoardTableBody from "./LeaderBoardTableBody";
import Loader from "Components/Loader";
import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import { actionTypesLeaderBoard } from "./reducer";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import leaderBoarderTableStyles from "./scss/leader-board-table.module.scss";
import lodash from "lodash";

/**
 * Leader board Table with Header
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Leaderboard
 * @param {string} boardId
 * @param {object} badgesData
 * @param {string} name
 */
const LeaderBoardTable = ({
  boardId,
  badgesData,
  name,
  dispatchLeaderBoard,
}) => {
  const dispatch = useDispatch();
  const leaderBoard = useSelector((state) => state.global.leaderBoard);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [activeSort, setActiveSort] = useState(false);
  const [changingBoard, setChangingBoard] = useState(true);
  const [noLeaderBoard, setNoLeaderBoard] = useState(false);
  const setLeaderBoard = useCallback(
    (leaderBoard) => {
      // Leader board is alway the first item the in the array
      const [board] = leaderBoard;

      board.data.forEach((user) => {
        user.badges = user.badges
          .filter(filterBadgeScore(badgesData)) // Clear out badges that don't meet the points threshold
          .map(mapBadges(badgesData)); // Return the badge data need for the UI to display the badges.
      });

      setCurrentBoard(board);
    },
    [badgesData]
  );
  const sortRank = () => {
    // Toggle display order from low to high and from hight to low.
    const copy = { ...currentBoard };
    copy.data = [...copy.data].reverse();

    setCurrentBoard(copy);
    setActiveSort((prevState) => !prevState);
  };

  useEffect(() => {
    // Get the leader board that the currently active.
    // Since the data is constantly changes we get make the request every time the board is requested.
    dispatch(getPayload(dataTypes.leaderBoard, `${boardId}`, true));
  }, [dispatch, boardId]);

  useEffect(() => {
    // New board is selected display loader.
    setChangingBoard(true);
    setNoLeaderBoard(false);
  }, [boardId]);

  useEffect(() => {
    if (leaderBoard) {
      if (lodash.isEmpty(leaderBoard.leaderboards)) {
        // Leader board didn't return any data.
        setNoLeaderBoard(true);
      } else {
        dispatchLeaderBoard({
          type: actionTypesLeaderBoard.CHANGE_TIMESTAMP,
          payload: leaderBoard.timestamp,
        });
        setLeaderBoard(leaderBoard.leaderboards);
      }
      // Board is returned remove loader.
      setChangingBoard(false);
    }
  }, [leaderBoard, setLeaderBoard, dispatchLeaderBoard]);

  if (noLeaderBoard) {
    return <LeaderBoardSorry title={name} />;
  }

  if (!currentBoard || changingBoard) {
    return <Loader />;
  }

  return (
    <table className={leaderBoarderTableStyles.board}>
      <thead>
        <tr>
          <th>
            <OEPAnalytics
              componentType="Button"
              page="Leaderboard"
              url="Select rank"
              componentName="Select Rank"
            >
              <button
                type="button"
                onClick={sortRank}
                className={`${activeSort && leaderBoarderTableStyles.active}`}
              >
                Select
              </button>
            </OEPAnalytics>
          </th>
          <th>Name</th>
          <th className={leaderBoarderTableStyles.badges}>
            <span>Badges</span>
          </th>
          <th>Points</th>
        </tr>
      </thead>
      <LeaderBoardTableBody board={currentBoard.data} />
    </table>
  );
};

export default LeaderBoardTable;

LeaderBoardTable.prototype = {
  boardId: PropTypes.string.isRequired,
  badgesData: PropTypes.shape({
    badges: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

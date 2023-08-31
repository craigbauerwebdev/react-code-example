import React, { Fragment, useEffect, useReducer } from "react";
import {
  actionTypesLeaderBoard,
  leaderBoardInitState,
  leaderBoardReducer,
} from "Components/LeaderBoard/reducer";
import { useDispatch, useSelector } from "react-redux";

import LeaderBoardSelect from "Components/LeaderBoard/LeaderBoardSelect";
import LeaderBoardSorry from "Components/LeaderBoard/LeaderBoardSorry";
import LeaderBoardTable from "Components/LeaderBoard/LeaderBoardTable";
import Loader from "Components/Loader";
import Rules from "Components/LeaderBoard/Rules";
// import RulesData from "util/staticData/Components/Leaderboard/Rules.data";
import YourRank from "Components/LeaderBoard/YourRank";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import { getPayload } from "store/actions";
import leaderBoarderStyles from "Components/LeaderBoard/scss/leader-board.module.scss";

/**
 * Leader Board
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Leaderboard
 * Static files are here src/util/staticData/Components/Leaderboard/Rules.data.js if you can't use liferay
 */
const LeaderBoard = () => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.global.timezone);
  // For static data you can replace this value with RulesData.ruleData
  const leaderBoardCMSContent = useSelector(
    (state) => state.global.leaderBoardCMSContent
  );
  const [stateLeaderBoard, dispatchLeaderBoard] = useReducer(
    leaderBoardReducer,
    leaderBoardInitState
  );

  /**
   * Liferay data for leader board. If using static data you can replace this useEffect with
   * dispatchLeaderBoard({
        type: actionTypesLeaderBoard.SET_BADGES,
        payload: leaderBoardCMSContent.badges
          ? leaderBoardCMSContent.badges.map((badge, i) => {
              badge.active = i === 0;

              return badge;
            })
          : null,
      });
   */
  useEffect(() => {
    // Set the data for the select box
    if (!leaderBoardCMSContent) {
      dispatch(getPayload(dataTypes.cmsLeaderBoard));
    } else {
      /**
       * Run a check for badges.
       * If no badge data from liferay then leader board is not useable.
       * Display sorry message if no badge data.
       */
      dispatchLeaderBoard({
        type: actionTypesLeaderBoard.SET_BADGES,
        payload: leaderBoardCMSContent?.badges
          ? leaderBoardCMSContent.badges.map((badge, i) => {
              badge.active = i === 0;

              return badge;
            })
          : null,
      });
    }
  }, [leaderBoardCMSContent, dispatch]);

  if (!stateLeaderBoard.displayLeaderBoards && !stateLeaderBoard.noBoards) {
    return <Loader />;
  }

  return (
    <section className={leaderBoarderStyles.main}>
      <div className={leaderBoarderStyles.leaderBoard}>
        <h2>{leaderBoardCMSContent?.leaderboard.leaderboardTitle}</h2>
        <div className={leaderBoarderStyles.leaderBoardHeader}>
          {!stateLeaderBoard.noBoards && (
            <Fragment>
              <LeaderBoardSelect
                stateSelect={stateLeaderBoard}
                dispatchSelect={dispatchLeaderBoard}
              />
              <div>
                {stateLeaderBoard.timestamp && (
                  <time className={leaderBoarderStyles.lastUpdate}>
                    {formatDate(
                      {
                        date: stateLeaderBoard.timestamp,
                        format: "MM/DD/YYYY",
                      },
                      timezone
                    )}{" "}
                    at{" "}
                    {formatDate(
                      {
                        date: stateLeaderBoard.timestamp,
                        format: "hh:mm a zz",
                      },
                      timezone
                    )}
                  </time>
                )}
              </div>
            </Fragment>
          )}
        </div>
        {!stateLeaderBoard.noBoards && (
          <Fragment>
            <LeaderBoardTable
              boardId={stateLeaderBoard.activeBoard}
              badgesData={leaderBoardCMSContent?.badges}
              name={stateLeaderBoard.boardName}
              dispatchLeaderBoard={dispatchLeaderBoard}
            />
            <YourRank
              boardId={stateLeaderBoard.activeBoard}
              badgesData={leaderBoardCMSContent?.badges}
            />
          </Fragment>
        )}
        {stateLeaderBoard.noBoards && <LeaderBoardSorry />}
      </div>
      <Rules rulesData={leaderBoardCMSContent} />
    </section>
  );
};

export default LeaderBoard;

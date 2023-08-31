import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import { actionTypesLeaderBoard } from "./reducer";
import leaderBoarderFiltersStyles from "./scss/leader-board-select.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Leaderboard
 * Change what leader board is being displayed
 * @param {object} stateSelect
 * @param {function} dispatchSelect
 */
const LeaderBoardSelect = ({ stateSelect, dispatchSelect }) => {
  const handleChangeEvt = (e) => {
    saveAnalytic({
      page: "Leaderboard",
      componentType: "button",
      url: "/leaderboard",
      componentName: e.target.value,
    });

    // Update what board should be displayed.
    dispatchSelect({
      type: actionTypesLeaderBoard.CHANGE_BOARD,
      payload: e.target.value,
    });
  };

  if (!stateSelect.badgeOptions) {
    return null;
  }

  return (
    <div className={leaderBoarderFiltersStyles.leaderBoardFilters}>
      <label htmlFor="selectLeaderboard">Pick a Leaderboard</label>
      <div className={leaderBoarderFiltersStyles.holder}>
        <SvgTypes name="arrow-filled" />
        <select
          id="selectLeaderboard"
          onChange={handleChangeEvt}
          value={`${stateSelect.boardName}_${stateSelect.activeBoard}`}
          name="selectLeaderboard"
        >
          {stateSelect.badgeOptions.map((leaderBoard) => (
            <option
              key={leaderBoard.id}
              value={`${leaderBoard.title}_${leaderBoard.id}`}
            >
              {leaderBoard.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LeaderBoardSelect;

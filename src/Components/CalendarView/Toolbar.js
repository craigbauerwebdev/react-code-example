import React, { useCallback, useEffect, useReducer } from "react";
import {
  actionTypesToolbar,
  toolbarReducer,
  toolbarState,
} from "./reducer/toolbars";

import Loader from "Components/Loader";
import OEPAnalytics from "Components/OEPAnalytics";
import ToolbarDay from "./ToolbarDay";
import { bpMap } from "util/bpMap";
import moment from "moment-timezone";
import toolbarStyles from "./scss/toolbar.module.scss";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

export const ToolbarContainer = ({ daysList, tz }) => (props) => {
  return (
    <Toolbar
      event={props}
      daysList={daysList}
      disabled={props.view === "week"}
      tz={tz}
    />
  );
};

const Toolbar = ({ disabled, daysList, event: { date, onNavigate }, tz }) => {
  const isMobile = useToggleDisplayMQ(bpMap.midpoint);
  const [stateToolbars, dispatchToolbars] = useReducer(
    toolbarReducer,
    toolbarState
  );
  const getDayVal = useCallback(
    (dateVal) => {
      const [val] = dateVal.split("T");
      const removeOffset = moment
        .tz(val, tz)
        .utcOffset(0, true)
        .format()
        .slice(0, -1);

      return new Date(removeOffset);
    },
    [tz]
  );
  const goToDay = (dateVal) => {
    onNavigate("DATE", getDayVal(dateVal));
  };
  const handleChange = (e) => {
    onNavigate("DATE", getDayVal(e.currentTarget.value));
  };
  const toggleDays = () => {
    dispatchToolbars({
      type: actionTypesToolbar.TOGGLE_DAYS_DISPLAY,
      payload: stateToolbars.toggleDays,
    });
  };
  const blurEvt = () => {
    if (stateToolbars.toggleDays) {
      dispatchToolbars({
        type: actionTypesToolbar.TOGGLE_DAYS_DISPLAY,
        payload: stateToolbars.toggleDays,
      });
    }
  };
  const dropdownEndTransEvt = () => {
    if (!stateToolbars.toggleDays) {
      dispatchToolbars({
        type: actionTypesToolbar.HIDE_DROP_DOWN_ITEM,
        payload: true,
      });
    }
  };
  const navDisplay = () => {
    if (stateToolbars.days.length > 1 && !isMobile) {
      return (
        <div
          className={toolbarStyles.daySelectHolder}
          style={{ pointerEvents: disabled ? "none" : "initial" }}
        >
          <OEPAnalytics
            componentType="Button"
            page="Calendar"
            url="Toggle calendar days"
            componentName="Toggle calendar days"
          >
            <button onClick={toggleDays} onBlur={blurEvt}>
              {stateToolbars.activeItem}
              <img
                className={`${
                  stateToolbars.toggleDays && toolbarStyles.active
                }`}
                src="/images/icons/chevron-down.svg"
                alt="arrow"
              />
            </button>
          </OEPAnalytics>
          <div
            onTransitionEnd={dropdownEndTransEvt}
            className={`${toolbarStyles.daySelect} ${
              stateToolbars.toggleDays && toolbarStyles.active
            }`}
          >
            <ul
              className={`${
                stateToolbars.displayDropDownItems && toolbarStyles.active
              }`}
            >
              {stateToolbars.days.map((day) => (
                <li onClick={() => goToDay(day.dayVal)} key={day.name}>
                  <ToolbarDay name={day.name} active={day.active} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if (isMobile && stateToolbars.days.length > 1) {
      return (
        <div className={toolbarStyles.selectHolder}>
          <select onChange={handleChange} onBlur={handleChange}>
            {stateToolbars.days.map((day) => (
              <option key={day.name} value={day.dayVal}>
                {day.name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className={toolbarStyles.daySelectHolder}>
        {stateToolbars.days.map((day) => (
          <span key={day.name}>{day.name}</span>
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatchToolbars({
      type: actionTypesToolbar.SET_DAYS,
      payload: daysList,
    });
  }, [daysList]);

  useEffect(() => {
    if (stateToolbars.daysActive) {
      dispatchToolbars({
        type: actionTypesToolbar.UPDATE_ACTIVE_DAY,
        payload: date,
      });
    }
  }, [date, stateToolbars.daysActive]);

  // Timezone reflow for what data should show in the calendar
  useEffect(() => {
    if (stateToolbars.reSetDayValue) {
      const [firstDay] = stateToolbars.days;

      onNavigate("DATE", getDayVal(firstDay.dayVal));
    }
  }, [stateToolbars.reSetDayValue, stateToolbars.days, onNavigate, getDayVal]);

  if (!stateToolbars.days) {
    return <Loader />;
  }

  return <div className={toolbarStyles.toolbar}>{navDisplay()}</div>;
};

export default React.memo(Toolbar);

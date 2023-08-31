import lodash from "lodash";
import moment from "moment-timezone";

export const actionTypesToolbar = {
  SET_DAYS: "SET_DAY",
  UPDATE_ACTIVE_DAY: "UPDATE_ACTIVE_DAY",
  TOGGLE_DAYS_DISPLAY: "TOGGLE_DAYS_DISPLAY",
  HIDE_DROP_DOWN_ITEM: "HIDE_DROP_DOWN_ITEM",
};

export const toolbarState = {
  days: null,
  daysActive: false,
  activeItem: "Select a Day",
  toggleDays: false,
  displayDropDownItems: false,
  reSetDayValue: false,
};
// Set what day should be active
const updateActiveDay = (state, activeDay) => {
  const val = moment(activeDay).format("dddd, MMM DD");
  let activeDayCopy = "";
  const updateActiveItem = state.days.map((day) => {
    const dayCopy = { ...day };

    if (dayCopy.name === val) {
      // Active day
      dayCopy.active = true;
      activeDayCopy = dayCopy.name;
    } else {
      // Set all other day to not active
      dayCopy.active = false;
    }

    return dayCopy;
  });
  const hasActiveItem = lodash.isEmpty(
    updateActiveItem.filter((item) => item.active)
  );

  return {
    ...state,
    days: updateActiveItem,
    activeItem: activeDayCopy,
    reSetDayValue: hasActiveItem,
  };
};

const dropdownDisplay = (state, payload) => {
  // Close DropDown
  if (payload) {
    return {
      ...state,
      toggleDays: !payload,
    };
  }
  // Open DropDown
  return {
    ...state,
    toggleDays: !payload,
    displayDropDownItems: true,
  };
};

export const toolbarReducer = (state, action) => {
  switch (action.type) {
    case actionTypesToolbar.SET_DAYS:
      return {
        ...state,
        days: action.payload,
        daysActive: true,
      };
    case actionTypesToolbar.UPDATE_ACTIVE_DAY:
      return updateActiveDay(state, action.payload);
    case actionTypesToolbar.TOGGLE_DAYS_DISPLAY:
      return dropdownDisplay(state, action.payload);
    case actionTypesToolbar.HIDE_DROP_DOWN_ITEM:
      return {
        ...state,
        displayDropDownItems: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

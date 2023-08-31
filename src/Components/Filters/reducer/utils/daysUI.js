/**
 * Set List of Days to store
 * @param {array} list List of days
 * @param {boolean} active // What day is active
 * @param {string} value // The value of the active day
 */
const daysList = (list, active, value) => {
  const cloneFilters = [...list];
  const setActive = cloneFilters.map((item) => {
    const copyItem = { ...item };
    copyItem.active = active ? false : copyItem.date === value;

    return copyItem;
  });

  return [...setActive];
};

/**
 * Set Active UI State for Day Filter Buttons
 * @param {object} state
 * @param {object} payload
 * @param {boolean} payload.active // What day should be active
 * @param {string} payload.value // The date of the active item
 */
export const setActiveDayFilter = (state, { active, value }) => {
  return {
    ...state,
    daysList: daysList(state.daysList, active, value),
  };
};

/**
 * Update Days based on new timezone value
 * @param {object} state
 * @param {object} payload
 * @param {boolean} payload.days // List of new days
 * @param {boolean} payload.active // What day should be active
 * @param {string} payload.value // The date of the active item
 */
export const updateDays = (state, { days, active, value }) => {
  return {
    ...state,
    daysList: daysList(days, active, value),
  };
};

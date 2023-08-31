const mappingReducer = (accumulator, currentValue) => {
  accumulator[currentValue.ExternalUserId] = currentValue.fuzionAttendeeId;
  return accumulator;
};

const setRosterMapping = (state, mapping) => {
  return mapping.reduce(mappingReducer, state.rosterMapping);
};

export default setRosterMapping;

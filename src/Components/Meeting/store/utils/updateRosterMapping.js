const updateRosterMapping = (state, newRecord) => {
  const mapping = { ...state.rosterMapping };
  mapping[newRecord.externalUserId] = newRecord.fuzionAttendeeId;
  return mapping;
};

export default updateRosterMapping;

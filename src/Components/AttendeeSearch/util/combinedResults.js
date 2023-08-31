import { applyOverrides } from "./attendeeSearchOverrides";

export default function combinedResults(state, payload) {
  const newOverrides = [
    ...state.resultsOverrides.filter(
      (z) => !z.fuzionAttendeeId === payload.fuzionAttendeeId
    ),
    payload,
  ];
  const overrideResult = applyOverrides(newOverrides, state.hits);

  return {
    ...state,
    resultsOverrides: overrideResult.neededOverrides,
    hits: overrideResult.hits,
  };
}

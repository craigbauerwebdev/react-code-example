// import sessionGating from "./sessionGating";

/**
 * Set up sessions to be saved in store
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Gating-Demo#content-removal
 * @param {object} state
 * @param {object} payload data from endpoint
 */
export default function formatSessions(state, payload) {
  // This function does nothing at the moment but can be use when dealing with gating! So we keep it.

  return {
    ...state,
    sessions: payload,
  };
}

import { ACCESS } from "util/staticData/passTypes";
import { getUserAccessInfo } from "util/gatingHelpers";

/**
 * Remove data from session before saving to store.
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Gating-Demo#content-removal
 * @param {object} user
 * @param {object} sessions
 */
export default function sessionGating(user, sessions) {
  const { accessDescription } = getUserAccessInfo(user);

  if (accessDescription === ACCESS.BRONZE) {
    return sessions.filter((s) => !s.sessionVideoSource);
  }

  if (accessDescription === ACCESS.SLIVER) {
    return sessions.filter((s) => s.sessionTrack !== "Content");
  }

  return sessions;
}

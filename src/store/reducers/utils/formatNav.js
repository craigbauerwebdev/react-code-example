import lodash from "lodash";

export default function formatNav(nav) {
  const preEvent = process.env.REACT_APP_ENABLE_PRE_EVENT === "true";

  if (preEvent && lodash.isEmpty(nav.preEvent)) {
    return null;
  } else if (!preEvent && lodash.isEmpty(nav.mainNav)) {
    return null;
  }

  return nav;
}

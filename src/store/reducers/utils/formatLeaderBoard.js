import lodash from "lodash";

export default function formatLeaderBoard(data) {
  data.rules = lodash.isEmpty(data.rules)
    ? null
    : lodash.orderBy(data.rules, ["sortOrder"]);
  data.badges = lodash.isEmpty(data.badges)
    ? null
    : lodash.orderBy(data.badges, ["sortOrder"]);

  return data;
}

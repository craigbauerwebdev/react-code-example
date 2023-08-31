import lodash from "lodash";

export default function splitClassList(list) {
  return lodash.flatMap([...list].map((item) => item.split("_")));
}

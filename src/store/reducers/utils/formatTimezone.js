import { getTimeZones } from "@vvo/tzdb";
import lodash from "lodash";
import moment from "moment-timezone";

export default function formatTimezone(state) {
  const userTz = moment.tz.guess();
  const userZone = moment.tz(new Date(), userTz).zoneAbbr();
  const fullList = getTimeZones();
  const [userCountry] = fullList
    .filter((tzList) => tzList.group.includes(userTz))
    .map((location) => location.countryName);
  const countryKeys = fullList.map((tzList) => ({
    momentVal: tzList.group[0],
    alternativeName: tzList.alternativeName,
    abbreviation: tzList.abbreviation,
    countryName: tzList.countryName,
    city: tzList.mainCities,
    displayName: `${tzList.alternativeName}/${tzList.mainCities[0]}`,
    zone: moment.tz(new Date(), tzList.group[0]).zoneAbbr(),
  }));
  const countryGroup = lodash.groupBy(countryKeys, (timezones) => {
    return timezones.countryName;
  });

  for (const country in countryGroup) {
    countryGroup[country] = lodash.unionBy(countryGroup[country], "momentVal");
  }

  return {
    ...state,
    timezone: countryGroup[userCountry].filter(
      (location) => location.zone === userZone
    )[0].momentVal,
    tzList: countryGroup,
  };
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClockIcon from "./ClockIcon";
import { setTimeZone } from "store/actions";
import timeStyles from "./scss/timezone.module.scss";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Timezone
 */
const TimezonePicker = () => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.global.timezone);
  const tzList = useSelector((state) => state.global.tzList);
  const [timezoneList, setTimezoneList] = useState(null);
  const changeTz = (e) => {
    dispatch(setTimeZone(e.target.value));
  };
  const getOptions = () => {
    const countries = Object.keys(timezoneList).sort();

    return countries.map((countries) => {
      return (
        <optgroup label={countries} key={countries}>
          {timezoneList[countries].map((option) => {
            return (
              <option key={option.displayName} value={option.momentVal}>
                {option.displayName}
              </option>
            );
          })}
        </optgroup>
      );
    });
  };

  useEffect(() => {
    if (tzList) {
      setTimezoneList(tzList);
    }
  }, [tzList]);

  if (!timezoneList) {
    return null;
  }

  return (
    <div className={timeStyles.holder} title="Choose Timezone">
      <div>
        <ClockIcon />
      </div>
      <label htmlFor="timezone-picker" className="sr-only">
        Choose Timezone
      </label>
      <select
        id="timezone-picker"
        name="timezone-picker"
        value={timezone}
        onChange={changeTz}
        className={timeStyles.timePicker}
      >
        {getOptions()}
      </select>
    </div>
  );
};

export default TimezonePicker;

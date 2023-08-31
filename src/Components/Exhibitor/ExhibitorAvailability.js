import "../../css/kendo/subset.scss";

import React, { useCallback, useEffect, useState } from "react";
import {
  getGuestUserProfileByFuzionId,
  patchProfileData,
} from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@progress/kendo-react-buttons";
import ConfigService from "services/ConfigService";
import SaveSuccessModal from "Components/SaveSuccess/SaveSuccessModal";
import { Switch } from "@progress/kendo-react-inputs";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { dataTypes } from "store/utils/dataTypes";
import exhibitorAvailabilityStyles from "./scss/exhibitor-availability.module.scss";
import formatDate from "util/formatDate";
import { getPayload } from "store/actions";
import moment from "moment-timezone";
import { zoneName } from "../../../src/util/getZoneName";

const ExhibitorAvailability = ({ fuzionId }) => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.global.timezone);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const guestProfiles = useSelector((state) => state.profile.guestProfiles);
  const networkSettings = useSelector((state) => state.global.networkSettings);
  /** @type {User} */
  const [dates, setDates] = useState([]);
  const [originalDates, setOriginalDates] = useState([]);
  const [exhibitorRep, setExhibitorRep] = useState({});
  const [configDates, setConfigDates] = useState([]);
  const [profileDates, setProfileDates] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = {
    hour: 1,
    minute: 15,
  };

  const saveGuestAvailability = () => {
    dispatch(
      // TODO: currently this component is not used. If it is ever to be user again - check/fix this patch call
      patchProfileData(dataTypes.guestProfile, { meetingTimes: dates })
    ).then(() => {
      setIsSuccess(true);
    });
  };

  const saveRepAvailability = async () => {
    dispatch(
      // TODO: currently this component is not used. If it is ever to be user again - check/fix this patch call
      patchProfileData(dataTypes.accountProfile, {
        meetingTimes: dates,
      })
    ).then(() => {
      setIsSuccess(true);
    });
  };

  const saveAvailability = (e) => {
    e.preventDefault();
    if (fuzionId) {
      saveGuestAvailability();
    } else {
      saveRepAvailability();
    }
  };

  const closeSuccessModal = () => {
    setIsSuccess(false);
  };

  const changeAvailable = (index, event) => {
    const items = [...dates];

    items[index].isNotAvailable = event.target.value;

    setDates(items);
    setIsChanged(true);
  };

  const cancelChanges = () => {
    setDates(originalDates);
    setIsChanged(false);
  };

  //Function to turn string time to date w/ time for time picker and sets to event timezone as it comes from api call
  const startTime = (day) =>
    formatDate(
      {
        date: moment.tz(
          `${day.from}`,
          "hh:mm a",
          ConfigService.runValues.momentTimezone
        ),
        format: "YYYY-MM-DDTHH:mm:ss",
      },
      ConfigService.runValues.momentTimezone
    );
  const endTime = (day) =>
    formatDate(
      {
        date: moment.tz(
          `${day.to}`,
          "hh:mm a",
          ConfigService.runValues.momentTimezone
        ),
        format: "YYYY-MM-DDTHH:mm:ss",
      },
      ConfigService.runValues.momentTimezone
    );

  const handleStartTimeChange = (event, day) => {
    //since new Date has to be used for FireFox this converts date to user's chosen timezone (in case not local)
    //and then saves to the event time
    const time = moment(day.value).format("HH:mm");
    const date = moment(day.value).format("YYYY-MM-DD");

    const convertedTime = moment.tz(`${date} ${time}`, timezone);

    const newDates = [...dates];
    const match = newDates.find((z) => z.date === event.date);

    match.from = formatDate(
      { date: convertedTime, format: "HH:mm" },
      ConfigService.runValues.momentTimezone
    );

    setDates(newDates);
    setIsChanged(true);
  };

  const handleEndTimeChange = (event, day) => {
    //since new Date has to be used for FireFox this converts date to user's chosen timezone (in case not local)
    //and then saves to the event time
    const time = moment(day.value).format("HH:mm");
    const date = moment(day.value).format("YYYY-MM-DD");

    const convertedTime = moment.tz(`${date} ${time}`, timezone);

    const newDates = [...dates];
    const match = newDates.find((z) => z.date === event.date);

    match.to = formatDate(
      { date: convertedTime, format: "HH:mm" },
      ConfigService.runValues.momentTimezone
    );

    setDates(newDates);
    setIsChanged(true);
  };

  const setProfile = useCallback(() => {
    guestProfiles.forEach((profile) => {
      if (profile.attendeeId === fuzionId) {
        setExhibitorRep(profile);
        setProfileDates(profile.meetingTimes);
      }
    });
  }, [fuzionId, guestProfiles]);

  useEffect(() => {
    if (fuzionId) {
      getGuestUserProfileByFuzionId(fuzionId);
    } else {
      setExhibitorRep(accountProfile);
      setProfileDates(accountProfile.meetingTimes);
    }
  }, [accountProfile, fuzionId]);

  useEffect(() => {
    setProfile();
  }, [guestProfiles, setProfile]);

  useEffect(() => {
    if (!networkSettings) {
      dispatch(getPayload(dataTypes.networkSettings));
    } else {
      setConfigDates(networkSettings.meetingTimes);
    }
  }, [networkSettings, dispatch]);

  //Function to compare config dates and profile dates
  //profile dates should override config dates if available
  useEffect(() => {
    const arr = [...configDates];

    if (profileDates) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < profileDates.length; j++) {
          if (
            arr[i].date &&
            profileDates[j].date &&
            formatDate(
              { date: arr[i].date, format: "YYYY-MM-DD" },
              ConfigService.runValues.momentTimezone
            ) ===
              formatDate(
                { date: profileDates[j].date, format: "YYYY-MM-DD" },
                ConfigService.runValues.momentTimezone
              )
          ) {
            arr[i] = { ...profileDates[j] };
          }
        }
      }
    }

    // create copy of original dates without reference for reset
    const newArr = arr.map((e) => {
      return { ...e };
    });

    setDates(arr);
    setOriginalDates(newArr);
  }, [configDates, profileDates]);

  return (
    <div className={exhibitorAvailabilityStyles.main}>
      <div className={exhibitorAvailabilityStyles.cardStyle}>
        {dates.length > 0 && (
          <div className={exhibitorAvailabilityStyles.main}>
            <div className={exhibitorAvailabilityStyles.subHeader}>
              <span>
                {" "}
                {`Edit the Availability for ${exhibitorRep.firstName} ${exhibitorRep.lastName}.`}
              </span>
            </div>
            <form onSubmit={saveAvailability}>
              <div className={exhibitorAvailabilityStyles.dayContainer}>
                {dates.map((day, index) => {
                  return (
                    <div
                      key={index}
                      className={exhibitorAvailabilityStyles.dayRow}
                    >
                      <div>
                        <span
                          className={exhibitorAvailabilityStyles.pickerLabels}
                        >
                          Date
                          <br />
                          <div className={exhibitorAvailabilityStyles.date}>
                            {moment.tz(day.date, timezone).format("MM/DD/YYYY")}
                          </div>
                        </span>
                      </div>

                      <div className={`${exhibitorAvailabilityStyles.picker}`}>
                        <label
                          htmlFor="start time"
                          className={exhibitorAvailabilityStyles.pickerLabels}
                        >
                          From
                          <br />
                          <TimePicker
                            title="start_time"
                            name="start time"
                            format="hh:mm a"
                            steps={steps}
                            defaultValue={
                              new Date(
                                formatDate(
                                  {
                                    date: startTime(day),
                                    format: "YYYY-MM-DDTHH:mm:ss",
                                  },
                                  timezone
                                )
                              )
                            }
                            min={
                              new Date(
                                formatDate(
                                  {
                                    date: startTime(configDates[index]),
                                    format: "YYYY-MM-DDTHH:mm:ss",
                                  },
                                  timezone
                                )
                              )
                            }
                            onChange={handleStartTimeChange.bind(null, day)}
                            disabled={day.isNotAvailable}
                          />
                        </label>
                      </div>

                      <div className={`${exhibitorAvailabilityStyles.picker}`}>
                        <label
                          htmlFor="end time"
                          className={exhibitorAvailabilityStyles.pickerLabels}
                        >
                          To
                          <br />
                          <TimePicker
                            title="end_time"
                            name="end time"
                            format="hh:mm a"
                            steps={steps}
                            defaultValue={
                              new Date(
                                formatDate(
                                  {
                                    date: endTime(day),
                                    format: "YYYY-MM-DDTHH:mm:ss",
                                  },
                                  timezone
                                )
                              )
                            }
                            min={
                              new Date(
                                formatDate(
                                  {
                                    date: startTime(configDates[index]),
                                    format: "YYYY-MM-DDTHH:mm:ss",
                                  },
                                  timezone
                                )
                              )
                            }
                            max={
                              new Date(
                                formatDate(
                                  {
                                    date: endTime(configDates[index]),
                                    format: "YYYY-MM-DDTHH:mm:ss",
                                  },
                                  timezone
                                )
                              )
                            }
                            onChange={handleEndTimeChange.bind(null, day)}
                            disabled={day.isNotAvailable}
                          />
                        </label>
                      </div>
                      <div
                        className={`${exhibitorAvailabilityStyles.switchContainer}`}
                      >
                        <label
                          htmlFor="Not Available"
                          className={exhibitorAvailabilityStyles.pickerLabels}
                        >
                          Not Available
                        </label>
                        <br />
                        <Switch
                          value={day.isNotAvailable}
                          defaultChecked={day.isNotAvailable}
                          onChange={changeAvailable.bind(null, index)}
                          ariaLabel="Not Available"
                          name="Not Available"
                        />
                      </div>
                    </div>
                  );
                })}
                {/* End of day container */}
              </div>
              <div className={exhibitorAvailabilityStyles.smallLabel}>
                <span>{`Timezone is set to ${zoneName(
                  timezone,
                  "long"
                )}.`}</span>
              </div>
              {isChanged && (
                <div className={exhibitorAvailabilityStyles.actions}>
                  <Button
                    type="button"
                    look="outline"
                    className={exhibitorAvailabilityStyles.cancelButton}
                    onClick={cancelChanges}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={exhibitorAvailabilityStyles.saveButton}
                  >
                    Save
                  </Button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
      <SaveSuccessModal show={isSuccess} close={closeSuccessModal} />
    </div>
  );
};

export default ExhibitorAvailability;

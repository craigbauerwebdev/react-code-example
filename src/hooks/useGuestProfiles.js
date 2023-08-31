import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import lodash from "lodash";
import { setGuestProfiles } from "Components/Profile/store/actions/index.js";

/**
 * @typedef {object} profileData
 *
 * @property {[]} loadProfiles
 * @property {[]} listWithGuestProfileData
 *
 */

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Guest-Profiles-Hook
 * Get a list of guest profiles data
 * @param {array} anyList
 * @param {string} attendeeIdKey
 *
 * @returns {profileData} profile data
 */
const useGuestProfiles = (anyList = null, attendeeIdKey = null) => {
  const dispatch = useDispatch();
  const loadedProfiles = useSelector((state) => state.profile.guestProfiles);

  const [listWithGuestProfileData, setListWithGuestProfileData] = useState(
    null
  );

  const [failedGuestProfiles, setFailedGuestProfiles] = useState([]);

  //filter to only the profiles we haven't loaded yet, or failed more than 3 times
  const getUnloadedProfiles = useCallback(
    (attendeeIds) => {
      const loadedProfileIds = [
        ...loadedProfiles.map((z) => z.attendeeId),
        ...failedGuestProfiles,
      ];
      const uniqueAttendeeIds = [...new Set(attendeeIds)];

      return uniqueAttendeeIds.filter((z) => !loadedProfileIds.includes(z));
    },
    [loadedProfiles, failedGuestProfiles]
  );

  //keep track of how many times each profile has failed
  const addToFailedList = useCallback(
    (attendeeIds) => {
      if (!lodash.isEmpty(attendeeIds)) {
        setFailedGuestProfiles([...failedGuestProfiles, ...attendeeIds]);
      }
    },
    [failedGuestProfiles, setFailedGuestProfiles]
  );

  const fetchProfilesFromExpressAPI = useCallback(
    async (attendeeIds) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_HOST}/account/batchProfiles`,
          {
            userIds: attendeeIds,
          }
        );

        const foundIds = res.data.data.map((z) => z.attendeeId);

        const notFound = attendeeIds.filter((z) => !foundIds.includes(z));

        dispatch(setGuestProfiles(res.data.data));

        addToFailedList(notFound);
      } catch (err) {
        addToFailedList(attendeeIds);
      }
    },
    [dispatch, addToFailedList]
  );

  //load profiles from array of attendee id's
  const loadProfiles = useCallback(
    (attendeeIds) => {
      // eslint-disable-next-line no-console
      console.count("loadProfiles execution count:");

      const unloadedProfiles = getUnloadedProfiles(attendeeIds);

      if (!lodash.isEmpty(unloadedProfiles)) {
        fetchProfilesFromExpressAPI(unloadedProfiles);
      }
    },
    [getUnloadedProfiles, fetchProfilesFromExpressAPI]
  );

  //watch for changes in loadedProfiles or the original list, update to add guestProfile object
  useEffect(() => {
    if (anyList && anyList.length > 0) {
      const listWithGuestProfileData = anyList.map((item) => {
        const guestProfile = loadedProfiles.find(
          (z) => z.attendeeId === item[attendeeIdKey]
        );

        return {
          ...item,
          guestProfile,
        };
      });

      loadProfiles(anyList.map((item) => item[attendeeIdKey]));
      setListWithGuestProfileData(listWithGuestProfileData);
    }
  }, [anyList, attendeeIdKey, loadedProfiles, loadProfiles]);

  // if list used to have items, but they were removed, update list

  useEffect(() => {
    if (
      anyList &&
      anyList.length === 0 &&
      listWithGuestProfileData &&
      listWithGuestProfileData.length !== 0
    ) {
      setListWithGuestProfileData([]);
    }
  }, [anyList, listWithGuestProfileData]);

  return {
    loadProfiles,
    listWithGuestProfileData,
  };
};

export default useGuestProfiles;

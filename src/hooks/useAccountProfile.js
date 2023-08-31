import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ConfigService from "services/ConfigService";
import Logger from "js-logger";
import { dataTypes } from "store/utils/dataTypes";
import lodash from "lodash";
import { patchProfileData } from "Components/Profile/store/actions";
import { profileTimezoneValues } from "util/profileTimezoneValues";
import { updateBegin } from "Components/Profile/store/actions/index";

/**
 * TODO: Document what I do.
 */
const useAccountProfile = () => {
  /** @type {User} */
  const profileData = useSelector((state) => state.profile.accountProfile);
  const [isAccountProfileLoaded, setIsAccountProfileLoaded] = useState(false);

  const translateForForm = (profile) => {
    if (profile) {
      // if (Object.keys(profile).length > 0) console.log(profile);
      if (isAccountProfileLoaded) {
        profile.preferredName = profile.preferredName || "";
        profile.firstName = profile.firstName || "";
        profile.lastName = profile.lastName || "";
        profile.prefix = profile.prefix || "";
        profile.suffix = profile.suffix || "";
        profile.emailAddress = profile.emailAddress || "";
        profile.websiteUrl = profile.websiteUrl || "";
        profile.occupation = profile.occupation || "";
        profile.companyName = profile.companyName || "";
        profile.city = profile.address.city || "";
        profile.state = profile.address.state || "";
        profile.country = profile.address.country || "";
        profile.postalCode = profile.address.postalCode || "";
        profile.social.website = profile.social.website || "";
        profile.postalCodePlusFour = profile.address.postalCodePlusFour || "";
        profile.facebook = profile.social.facebook || "";
        profile.instagram = profile.social.instagram || "";
        profile.linkedin = profile.social.linkedin || "";
        profile.twitter = profile.social.twitter || "";
        profile.snapchat = profile.social.snapchat || "";
        if (profile.useEventTimezone === profileTimezoneValues.DEFAULT) {
          profile.useEventTimezone = ConfigService.runValues
            .enableUserBrowserTimezone
            ? profileTimezoneValues.INACTIVE
            : profileTimezoneValues.ACTIVE;
        }
      }
    } else Logger.log("no profile");
    return profile;
  };
  const accountProfile = translateForForm(profileData);
  const isUpdateInProgress = useSelector(
    (state) => state.profile.updateInProgress
  );
  const dispatch = useDispatch();
  const startLoader = () => {
    // Moving this to its own function will avoid stacking the dispatch call.
    dispatch(updateBegin());
  };

  // Update user profile
  const patch = (requestBody) => {
    dispatch(patchProfileData(dataTypes.accountProfile, requestBody));
  };
  // edit key is a way to reset kendo form state. To reset the form to original values, increment edit key
  const [editKey, setEditKey] = useState(1);
  const incrementEditKey = () => {
    setEditKey(editKey + 1);
  };

  // Profile data is retrieved upstream in this component src/Components/ContentWrapper/ContentWrapper.js.
  useEffect(() => {
    if (profileData && !lodash.isEmpty(profileData)) {
      setIsAccountProfileLoaded(true);
    }
  }, [profileData]);

  return {
    accountProfile,
    patch,
    editKey,
    incrementEditKey,
    isAccountProfileLoaded,
    isUpdateInProgress,
    startLoader,
  };
};

export default useAccountProfile;

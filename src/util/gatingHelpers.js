import {
  passTypes,
  restrictedElementsPerAccessLevel,
} from "util/staticData/passTypes";

import ConfigService from "services/ConfigService";
import isEmpty from "lodash/isEmpty";

/*
 * example use:
 * const { userPassType } = getUserAccessInfo(user)
 */
export const getUserAccessInfo = (attendee) => {
  // returns a default gating object if an attendee or attendee attendee_type_flag doesnt exist
  if (!attendee || isEmpty(attendee) || !attendee.attendee_type_flag) {
    return {
      userPassType: null,
      shouldDenyLogin: null,
      shouldRestrictNetworking: null,
      accessDescription: null,
      failedToIdentifyAccessLevel: null,
    };
  }

  const { attendee_type_flag: userPassType } = attendee;

  // failedToIdentifyAccessLevel returns boolean value
  // if your event requires a new userPassType, you will need to add into passTypes.js
  // !! operator returns the truthy or falsy value
  const failedToIdentifyAccessLevel = !!passTypes[userPassType];
  const accessDescription = passTypes[userPassType];

  return {
    userPassType,
    accessDescription,
    failedToIdentifyAccessLevel,
  };
};

export const shouldBlockAccessToElement = ({ user, element = "" }) => {
  const { accessDescription } = getUserAccessInfo(user);
  const restrictedElements =
    restrictedElementsPerAccessLevel[accessDescription] || {};

  // if we have deeply nested url that the user is trying to access with a direct link
  // for routes that look like "/sessions/:id/:name"
  const baseUrl = element?.split("/")[1];
  if (restrictedElements[element] || restrictedElements[baseUrl]) {
    return true;
  }

  return false;
};

export const shouldBlockBanner = (user, banners) => {
  const { gatingInfo } = user || {};
  const { hasPressAccess, hasFreeAccess } =
    gatingInfo || getUserAccessInfo(user);

  if (hasPressAccess || hasFreeAccess) {
    return banners.filter((b) => b.linkTarget !== "grip");
  }

  return banners;
};

export const hasBasicUserAccess = (user) =>
  ConfigService.runValues.isAuthRequired ? !!user : true;

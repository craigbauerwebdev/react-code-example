import * as SecureLS from "secure-ls";

import axios from "axios";
import isEmpty from "lodash/isEmpty";
import moment from "moment-timezone";

const ls = new SecureLS({ encodingType: "aes" });

export default class ConfigService {
  static configTypes = {
    uiRun: "ui-run",
  };

  static async init() {
    const result = await ConfigService.setRunValues();
    return result;
  }

  static async setRunValues({ forceRefresh = false } = {}) {
    if (
      !forceRefresh &&
      !isEmpty(ConfigService.runValues) &&
      !ConfigService.isRunConfigStale
    ) {
      return {
        success: false,
        message: `ConfigService: Run values were not refetched because TTL time has not expired yet. To forcefully refetch run this function with { forceRefresh: true }`,
      };
    }

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_HOST}/config/${ConfigService.configTypes.uiRun}`
      );
      ls.set(ConfigService.configTypes.uiRun, {
        ...data,
        fetchedDatetime: new Date().toISOString(),
      });
      // eslint-disable-next-line no-console
      console.log("run updated", { data });
      return { success: true, message: "UI Run config values set" };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("ConfigService: Error setting Run Values", error);
      return {
        success: false,
        message: `ConfigService: Error setting Run Values. ${error.message}`,
        error,
      };
    }
  }

  static get runValues() {
    const values = ls.get(ConfigService.configTypes.uiRun);
    return values || {};
  }

  static get isRunConfigStale() {
    const currentValues = ConfigService.runValues;
    if (isEmpty(currentValues)) {
      // Values do not exist therefore cannot be stale
      return false;
    }

    // TTL - Time To Live in seconds
    const defaultTTL = 60;
    const fetchedAt = moment(currentValues.fetchedDatetime);
    const TTL = currentValues.TTL || defaultTTL;
    const now = moment();
    const ttlExpiredTime = fetchedAt.add(TTL, "seconds");

    return now.isAfter(ttlExpiredTime);
  }
}

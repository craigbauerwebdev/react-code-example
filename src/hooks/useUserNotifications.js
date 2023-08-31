import { useEffect, useState } from "react";

import ConfigService from "services/ConfigService";
import lodash from "lodash";
// https://github.com/developit/workerize-loader
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved*/
import worker from "workerize-loader!../workers/notifications";

const workerInstance = worker();

/**
 * Web worker Notifications
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/useUserNotifications
 * @param {Meeting[]} messages
 * @param {number} delay
 *
 * @returns {Meeting[]} notification that is starting in the defined time delay
 */
const useUserNotifications = (messages, delay) => {
  const [notification, setNotification] = useState(null);
  const [currentList, setCurrentList] = useState(null);

  useEffect(() => {
    // Attach an event listener to receive data from your worker
    workerInstance.addEventListener("message", (message) => {
      if (message.data) {
        setNotification(message.data);
      }
    });

    return () => {
      workerInstance.terminate();
    };
  }, []);

  useEffect(() => {
    if (currentList && currentList.length > 0) {
      // send web worker data and time offset.
      workerInstance.setNotificationsTimer(
        currentList,
        delay,
        ConfigService.runValues.momentTimezone
      );
    }
  }, [currentList, delay]);

  useEffect(() => {
    if (messages) {
      /**
       * Reducer amount of time called by comparing currently saved list with new list being passed in.
       * If they are the same don't run update.
       */
      if (!lodash.isEqual(currentList, messages)) {
        setCurrentList(messages);
      }
    }
  }, [messages, currentList]);

  return notification;
};

export default useUserNotifications;

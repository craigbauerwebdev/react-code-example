import { v4 as uuidv4 } from "uuid";
/**
 * For some reason notification don't have unique ID's.
 * After trying different combinations to make an ID with the current payload they all failed.
 * So added a package that generates unique ID's. This looks to solve this ticket?
 * https://freemandigital.atlassian.net/browse/PJX-1181
 * We map the ID's here and not in the API because some notifications come from
 * the web socket and not Express. So this is the one common place that all
 * notifications will have.
 *
 * @param {Notification[]} notifications
 * @returns {Notification[]}
 */
export default function notificationUUID(notifications) {
  return notifications.map((notification) => {
    return { ...notification, id: notification.id || uuidv4() };
  });
}

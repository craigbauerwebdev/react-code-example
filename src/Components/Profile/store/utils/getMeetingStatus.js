import axios from "axios";
import { dataTypes } from "store/utils/dataTypes";

/**
 * Get status for users for a meeting
 * @param {object} data
 * @returns {object}
 */
export default async function getMeetingStatus(data) {
  if (data) {
    const status = await axios.get(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendees}/${data.meetingId}`
    );

    return status.data.data;
  }

  return [{ id: null }];
}

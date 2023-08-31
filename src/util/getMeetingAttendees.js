import axios from "axios";
import { dataTypes } from "store/utils/dataTypes";

const getMeetingAttendees = async (meetingId) => {
  const attendees = await axios.get(
    `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendees}/${meetingId}`
  );
  return attendees;
};
export default getMeetingAttendees;

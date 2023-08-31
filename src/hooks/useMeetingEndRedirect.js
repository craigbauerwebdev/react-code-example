import {
  ActionType,
  MeetingStatus,
  Severity,
  useMeetingStatus,
  useNotificationDispatch,
} from "../lib/chimeComponents";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/*
This function contains logic responsible for listening to when the Chime meeting instance determines that the meeting is over. This can be due to several factors

A meeting automatically ends after a period of inactivity, such as the following:

No audio connections are present in the meeting for more than five minutes.

Less than two audio connections are present in the meeting for more than 30 minutes.

Screen share viewer connections are inactive for more than 30 minutes.

The meeting time exceeds 24 hours.

When the meeting status has ended the useEffect hook will execute notifying all participants that the meeting has ended.

The current message is insuffucient at best and wrong at worst as the reason for the meeting ending could be any one of the nove reasons or because the host has ended the meeting themselves.

From that point, participants will be redirected to the meeting ended page.


*/
const useMeetingEndRedirect = () => {
  const history = useHistory();
  const dispatch = useNotificationDispatch();
  const meetingStatus = useMeetingStatus();

  useEffect(() => {
    if (meetingStatus === MeetingStatus.Ended) {
      dispatch({
        type: ActionType.ADD,
        payload: {
          severity: Severity.INFO,
          message: "The meeting was ended by another attendee",
          autoClose: true,
          replaceAll: true,
        },
      });
      history.push("/meeting-ended");
    }
  }, [meetingStatus, dispatch, history]);
};

export default useMeetingEndRedirect;

import {
  ActionType,
  Severity,
  useMeetingManager,
  useNotificationDispatch,
} from "../../../lib/chimeComponents";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

const NoMeetingRedirect = ({ children }) => {
  const history = useHistory();
  const dispatch = useNotificationDispatch();
  const meetingManager = useMeetingManager();

  useEffect(() => {
    if (!meetingManager.meetingSession) {
      dispatch({
        type: ActionType.ADD,
        payload: {
          severity: Severity.INFO,
          message: "No meeting found, please enter a valid meeting Id",
          autoClose: true,
        },
      });

      history.push("/");
    }
  }, [dispatch, history, meetingManager.meetingSession]);

  return React.createElement(React.Fragment, null, children);
};
export default NoMeetingRedirect;
//# sourceMappingURL=NoMeetingRedirect.js.map

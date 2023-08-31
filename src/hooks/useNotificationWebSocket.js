import {
  addNetworkingNotification,
  deleteProfileData,
} from "Components/Profile/store/actions";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Logger from "js-logger";
import { dataTypes } from "store/utils/dataTypes";
import useTabVisibility from "./useTabVisibility";

/**
 * Notification Web socket for push notifications
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/useNotificationWebSocket
 * https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html
 */
const useNotificationWebSocket = () => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const isTabActive = useTabVisibility();
  const socket = useRef();
  const openWebSocket = useCallback(
    (fuzionAttendeeId) => {
      if (socket.current) {
        // we already have WS connection and don't need to create another one
        return;
      }
      const wsUrl = `${process.env.REACT_APP_WEBSOCKET_URL}?fuzionEventId=${process.env.REACT_APP_FUZION_EVENT_ID}&fuzionAttendeeId=${fuzionAttendeeId}`;
      socket.current = new WebSocket(wsUrl);

      socket.current.onopen = () => {
        Logger.log("open socket");
      };

      socket.current.onmessage = (messageEvent) => {
        const data = JSON.parse(messageEvent.data);

        Logger.log("websocket message", data);

        if (data.senderFuzionAttendeeId) {
          switch (data.level) {
            case "0":
            case "1":
              dispatch(addNetworkingNotification({ ...data, new: true }));
              break;
            case "2":
              dispatch(
                deleteProfileData(dataTypes.schedule, {
                  meetings: [data.actionId],
                })
              );
              break;
            default:
              break;
          }
        }
      };

      socket.current.onclose = (e) => {
        Logger.log(`websocket closed with code ${e.code}`);
        // we set it to null so the websocket could be reopened again
        socket.current = null;
        /**
         * Once a socket close you have to wait before you can try to reconnect.
         * event code 1005 is used when we self close the socket due to tab not be active.
         */
        setTimeout(() => {
          openWebSocket(fuzionAttendeeId);
        }, 2000);
      };
    },
    [dispatch]
  );

  useEffect(() => {
    if (!user) {
      return;
    }
    // Removed inactive browser close web socket to enable notifications to be recived when browser not in focus (OEP-12077)
    openWebSocket(user.fuzion_attendee_id);
  }, [user, openWebSocket, isTabActive]);
};

export default useNotificationWebSocket;

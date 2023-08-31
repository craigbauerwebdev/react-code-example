import { useEffect, useState } from "react";

import { DataMessage } from "amazon-chime-sdk-js";
import { TOPICS } from "Components/Meeting/constants";
import { useAudioVideo } from "lib/chimeComponents";

export default function useRaisedHandAttendees() {
  const audioVideo: any = useAudioVideo();
  const [raisedHandAttendees, setRaisedHandAttendees] = useState(new Set());

  useEffect(() => {
    const realTimeRaisedHandAttendees = new Set();
    const callback = (message: DataMessage) => {
      const attendeeId = message.text();
      if (attendeeId) {
        if (message.topic === TOPICS.raiseHand) {
          realTimeRaisedHandAttendees.add(attendeeId);
        } else if (message.topic === TOPICS.dismissHand) {
          realTimeRaisedHandAttendees.delete(attendeeId);
        }
        setRaisedHandAttendees(new Set(realTimeRaisedHandAttendees));
      }
    };

    if (audioVideo) {
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.raiseHand,
        callback
      );
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(
          TOPICS.raiseHand,
          callback
        );
      }
    };
  }, [audioVideo]);

  return raisedHandAttendees;
}

import React from "react";
import webinarPageStyles from "../scss/webinar-page.module.scss";
import WebinarCard from "./WebinarCard";
import TimeSlot from "./TimeSlot";

const WebinarTimeSlots = ({ eventsByDate }) => {
  const sortedData = eventsByDate.sort((a, b) => {
    return new Date(a.sessionStart) - new Date(b.sessionStart);
  });

  return (
    <div>
      {sortedData.map((e, index) => (
        <div key={e.sessionId} className={webinarPageStyles.content}>
          {!index || sortedData[index - 1].sessionStart !== e.sessionStart ? (
            <TimeSlot
              time={new Date(e.sessionStart)}
              endTime={new Date(e.sessionEnd)}
              session={e}
            />
          ) : (
            <div className={webinarPageStyles.timeSlot} />
          )}
          <div className={webinarPageStyles.cardWrapper}>
            <WebinarCard event={e} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebinarTimeSlots;

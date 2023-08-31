import React from "react";
import formatDate from "util/formatDate";

export const TimeSlotContainer = ({ tz }) => (props) => {
  return (
    <TimeSlotWrapper children={props.children} value={props.value} tz={tz} />
  );
};

const TimeSlotWrapper = ({ children, value, tz }) => {
  const time = formatDate({ date: value, format: "h:mm A zz" }, tz);

  if (children.props.children?.props.children) {
    return (
      <div className="rbc-time-slot">
        <span className="rbc-label">{time}</span>
      </div>
    );
  }
  return children;
};

export default React.memo(TimeSlotWrapper);

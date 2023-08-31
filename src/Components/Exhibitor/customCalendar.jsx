import * as React from "react";

import { Calendar, CalendarCell } from "@progress/kendo-react-dateinputs";

const customCell = (props) => {
  const style = props.isWeekend ? { opacity: ".7" } : { fontWeight: "bold" };

  return <CalendarCell {...props} style={style} />;
};

export class CustomCalendar extends React.Component {
  render() {
    return (
      <Calendar
        value={this.props.value}
        onChange={this.props.onChange}
        navigation={false}
        cell={customCell}
      />
    );
  }
}

import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import generatedName from "util/generatedName";
import ics from "util/ics";

/**
 * Handle exporting one or many calendar events to .ics file.
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Export-Calendar
 * @param {array} events (session data)
 */
const ExportCalendar = ({ events, page }) => {
  const cal = ics();

  const getLocation = (sessionId, sessionName, subSessionName) => {
    return `${
      process.env.REACT_APP_EVENT_URL
    }/live-stream/${sessionId}/${generatedName(sessionName || subSessionName)}`;
  };

  const handleClick = () => {
    if (events) {
      events.forEach((event) => {
        cal.addEvent(
          event.sessionName,
          event.description,
          getLocation(event.sessionId, event.sessionName, event.subSessionName),
          event.sessionStart,
          event.sessionEnd
        );
      });
    }
    cal.download();
  };

  return (
    <OEPAnalytics
      componentType="Button"
      page={`${page}`}
      url="Export to calendar"
      componentName="Export to calendar"
    >
      <button onClick={handleClick}>Export Calendar</button>
    </OEPAnalytics>
  );
};

export default ExportCalendar;

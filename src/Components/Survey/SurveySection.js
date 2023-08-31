import React from "react";
import moment from "moment-timezone";
import SurveyForm from "Components/Survey/SurveyForm";

export default function SurveySection({
  surveyConfig,
  sessionData,
  closeSurveyModal,
}) {
  const currentTime = moment.tz(
    new Date(),
    "MMM Do YYYY h:mmA",
    process.env.REACT_APP_MOMENT_TIMEZONE
  );
  const beforeStartTime = currentTime.isBefore(
    moment.tz(
      surveyConfig.starts,
      "MM/DD/YYYY h:mmA",
      process.env.REACT_APP_MOMENT_TIMEZONE
    )
  );
  const afterEndTime = currentTime.isAfter(
    moment.tz(
      surveyConfig.ends,
      "MM/DD/YYYY h:mmA",
      process.env.REACT_APP_MOMENT_TIMEZONE
    )
  );

  if (beforeStartTime) {
    return (
      <div>
        <p>{surveyConfig.preMessage}</p>
      </div>
    );
  }

  if (afterEndTime) {
    return (
      <div>
        <p>{surveyConfig.postMessage}</p>
      </div>
    );
  }

  return (
    <SurveyForm
      config={surveyConfig}
      sessionData={sessionData}
      closeModalFunction={closeSurveyModal}
    />
  );
}

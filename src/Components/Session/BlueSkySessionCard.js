import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import checkForLiveStream from "util/checkForLiveStream";
import checkForWatchNow from "util/checkForWatchNow";
import cropName from "util/cropName";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import generatedName from "util/generatedName";

export const BlueSkySessionCard = (props) => {
  const { data } = props;
  return (
    <div className="small-card">
      <h1>{cropName(data.SessionName, 35)}</h1>
      <h3>{data.RoomName}</h3>
      <h2>
        {formatTime(data)}
        <br />
        {formatDate({ date: data.SessionStart })}
      </h2>
      <LinkWrapper
        className="details-button gtm-watch-now"
        to={
          checkForLiveStream(data)
            ? `/live-stream/${data.SessionId}/${generatedName(
                data.SessionName
              )}`
            : `/sessions/${data.SessionId}/${generatedName(data.SessionName)}`
        }
        aria-label={`See Details for "${data.sessionName}"`}
        page="homepage"
        componentType="Card"
        trackingUrl={data.sessionName}
        componentName={checkForWatchNow(data) ? "Watch Now" : "Details"}
      >
        {checkForWatchNow(data) ? "Watch Now" : "Details"}
      </LinkWrapper>
    </div>
  );
};

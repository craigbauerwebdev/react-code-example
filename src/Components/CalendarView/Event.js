import React, { Fragment } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import { bpMap } from "util/bpMap";
import checkForWatchNow from "util/checkForWatchNow";
import getSessionUrl from "util/getSessionUrl";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const Event = ({
  event: {
    title,
    sessionData: { start, end, id, liveStream, name, color, track },
  },
  style,
  onClick,
}) => {
  const isLive = checkForWatchNow({ sessionStart: start, sessionEnd: end });
  const isMobile = useToggleDisplayMQ(bpMap.midpoint);
  const styleSetting = {
    height: `${style?.height}%`,
    top: `${style?.top}%`,
    width: `${style?.width}%`,
    left: `${style?.xOffset}%`,
  };
  const content = () => {
    return (
      <Fragment>
        <hr
          style={{
            backgroundColor: color,
          }}
          tabIndex="-1"
          aria-hidden="true"
        />
        <div>
          {isLive && <span className="rbc-event-life">Live {track}</span>}
          <div
            className="rbc-event-content"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </Fragment>
    );
  };
  return (
    <div title={title} style={styleSetting} className="rbc-event">
      {isMobile && (
        <LinkWrapper
          to={getSessionUrl({
            sessionName: name,
            sessionId: id,
            sessionVideoSource: liveStream,
          })}
          componentName={name}
        >
          {content()}
        </LinkWrapper>
      )}
      {!isMobile && (
        <OEPAnalytics
          componentType="Button"
          page="Calendar"
          componentName={name}
          url={getSessionUrl({
            sessionName: name,
            sessionId: id,
            sessionVideoSource: liveStream,
          })}
        >
          <button onClick={onClick?.bind(null, id)}>{content()}</button>
        </OEPAnalytics>
      )}
    </div>
  );
};

export default Event;

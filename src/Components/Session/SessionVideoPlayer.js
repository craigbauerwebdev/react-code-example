import IbmResponsivePlayer, {
  formatIbmVideoUrl,
} from "Components/VideoPlayers/IbmPlayer/IbmResponsivePlayer";
import React, { useEffect, useRef } from "react";

import ConfigService from "services/ConfigService";
import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import { saveAnalytic } from "Components/OEPAnalytics";
import sessionVideoPlayerStyles from "./scss/session-video-player.module.scss";
import useVimeoPlayerAnalytics from "hooks/useVimeoPlayerAnalytics";

export default function SessionVideoPlayer({
  iframeId,
  streamId,
  width,
  height,
  classnames,
  session,
  stopPlayer,
  pageLabel,
  isInDrawer,
  isWhereby,
  componentType = "Video",
  componentName,
}) {
  const isIBMPlayer = iframeId === "IbmPlayer";
  const iframeRef = useRef();
  const current = new Date();
  const iframePollingMilliseconds = 1000;
  const startMinutesLeeway = 30;
  const isOnDemandOrRecordedString =
    iframeId === "VimeoPrerecorded"
      ? "On-Demand"
      : moment(current).isAfter(
          moment.tz(session.sessionEnd, ConfigService.runValues.momentTimezone)
        )
      ? "Recorded"
      : "";
  const isLiveString = moment(current).isBetween(
    moment
      .tz(session.sessionStart, ConfigService.runValues.momentTimezone)
      .subtract(startMinutesLeeway, "minutes"),
    moment.tz(session.sessionEnd, ConfigService.runValues.momentTimezone)
  )
    ? "Live"
    : "";
  const componentTypeTemplate =
    isLiveString || isOnDemandOrRecordedString || `${pageLabel} Video`;

  // if (
  //   isOnDemandOrRecordedString === "Recorded" &&
  //   iframeId === "VimeoLivestream"
  // ) {
  //   iframeId = "VimeoPrerecorded";
  // }

  useEffect(() => {
    let focusPoll = null;
    const iFrameListener = () => {
      if (
        document.activeElement === iframeRef.current &&
        iframeId !== "VimeoLivestream" &&
        iframeId !== "VimeoPrerecorded"
      ) {
        const data = iframeRef.current.getAttribute("data-oepa");
        saveAnalytic(JSON.parse(data));
        window.clearInterval(focusPoll);
      }
    };

    if (!focusPoll) {
      focusPoll = window.setInterval(iFrameListener, iframePollingMilliseconds);
    }

    return () => {
      window.clearInterval(focusPoll);
    };
  }, [iframeId]);

  let url = "";
  if (stopPlayer) {
    switch (iframeId) {
      case "IbmPlayer":
        url = formatIbmVideoUrl(streamId);
        break;
      case "Youtube":
        url = `https://www.youtube.com/embed/${streamId}`;
        break;
      case "VimeoLivestream":
        url = `https://vimeo.com/event/${streamId}/embed`;
        break;
      case "VimeoPrerecorded":
        url = `https://player.vimeo.com/video/${streamId}`;
        break;
      default:
        url = isWhereby
          ? iframeId
          : `https://livestream.com/accounts/10952998/events/${streamId}/player?width=960&height=540&enableInfoAndActivity=true&defaultDrawer=feed&autoPlay=true&mute=${isInDrawer}`;
        break;
    }
  }

  useVimeoPlayerAnalytics(url, iframeRef, {
    page: pageLabel,
    componentName: componentTypeTemplate,
    componentType,
    url,
  });

  if (isIBMPlayer) {
    return <IbmResponsivePlayer sessionData={session} iframeSrc={url} />;
  }

  return (
    <OEPAnalytics
      page={pageLabel}
      componentType={componentType || "Video"}
      url={url}
      componentName={componentName}
    >
      <iframe
        className={
          classnames
            ? sessionVideoPlayerStyles[classnames]
            : sessionVideoPlayerStyles.iframeVideo
        }
        id={isInDrawer ? `${iframeId}_drawer` : `${iframeId}_video`}
        title={`${session.sessionName} Video`}
        ref={iframeRef}
        src={url}
        allow={
          isWhereby &&
          "camera; microphone; fullscreen; speaker; display-capture"
        }
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        msallowfullscreen="true"
        width={width ? width : "100%"}
        height={height ? height : "auto"}
        data-oepa={JSON.stringify({
          page: `${pageLabel}`,
          componentType: componentType,
          url: url,
          componentName: componentTypeTemplate,
          sessionId: session.sessionId,
          subSessionId: session.subSessionId,
        })}
      />
    </OEPAnalytics>
  );
}

SessionVideoPlayer.propTypes = {
  iframeId: PropTypes.string.isRequired,
  streamId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  classnames: PropTypes.string,
  session: PropTypes.shape({
    sessionName: PropTypes.string.isRequired,
  }).isRequired,
  stopPlayer: PropTypes.bool,
  pageLabel: PropTypes.string,
};

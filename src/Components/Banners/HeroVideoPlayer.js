import React, { useEffect, useRef } from "react";
import { TIME_CHECKS, checkTime } from "util/timeCheck";

import YouTube from "react-youtube";
import bannerStyles from "./scss/banner.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { saveAnalytic } from "Components/OEPAnalytics";
import { useLocation } from "react-router";
import useVimeoPlayerAnalytics from "hooks/useVimeoPlayerAnalytics";

export const HeroVideoPlayer = ({ data, disabled }) => {
  const { urlId, active, starts, ends, Position, autoplay } = data || {};
  const iframeRef = useRef();
  const { pathname } = useLocation();
  const iframePollingMilliseconds = 1000;
  const positionClassName =
    Position === "right"
      ? bannerStyles.positionRight
      : Position === "left"
      ? bannerStyles.positionLeft
      : "";
  const iframeSrc = getVideoUrlById(urlId, autoplay);
  const iframeId = urlId && getIframeId(urlId);
  let currentPlaybackQuality;
  let currentPlaybackRate;

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
  }, [urlId, iframeId]);

  const componentTypeTemplate = `${getIframeId(pathname)} Hero Video`;

  useVimeoPlayerAnalytics(iframeSrc, iframeRef, {
    page: getAnalyticsPage(pathname),
    componentName: componentTypeTemplate,
    componentType: "Hero Video",
    url: iframeSrc,
  });

  if (active !== true || disabled) {
    return null;
  }

  if (starts && !checkTime(TIME_CHECKS.start, starts)) {
    return null;
  }

  if (ends && !checkTime(TIME_CHECKS.end, ends)) {
    return null;
  }

  if (iframeId === "Youtube") {
    const opts = {
      playerVars: {
        autoplay: autoplay ? 1 : 0,
      },
    };
    return (
      <div className={`${bannerStyles.iframeContainer} ${positionClassName}`}>
        <YouTube
          ref={iframeRef}
          className={bannerStyles.heroVideo}
          width="100%"
          height="100%"
          videoId={urlId}
          title={`hero-video-${urlId}`}
          src={iframeSrc}
          opts={opts}
          onReady={(e) => onPlayerReady(e)}
          onStateChange={(e) =>
            onPlayerStateChange(e, {
              page: getAnalyticsPage(pathname),
              componentName: componentTypeTemplate,
              componentType: "Hero Video",
              url: iframeSrc,
              quality: currentPlaybackQuality,
              playbackRate: currentPlaybackRate,
            })
          }
          onPlaybackQualityChange={(e) => (currentPlaybackQuality = e.data)}
          onPlaybackRateChange={(e) => (currentPlaybackRate = e.data)}
        />
      </div>
    );
  }

  return (
    <div className={`${bannerStyles.iframeContainer} ${positionClassName}`}>
      <iframe
        ref={iframeRef}
        id={`hero-video-${urlId}`}
        className={bannerStyles.heroVideo}
        width="100%"
        height="100%"
        title={`hero-video-${urlId}`}
        src={iframeSrc}
        frameBorder="0"
        allow={autoplay ? "autoplay;" : ""}
        allowFullScreen
        data-oepa={JSON.stringify({
          page: getAnalyticsPage(pathname),
          componentType: componentTypeTemplate,
          url: iframeSrc,
        })}
      />
    </div>
  );
};

const getVideoUrlById = (videoId, autoplay) => {
  const isBrightcove = videoId?.includes(".brightcove");
  if (isBrightcove) {
    const { pathname: brightcovePathname, searchParams } = new URL(videoId);
    const [accountId] = brightcovePathname.split("/").filter(Boolean);
    const brightcoveVideoId = searchParams.get("videoId");

    return `https://players.brightcove.net/${accountId}/default_default/index.html?videoId=${brightcoveVideoId}${
      autoplay ? "&autoplay=1&muted" : ""
    }`;
  }
  if (videoId?.length > 10) {
    return `https://www.youtube.com/embed/${videoId}${
      autoplay ? "?&autoplay=1" : ""
    }`;
  } else if (videoId.length > 7) {
    return `https://player.vimeo.com/video/${videoId}${
      autoplay ? "?&autoplay=1&muted=1" : ""
    }`;
  } else if (videoId.length <= 7) {
    return `https://player.vimeo.com/video/${videoId}${
      autoplay ? "?&autoplay=1&muted=1" : ""
    }`;
  }
};

const getIframeId = (id) => {
  if (id?.includes(".brightcove")) {
    return "Brightcove";
  } else if (id.length > 10) {
    return "Youtube";
  } else if (id.length > 7) {
    return "VimeoPrerecorded";
  } else if (id.length <= 7) {
    return "VimeoLivestream";
  }
};

const onPlayerReady = (event) => {
  event.target.playVideo();
};

const onPlayerStateChange = (event, data) => {
  if (event.data === YouTube.PlayerState.PLAYING) {
    updateAnalytics("Playing", data);
  } else if (event.data === YouTube.PlayerState.ENDED) {
    updateAnalytics("Ended", data);
  } else if (event.data === YouTube.PlayerState.PAUSED) {
    updateAnalytics("Paused", data);
  } else if (event.data === YouTube.PlayerState.BUFFERING) {
    updateAnalytics("Buffering", data);
  } else if (event.data === YouTube.PlayerState.CUED) {
    updateAnalytics("Cued", data);
  }
};

const updateAnalytics = (actionName, data) => {
  let data1 = JSON.stringify(data);
  let parsedJson = JSON.parse(data1);
  saveAnalytic({
    ...parsedJson,
    vimeoTimeObject: 10,
    action: actionName,
  });
};

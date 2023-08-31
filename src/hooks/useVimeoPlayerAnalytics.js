import {
  beforeUnloadSynchronousRequest,
  createAnalyticPayload,
  saveAnalytic,
} from "Components/OEPAnalytics";

import Player from "@vimeo/player";
import { useEffect } from "react";

/**
 * Set up callbacks on Vimeo player's events to save analytics for ended video, progress (pause and other player events available to implement)
 * @param {string} url
 * @param {React.RefObject<any>} iframeRef
 * @param {Object} analytics
 * @param {string} analytics.page
 * @param {string} analytics.componentType
 * @param {Player} player
 */
export default function useVimeoPlayerAnalytics(
  url,
  iframeRef,
  { page, componentType, componentName },
  player = null
) {
  useEffect(() => {
    //var iframe = document.querySelector("iframe");
    //var iframes = document.querySelectorAll("iframe");
    // let vimeoPlayers = [];
    let componentTypeCopy = componentType;
    let componentNameCopy = componentName;
    let vimeoPlayer;
    let isAlreadyPlaying = false;
    let vimeoPageUnloadHandler;

    const analyticPayloadBase = JSON.stringify({
      page: page,
      url: url,
      componentType: componentTypeCopy,
      componentName: componentNameCopy,
    });

    let currentTimeObject; //seconds, percent (decimal), duration
    let playSeconds; // for live since no duration we need this to calculate timeWatched
    const dataJSONParsed = JSON.parse(analyticPayloadBase);
    let currentQuality;
    let currentPlaybackRate;
    if (
      url &&
      url.indexOf("vimeo") > -1 &&
      (player !== null || iframeRef?.current)
    ) {
      try {
        vimeoPlayer = player !== null ? player : new Player(iframeRef?.current);
        vimeoPlayer
          .getQuality()
          .then(function (quality) {
            currentQuality = quality;
          })
          .catch(function (error) {});
        vimeoPlayer
          .getPlaybackRate()
          .then(function (playbackRate) {
            currentPlaybackRate = playbackRate;
          })
          .catch(function (error) {});
        if (vimeoPlayer) {
          vimeoPlayer.on("ended", function (timeupdate) {
            let endedPayload = dataJSONParsed;
            currentTimeObject = timeupdate;
            saveAnalytic({
              ...endedPayload,
              vimeoTimeObject: currentTimeObject,
              quality: currentQuality,
              playbackRate: currentPlaybackRate,
              action: "End",
            });
            isAlreadyPlaying = false;
          });

          vimeoPlayer.on("loaded", function () {});
          vimeoPlayer.on("seeked", function () {});
          vimeoPlayer.on("playing", function (timeupdate) {
            if (!isAlreadyPlaying) {
              isAlreadyPlaying = true;
              let playedPayload = dataJSONParsed;
              currentTimeObject = timeupdate;
              playSeconds = currentTimeObject?.seconds;
              saveAnalytic({
                ...playedPayload,
                vimeoTimeObject: currentTimeObject,
                quality: currentQuality,
                playbackRate: currentPlaybackRate,
                action: "Start",
              });
            }
          });
          vimeoPlayer.on("pause", function (timeupdate) {
            let pausedPayload = dataJSONParsed;
            currentTimeObject = timeupdate;
            if (currentTimeObject?.percent !== 1) {
              saveAnalytic({
                ...pausedPayload,
                vimeoTimeObject: currentTimeObject,
                quality: currentQuality,
                playbackRate: currentPlaybackRate,
                action: "Pause",
              });
            }
          });
          vimeoPlayer.on("timeupdate", function (latestTimeObject) {
            currentTimeObject = latestTimeObject;
          });
          vimeoPlayer.on("qualitychange", function (latestQuality) {
            currentQuality = latestQuality;
          });
          vimeoPlayer.on("playbackratechange", function (
            latestPlaybackRateChange
          ) {
            currentPlaybackRate = latestPlaybackRateChange;
          });

          // progress updates when more data (ahead of currently playing) streams in, may be useful later or for troubleshooting
          vimeoPlayer.on("progress", function (latestTimeObject) {
            // we only need progress updates if the embed is Live, otherwise ignore it and rely on timeupdate event
            if (latestTimeObject?.duration === Infinity) {
              currentTimeObject = latestTimeObject;
            }
          });

          // workaround to capture end of live Vimeo
          vimeoPlayer.on("bufferend", function () {
            //Live streams have Infinite duration on Vimeo
            if (isAlreadyPlaying && currentTimeObject?.duration === Infinity) {
              let endedPayload = dataJSONParsed;
              saveAnalytic({
                ...endedPayload,
                vimeoTimeObject: currentTimeObject,
                quality: currentQuality,
                playbackRate: currentPlaybackRate,
                action: "End",
                ...(currentTimeObject?.duration === Infinity
                  ? { timeWatched: currentTimeObject?.seconds - playSeconds }
                  : {}),
              });
              isAlreadyPlaying = false;
            }
          });

          vimeoPageUnloadHandler = () => {
            if (currentTimeObject?.percent !== 1 && isAlreadyPlaying) {
              let progressPayload = dataJSONParsed;
              const { page, componentType, url } = progressPayload;
              const analyticPayload = createAnalyticPayload(
                page,
                componentType,
                url,
                null,
                null,
                null,
                currentTimeObject,
                currentQuality,
                currentPlaybackRate,
                "Page Unload",
                currentTimeObject?.duration === Infinity
                  ? currentTimeObject?.seconds - playSeconds
                  : null
              );
              beforeUnloadSynchronousRequest(analyticPayload);
            }
          };
          window.addEventListener("beforeunload", vimeoPageUnloadHandler);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.debug(err);
      }
    }

    return () => {
      if (vimeoPlayer) {
        vimeoPlayer.off("playing");
        vimeoPlayer.off("pause");
        vimeoPlayer.off("ended");
        vimeoPlayer.off("seeked");
        vimeoPlayer.off("timeupdate");
        vimeoPlayer.off("qualitychange");
        vimeoPlayer.off("playbackratechange");
        vimeoPlayer.off("progress");
        vimeoPlayer.off("bufferend");
        vimeoPlayer.off("loaded");
        let progressPayload = dataJSONParsed;

        if (currentTimeObject?.percent !== 1 && isAlreadyPlaying) {
          saveAnalytic({
            ...progressPayload,
            vimeoTimeObject: currentTimeObject,
            quality: currentQuality,
            playbackRate: currentPlaybackRate,
            action: "Navigate Away",
            ...(currentTimeObject?.duration === Infinity
              ? { timeWatched: currentTimeObject?.seconds - playSeconds }
              : {}),
          });
        }

        window.removeEventListener("beforeunload", vimeoPageUnloadHandler);
      }
    };
  }, [player, url, page, iframeRef, componentType, componentName]);
}

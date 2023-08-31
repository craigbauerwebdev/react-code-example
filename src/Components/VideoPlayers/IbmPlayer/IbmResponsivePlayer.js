import React, { useCallback, useEffect, useRef, useState } from "react";

import PlayerAPI from "ibm-video-streaming-web-player-api";
// import getAnalyticsPage from "util/getAnalyticsPage";
import { saveIbmAnalytic } from "Components/OEPAnalytics";
// import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import videoSkin from "./scss/ibm-player.module.scss";

/**
 * Add sub filters to store
 * Not sure what all we will need for analytics
 * @param {string} src current state in store
 * @param {string} frameId of object key
 * @param {boolean} active
 * @param {string} trackingId
 * @param {object} dispatch
 * @param {object} this.state
 */

let watchTimer = null;

export const IbmResponsivePlayer = ({ sessionData, iframeSrc }) => {
  const user = useSelector((state) => state.global.user);
  const iframeRef = useRef();
  const iframeId = "IbmPlayer";
  const [viewer, setPlayerApi] = useState(null);
  const [playerIsReady, setPlayerIsReady] = useState(false);
  const streamTypeRef = useRef("-n/a-");
  const hasCaptionsRef = useRef(null);
  const timeWatchedRef = useRef(0);
  const { fuzion_attendee_id: fuzionAttendeeId = "-n/a-" } = user;
  const { sessionId = "-n/a-", subSessionId = "-n/a-" } = sessionData;

  const startWatchTimer = () => {
    if (watchTimer === null) {
      watchTimer = setInterval(() => {
        timeWatchedRef.current += 100;
      }, 100);
    }
  };

  const stopWatchTimer = () => {
    clearInterval(watchTimer);
    watchTimer = null;
  };

  /* Do this on load in order to determine if livestream or recorded.  
    This allows us to take a single video id and change it from livestream to ondemand */
  const getPlayingContent = useCallback((viewer) => {
    viewer.getProperty("playingContent", function (content) {
      console.log("getProperty(playingContent)", {
        type: content && content[0],
      });
    });
  }, []);

  useEffect(() => {
    const { current: iframe } = iframeRef;
    if (!iframe || viewer) {
      return;
    }
    const playerApi = PlayerAPI(iframeId);

    setPlayerApi(playerApi);
  }, [viewer]);

  useEffect(() => {
    if (!viewer || playerIsReady) {
      return;
    }

    const seekStartedCallback = (type, data) => {
      console.log({ type, data });
      saveIbmAnalytic({
        sessionId,
        subSessionId,
        fuzionAttendeeId,
        captionsEnabled: hasCaptionsRef.current,
        sessionStreamType: streamTypeRef.current,
        timeWatchedSeconds: timeWatchedRef.current / 1000,
        playerEventType: type,
      });
    };

    const contentAvailableCallback = (type, data) => {
      console.log({ type, data });
      if (data) {
        viewer.getProperty("duration", function (duration) {
          console.log({ duration });
        });
      }
    };

    const playingCallback = (type, data) => {
      // getPlayingContent(viewer);
      data ? startWatchTimer() : stopWatchTimer();
      const playingOrPausing = data ? type : "pausing"; // type = "playing"
      saveIbmAnalytic({
        sessionId,
        subSessionId,
        fuzionAttendeeId,
        captionsEnabled: hasCaptionsRef.current,
        sessionStreamType: streamTypeRef.current,
        timeWatchedSeconds: timeWatchedRef.current / 1000,
        playerEventType: playingOrPausing,
      });
    };

    const contentCallback = (type, data) => {
      // content == ['channel', 1524] or ['recorded', 12345678]
      console.log({ type, data });
      if (data) {
        console.log("stream type set to", data[0]);
        streamTypeRef.current = data[0];
      }
    };

    const errorCallback = (type, errorEvent) => {
      switch (errorEvent.name) {
        // name (string) error name
        // message (string) error message

        case "autoplayRejected":
          // TODO: display fallback button
          console.log(errorEvent.message);
          break;
        // no default
      }
    };

    const captionsCallback = (type, captions) => {
      /* index (number) unique index of the closed caption
        label (string) displayed label of the closed caption
        language (string) ISO language code of the closed caption
        country (string) ISO code of country
        active (boolean) height of the quality version in pixels 
    */
      console.log({ type, captions });
      if (captions) {
        const activeCaption = captions.find((caption) => caption.active);
        hasCaptionsRef.current = activeCaption ? activeCaption.active : false;
      }
    };

    const qualityCallback = (type, qualities) => {
      /*   id (number) the ID with which the quality method can be called
          codec (string)
          width (number) width of the quality version in pixels
          height (number) height of the quality version in pixels
          bitrate (number) actual bitrate value in kbps
          transcoded (boolean) is this quality one of the transcoded versions or the original ingested quality
          label (object): its text key has the text to show to users on control UI, eg.: “480p”
          selected (boolean) is this quality set to display
      */
      console.log({
        type,
        qualities,
        selected: qualities.find((q) => q.selected === true),
      });
    };

    const addListeners = (viewer) => {
      console.log("\nAdding Listeners\n");
      viewer.addListener("cc", captionsCallback);
      viewer.addListener("quality", qualityCallback);
      viewer.addListener("seekStarted", seekStartedCallback);
      viewer.addListener("contentAvailable", contentAvailableCallback);
      //When a video plays, get playing content
      viewer.addListener("playing", playingCallback);
      viewer.addListener("content", contentCallback);
      viewer.addListener("error", errorCallback);
      viewer.addListener("live", function (type, data) {
        //For a live stream to show a placeholder before start time
        console.log(type, data);
      });
      viewer.addListener("offline", function (type, data) {
        console.log(type, data);
      });
      viewer.addListener("finished", function (type, data) {
        console.log(type, data);
      });
      viewer.addListener("size", function (type, data) {
        console.log(type, data);
      });
      viewer.addListener("content", function (type, data) {
        console.log(type, data);
      });
      viewer.addListener("seekCompleted", function (type, data) {
        console.log({ type, data });
      });
      viewer.addListener("ready", function (type, data) {
        console.log({ type, data });
        saveIbmAnalytic({
          sessionId,
          subSessionId,
          fuzionAttendeeId,
          captionsEnabled: hasCaptionsRef.current,
          sessionStreamType: streamTypeRef.current,
          timeWatchedSeconds: timeWatchedRef.current / 1000,
          playerEventType: type,
        });
      });
    };

    addListeners(viewer);
    setPlayerIsReady(true);
  }, [
    fuzionAttendeeId,
    getPlayingContent,
    playerIsReady,
    sessionId,
    subSessionId,
    viewer,
  ]);

  return (
    <div className={videoSkin.playerContainer}>
      <iframe
        id={iframeId}
        src={iframeSrc}
        ref={iframeRef}
        title={`${sessionData.sessionName} Video`}
        webkitallowfullscreen="true"
        allowFullScreen
        frameBorder="0"
        allow="autoplay"
        scrolling="no"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default IbmResponsivePlayer;

/**
 *
 * @param {string} videoId
 * @returns {string} `https://video.ibm.com/embed/${videoId}?showtitle=false`
 */
export const formatIbmVideoUrl = (videoId) => {
  return `https://video.ibm.com/embed/${videoId}?showtitle=false`;
};

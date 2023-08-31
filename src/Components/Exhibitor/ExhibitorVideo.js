import React, { createRef, useEffect } from "react";

import VimeoWrapper from "Components/VimeoPlayer/VimeoWrapper";
import exhibitorVideosStyles from "./scss/exhibitor-videos.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";

const ExhibitorVideo = ({ video, exhibitorName, index }) => {
  const videoRef = createRef();
  const videoUrl = video.url;
  const videoId = index + 1;
  const getVideo = () => {
    if (video) {
      switch (video.type) {
        case "vimeo":
          return (
            <VimeoWrapper
              id={videoUrl}
              page="Single Exhibitor"
              componentType="Video"
              fullWidth={true}
            />
          );

        default:
          return (
            <div
              className={exhibitorVideosStyles.iframeContainer}
              key={`${exhibitorName} Video ${videoId} - ${videoUrl}`}
            >
              <iframe
                key={`${exhibitorName} Video ${videoId} - ${videoUrl}`}
                id={`exhibitor-video-${videoId}`}
                className={exhibitorVideosStyles.exhibitorVideo}
                ref={videoRef}
                width="100%"
                height="100%"
                title={`exhibitor-video-${videoId}`}
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-oepa={JSON.stringify({
                  page: "Single Exhibitor",
                  componentType: "Video",
                  url: videoUrl,
                  componentName: "Single Exhibitor Video",
                })}
              ></iframe>
            </div>
          );
      }
    }
    return null;
  };

  useEffect(() => {
    const iFrameListener = () => {
      if (
        videoRef &&
        videoRef.current &&
        document.activeElement === videoRef.current
      ) {
        const data = videoRef.current.getAttribute("data-oepa");
        saveAnalytic(JSON.parse(data));
        window.removeEventListener("blur", iFrameListener);
      }
      // Remove this focus reset if using slido on exhibitor page
      setTimeout(() => {
        window.blur();
        window.focus();
      }, 0);
    };

    window.addEventListener("blur", iFrameListener);

    return () => {
      window.removeEventListener("blur", iFrameListener);
    };
  }, [videoRef]);

  return getVideo();
};

export default ExhibitorVideo;

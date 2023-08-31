import React, { Fragment, useEffect, useState } from "react";

import ExhibitorVideo from "./ExhibitorVideo";
import lodash from "lodash";

export const ExhibitorVideos = ({ videos, exhibitorName }) => {
  const [videoList, setVideoList] = useState(null);

  useEffect(() => {
    if (videos) {
      setVideoList(lodash.uniqBy(videos, "url"));
    }
  }, [videos]);

  return (
    <Fragment>
      {videoList &&
        videoList.map((video, index) => (
          <ExhibitorVideo
            key={video.url}
            video={video}
            exhibitorName={exhibitorName}
            index={index}
          />
        ))}
    </Fragment>
  );
};

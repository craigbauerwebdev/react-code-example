import React, { useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";

export default function SyncEmbed({ user, sessionKey, title }) {
  const { REACT_APP_CHAT_LIVESTREAM_SRC } = process.env;
  const userInfo = user && {
    username: `${user.contact.first_name}%20${user.contact.last_name}`,
    email: user.contact.email,
  };
  const checkForSyncEmbedURL = `https://${REACT_APP_CHAT_LIVESTREAM_SRC}/viewer/audience_viewer.php?sk=${sessionKey}&email=${userInfo.email}&name=${userInfo.username}`;

  const [syncEmbedURL, setSyncEmbedURL] = useState(checkForSyncEmbedURL);

  useEffect(() => {
    setSyncEmbedURL(checkForSyncEmbedURL);
  }, [sessionKey, userInfo, checkForSyncEmbedURL]);

  return (
    <OEPAnalytics
      page="Sync Embed"
      componentType="Video"
      url={syncEmbedURL}
      componentName="Sync Embed"
    >
      <iframe title={title} src={syncEmbedURL} />
    </OEPAnalytics>
  );
}

SyncEmbed.propTypes = {
  title: PropTypes.string,
};

import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import React from "react";
import addPrefix from "util/addPrefix";
import cropName from "util/cropName";
import generatedSpeakerUrl from "util/generatedSpeakerUrl";
import renderSpeakerName from "util/renderSpeakerName";
import speakerCardStyles from "./scss/speaker-card-large.module.scss";

/**
 * Large Speaker Card
 *
 * @param {object} props
 * @param {Speaker} props.speaker
 * @param {string} props.page
 *
 * @returns {JSX.Element} single speaker card
 */
const SpeakerCardLarge = ({ speaker, page, classNameProp }) => {
  if (!speaker) {
    return null;
  }

  return (
    <div
      className={`${speakerCardStyles.speakerContainerLargeOuterShell} ${
        classNameProp ? speakerCardStyles[`${classNameProp}OuterShell`] : ""
      }`}
    >
      <div className={speakerCardStyles.favoriteHolder}>
        <Favorites
          type={favoriteTypes.speakers}
          id={speaker.username}
          page={page}
          url={`${renderSpeakerName(speaker)}`}
          data={speaker}
        />
      </div>
      <CardWrapper
        className="gtm-speaker-card"
        to={generatedSpeakerUrl(speaker)}
        page={page}
        componentType="Card"
        trackingUrl={generatedSpeakerUrl(speaker)}
      >
        <div
          className={speakerCardStyles.speakerContainerLarge}
          style={{
            backgroundImage: `url("${
              speaker.headShotUrl || "/images/profile-placeholder.png"
            }")`,
          }}
        >
          <div className={speakerCardStyles.speakerGradient}></div>
        </div>
        <div className={speakerCardStyles.speakerInfo}>
          <h2 className={speakerCardStyles.speakerName}>
            {addPrefix(speaker, renderSpeakerName(speaker))}
          </h2>
          {speaker.organization && (
            <p className={speakerCardStyles.speakerOrg}>
              {cropName(speaker.organization, 60)}
            </p>
          )}
        </div>
      </CardWrapper>
    </div>
  );
};

export default SpeakerCardLarge;

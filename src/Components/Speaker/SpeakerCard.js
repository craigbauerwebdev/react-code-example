import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, { Fragment } from "react";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import ConfigService from "services/ConfigService";
// import CreateMeetingModal from "Components/Profile/CreateMeetingModal";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import addPrefix from "util/addPrefix";
import { assetUrl } from "Components/Sidebar/SideBarSupplemental";
import { excludeSupplementalExt } from "Components/Session/utils/excludeSupplementalExt.js";
import generatedName from "util/generatedName";
import generatedSpeakerUrl from "util/generatedSpeakerUrl";
import getGeneratedSpeakerId from "util/getGeneratedSpeakerId";
import renderSpeakerName from "util/renderSpeakerName";
import speakerCardStyles from "./scss/speaker-card.module.scss";

// import { useSelector } from "react-redux";

/**
 * Speaker Card
 * @param {object} props
 * @param {Presenters} props.speaker
 * @param {boolean} props.speakerOnly
 * @param {string} props.page
 * @param {boolean} props.isWhereby
 * @returns {JSX.Element} speaker card
 */
export const SpeakerCard = ({
  speaker,
  speakerOnly = false,
  page,
  isWhereby,
}) => {
  const generatedId = getGeneratedSpeakerId(speaker);

  // const permissions = useSelector((state) => state.global.permissions);
  const subSessionUrl = `/sessions/${speaker.sessionId}/subsession/${
    speaker.subSessionId
  }/${generatedName(speaker.subSessionName)}`;

  // const [scheduleMeetingAttendee, setScheduleMeetingAttendee] = useState(false);

  // const handleClick = (attendee) => {
  //   setScheduleMeetingAttendee(attendee);
  // };

  // const toggleDialog = () => {
  //   setScheduleMeetingAttendee(null);
  // };

  return (
    <div
      className={`${speakerCardStyles.speakerContainer} ${
        speakerOnly && speakerCardStyles.doubleColumnSpeakers
      } `}
    >
      {subSessionUrl && !speakerOnly && (
        <Fragment>
          {speaker.subSessionName && !isWhereby && (
            <h2>{speaker.subSessionName}</h2>
          )}
          {speaker.description && (
            <article
              className={speakerCardStyles.speakerDescription}
              dangerouslySetInnerHTML={{ __html: speaker.description }}
            />
          )}
          {speaker.presentationFiles && (
            <ul className={speakerCardStyles.presentationFiles}>
              {speaker.presentationFiles
                .filter(
                  (file) =>
                    !excludeSupplementalExt.some((excludedExtention) =>
                      file.fileName.includes(excludedExtention)
                    )
                )
                .map((file) => (
                  <li key={file.fileName}>
                    <LinkWrapper
                      to={`${assetUrl}${ConfigService.runValues.fileviewerAsset}/${file.filePath}`}
                      external={true}
                      page={page}
                      componentType="Download"
                      trackingUrl={`${assetUrl}${ConfigService.runValues.fileviewerAsset}/${file.filePath}`}
                      componentName={file.fileName}
                    >
                      <img
                        src="/images/icons/pdf.svg"
                        alt="PDF"
                        role="presentation"
                      />{" "}
                      <span>{file.fileName}</span>
                    </LinkWrapper>
                  </li>
                ))}
            </ul>
          )}
        </Fragment>
      )}
      {generatedId && (
        <div
          className={
            isWhereby
              ? speakerCardStyles.wherebyHolder
              : speakerCardStyles.holder
          }
        >
          <CardWrapper
            to={generatedSpeakerUrl(speaker)}
            page={page}
            componentType="Card"
            trackingUrl={generatedSpeakerUrl(speaker)}
          >
            {speaker.headShotUrl && (
              <div
                className={
                  isWhereby
                    ? speakerCardStyles.speakerWherebyImage
                    : speakerCardStyles.speakerImage
                }
              >
                <img
                  src={speaker.headShotUrl}
                  alt={renderSpeakerName(speaker)}
                />
                {!isWhereby && (
                  <div className={speakerCardStyles.holderFavorites}>
                    <Favorites
                      id={speaker.username}
                      type={favoriteTypes.speakers}
                      url={renderSpeakerName(speaker)}
                      page={page}
                      data={speaker}
                    />
                  </div>
                )}
              </div>
            )}
            {!isWhereby && (
              <div>
                <h2>{addPrefix(speaker, renderSpeakerName(speaker))}</h2>
                {speaker.organization && <h3>{speaker.organization}</h3>}
              </div>
            )}
          </CardWrapper>
          {isWhereby && (
            <div className={speakerCardStyles.wherebyContainer}>
              <h2>{addPrefix(speaker, renderSpeakerName(speaker))}</h2>
              {speaker.organization && <h3>{speaker.organization}</h3>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

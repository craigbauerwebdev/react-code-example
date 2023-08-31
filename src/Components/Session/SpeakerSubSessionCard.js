import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import addPrefix from "util/addPrefix";
import checkForLiveStream from "util/checkForLiveStream";
import cropName from "util/cropName";
import generatedName from "util/generatedName";
import getAnalyticsPage from "util/getAnalyticsPage";
import renderSpeakerName from "util/renderSpeakerName";
import subSessionCardStyles from "./scss/speaker-sub-session-card.module.scss";

const SpeakerSubSessionCard = ({ data, page }) => {
  const cardLink = () => {
    return checkForLiveStream(data)
      ? `/live-stream/${data.sessionId}/subsession/${
          data.subSessionId
        }/${generatedName(data.subSessionName)}`
      : `/sessions/${data.sessionId}/subsession/${
          data.subSessionId
        }/${generatedName(data.subSessionName)}`;
  };
  return (
    <CardWrapper className={subSessionCardStyles.largeCardSubSession}>
      <header className={subSessionCardStyles.subSessionCardHeader}>
        <h2>{cropName(data.subSessionName, 130)}</h2>
        <Favorites
          page={getAnalyticsPage(window.location.pathname)}
          id={data.subSessionId}
          data={data}
          type={favoriteTypes.subsessions}
        />
      </header>
      {data?.presenters?.map((presenter, i) => (
        <div className={subSessionCardStyles.presenterInfo} key={i}>
          {presenter.headShotUrl && (
            <div className={subSessionCardStyles.subSessionSpeakerImage}>
              <img
                src={presenter.headShotUrl}
                alt={renderSpeakerName(presenter)}
              />
            </div>
          )}
          <section>
            <h3>{addPrefix(presenter, renderSpeakerName(presenter))}</h3>
            {presenter.organization && (
              <h3>{cropName(presenter.organization, 60)}</h3>
            )}
          </section>
        </div>
      ))}
      <LinkWrapper
        to={cardLink()}
        page={page}
        componentType="button"
        trackingUrl={cardLink()}
        componentName="details"
        sessionId={data.sessionId}
        subSessionId={data.subSessionId}
      >
        Details
      </LinkWrapper>
    </CardWrapper>
  );
};

SpeakerSubSessionCard.propTypes = {
  data: PropTypes.shape({
    subSessionId: PropTypes.number.isRequired,
    subSessionName: PropTypes.string.isRequired,
    sessionId: PropTypes.number.isRequired,
    presenters: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        middleName: PropTypes.string,
        lastName: PropTypes.string,
        suffix: PropTypes.string,
        disclosureText: PropTypes.string,
        organization: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default SpeakerSubSessionCard;

import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import PropTypes from "prop-types";
import React from "react";
import addPrefix from "util/addPrefix";
import checkForLiveStream from "util/checkForLiveStream";
import cropName from "util/cropName";
import generatedName from "util/generatedName";
import getAnalyticsPage from "util/getAnalyticsPage";
import renderSpeakerName from "util/renderSpeakerName";
import subSessionCardStyles from "./scss/sub-session-card.module.scss";

export const SubSessionCard = ({ data }) => {
  return (
    <CardWrapper
      className={subSessionCardStyles.smallCardSubSession}
      to={
        checkForLiveStream(data)
          ? `/live-stream/${data.sessionId}/subsession/${
              data.subSessionId
            }/${generatedName(data.subSessionName)}`
          : `/sessions/${data.sessionId}/subsession/${
              data.subSessionId
            }/${generatedName(data.subSessionName)}`
      }
      page="Sessions List"
      componentType="Card"
      trackingUrl={
        checkForLiveStream(data)
          ? `/live-stream/${data.sessionId}/subsession/${
              data.subSessionId
            }/${generatedName(data.subSessionName)}`
          : `/sessions/${data.sessionId}/subsession/${
              data.subSessionId
            }/${generatedName(data.subSessionName)}`
      }
      sessionId={data.sessionId}
      subSessionId={data.subSessionId}
    >
      <div>
        <header className={subSessionCardStyles.subSessionCardHeader}>
          <h2>{cropName(data.subSessionName)}</h2>
          <Favorites
            page={getAnalyticsPage(window.location.pathname)}
            url={data.subSessionName}
            type={favoriteTypes.subsessions}
            id={data.subSessionId}
            data={data}
            sessionId={data.sessionId}
            subSessionId={data.subSessionId}
          />
        </header>
        {data.presenters &&
          data.presenters.map((presenter, i) => (
            <div key={i}>
              <h3>{addPrefix(presenter, renderSpeakerName(presenter))}</h3>
            </div>
          ))}
      </div>
    </CardWrapper>
  );
};

SubSessionCard.propTypes = {
  data: PropTypes.shape({
    subSessionName: PropTypes.string.isRequired,
    presenters: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        middleName: PropTypes.string,
        lastName: PropTypes.string,
        suffix: PropTypes.string,
      })
    ),
  }).isRequired,
};

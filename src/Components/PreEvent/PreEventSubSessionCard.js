import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import cropName from "util/cropName";
import preEventSubSessionCardStyles from "./scss/pre-event-sub-card.module.scss";
import renderSpeakerName from "util/renderSpeakerName";

export const PreEventSubSessionCard = ({ data }) => {
  return (
    <OEPAnalytics
      page="Pre Event Sessions List"
      componentType="Subsession Card"
      url={data.SubSessionName}
      componentName={data.SubSessionName}
    >
      <div
        className={
          data.description && data.description.length > 1
            ? preEventSubSessionCardStyles.preEventLargeCardSubSession
            : preEventSubSessionCardStyles.smallCardSubSession
        }
      >
        <h2>{cropName(data.subSessionName)}</h2>
        {data.description && <p>{data.description}</p>}
        {data.presenters &&
          data.presenters.map((presenter, i) => (
            <div key={i}>
              <h3>{renderSpeakerName(presenter)}</h3>
            </div>
          ))}
      </div>
    </OEPAnalytics>
  );
};

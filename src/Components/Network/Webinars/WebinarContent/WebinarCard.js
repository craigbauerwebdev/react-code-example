import AddButton from "../WebinarContent/AddButton";
import ConfigService from "services/ConfigService";
import JoinButton from "./JoinButton";
import React from "react";
import ViewButton from "../WebinarContent/ViewButton";
import cardStyles from "../scss/webinar-card.module.scss";
import moment from "moment";
import { useSelector } from "react-redux";

const WebinarCard = ({ event }) => {
  const tz = useSelector((state) => state.global.timezone);
  const today = moment.tz(new Date(), tz);
  const eventEndTime = moment
    .tz(event.sessionEnd, ConfigService.runValues.momentTimezone)
    .clone()
    .tz(tz)
    .format();

  const getButton = () => {
    if (moment(today).isSameOrAfter(eventEndTime, "day"))
      return <ViewButton aria-label={`View "${event.sessionName}"`} />;
    if (event.active) return <JoinButton />;

    return <AddButton />;
  };

  return (
    <div
      className={`${cardStyles.cardWrapper} ${
        event.active ? cardStyles.activeCard : ""
      } `}
    >
      <div className={cardStyles.innards}>
        <div className={cardStyles.cardHeader}>
          <div className={cardStyles.cardTitle}>
            <span className={cardStyles.companyName}>{event.companyName}</span>
            {event.sessionName}
          </div>
          {getButton()}
        </div>
        <strong className={cardStyles.cardDescription}>
          Hosted By: {event.host}
        </strong>
        <div className={cardStyles.cardDescription}>{event.Description}</div>
      </div>
    </div>
  );
};

export default WebinarCard;

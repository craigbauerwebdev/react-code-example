import React, { useState } from "react";
import sortResults, { sortTypes } from "util/sortResults";

import ConfigService from "services/ConfigService";
import ExpandToggle from "Components/Buttons/ExpandToggle";
import { PreEventSubSessionCard } from "./PreEventSubSessionCard";
import { bpMap } from "util/bpMap";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import preEventSessionsTabStyles from "./scss/pre-event-sessions-tab.module.scss";
import { useSelector } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const SessionTab = ({ data }) => {
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const [expandDescription, setExpandDescription] = useState(false);
  const timezone = useSelector((state) => state.global.timezone);

  const expandDescriptionToggle = () => {
    setExpandDescription(!expandDescription);
  };

  const getToggleBtn = () => (
    <ExpandToggle
      page="preevent"
      componentType="Close Icon"
      expanded={expandDescription}
      handleClick={expandDescriptionToggle.bind(this)}
      classList={["sessionTab"]}
      ariaLabel={[
        "show less description details",
        "show more description details",
      ]}
      ariaControls={`session-desc-${data.sessionId}`}
    />
  );

  return (
    <div className={preEventSessionsTabStyles.sessionTab}>
      <section className={preEventSessionsTabStyles.sideBar}>
        {isMobile && (
          <h1 className={preEventSessionsTabStyles.sessionTitle}>
            {data.sessionName}
            {getToggleBtn()}
          </h1>
        )}

        <h2 className={preEventSessionsTabStyles.sessionMeta}>
          {formatDate({ date: data.sessionStart }, timezone)}
          <br />
          {formatTime(data, timezone)}
        </h2>
      </section>
      <section className={preEventSessionsTabStyles.tabContent}>
        {!isMobile && (
          <h1 className={preEventSessionsTabStyles.sessionTitle}>
            {data.sessionName}
            {getToggleBtn()}
          </h1>
        )}

        <article
          id={`session-desc-${data.sessionId}`}
          className={
            expandDescription
              ? preEventSessionsTabStyles.expandedArticle
              : preEventSessionsTabStyles.croppedArticle
          }
        >
          {data.description}

          {ConfigService.runValues.hasSubSessions && (
            <div className={preEventSessionsTabStyles.speakerListHolder}>
              <div className={preEventSessionsTabStyles.speakerList}>
                {data.subSessions &&
                  sortResults(
                    data.subSessions,
                    sortTypes.lastFirstChar
                  ).map((s, i) => (
                    <PreEventSubSessionCard
                      data={s}
                      key={i}
                      parentSessions={data}
                    />
                  ))}
              </div>
            </div>
          )}
        </article>
      </section>
    </div>
  );
};

export default SessionTab;

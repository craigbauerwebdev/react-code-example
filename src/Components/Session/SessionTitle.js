import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import ConfigService from "services/ConfigService";
import ExpandToggle from "Components/Buttons/ExpandToggle";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import { actionTypesSessionsTab } from "./reducer";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import checkForShowcaseSession from "util/checkForShowcaseSession";
import getMeetingUrl from "util/getMeetingUrl";
import getSessionLink from "./utils/getSessionLink";
import sessionTabStyles from "./scss/session-tab.module.scss";

const SessionTitle = ({
  data,
  isWebinar,
  modal,
  stateSessionTab,
  dispatchSessionTab,
  page,
  exhibitor,
}) => {
  const isShowcaseSession = checkForShowcaseSession(data);
  const showExpandToggle =
    !modal &&
    !isWebinar &&
    ConfigService.runValues.hasSubSessions &&
    data.subSessions?.length > 0;

  const toggleExpand = () => {
    dispatchSessionTab({
      type: actionTypesSessionsTab.UPDATE_EXPAND_DESCRIPTION,
    });
  };

  return (
    <div className={sessionTabStyles.sessionTitle}>
      <div className={sessionTabStyles.titleAndFavorite}>
        <h1>
          <LinkWrapper
            to={
              checkForChimeMeeting(data)
                ? getMeetingUrl(data, isShowcaseSession)
                : getSessionLink(data, isShowcaseSession)
            }
            className={`${sessionTabStyles.sessionTitleLink} gtm-session-link`}
            page={page || "Sessions List"}
            componentType="Link"
            trackingUrl={
              checkForChimeMeeting(data)
                ? getMeetingUrl(data, isShowcaseSession)
                : getSessionLink(data, isShowcaseSession)
            }
            componentName={data.sessionName}
          >
            {isWebinar && exhibitor?.exhibitor_name && (
              <span>{exhibitor.exhibitor_name} |</span>
            )}{" "}
            {data.sessionName}
          </LinkWrapper>
        </h1>
        {!isWebinar && (
          <Favorites
            page={page || "Sessions List"}
            url={data.sessionName}
            type={favoriteTypes.sessions}
            id={data.sessionId}
            data={data}
          />
        )}
      </div>
      {showExpandToggle && (
        <ExpandToggle
          page={page || "Sessions List"}
          componentType={`${
            stateSessionTab.expandDescription ? "Collapse" : "Expand"
          } Icon`}
          expanded={stateSessionTab.expandDescription}
          handleClick={toggleExpand}
          classList={["sessionTab"]}
          ariaLabel={[
            "minimize sub-sessions cards",
            "expand sub-sessions cards",
          ]}
          ariaControls={`sub-session-cards-${data.sessionId}`}
          sessionId={data.sessionId}
        />
      )}
    </div>
  );
};

export default SessionTitle;

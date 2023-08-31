import IbmResponsivePlayer, {
  formatIbmVideoUrl,
} from "Components/VideoPlayers/IbmPlayer/IbmResponsivePlayer";

import React from "react";
import SessionExternalLink from "./SessionExternalLink";
import SessionSurveyLink from "./SessionSurveyLink";
import { SpeakerCard } from "Components/Speaker/SpeakerCard";
import VerticalSponsorBanner from "Components/Banners/VerticalSponsorBanner";
import VimeoWrapper from "Components/VimeoPlayer/VimeoWrapper";
import { pageBanners } from "hooks/useGetPageByPathname";
import singleSessionStyles from "./scss/single-session.module.scss";
// import ConfigService from "services/ConfigService";

// import { useSelector } from "react-redux";

/**
 * Sub session Content
 *
 * @param {object} props
 * @param {SubSession} props.data
 * @param {string} props.page
 *
 * @returns {JSX.Element}
 */
const SubSessionContent = ({ data, page }) => {
  /** @type {User} */
  //const user = useSelector((state) => state.global.user);
  if (data.iframeId === "IbmPlayer") {
    return (
      <IbmResponsivePlayer
        sessionData={data}
        iframeSrc={formatIbmVideoUrl(data.streamId)}
      />
    );
  }
  return (
    <div className={singleSessionStyles.subSessionVideoHolder}>
      <div className={singleSessionStyles.subSessionVideoContent}>
        {data.streamId && (
          <VimeoWrapper
            id={data.streamId}
            page={page}
            componentType="On-Demand"
            sessionData={data}
          />
        )}
        {data.subSurveyUrl && (
          <SessionSurveyLink
            link={data.subSurveyUrl}
            subSession={true}
            page={page}
            sessionData={data}
          />
        )}
        <div className={singleSessionStyles.subSessionContentWrapper}>
          <div className={singleSessionStyles.innerWrapper}>
            {data.description && (
              <div
                className={singleSessionStyles.description}
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            )}

            {data.subExternalUrl && (
              <SessionExternalLink
                page={page}
                sessionExternalLink={data.subExternalUrl}
              />
            )}

            {data.presenters?.length > 0 && (
              <div className={singleSessionStyles.speakerList}>
                {data.presenters.map((presenter) => (
                  <SpeakerCard
                    key={presenter.subSessionId}
                    speaker={presenter}
                    speakerOnly={true}
                    page={page}
                  />
                ))}
              </div>
            )}
          </div>

          <VerticalSponsorBanner pageName={pageBanners.singleSubSession} />
        </div>
      </div>

      {/* {ConfigService.runValues.enableOnDemandChat && (
        <div className={singleSessionStyles.liveStreamPluginContainer}>
          <LiveStreamChat
            user={user}
            sessionId={subSessionId}
            sessionName={`${subSessionName} - Sub LiveStream Chat`}
          />
        </div>
      )} */}
    </div>
  );
};

export default SubSessionContent;

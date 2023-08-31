import { MeetingLogo } from "Components/Meeting/MeetingLogo/MeetingLogo";
import { MeetingTimeZone } from "../MeetingTimeZone";
import React from "react";
import renderSpeakerName from "util/renderSpeakerName";
import { useExhibitors } from "hooks/useExhibitors";
import webinarStyles from "../VideoConferencing/scss/video-conferencing.module.scss";

export type MeetingDetailsProps = {
  hostProfile: any;

  meeting: any;
};

export const MeetingDetails: React.SFC<MeetingDetailsProps> = ({
  hostProfile,

  meeting,
}) => {
  const { exhibitor } = useExhibitors(meeting);
  const { logo, exhibitor_name }: any = exhibitor
    ? exhibitor
    : { logo: null, exhibitor_name: null };
  if (logo && exhibitor_name) {
    logo.alt = `${exhibitor_name} logo`;
  }

  return (
    <div className={webinarStyles.topSection}>
      <div className={webinarStyles.topSectionContentWrapper}>
        <div className={webinarStyles.topSectionColumn}>
          <div className={webinarStyles.companyImageWrapper}>
            <div className={webinarStyles.companyImageColumn}>
              {logo ? (
                <MeetingLogo
                  logo={logo}
                  className={webinarStyles.companyImage}
                />
              ) : (
                <h1>{meeting?.meetingTitle}</h1>
              )}
              <div className={webinarStyles.topSectionSpeakerName}>
                <strong className={`${webinarStyles.isFull}`}>
                  {renderSpeakerName({ ...hostProfile, suffix: "" })}
                </strong>{" "}
                {exhibitor && (
                  <span>
                    from <strong>{exhibitor.exhibitor_name}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
          <MeetingTimeZone meeting={meeting} />
        </div>
      </div>
    </div>
  );
};

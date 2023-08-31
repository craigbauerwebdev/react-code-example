import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs } from "Components/Breadcrumbs";
import ConfigService from "services/ConfigService";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import Meta from "../Meta";
import { PosterCard } from "Components/Poster/PosterCard";
import SessionTab from "../Session/SessionTab";
import SocialLinks from "Components/SocialLinks/SocialLinks";
import SvgTypes from "Components/SVG/SvgTypes";
import addPrefix from "util/addPrefix";
import capitalize from "lodash/capitalize";
import { dataTypes } from "store/utils/dataTypes";
import formatUrl from "util/formatter";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getPayload } from "store/actions";
import getSocialLinks from "./utils/getSocialLinks";
import renderSpeakerName from "util/renderSpeakerName";
import singleSpeakerStyles from "./scss/single-speaker.module.scss";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";

const SingleSpeaker = ({ match }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const posters = useSelector((state) => state.global.posters);
  const speakers = useSelector((state) => state.global.speakers);
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );

  const [selectedSessions, setSessions] = useState(null);
  const [selectedPosters, setPosters] = useState(null);
  const [speaker, setSpeaker] = useState(null);
  const { facebook, instagram, linkedIn, twitter } = getSocialLinks(speaker);
  const userName = match.params.id;
  const displaySpeakerPosters =
    ConfigService.runValues.showPostersOnSpeakerPage;

  const getSessions = useCallback(
    (speaker) => {
      if (sessions && sessions.length) {
        return sessions.filter((s) => speaker.sessions.includes(s.sessionId));
      }

      return null;
    },
    [sessions]
  );

  const getPosters = useCallback(
    (speaker) => {
      if (posters && posters.length) {
        return posters.filter((p) => p.usernames?.includes(speaker.username));
      }

      return null;
    },
    [posters]
  );

  const fetchSpeaker = useCallback(
    (speakersData) => {
      const id = userName.replace("~", "@");
      const data = speakersData.find((s) => s.eventUserId === id);

      setSpeaker(data);
      setSessions(getSessions(data));
    },
    [userName, getSessions]
  );

  const breadcrumbs = [
    {
      path: breadcrumbUrl || "/speakers",
      label:
        breadcrumbLabel ||
        capitalize(process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE),
    },
  ];

  const noHeadShotClassName = speaker?.headShotUrl
    ? ""
    : singleSpeakerStyles.noHeadShot;

  const addTitle = (org) => {
    if (speaker.title) {
      return `${speaker.title} | ${org}`;
    }

    return org;
  };

  const getSpeakerLocation = ({ city, state, country }) => {
    if (city && state && country) {
      return `${city}, ${state} ${country}`;
    } else if (city && state && !country) {
      return `${city}, ${state}`;
    }
    return ``;
  };

  // Get Sessions
  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    }
  }, [sessions, dispatch]);

  // Get Posters
  useEffect(() => {
    if (!posters && displaySpeakerPosters) {
      dispatch(getPayload(dataTypes.posters));
    }
  }, [posters, dispatch, displaySpeakerPosters]);

  // Get Speaker
  useEffect(() => {
    if (!speakers) {
      dispatch(getPayload(dataTypes.speakers));
    }
  }, [speakers, dispatch]);

  // Speakers and Sessions data is set.
  useEffect(() => {
    if (sessions && speakers) {
      fetchSpeaker(speakers);
    }
  }, [sessions, speakers, fetchSpeaker]);

  // Get posters for current speaker if there are posters.
  useEffect(() => {
    if (speaker && posters && displaySpeakerPosters) {
      setPosters(getPosters(speaker));
    }
  }, [posters, speaker, getPosters, displaySpeakerPosters]);

  if (!speaker) {
    return (
      <div className={singleSpeakerStyles.mainWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={singleSpeakerStyles.mainWrapper}>
      <Meta
        pageTitle={renderSpeakerName(speaker)}
        pageDescription={speaker.userBioText}
      />
      <Breadcrumbs
        crumbs={breadcrumbs}
        page={getAnalyticsPage(location.pathname)}
        componentType="Navigation Item"
      />
      <div className={singleSpeakerStyles.singleSpeakerContainer}>
        {speaker.headShotUrl && (
          <div
            className={singleSpeakerStyles.speakerImage}
            style={{ backgroundImage: `url("${speaker.headShotUrl}")` }}
          />
        )}
        <section
          className={`${singleSpeakerStyles.content} ${noHeadShotClassName}`}
        >
          <div className={singleSpeakerStyles.speakerName}>
            <h1>{addPrefix(speaker, renderSpeakerName(speaker))}</h1>
            <Favorites
              url={renderSpeakerName(speaker)}
              page={getAnalyticsPage(location.pathname)}
              type={favoriteTypes.speakers}
              id={speaker.username}
              data={speaker}
            />
          </div>
          {speaker.degree && (
            <h2 className={singleSpeakerStyles.degree}>{speaker.degree}</h2>
          )}
          {speaker.organization && <h2>{addTitle(speaker.organization)}</h2>}
          <h2 className={singleSpeakerStyles.location}>
            {getSpeakerLocation(speaker)}
          </h2>
          {speaker.userBioText && (
            <div
              className={singleSpeakerStyles.userBio}
              dangerouslySetInnerHTML={{ __html: speaker.userBioText }}
            />
          )}
          {speaker.userUrl && (
            <LinkWrapper
              to={formatUrl(speaker.userUrl)}
              external={true}
              className={`${singleSpeakerStyles.singleWebsite} gtm-speaker-website`}
              page={getAnalyticsPage(location.pathname)}
              componentType={`${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE} Website`}
              trackingUrl={speaker.userUrl}
              componentName={speaker.userUrl}
            >
              <span>
                <SvgTypes name="external" />{" "}
              </span>
              {speaker.userUrl}
            </LinkWrapper>
          )}
          <nav
            className={singleSpeakerStyles.socialHolder}
            aria-label={`${renderSpeakerName(speaker)} - Social Media`}
          >
            <SocialLinks
              twitter={twitter}
              linkedIn={linkedIn}
              faceBook={facebook}
              instagram={instagram}
              page={getAnalyticsPage(location.pathname)}
              type="primary"
            />
          </nav>
        </section>
      </div>
      <div className={singleSpeakerStyles.sessionContainer}>
        {selectedSessions &&
          selectedSessions.map((session) => (
            <SessionTab
              data={session}
              key={session.sessionId}
              page={getAnalyticsPage(location.pathname)}
            />
          ))}
      </div>
      {displaySpeakerPosters && selectedPosters && selectedPosters.length > 0 && (
        <div className={singleSpeakerStyles.posterContainer}>
          {selectedPosters.map((poster) => (
            <PosterCard
              data={poster}
              key={poster.subSessionId}
              page={getAnalyticsPage(location.pathname)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(SingleSpeaker);

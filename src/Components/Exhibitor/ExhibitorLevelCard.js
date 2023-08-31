import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import exhibitorLevelCardStyles from "./scss/exhibitor-level-card.module.scss";
import generatedName from "util/generatedName";
import { levelsIndex } from "./utils/getLevels";

const getCardSizeByLevel = (level) => {
  switch (level) {
    case levelsIndex.PLATINUM:
    case levelsIndex.TIER_1:
    case levelsIndex.UPGRADE_3:
      return exhibitorLevelCardStyles.largeCardLevel;
    case levelsIndex.GOLD:
    case levelsIndex.TIER_2:
    case levelsIndex.UPGRADE_2:
      return exhibitorLevelCardStyles.mediumCardLevel;
    case levelsIndex.SILVER:
    case levelsIndex.TIER_3:
    case levelsIndex.BRONZE:
    case levelsIndex.UPGRADE_1:
    case levelsIndex.TIER_4:
      return exhibitorLevelCardStyles.smallCardLevel;
    default:
      return exhibitorLevelCardStyles.extraSmallCardLevel;
  }
};

// Legend Images Overlay
const getLevelImageOverlay = (level) => {
  switch (level) {
    case levelsIndex.PLATINUM:
    case levelsIndex.TIER_1:
    case levelsIndex.UPGRADE_3:
      return {
        icon: true,
        label: "Platinum",
      };
    case levelsIndex.GOLD:
    case levelsIndex.TIER_2:
    case levelsIndex.UPGRADE_2:
      return {
        icon: true,
        label: "Gold",
      };
    case levelsIndex.SILVER:
    case levelsIndex.TIER_3:
    case levelsIndex.UPGRADE_1:
      return {
        icon: true,
        label: "Silver",
      };
    default:
      return null;
  }
};

/**
 * Exhibitor Card Level
 *
 * @param {object} props
 * @param {Exhibitor} props.data single Exhibitor
 *
 * @returns {JSX.Element} Exhibitor card
 */
export const ExhibitorLevelCard = ({ data }) => {
  const exhibitorLevel =
    data.custom_attributes?.custom_fields?.Exhibitor_type ||
    data.membership_level;
  const levelImageOverlay = getLevelImageOverlay(exhibitorLevel);

  return (
    <div className={exhibitorLevelCardStyles.mainHolder}>
      <div
        className={`${exhibitorLevelCardStyles.cardOuterShell} gtm-exhibitor-card-link`}
      >
        <div className={exhibitorLevelCardStyles.favoritesIcon}>
          <Favorites
            page="Exhibitors List"
            url={`${data.exhibitor_name}`}
            type={favoriteTypes.exhibitors}
            id={data.fuzion_exhibitor_id}
            exhibitorId={data.fuzion_exhibitor_id}
            data={data}
          />
        </div>
        <CardWrapper
          to={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${
            data.fuzion_exhibitor_id
          }/${generatedName(data.exhibitor_name)}`}
          className={`${
            exhibitorLevelCardStyles.baseCardLevel
          } ${getCardSizeByLevel(exhibitorLevel)}`}
          page="Exhibitors List"
          componentType="Card"
          componentName={data.exhibitor_name}
          trackingUrl={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${
            data.fuzion_exhibitor_id
          }/${generatedName(data.exhibitor_name)}`}
          exhibitorId={data.fuzion_exhibitor_id}
        >
          {exhibitorLevel && (
            <div
              className={`${exhibitorLevelCardStyles.cardImageContainer} ${
                levelImageOverlay && levelImageOverlay.image
                  ? exhibitorLevelCardStyles.withSponsorOverlay
                  : exhibitorLevelCardStyles.noSponsorOverlay
              }`}
            >
              {data.logo_image_path && (
                <img
                  className={exhibitorLevelCardStyles.exhibitorCompanyLogo}
                  src={data.logo_image_path}
                  alt=""
                  role="presentation"
                />
              )}

              {levelImageOverlay && levelImageOverlay.icon && (
                <div
                  className={`${exhibitorLevelCardStyles.sponsorLevelImage} ${
                    exhibitorLevelCardStyles[
                      levelImageOverlay.label?.toLocaleLowerCase()
                    ]
                  }`}
                  title={`${levelImageOverlay.label} level exhibitor`}
                  aria-label={`${levelImageOverlay.label} level exhibitor`}
                >
                  <span className={exhibitorLevelCardStyles.corner}>
                    <SvgTypes name="corner-triangle" />
                  </span>
                  <span className={exhibitorLevelCardStyles.cornerIcon}>
                    <SvgTypes
                      name={levelImageOverlay.label?.toLocaleLowerCase()}
                    />
                  </span>
                </div>
              )}
            </div>
          )}
          <h1>{data.exhibitor_name}</h1>
        </CardWrapper>
      </div>
    </div>
  );
};

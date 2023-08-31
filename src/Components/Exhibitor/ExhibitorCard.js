import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import exhibitorCardStyles from "./scss/exhibitor-card.module.scss";
import generatedName from "util/generatedName";

export const ExhibitorCard = ({ data, page }) => {
  return (
    <div className={exhibitorCardStyles.holder}>
      <div className={exhibitorCardStyles.favoritesExhibitor}>
        <Favorites
          url={data.exhibitor_name}
          page={page}
          type={favoriteTypes.exhibitors}
          id={data.fuzion_exhibitor_id}
          exhibitorId={data.fuzion_exhibitor_id}
          data={data}
        />
      </div>
      <LinkWrapper
        className="gtm-exhibitor-card-link"
        to={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${
          data.exhibitor_id || data.fuzion_exhibitor_id
        }/${generatedName(data.exhibitor_name)}`}
        page={page}
        componentType="Card"
        trackingUrl={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${
          data.exhibitor_id || data.fuzion_exhibitor_id
        }/${generatedName(data.exhibitor_name)}`}
        componentName={data.exhibitor_name}
        exhibitorId={data.fuzion_exhibitor_id}
      >
        <div className={exhibitorCardStyles.smallCard}>
          {data?.logo_image_path ? (
            <div className={exhibitorCardStyles.logo}>
              <img
                src={`${data.logo_image_path}`}
                alt={`${data.exhibitor_name}`}
              />
            </div>
          ) : (
            <div className={exhibitorCardStyles.logo}>
              <h1 className={exhibitorCardStyles.cardText}>
                {data.exhibitor_name}
              </h1>
            </div>
          )}
        </div>
      </LinkWrapper>
    </div>
  );
};

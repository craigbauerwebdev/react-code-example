import DefaultCardContent from "./DefaultCardContent";
import FavoritesCard from "./FavoritesCard";
import React from "react";
import { favoriteTypes } from "./Favorites";
import generatedName from "util/generatedName";

/**
 * Favorite Exhibitor Card
 *
 * @param {object} props
 * @param {Exhibitor} props.data
 *
 * @returns {JSX.Element}
 */
const FavoriteExhibitorCard = ({ data }) => {
  return (
    <FavoritesCard
      linkTo={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${
        data.fuzion_exhibitor_id
      }/${generatedName(data.exhibitor_name)}`}
      linkTrackingUrl={data.exhibitor_name}
      favoriteId={data.fuzion_exhibitor_id}
      type={favoriteTypes.exhibitors}
      name={data.exhibitor_name}
      data={data}
    >
      <DefaultCardContent title={data.exhibitor_name} />
    </FavoritesCard>
  );
};

export default FavoriteExhibitorCard;

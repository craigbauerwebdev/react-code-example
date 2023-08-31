import React, { useEffect, useState } from "react";
import {
  deleteProfileData,
  getProfileData,
  patchProfileData,
} from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import SvgTypes from "Components/SVG/SvgTypes";
import { dataTypes } from "store/utils/dataTypes";
import favoritesStyles from "./scss/favorites.module.scss";
import { profileLookupKey } from "../Profile/store/utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import { saveAnalytic } from "Components/OEPAnalytics";

export const favoriteTypes = {
  sessions: "sessions",
  subsessions: "subsessions",
  exhibitors: "exhibitors",
  posters: "posters",
  speakers: "speakers",
};

/**
 * Favorites Component
 * Favorites doc https://github.com/Klowd/onlineeventpro-product-ui/wiki/Profile-Favorites
 *
 * @param {object} props
 * @param {string} props.type
 * @param {string|number} props.id
 * @param {string} props.page
 * @param {string} props.url
 * @param {string} props.exhibitorId
 * @param {string} props.posterId
 *
 * @returns {JSX.Element} favorites component
 */
const Favorites = ({
  type,
  id,
  page,
  url,
  sessionId,
  exhibitorId,
  posterId,
  subSessionId,
  data = {},
}) => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const favorites = useSelector((state) => state.profile.favorites);
  const [isActive, setIsActive] = useState(null);
  const params = { [type]: [`${id}`] };
  const subSessionIds = data.subSessions?.map((subSession) =>
    String(subSession.subSessionId)
  );

  /**
   * @description Creates the payload that represents the data to delete.
   * Includes the parent session (params), and another array of it's subSessions (ids).
   */
  const unFavoriteSessionAndSubSessions = () => {
    const deleteFavoritePayload = {
      ...params,
      [favoriteTypes.subsessions]: subSessionIds,
    };
    dispatch(deleteProfileData(dataTypes.favorites, deleteFavoritePayload));
  };

  /**
   * @description If not active, and if the type of session to add is a subsession,
   * then favorite itself, and its parent session to users favorites
   */
  const favoriteSubSessionAndParent = () => {
    const addFavoritePayload = {
      ...params,
      [favoriteTypes.sessions]: [`${data.sessionId}`],
    };
    dispatch(patchProfileData(dataTypes.favorites, addFavoritePayload));
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    saveAnalytic({
      page,
      url: `${isActive ? `un-favorited` : `favorited`}`,
      componentType: "favorites",
      componentName: url,
      sessionId: sessionId,
      exhibitorId: exhibitorId,
      posterId: posterId,
      subSessionId: subSessionId,
    });

    if (isActive) {
      if (type === favoriteTypes.sessions && data.subSessions) {
        unFavoriteSessionAndSubSessions();
      } else {
        // Remove item from users favorites
        dispatch(deleteProfileData(dataTypes.favorites, params));
      }
    } else {
      if (type === favoriteTypes.subsessions) {
        favoriteSubSessionAndParent();
        return;
      }

      // Add item to users favorites
      dispatch(patchProfileData(dataTypes.favorites, params));
    }
  };

  // Get all favorites on component first load
  useEffect(() => {
    if (user && !retrievedPayloads.has(profileLookupKey.favorites)) {
      dispatch(getProfileData(dataTypes.favorites, profileLookupKey.favorites));
    }
  }, [dispatch, user]);

  // Every time the store updates this will run.
  useEffect(() => {
    // Check to see if this item has been saved as a favorite
    if (favorites[type]) {
      setIsActive(favorites[type].includes(`${id}`));
    }
  }, [id, type, favorites]);

  if (!user) return null;

  const itemName = data.sessionName || data.exhibitor_name || data.fullName;

  return (
    <>
      <button
        data-tip={`${isActive ? "un-favorite" : "favorite"} ${
          itemName ? itemName : `this ${type} item`
        }`}
        className={favoritesStyles.heartButton}
        onClick={toggleFavorite}
        aria-label={`${
          isActive
            ? `un-favorite this ${type} item`
            : `favorite this ${type} item`
        }`}
      >
        <SvgTypes name={`${isActive ? "heart-filled" : "heart"}`} />
      </button>
      <ReactTooltip />
    </>
  );
};

export default Favorites;

Favorites.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.string.isRequired,
  url: PropTypes.string,
  sessionId: PropTypes.string,
  exhibitorId: PropTypes.string,
  posterId: PropTypes.string,
  data: PropTypes.shape({
    sessionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subSessionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinkPageCards from "./LinkPageCards";
import Loader from "Components/Loader";
import { dataTypes } from "store/utils/dataTypes";
import formatTitles from "util/formatTitles";
import { getPayload } from "store/actions";

// import staticData from "util/staticData/Components/Home/Main";

/**
 * This component is pulling data from Liferay by default.
 * If this is not the desired outcome you can replace it with static data.
 */
const LinkPageWrapper = () => {
  const dispatch = useDispatch();
  const homeTiles = useSelector((state) => state.global.homeTiles);
  /** @type {[LinkCard[], Function]} */
  const [cards, setCards] = useState(null);

  /**
   * This is getting liferay data.
   * To use statice data replace what is inside this useEffect with this.
   * setCards(formatTitles(staticData.cards));
   */
  useEffect(() => {
    if (!homeTiles) {
      dispatch(getPayload(dataTypes.homepageTiles));
    } else {
      setCards(formatTitles(homeTiles));
    }
  }, [dispatch, homeTiles]);

  if (!homeTiles) {
    return <Loader />;
  }

  if (!cards) {
    return null;
  }

  return <LinkPageCards cards={cards} />;
};

export default LinkPageWrapper;

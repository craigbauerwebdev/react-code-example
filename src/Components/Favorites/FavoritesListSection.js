import React, { useState } from "react";

import OEPAnalytics from "../OEPAnalytics";
import favoritesSectionStyles from "./scss/favorites-list-section.module.scss";

const DEFAULT_SHOW_COUNT = 5;

const FavoritesListSection = ({ title, data, Card, id }) => {
  const [showCount, setShowCount] = useState(DEFAULT_SHOW_COUNT);
  const dataItems = data.slice(0, Math.min(showCount, data.length));

  const handleShowMore = () => {
    if (showCount !== data.length) {
      setShowCount(data.length);
    } else {
      setShowCount(DEFAULT_SHOW_COUNT);
    }
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className={favoritesSectionStyles.section}>
      <h3 className={favoritesSectionStyles.innerSubHeader}>{title}</h3>
      <ul className={favoritesSectionStyles.favoriteSectionList}>
        {dataItems.map((e) => (
          <li key={e[id]}>
            <Card data={e} />
          </li>
        ))}
      </ul>
      {data.length > DEFAULT_SHOW_COUNT && (
        <OEPAnalytics
          page={"favorites"}
          componentType="Button"
          url={
            showCount < data.length
              ? `Show More ${title}`
              : `Show Less ${title}`
          }
        >
          <button
            className={favoritesSectionStyles.showMore}
            onClick={handleShowMore}
          >
            {showCount < data.length ? "Show More" : "Show Less"}
          </button>
        </OEPAnalytics>
      )}
    </section>
  );
};

export default FavoritesListSection;

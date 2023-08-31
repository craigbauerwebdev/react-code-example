import React, { Fragment } from "react";

import LinkImg from "./LinkImg";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import checkForSafariMac from "util/checkForSafariMac";
import linkCardsStyles from "./scss/link-page-cards.module.scss";
import useNavGuarding from "hooks/useNavGuarding";
import { useSelector } from "react-redux";

// import staticData from "util/staticData/Components/Home/Main";

/**
 * This component is pulling data from Liferay by default.
 * If this is not the desired outcome you can replace it with static data.
 */
const LinkPageCards = ({ cards }) => {
  const blockedNetworkRoutes = useSelector(
    (state) => state.global.permissions.blockedNetworkRoutes
  );
  /** @type {LinkCard[]} */
  const cardsGuarded = useNavGuarding(cards, blockedNetworkRoutes);

  const renderCardInfo = (card) => {
    return (
      <Fragment>
        {card.label && (
          <div className={linkCardsStyles.tileTitle}>{card.label}</div>
        )}
        {card.subLabel && (
          <div className={linkCardsStyles.tileSubtitle}>
            {card.subLabel} {card.activeIcon && <LinkImg src={card.icon} />}
          </div>
        )}
      </Fragment>
    );
  };

  return (
    // For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
    <section className={linkCardsStyles.pageCards}>
      {cardsGuarded.map((card) => (
        <LinkWrapper
          className={linkCardsStyles.smallCardRectangle}
          to={card.linkURL}
          external={card.type === "_blank"}
          grip={card.type === "grip"}
          style={{
            backgroundImage: checkForSafariMac()
              ? `url('${card.backgroundImage.replace("fl_lossy,f_auto/", "")}')`
              : `url('${card.backgroundImage}')`,
            backgroundColor: card.backgroundColor,
          }}
          key={card.label}
          page="homepage"
          componentType="Nav Tile"
          trackingUrl={card.linkURL}
          componentName={card.label || card.linkURL}
        >
          <span className="sr-only">{card.altText}</span>
          {renderCardInfo(card)}
        </LinkWrapper>
      ))}
    </section>
  );
};

export default LinkPageCards;

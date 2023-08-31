import lodash from "lodash";

/**
 * @typedef {Object} FooterData
 * @property {Object} nav - main footer navigation
 */

/**
 * Format data form liferay before saving in store.
 * Brake up footer into sections.
 * @param {object} state current store
 * @param {object} data Liferay data
 * @returns {FooterData}
 */
export default function formatFooter(state, data) {
  if (lodash.isEmpty(data)) {
    return {
      ...state,
      footer: {},
    };
  }

  const footerData = { ...data };

  if (data.mirrorTopNavigationMenu) {
    footerData.mainNav = state.topNav.mainNav;
    footerData.preEvent = state.topNav.preEvent;
  }

  if (footerData?.legalFooter?.legalLeft) {
    footerData.legalFooter.legalLeft = footerData.legalFooter.legalLeft.map(
      (item) => {
        if (!Object.prototype.hasOwnProperty.call(item, "external")) {
          return {
            ...item,
            external: item.link ? true : false,
          };
        }
        return item;
      }
    );
  }

  if (footerData?.legalFooter?.legalRight) {
    footerData.legalFooter.legalRight = footerData.legalFooter.legalRight.map(
      (item) => {
        if (!Object.prototype.hasOwnProperty.call(item, "external")) {
          return {
            ...item,
            external: item.link ? true : false,
          };
        }
        return item;
      }
    );
  }

  return {
    ...state,
    footer: footerData,
  };
}

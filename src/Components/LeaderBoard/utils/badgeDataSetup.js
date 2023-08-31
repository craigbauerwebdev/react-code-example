/**
 * Remove badge if user points don't meet required value
 * @param {array} badgeData
 */
export const filterBadgeScore = (badgeData) => {
  return function (badge) {
    if (badgeData) {
      const [currentBadge] = badgeData.filter(
        (badgeItem) => badgeItem.id === badge.leaderboardId
      );

      if (currentBadge && currentBadge.points) {
        return badge.score >= currentBadge.points; // Do user have enough points to display badge
      }
    }

    return false;
  };
};

/**
 * Get badge data
 * @param {array} badgeData
 */
export const mapBadges = (badgeData) => {
  return (badge) => badgeData.find((item) => item.id === badge.leaderboardId); // Get the badge data to display image in leader board table.
};

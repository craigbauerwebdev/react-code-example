/**
 * @returns {object} of exhibitors ids
 */
export default function getBusinessCards() {
  return JSON.parse(localStorage.getItem("business_card"));
}

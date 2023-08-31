import getBusinessCards from "util/getBusinessCards";

export default function getBusinessId() {
  const cards = getBusinessCards();

  if (cards) {
    return Object.keys(cards).filter((id) => cards[id] === true);
  }

  return [];
}

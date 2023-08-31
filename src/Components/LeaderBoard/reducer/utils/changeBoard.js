import updateActiveBoard from "./updateActiveBoard";

export default function changeBoard(badgeOption, payload) {
  const [name, id] = payload.split("_");

  return {
    activeBoard: id,
    badgeOptions: updateActiveBoard(badgeOption, id),
    boardName: name,
  };
}

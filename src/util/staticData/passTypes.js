// Gating documents
// https://freemandigital.atlassian.net/browse/OE-27770

export const ACCESS = {
  GOLD: "GOLD",
  BRONZE: "BRONZE",
};

// add additional pass types when they are created
// https://docs.google.com/spreadsheets/d/1Eil9DPoZQFMOpgR5kKzXyN2tjJaNl0qS/edit#gid=1070569588
export const passTypes = {
  AttendeeMVP: ACCESS.GOLD, // includes networking
  Attendee: ACCESS.BRONZE, // restricted from networking
  ExhibitorMVP: ACCESS.GOLD, // exhibitor admin or exhibitor representative
  Exhibitor: ACCESS.BRONZE, // regular exhibitor
};

// Should these list come from Liferay?
const restrictedForGold = {};
const restrictedForBronze = {
  "/directchat": true,
  "/networking/attendees": true,
  "https://www.grip.com": true,
  "https://matchmaking.grip.events/youreventlive/event-login": true,
  "/leaderboard": true,
  "Manage My": true,
  "Direct Chat": true,
  "/account/schedule": true,
  "Chat Pop Up": true,
};

export const restrictedElementsPerAccessLevel = {
  [ACCESS.GOLD]: restrictedForGold,
  [ACCESS.BRONZE]: restrictedForBronze,
};

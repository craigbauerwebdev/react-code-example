export const filterDuplicateGuestProfiles = (
  guestProfiles,
  newGuestProfiles
) => {
  const filteredProfiles = guestProfiles.slice();

  if (guestProfiles.length > 0) {
    //loop through the original list backwards, otherwise for every item you remove, the next index will be off by +1
    for (let i = guestProfiles.length - 1; i >= 0; i--) {
      for (let j = 0; j < newGuestProfiles.length; j++) {
        if (newGuestProfiles[j].attendeeId === guestProfiles[i].attendeeId) {
          filteredProfiles.splice(i, 1);
        }
      }
    }
  }

  return [...filteredProfiles, ...newGuestProfiles];
};

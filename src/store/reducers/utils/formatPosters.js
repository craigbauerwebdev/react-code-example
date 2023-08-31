const mediaExt = ["wav", "mp3", "mp4", "ogg", "webm", "mp5", "acc"];
/**
 * Format poster data so audio files gets its own array
 * @param {Object} state
 * @param {Object} posters
 */
export default function formatPosters(state, posters) {
  const formatPosters = posters.map((poster) => {
    if (poster) {
      if (poster.presentationFiles) {
        // Clean poster data so media files has its own key
        const cleanFiles = poster.presentationFiles.filter(
          (p) => !mediaExt.includes(p.fileName.split(".").pop())
        );
        const mediaFiles = poster.presentationFiles.filter((p) =>
          mediaExt.includes(p.fileName.split(".").pop())
        );
        poster.presentationFiles = cleanFiles;
        poster.mediaFiles = mediaFiles;
      }

      if (poster.presenters) {
        const usernames = [];

        poster.presenters = poster.presenters.map((presenter) => {
          presenter.fullName = `${presenter.firstName} ${presenter.lastName}`;
          usernames.push(presenter.username);

          return presenter;
        });
        poster.usernames = usernames.length ? usernames : null;
      }
    }

    return poster;
  });

  return {
    ...state,
    posters: formatPosters,
  };
}

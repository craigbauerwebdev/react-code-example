import "../../Sidebar/TypeDef/typedef";

import { disclosures, sidebarDisplay } from "Components/Sidebar/utils";

import renderSpeakerName from "util/renderSpeakerName";

/**
 * Sidebar date for Sidebar Author Sections
 * @param {Object} posterData
 * @param {Array} posterData.Presenters
 * @returns {SideBarContent} Poster sidebar data
 */
function presenters({ presenters }) {
  const posterData = presenters.map((presenter) => {
    return {
      img: presenter.headShotUrl,
      name: renderSpeakerName(presenter),
      organization: presenter.organization,
    };
  });

  return {
    title: "Author",
    data: posterData,
  };
}

/**
 * Sidebar audio display
 * @param {Array} media
 * @returns {SideBarContent} Data for audio player
 */
function mediaData(media) {
  return {
    title: "Supplemental Audio",
    data: media,
  };
}

/**
 * Supplemental Files Data for posters
 * @param {Arry} posterSupplemental
 * @param {Object} posterData
 * @param {string} posterData.subSessionName
 * @returns {SideBarContent}
 */
function supplemental(posterSupplemental, { subSessionName }) {
  const supplementalData = posterSupplemental.map((file) => {
    return {
      filePath: file.filePath,
      fileName: file.fileName,
      subName: subSessionName,
    };
  });

  return {
    title: "Supplemental Files",
    data: supplementalData,
  };
}

// Sidebar Author Data
export function getPresenters(poster) {
  if (poster.presenters) {
    return presenters(poster);
  }

  return null;
}

// Sidebar Poster Topic
export function getPosterTopic(poster) {
  if (poster.subSessionType) {
    return sidebarDisplay("Topic", poster.subSessionType);
  }

  return null;
}

// Sidebar Audio Player
export function getAudioPlayer(media) {
  if (media) {
    return mediaData(media);
  }

  return null;
}

// Sidebar Poster Supplemental Files
export function getPosterSupplementalFiles(posterSupplemental, poster) {
  if (posterSupplemental.length) {
    return supplemental(posterSupplemental, poster);
  }

  return null;
}

// Sidebar Poster Disclosures
export function getPosterDisclosures(poster) {
  if (poster.presenters) {
    return disclosures("Poster");
  }

  return null;
}

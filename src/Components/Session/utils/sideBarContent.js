import "../../Sidebar/TypeDef/typedef";

import { disclosures, sidebarDisplay } from "Components/Sidebar/utils";

import { excludeSupplementalExt } from "./excludeSupplementalExt.js";
import listModerators from "util/listModerators";

/**
 * Sidebar display or moderators information
 * @param {Array} moderators
 * @returns {SideBarContent} Moderators Data
 */
function moderators(moderators) {
  return {
    title: "Moderators",
    content: moderators
      .map((m) => {
        return listModerators(m);
      })
      .filter(Boolean)
      .join(", "),
  };
}

/**
 *
 * @param {Session} props
 * @param {array} props.presentationFiles
 * @param {SubSession}
 *
 * @returns {SideBarContent} Sidebar Type display
 */
function supplemental({ presentationFiles, subSessionName }) {
  const filteredSupplementalData = presentationFiles.filter(
    (file) =>
      !excludeSupplementalExt.some((excludedExtention) =>
        file.fileName.includes(excludedExtention)
      )
  );
  const supplementalData = filteredSupplementalData.map((file) => {
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

/**
 * Get a list of moderator if there are moderators
 * @param {Session} session
 * @returns {[SideBarContent] | null} Array of data for the sidebar
 */
export function getModerators(session) {
  if (session.moderators && session.moderators.length) {
    return moderators(session.moderators);
  }

  return null;
}

/**
 * Get Session Type Name
 * @param {Session} session
 * @returns {SideBarContent | null} Array of data for the sidebar
 */
export function getSessionTypeName(session) {
  if (session.sessionType) {
    return sidebarDisplay("Type", session.sessionType.sessionTypeName);
  }

  return null;
}

/**
 * Get Session Topic Name
 * @param {Session} session
 * @returns {SideBarContent | null} Array of data for the sidebar
 */
export function getSessionTopic(session) {
  if (session.sessionTrack) {
    return sidebarDisplay("Topic", session.sessionTrack);
  }

  return null;
}

/**
 * Get Session Supplemental Files
 * @param {SubSession} session
 * @returns {SideBarContent | null} Array of data for the sidebar
 */
export function getSessionSupplementalFiles(session) {
  if (session.presentationFiles && session.presentationFiles.length > 0) {
    return supplemental(session);
  }

  return null;
}

/**
 * Get Session Disclosure
 * @param {Array} session
 * @returns {SideBarContent | null} Array of data for the sidebar
 */
export function getSessionDisclosure() {
  return disclosures("Single Session");
}

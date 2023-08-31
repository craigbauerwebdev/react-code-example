/**
 * @typedef MediaFiles
 * @property {number} presentationFileId
 * @property {string} fileName
 * @property {string} filePath
 * @property {boolean} isHandOutFile
 * @property {boolean} isDeleted
 * @property {string} dateCreated
 * @property {boolean} isStartupFile
 * @property {string} status
 **/

/**
 * @typedef {object} PosterData
 *
 * @property {string[]} usernames
 * @property {MediaFiles[]} mediaFiles
 *
 * @typedef {SubSession & PosterData} Poster
 */

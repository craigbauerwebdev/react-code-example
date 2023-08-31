/**
 * @typedef ResultsInfo
 * @property {boolean} exhaustiveNbHits
 * @property {number} hitsPerPage
 * @property {number} nbHits
 * @property {number} nbPages
 * @property {number} page
 * @property {string} params
 * @property {number} processingTimeMS
 * @property {string} query
 **/

/**
 * @typedef NetworkingOptions
 * @property {boolean} BOOL
 **/

/**
 * @typedef Networking
 * @property {NetworkingOptions} allowChat
 * @property {NetworkingOptions} allowNetworking
 * @property {NetworkingOptions} boothStaff
 * @property {NetworkingOptions} exhibitorAdmin
 * @property {NetworkingOptions} isVIP
 * @property {NetworkingOptions} networkingAdmin
 **/

/**
 * @typedef Hits
 * @property {string} avatar
 * @property {string} company
 * @property {string} companyId
 * @property {string} firstName
 * @property {string} fuzionAttendeeId
 * @property {string} fuzionEventId
 * @property {string} lastName
 * @property {string} name
 * @property {Networking} networking
 * @property {string} objectID
 * @property {string} preferredName
 * @property {string} title
 * @property {boolean} viewInNetworking
 **/

/**
 * @typedef AttendeeSearchState
 * @property {string} query
 * @property {number} page
 * @property {string|null} filter
 * @property {import("algoliasearch").SearchIndex} index
 * @property {ResultsInfo} resultsInfo
 * @property {Hits[]} hits
 * @property {string} searchQuery
 * @property {Hits[]} resultsOverrides
 **/

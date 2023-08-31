/**
 * @typedef EventRoom
 * @property {number} roomId
 * @property {string} roomName
 * @property {string} displayName
 **/

/**
 * @typedef SessionType
 * @property {number} sessionTypeId
 * @property {string} sessionTypeName
 **/

/**
 * @typedef SocialMediaTypes
 * @property {number} socialMediaTypeId
 * @property {string} url
 **/

/**
 * @typedef Presenters
 * @property {string} username
 * @property {string} email
 * @property {string} firstName
 * @property {string} middleName
 * @property {string} lastName
 * @property {string} suffix
 * @property {string} degree
 * @property {string} organization
 * @property {boolean} isVip
 * @property {string} userBioText
 * @property {string} headShotUrl
 * @property {string} disclosureText
 * @property {string} eventUserCustom1
 * @property {string} eventUserCustom2
 * @property {string} eventUserCustom3
 * @property {string} eventUserCustom4
 * @property {string} eventUserCustom5
 * @property {string} preferredName
 * @property {string} title
 * @property {string} city
 * @property {string} state
 * @property {string} country
 * @property {string} userUrl
 * @property {string} prefix
 * @property {SocialMediaTypes[]} socialMediaTypes
 * @property {string} fullName
 * @property {number} subSessionId
 * @property {string} description
 * @property {string} subSessionName
 * @property {string} subSessionType
 * @property {number} sessionId
 * @property {PresentationFiles[]} presentationFiles
 **/

/**
 * @typedef PresentationFiles
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
 * @typedef SubSession
 * @property {string} clientSubSessionId
 * @property {number} subSessionId
 * @property {number} eventId
 * @property {string} subSessionName
 * @property {string} description
 * @property {string} startTime 2020-05-03T16:10:00
 * @property {string} endTime 2020-05-03T16:10:00
 * @property {boolean} isDeleted
 * @property {string} subSessionCustom1
 * @property {string} subSessionCustom2
 * @property {string} subSessionCustom3
 * @property {string} subSessionCustom4
 * @property {string} subSessionCustom5
 * @property {string} subSessionCustom6
 * @property {string} subSessionType
 * @property {number} subSessionOrder
 * @property {string} subSessionVideoSource
 * @property {string} subSurveyUrl
 * @property {string} subExternalUrl
 * @property {string} subInteractionKey
 * @property {PresentationFiles[]} presentationFiles
 * @property {Presenters[]} presenters
 **/

/**
 * @typedef Session
 * @property {number} sessionId
 * @property {number} eventId
 * @property {string} clientSessionId
 * @property {string} sessionName
 * @property {string} description
 * @property {string} sessionTrack
 * @property {string} sessionStart 2020-05-03T16:10:00
 * @property {string} sessionEnd 2020-05-03T16:10:00
 * @property {string} sessionCustom1
 * @property {string} sessionCustom2
 * @property {string} sessionCustom3
 * @property {string} sessionCustom4
 * @property {string} sessionCustom5
 * @property {string} sessionCustom6
 * @property {string} interactionKey
 * @property {string} sessionVideoSource ls_embed_1610725000,9487690
 * @property {string} sessionSurveyLink
 * @property {string} sessionExternalLink
 * @property {*} sessionCmelink
 * @property {*} secondaryTrack
 * @property {string} keywords
 * @property {string} groupMeetingLink
 * @property {boolean} featuredSession
 * @property {EventRoom} eventRoom
 * @property {[]} moderators
 * @property {*} moderatorFiles
 * @property {SubSession[]} subSessions
 * @property {number} sessionId
 * @property {string} sessionName
 * @property {SessionType} sessionType
 * @property {string} sessionTrack
 * @property {string} sessionStart 2020-05-03T16:10:00
 * @property {string} sessionEnd  2020-05-03T16:10:00
 **/

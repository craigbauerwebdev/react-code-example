/**
 * @typedef {Object} UserAddress
 * @property {string} address_type
 * @property {string} address_line_one
 * @property {string} address_line_two
 * @property {string} address_line_three
 * @property {string} city
 * @property {string} state_province
 * @property {string|number} postal_code
 * @property {string|number} postal_code_plus_four
 * @property {string} country
 * @property {string} primary_address_flag
 */

/**
 * @typedef {Object} UserContact
 * @property {string} contact_type
 * @property {string} name_prefix
 * @property {string} first_name
 * @property {string} middle_name
 * @property {string} last_name
 * @property {string} name_suffix
 * @property {string} title
 * @property {string} email
 * @property {string} email_two
 * @property {string} website_url
 * @property {string} facebook_account
 * @property {string} linkedin_account
 * @property {string} twitter_account
 * @property {string} instagram_account
 * @property {string} snapchat_account
 * @property {string} phone_number
 * @property {string} fax_number
 * @property {string} mobile_number
 * @property {string} other_phone_number
 * @property {string} primary_contact_flag
 * @property {string} preferred_name
 * @property {string} company
 */

/**
 * @typedef {Object} User
 * @property {string} fuzion_attendee_id - id
 * @property {string} registration_number
 * @property {string} badge_number
 * @property {object} custom_attributes
 * @property {string} fuzion_exhibitor_id
 * @property {string} attendee_type_flag
 * @property {object|null} occupation_type
 * @property {object|null} registration_method_flag
 * @property {number} attendance_verification_flag
 * @property {UserContact} contact
 * @property {UserAddress} address
 * @property {boolean|null} analytics_opt_in_flag
 * @property {string} attended_last_event_flag
 * @property {string|null} attendee_arrival_timestamp
 * @property {boolean|null} booth_staff_flag
 * @property {string} create_timestamp
 * @property {string} exhibitor_company_id
 * @property {string} first_time_flag
 * @property {string} fuzion_parent_attendee_id
 * @property {string} last_mod_timestamp
 * @property {boolean} membership_flag
 * @property {string} membership_type
 * @property {boolean} networking_opt_in_flag
 * @property {boolean} registration_complete_flag
 * @property {boolean} registration_status_flag
 * @property {string} registration_timestamp
 * @property {string} website_url
 * @property {string} token
 */

/**
 * @typedef {Object} State
 * @property {User} user - user data
 * @property {Session[]} sessions
 * @property {Speaker[]} speakers
 * @property {Poster[]} posters
 * @property {Exhibitor[]} exhibitors
 * @property {boolean} feedLoaded
 * @property {boolean} hideLiveStreamAlertMessages
 * @property {string} timezone
 * @property {boolean} modalActive
 * @property {boolean} sessionSpeakerMerged
 * @property {boolean} isPreventOn
 */

/**
 * @typedef {Object} Action
 * @property {string} type - user data
 * @property {*} payload
 */

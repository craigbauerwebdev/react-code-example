/**
 * @typedef ExhibitorAddress
 * @property {string} address_type
 * @property {string} address_line_one
 * @property {string} address_line_two
 * @property {string} address_line_three
 * @property {string} city
 * @property {string} state_province
 * @property {string} postal_code
 * @property {string} postal_code_plus_four
 * @property {string} country
 * @property {string} primary_address_flag
 * @property {string} custom_attributes
 **/

/**
 * @typedef ExhibitorCompany
 * @property {string} email
 * @property {string} website_url
 * @property {string} facebook_account
 * @property {string} linkedin_account
 * @property {string} twitter_account
 * @property {string} instagram_account
 * @property {string} snapchat_account
 * @property {string} phone_number
 * @property {string} fax_number
 * @property {ExhibitorAddress} address
 **/

/**
 * @typedef ExhibitorVideo
 * @property {string} type
 * @property {string} url
 **/

/**
 * @typedef ExhibitorDocuments
 * @property {string} name
 * @property {string} url
 **/

/**
 * @typedef ExhibitorCustomFields
 * @property {string} Banner_Images
 * @property {string} Country
 * @property {string} Sponsor_Level
 * @property {ExhibitorVideo[]} Video
 * @property {ExhibitorDocuments[]} Documents
 **/

/**
 * @typedef ExhibitorCustomAttributes
 * @property {string} Video1
 * @property {string} Video2
 * @property {string} DocuTitle1
 * @property {string} DocuURL1
 * @property {string} DocuTitle2
 * @property {string} DocuURL2
 * @property {string} Banner_Images
 * @property {string} BackgroundImage
 * @property {string} Grip_URL
 * @property {string} Field1
 * @property {string} phone
 * @property {string} address1
 * @property {ExhibitorCustomFields} custom_fields
 **/

/**
 * @typedef Exhibitor
 * @property {string} fuzion_exhibitor_id
 * @property {*} booths
 * @property {ExhibitorCompany} company_info
 * @property {*} contacts
 * @property {ExhibitorCustomAttributes} custom_attributes
 * @property {string} exhibitor_company_id
 * @property {string} exhibitor_description
 * @property {string} exhibitor_name
 * @property {string[]} industry_category
 * @property {string} logo_image_path
 * @property {*} membership_flag
 * @property {string} membership_level
 * @property {*} networking_opt_in_flag
 **/

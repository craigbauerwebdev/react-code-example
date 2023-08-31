/**
 * @typedef SocialMediaLinks
 * @property {string|null} facebook link to facebook page
 * @property {string|null} instagram link to instagram page
 * @property {string|null} linkedIn link to linkedIn page
 * @property {string|null} twitter link to twitter page
 */

/**
 * Get social media links
 * @param {Presenters} socialData
 * @returns {SocialMediaLinks} object of social media links
 */
export default function getSocialLinks(socialData) {
  const socialLinks = {
    facebook: null,
    instagram: null,
    linkedIn: null,
    twitter: null,
  };

  if (socialData?.socialMediaTypes) {
    socialData.socialMediaTypes.forEach((type) => {
      switch (type.socialMediaTypeId) {
        case 1:
          socialLinks.facebook = type.url;
          break;
        case 2:
          socialLinks.instagram = type.url;
          break;
        case 3:
          socialLinks.linkedIn = type.url;
          break;
        case 4:
          socialLinks.twitter = type.url;
          break;
        default:
          break;
      }
    });
  }

  return socialLinks;
}

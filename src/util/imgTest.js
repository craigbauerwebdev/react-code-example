/**
 * A test to see if string is an image
 *
 * @param {string} item
 *
 * @returns {boolean}
 */
export default function imgTest(item) {
  return item?.match(/\.(jpeg|jpg|gif|png|JPG|JPEG|GIF|PNG)$/) != null;
}

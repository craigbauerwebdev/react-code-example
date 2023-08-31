// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export default function isValidUrl(string) {
  // const pattern = new RegExp(
  //   "(https?:\\/\\/)?" + // protocol
  //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
  //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  //     "(\\#[-a-z\\d_]*)?$",
  //   "i"
  // );

  try {
    // eslint-disable-next-line no-unused-vars
    let url = new URL(string);
  } catch (eror) {
    return false;
  }
  return true;
}

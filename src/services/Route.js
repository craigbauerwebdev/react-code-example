export const searchCode = (name, url = "") => {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    url || window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
};

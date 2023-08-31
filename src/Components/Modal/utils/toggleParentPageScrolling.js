function disableParentPageScroll() {
  const body = document.getElementsByTagName("body")[0];
  body.setAttribute("style", "overflow: hidden");
}

function enableParentPageScroll() {
  const body = document.getElementsByTagName("body")[0];
  body.setAttribute("style", "overflow: ");
}

export { disableParentPageScroll, enableParentPageScroll };

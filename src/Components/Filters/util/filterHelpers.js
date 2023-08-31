export function removeUrlHash() {
  // we need to change hash with equals like this to trigger "hashchange" event listener
  // so the breadcrumbs get updated
  window.location.hash = "";
  window.history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}

export default function getAnalyticsPage(location) {
  if (location === "/networking/recommended") return "recommended";
  if (location === "/networking/showcases") return "networking showcases";
  if (location === "/networking/attendees") return "networking attendee list";
  if (location === "/networking/exhibitors")
    return "networking exhibitors list";
  if (location === "/account/profile") return "profile";
  if (location === "/account/schedule") return "my schedule";
  if (location === "/account/favorites") return "favorites";
  if (location === "/account/notifications") return "my notifications";
  if (location === "/account/settings") return "settings";
  if (location === "/account/blocked-users") return "blocked users";
  if (location.includes("/account")) return "account";
  if (location.split("/").length >= 1 && location.includes("/attendee/"))
    return "attendee info";
  if (location.split("/").length >= 1 && location.includes("/sessions/"))
    return "single session";
  if (location === "/login") return "login";
  if (location === "/logout") return "logout";
  if (location === "/support") return "support";
  if (location === "/sessions") return "sessions list";
  if (location.includes("/sessions") && location.split("/").length >= 1)
    return "single subsession";
  if (location === `/${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}`)
    return "speakers list";
  if (
    location.includes(`/${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}`) &&
    location.split("/").length >= 1
  )
    return "single speaker";
  if (location === "/faqs") return "faqs";
  if (location.includes("/product-showcase") && location.split("/").length >= 1)
    return "single showcase";
  if (location === "/showcases" && location.split("/").length >= 1)
    return "single showcase";
  if (location === "/product-showcase-video" && location.split("/").length >= 1)
    return "single showcase";
  if (location.includes("/live-stream") && location.split("/").length >= 1)
    return "single live stream";
  if (location === "/search") return "search";
  if (location === "/exhibitors-levels") return "exhibitor list";
  if (location === "/exhibitors") return "exhibitors";
  if (location === `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`)
    return "exhibitor list";
  if (
    location.includes(`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`) &&
    location.split("/").length >= 1
  )
    return "single exhibitor";
  if (location === "/become-an-exhibitor") return "become an exhibitor";
  if (location === "/map") return "map";
  if (location === "/register") return "register";
  if (location === "/directchat") return "chat";
  if (location.includes("/directchat") && location.split("/").length >= 1)
    return "single chat";
  if (location === "/posters") return "posters";
  if (location.includes("/posters") && location.split("/").length >= 1)
    return "single poster";
  if (location === "/redirect") return "redirect";
  if (location === "/pre-event") return "pre event";
  if (location === "/calendar") return "calendar";
  if (location === "/leaderboard") return "leaderboard";
  if (location === "/sitemap") return "sitemap";
  if (location === "/removed") return "single showcase";
  if (location.includes("/meeting")) return "single showcase";
  if (location.includes("/single-file-viewer")) return "single poster";
  if (location === "*") return "404";
  else {
    return "homepage";
  }
}

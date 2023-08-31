const commonText = {
  // common text
  read: "Read",
  sessions: "Sessions",
  learn: "Learn",
  discover: "Discover",
  network: "Network",
  connect: "Connect",
  posters: "Posters",
  onDemand: "On Demand",
  watchMore: "Watch More",
};

const en = {
  ...commonText,

  ///HorizontalSponsorBanner.js
  horizontal_banner_1_path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/11EAB1909BD8B8E0960AAFDA20A63460/Juice-Audio`,
  horizontal_banner_1_image:
    "/images/horizontal-banners/audiohijack-sponsor-banner-horizontal.png",
  horizontal_banner_1_name: "Audiohijack",
  horizontal_banner_1_target: "_partent",

  horizontal_banner_2_path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
  horizontal_banner_2_image:
    "/images/horizontal-banners/horizontal-pressplay.png",
  horizontal_banner_2_name: "Pressplay",
  horizontal_banner_2_target: "_partent",

  horizontal_banner_3_path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
  horizontal_banner_3_image: "/images/horizontal-banners/horizontal-dezyn.png",
  horizontal_banner_3_name: "Dezyn",
  horizontal_banner_3_target: "_partent",

  ///VerticalSponsorBanner.js
  vertical_banner_1_path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
  vertical_banner_1_image:
    "/images/vertical-banners/instantfest-vertical-ad.jpg",
  vertical_banner_1_name: "Instantfest",
  vertical_banner_1_target: "_parent",

  vertical_banner_2_path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
  vertical_banner_2_image: "/images/vertical-banners/vertical-kompeet.png",
  vertical_banner_2_name: "Kompeet",
  vertical_banner_2_target: "_parent",

  vertical_banner_3_path: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
  vertical_banner_3_image: "/images/vertical-banners/vertical-sitandstand.png",
  vertical_banner_3_name: "Sitandstand",
  vertical_banner_3_target: "_parent",

  // Main.js
  main_link_page_cards_1_name: commonText.sessions,
  main_link_page_cards_1_image: "/images/tiles/card1.png",
  main_link_page_cards_1_subtitle: commonText.learn,

  main_link_page_cards_2_name: process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE,
  main_link_page_cards_2_image: "/images/tiles/card2.png",
  main_link_page_cards_2_subtitle: commonText.discover,

  main_link_page_cards_3_name: process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE,
  main_link_page_cards_3_image: "/images/tiles/card3.png",
  main_link_page_cards_3_subtitle: commonText.read,

  main_link_page_cards_4_name: commonText.network,
  main_link_page_cards_4_image: "/images/tiles/card5.png",
  main_link_page_cards_4_subtitle: commonText.connect,

  main_link_page_cards_5_name: commonText.posters,
  main_link_page_cards_5_image: "/images/tiles/card4.png",
  main_link_page_cards_5_subtitle: commonText.read,

  main_link_page_cards_6_name: commonText.onDemand,
  main_link_page_cards_6_image: "/images/tiles/card6.png",
  main_link_page_cards_6_subtitle: commonText.watchMore,
};

export default en;

const banners = {
  faqs: [
    {
      heroBannerType: "static",
      bannerDetails: [
        {
          altText: "FAQs",
          typeImageOptions: {
            staticImageTitle: "FAQs",
            sponsors: {}, // must have in data object
          },
          imageURL:
            "https://res.cloudinary.com/freemanoeptest/image/upload/v1599767578/Demosite/Liferay%20Hero%20Banner/FAQs_w11xby.png",
        },
      ],
    },
  ],
  pre_event: [
    {
      heroBannerType: "static",
      bannerDetails: [
        {
          altText: "Pre-Event",
          linkTarget: "_blank",
          typeImageOptions: {
            staticImageTitle: "Join the Live Stream",
            staticImageSubtitle:
              "Never miss a moment of the Your Event LIVE! View the live stream schedule and sign up to watch our live streams in real time.",
            staticImageHashtag: "#GoLIVE2020",
            sponsors: {
              sponsorLeadIn: "Brought to you by",
              sponsorAltText: "anyfest",
              sponsorImageUrl:
                "https://res.cloudinary.com/freemanoeptest/image/upload/v1599772853/Demosite/Liferay%20Hero%20Banner/anyfest-hero_hqolha.png",
              sponsorLinkTarget: "_blank",
            },
          },
          imageURL: "/images/hero-banners/Hero_BG2.png",
          linkURL: "",
        },
      ],
    },
  ],
  matchmaking: [
    {
      heroBannerType: "static",
      bannerDetails: [
        {
          altText: "Matchmaking",
          typeImageOptions: {
            staticImageTitle: "Matchmaking",
            sponsors: {}, // must have in data object
          },
          imageURL: "/images/hero-banners/networking.png",
        },
      ],
    },
  ],
  speakers: [
    {
      heroBannerType: "static",
      bannerDetails: [
        {
          altText: "Speakers",
          typeImageOptions: {
            staticImageTitle: "Speakers",
            sponsors: {},
          },
          imageURL:
            "https://res.cloudinary.com/freemanoeptest/image/upload/v1599767579/Demosite/Liferay%20Hero%20Banner/speakers_tll6kb.png",
        },
      ],
    },
  ],
  map: [
    {
      heroBannerType: "static",
      bannerDetails: [
        {
          altText: "Map",
          typeImageOptions: {
            staticImageTitle: "Map",
            sponsors: {},
          },
          imageURL: "/images/hero-banners/map.png",
        },
      ],
    },
  ],
  chat: [
    {
      heroBannerType: "static",
      bannerDetails: [
        {
          altText: "Channel Chat",
          typeImageOptions: {
            staticImageTitle: "Channel Chat",
            sponsors: {},
          },
          imageURL: "/images/hero-banners/networking.png",
        },
      ],
    },
  ],
  homepage: [
    {
      heroBannerType: "rotating",
      bannerDetails: [
        {
          imageURL: "/images/hero-banners/banner1.jpg",
          altText: "Hero 1",
        },
        {
          imageURL: "/images/hero-banners/banner2.jpg",
          altText: "Hero 2",
        },
        {
          imageURL: "/images/hero-banners/banner3.jpg",
          altText: "Hero 3",
        },
      ],
    },
  ],
};

export default {
  banners,
};

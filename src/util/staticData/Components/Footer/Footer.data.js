import staticData from "../Header/Header.data";

// replace if we need different footers and headers
const nav = staticData.header;
const preEvent = staticData.header.preEvent;
const socialLinks = [
  {
    linkURL: "https://twitter.com/freemanco",
    altText: "Twitter",
    imageURL: "/images/social-icons/twitter.svg",
    sortOrder: 0,
  },
  {
    linkURL: "https://www.linkedin.com/company/the-freeman-company",
    altText: "LinkedIn",
    imageURL: "/images/social-icons/linkedin.svg",
    sortOrder: 0,
  },
  {
    linkURL: "https://www.facebook.com/freemanfans",
    altText: "Facebook",
    imageURL: "/images/social-icons/facebook.svg",
    sortOrder: 0,
  },
  {
    linkURL: "https://www.youtube.com/user/FreemancoVideos",
    altText: "Youtube",
    imageURL: "/images/social-icons/youtube.svg",
    sortOrder: 0,
  },
  {
    linkURL: "https://www.instagram.com/freemancompany/",
    altText: "Instagram",
    imageURL: "/images/social-icons/Instagram.svg",
    sortOrder: 0,
  },
];
const freemanFooter = {
  legalRight: [
    {
      menuLabel: "Technical Support",
      sort: 0,
      link: "/support",
      external: false,
    },
    {
      menuLabel: "Privacy Policy",
      sort: 0,
      link: "https://www.freeman.com/privacy-policy",
      external: true,
    },
    {
      link: "https://www.freeman.com/terms-of-use",
      sort: 0,
      menuLabel: "Terms of Use",
      external: true,
    },
    {
      menuLabel: "Cookie Policy",
      sort: 0,
      link: "https://www.freeman.com/cookie-policy",
      external: true,
    },
  ],
  legalLeft: [
    {
      menuLabel: "Freeman. All rights reserved.",
      sort: 0,
      copyRight: true,
    },
  ],
};

export default {
  socialLinks,
  nav,
  freemanFooter,
  preEvent,
};

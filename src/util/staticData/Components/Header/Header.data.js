import { capitalize } from "lodash";
// Data matches what comes from Liferay
const header = {
  logo: {
    imageURL: "/images/your-event.png",
    altText: "Your Event logo",
    link: "/",
  },
  preEvent: [],
  mainNav: [
    {
      menuLabel: "About",
      sortOrder: 0,
      starts: "",
      ends: "",
      submenus: [
        {
          link: "/faqs",
          menuLabel: "FAQs",
          sortOrder: 0,
          starts: "",
          ends: "",
        },
        {
          link: "/pre-event",
          menuLabel: "Pre-Event View",
          sortOrder: 0,
          starts: "",
          ends: "",
        },
      ],
    },
    {
      menuLabel: "Learning",
      sortOrder: 0,
      starts: "",
      ends: "",
      submenus: [
        {
          link: `/${process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE}`,
          menuLabel: `${capitalize(
            process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
          )}`,
          sortOrder: 0,
          starts: "",
          ends: "",
        },
        {
          link: "/sessions",
          menuLabel: "Sessions",
          sortOrder: 0,
          starts: "",
          ends: "",
        },
        {
          link: "/posters",
          menuLabel: "Posters",
          sortOrder: 0,
          starts: "",
          ends: "",
        },
        {
          link: "/sessions/on-demand",
          menuLabel: "On Demand",
          sortOrder: 0,
          starts: "",
          ends: "",
        },
      ],
    },
    {
      menuLabel: "Networking",
      sortOrder: 0,
      starts: "",
      ends: "",
      submenus: [
        {
          link: "/directchat",
          menuLabel: "Chat",
          sortOrder: 0,
          starts: "",
          ends: "",
        },
        {
          link: "/matchmaking",
          menuLabel: "Matchmaking",
          type: "grip",
          sortOrder: 0,
          starts: "",
          ends: "",
        },
      ],
    },
    {
      menuLabel: "Interactions",
      sortOrder: 0,
      starts: "",
      ends: "",
      submenus: [
        {
          link: "https://daretowin.signexpo.org/",
          menuLabel: "Custom Game",
          sortOrder: 0,
          type: "_blank",
          starts: "",
          ends: "",
        },
      ],
    },
    {
      menuLabel: capitalize(process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE),
      link: `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}`,
      sortOrder: 0,
      starts: "",
      ends: "",
      submenus: [],
    },
  ],
};

export default {
  header,
};

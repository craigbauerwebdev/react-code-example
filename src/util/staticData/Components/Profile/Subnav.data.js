import { userRoles } from "util/checkUserRole";

export const navLinks = [
  {
    icons: "profile",
    menuLabel: "Profile",
    link: "/account/profile",
    default: true,
  },
  {
    icons: "calendar-check",
    menuLabel: "Schedule",
    link: "/account/schedule",
  },
  // {
  //   icons: "calendar",
  //   menuLabel: "My Availability",
  //   link: "/account/availability",
  //   requiredRoles: [userRoles.EXHIBITOR_REP],
  // },
  {
    icons: "user-lock",
    menuLabel: "Exhibitor Management",
    requiredRoles: [userRoles.EXHIBITOR_ADMIN],
    slug: "exhibitor_management",
    nestedMenu: [
      {
        icons: "user-edit",
        menuLabel: "Representative Setup",
        link: "/account/representative-setup",
        default: true,
      },
      // {
      //   icons: "chalkboard-teacher",
      //   menuLabel: "Showcase Setup",
      //   link: "/account/product-showcase-setup",
      // },
    ],
  },
  {
    icons: "heart-filled",
    menuLabel: "Favorites",
    link: "/account/favorites",
  },
  {
    icons: "notification",
    menuLabel: "Notifications",
    link: "/account/notifications",
    slug: "notifications",
  },
  {
    icons: "cog",
    menuLabel: "Settings",
    link: "/account/settings",
  },
  {
    icons: "sign-out",
    menuLabel: "Sign Out",
    link: "/logout",
  },
  {
    link: "/account/blocked-users",
  },
  // {
  //   link: "/account/muted-users",
  // },
];

export default navLinks;

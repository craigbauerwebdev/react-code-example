export const defaultBlockedNetworkRoutes = [
  {
    link: "/networking",
  },
  {
    link: "/networking/showcases",
  },
  {
    link: "/networking/attendees",
  },
  {
    link: "/networking/exhibitors",
  },
  {
    link: "Grip Networking",
  },
  {
    link: "Manage My",
  },
];

const calcBlockedNetworkRoutes = (globalSettings) => {
  if (globalSettings.eventNetworking && globalSettings.allowNetworking) {
    if (!globalSettings.allowUserNetworking) {
      return [
        {
          link: "/networking",
        },
        {
          link: "/networking/showcases",
        },
        {
          link: "/networking/attendees",
        },
        {
          link: "/networking/exhibitors",
        },
      ];
    }
    if (!globalSettings.networkingMeetings.meetingFormats.productShowcase)
      // networking is approved in overlord  but product showcases is not so only block route related to showcase
      return [
        {
          link: "/networking/showcases",
        },
      ];
    else return [];
  }
  // networking is not approved in overlord so block any routes related to networking
  return defaultBlockedNetworkRoutes;
};

export default calcBlockedNetworkRoutes;

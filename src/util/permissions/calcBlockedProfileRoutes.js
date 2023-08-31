export const defaultBlockedProfileRoutes = [
  {
    component: "Exhibitor Management",
    link: "Exhibitor Management",
  },
  {
    component: "availability",
    link: "/account/availability",
  },
  {
    component: "attendee profiles",
    link: "/attendee/",
  },
];

const placeholder = [];

const calcBlockedProfileRoutes = (globalSettings) => {
  // networking is approved in overlord so do not block any profile routes
  if (globalSettings.eventNetworking && globalSettings.allowNetworking) {
    //block showcase setup if product showcase disabled
    if (!globalSettings.networkingMeetings.meetingFormats.productShowcase) {
      placeholder.push({
        component: "product showcase setup",
        link: "/account/product-showcase-setup",
      });
    }
    if (!globalSettings.exhibitorAdmin) {
      // networking is approved in overlord but user is not an exhibitor admin
      placeholder.push(
        {
          component: "Exhibitor Management",
          link: "Exhibitor Management",
        },
        {
          component: "representative setup",
          link: "/account/representative-setup",
        },
        {
          component: "product showcase setup",
          link: "/account/product-showcase-setup",
        }
      );
    }
    // hide until after MVP
    placeholder.push({
      component: "availability",
      link: "/account/availability",
    });
    return placeholder;
  }
  // networking is not approved in overlord so block profile routes related to networking
  else return defaultBlockedProfileRoutes;
};

export default calcBlockedProfileRoutes;

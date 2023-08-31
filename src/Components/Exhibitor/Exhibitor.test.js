import getVideos from "Components/Exhibitor/utils/getVideos";

// Your test suite must contain at least one test.

it("returns empty array if no video data provided", () => {
  expect(getVideos(null)).toEqual([]);
});

it("returns array of video objects if video url is valid", () => {
  const result = getVideos({
    custom_attributes: {
      custom_fields: { Video: [{ url: "https://youtu.be/zU2-QMP5e5g" }] },
    },
  });
  expect(result).toEqual([{ url: "https://youtu.be/zU2-QMP5e5g" }]);
});

it("filters out video objects with invalid urls", () => {
  const result = getVideos({
    custom_attributes: {
      custom_fields: {
        Video: [
          { url: "https://youtu.be/zU2-QMP5e5g" },
          { url: "invalid url" },
        ],
      },
    },
  });
  expect(result).toEqual([{ url: "https://youtu.be/zU2-QMP5e5g" }]);
});
// import { ExhibitorBooth } from "../Exhibitor/ExhibitorBooth";

// import { shallow } from "enzyme";
// import React from "react";
// import toJson from "enzyme-to-json";

// jest.mock("../OEPAnalytics", () => ({
//   OEPAnalytics: () => "",
//   saveAnalytic: () => "",
// }));

// it("test data", () => {
//   const obj = {
//     name: "Anyfest",
//     fuzion_exhibitor_id: "11EB434E989BA7A0A51C8F5B6AA89F8A",
//     synced_to_fuzion: "",
//     client_id: "0-mock",
//     tier_1_premium_plus_exhibitor_form: "",
//     helios_vbooth_flag: "",
//     booth_video_animation:
//       "https://d2zsryopbdog7m.cloudfront.net/event-files/tiTOHGuMQ2G5WQXIelMH_booth_video_exhibitor_anyfest_light.mp4",
//     virtual_exhibitor_booth_application: "",
//     booth_still:
//       "https://d2zsryopbdog7m.cloudfront.net/event-files/h1uwoiITdyLUAGtact5Q_booth_still_exhibitor_anyfest_light.jpg",
//     logo_image: "",
//     vector_logo_image: "",
//     exhibitor_banner_image: "",
//     description: "",
//     entry_image: "",
//     linked_in_url: "",
//     facebook_url: "",
//     twitter_url: "",
//     instagram_url: "",
//     you_tube_url: "",
//     colors: {
//       bg_color: null,
//       subheader_link_color: null,
//       color_one: null,
//       color_two: null,
//     },
//     booth_products: [
//       {
//         image: null,
//         popup: null,
//         external_url: "https://www.youtube.com/watch?v=17aHDyXuX2I",
//       },
//       {
//         image: null,
//         popup: null,
//         external_url: "https://vimeo.com/413787482",
//       },
//       {
//         image: null,
//         popup: null,
//         external_url: "https://youtu.be/VH3HuPu7TMY",
//       },
//       {
//         image: null,
//         popup: null,
//         external_url: "https://youtu.be/VH3HuPu7TMY",
//       },
//     ],
//     monitor: {
//       image: null,
//       popup:
//         "https://d2zsryopbdog7m.cloudfront.net/event-files/OAA2euojSXihqoTl8o2H_booth_video_exhibitor_anyfest_light.mp4",
//     },
//   };
//   const props = {
//     booth: obj,
//     exhibitor: obj,
//   };
//   const component = shallow(<ExhibitorBooth {...props} />);
//   expect(toJson(component)).toMatchSnapshot();
// });

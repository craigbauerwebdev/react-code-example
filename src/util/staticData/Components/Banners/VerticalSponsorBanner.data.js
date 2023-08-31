import I18n from "util/i18n";

const sponsors = {
  homepage: {
    banners: [
      {
        imageURL: I18n.t("vertical_banner_1_image"),
        linkURL: I18n.t("vertical_banner_1_path"),
        altText: I18n.t("vertical_banner_1_name"),
        linkTarget: I18n.t("vertical_banner_1_target"),
      },
      {
        imageURL: I18n.t("vertical_banner_2_image"),
        linkURL: I18n.t("vertical_banner_2_path"),
        altText: I18n.t("vertical_banner_2_name"),
        linkTarget: I18n.t("vertical_banner_2_target"),
      },
      {
        imageURL: I18n.t("vertical_banner_3_image"),
        linkURL: I18n.t("vertical_banner_3_path"),
        altText: I18n.t("vertical_banner_3_name"),
        linkTarget: I18n.t("vertical_banner_3_target"),
      },
    ],
    delay: 10, //Time in seconds
    random: false,
  },
};

const OEPAnalytics = {
  componentType: "Anchor",
};

export default {
  sponsors,
  OEPAnalytics,
};

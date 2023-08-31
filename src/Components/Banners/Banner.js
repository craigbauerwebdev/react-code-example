import { HeroVideoPlayer } from "./HeroVideoPlayer";
import React from "react";
import bannerStyles from "./scss/banner.module.scss";

export const Banner = ({ bannerData: { bannerDetails }, page }) => {
  const [data] = bannerDetails;
  const [videoData] = data?.videoDetails;
  const { imageURL, altText } = data;
  const {
    staticImageTitle = "",
    staticImageSubtitle = "",
    // staticImageHashtag = "",
    sponsors: { sponsorLeadIn = "", sponsorImageUrl = "", sponsorAltText = "" },
  } = data.typeImageOptions;

  const isHomepage = page === "homepage";

  if (!data) {
    return null;
  }

  return (
    <div
      className={`${bannerStyles.largeBanner} ${
        isHomepage && bannerStyles.largeBannerHome
      }`}
      style={
        imageURL
          ? {
              backgroundImage: `url("${imageURL}")`,
            }
          : { backgroundImage: `url('/images/hero-banners/Hero_BG2.png')` }
      }
    >
      <span className="sr-only">{altText}</span>
      <div className={bannerStyles.bannerContentHome}>
        <HeroVideoPlayer data={videoData} />
        <div
          className={`${
            isHomepage
              ? bannerStyles.contentContainerHome
              : bannerStyles.contentContainer
          } ${videoData.Position === "left" ? bannerStyles.contentRight : ""}`}
        >
          {staticImageTitle && <h1>{staticImageTitle}</h1>}

          {staticImageSubtitle && <h2>{staticImageSubtitle}</h2>}

          {sponsorLeadIn && (
            <div className={bannerStyles.sponsoredBy}>
              {sponsorLeadIn}
              <img src={sponsorImageUrl} alt={sponsorAltText} />
            </div>
          )}
          {/*{staticImageHashtag && (*/}
          {/*  <div className={bannerStyles.hashtag}>{staticImageHashtag}</div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

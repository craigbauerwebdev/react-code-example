import React from "react";

export const ImageBanner = (props) => (
  <div
    className={`${
      props.homepage
        ? "large-banner image-banner homepage-banner"
        : props.classnames
        ? `large-banner image-banner ${props.classnames}`
        : "large-banner image-banner"
    } `}
  >
    <img
      src={props.image ? props.image : "/images/hero-banners/Hero_Image.png"}
      alt={props.title}
    />
    <div className="banner-content">
      <h1>{props.title}</h1>
      {props.subTitle && <h2>{props.subTitle}</h2>}
      {props.hash && <div className="hashtag">{props.hash}</div>}
    </div>
  </div>
);

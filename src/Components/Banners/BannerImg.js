import React, { Fragment, useEffect, useState } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import { bannerActionTypes } from "./reducer";
import bannerImgStyles from "./scss/banner-img.module.scss";
import formatUrl from "util/formatter";

/**
 * @param {Object} banner banner content information
 * @param {Object} tracking analytics information for the banner link
 * @param {function} dispatch local reducer set on parent component to mange state changes
 * @param {string} interval window interval name
 */
const BannerImg = ({
  banner: { linkTarget, linkURL, altText, imageURL, adId, companyName },
  tracking,
  dispatch,
  interval,
}) => {
  const [errorImg, setErrorImg] = useState(false);
  const errorImgPath = "/images/image-not-found.jpg";
  const handleError = () => {
    setErrorImg(true);
  };
  const imgItem = () => {
    return (
      <div>
        <img
          src={errorImg ? errorImgPath : imageURL}
          alt={altText}
          onError={handleError}
        />
      </div>
    );
  };

  const focusEvt = () => {
    // Image has Focus pause rotation
    dispatch({
      type: bannerActionTypes.SET_BANNER_FOCUS,
      payload: true,
    });
    clearInterval(window[interval]);
  };

  useEffect(() => {
    setErrorImg(false);

    return () => {
      setErrorImg(false);
    };
  }, [imageURL]);
  // For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
  return linkURL ? (
    <Fragment>
      <LinkWrapper
        {...tracking}
        trackingUrl={linkURL}
        className={bannerImgStyles.bannerLink}
        to={linkTarget === "_blank" ? formatUrl(linkURL) : linkURL}
        voidLink={!linkURL}
        external={linkTarget === "_blank"}
        grip={linkTarget === "grip"}
        onFocus={focusEvt}
        componentType="Banner"
        componentName="banner image"
        exhibitorId={companyName}
        adId={adId}
      >
        {imgItem()}
      </LinkWrapper>
    </Fragment>
  ) : (
    <div className={bannerImgStyles.bannerNoLink}>{imgItem()}</div>
  );
};

BannerImg.propTypes = {
  banner: PropTypes.shape({
    linkTarget: PropTypes.string,
    linkURL: PropTypes.string,
    altText: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    adId: PropTypes.number,
    companyName: PropTypes.string,
  }).isRequired,
  tracking: PropTypes.object.isRequired,
};

export default BannerImg;

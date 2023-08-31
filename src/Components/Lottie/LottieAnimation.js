import Lottie from "react-lottie";
import React from "react";

const LottieAnimation = ({ style, animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={style}>
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default LottieAnimation;

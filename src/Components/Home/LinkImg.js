import React, { useState } from "react";

import { defaultIconPath } from "util/staticData/Components/Home/Main";
import linkCardsStyles from "./scss/link-page-cards.module.scss";

const LinkImg = ({ src }) => {
  const [imgSrc, setImgScr] = useState(src);
  const errorHandler = () => {
    setImgScr(defaultIconPath);
  };

  return (
    <img
      src={imgSrc}
      alt=""
      role="presentation"
      className={linkCardsStyles.smallCardArrow}
      onError={errorHandler}
    />
  );
};

export default LinkImg;

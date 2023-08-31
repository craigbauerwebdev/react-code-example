import React from "react";
import loaderStyles from "./scss/loader.module.scss";

const Loader = ({ loaderType = null }) => (
  <div
    className={`${loaderStyles.loader} ${
      loaderType && loaderStyles[loaderType]
    }`}
  >
    <img src="/images/loader.gif" alt="loader" />
  </div>
);

export default Loader;

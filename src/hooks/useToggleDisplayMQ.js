import { useEffect, useState } from "react";
/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Toggle-Display
 * A hook that will inform you if the browser window is above or below a set size.
 * @param {Number} size BP size to trigger change event.
 * @returns {Boolean} boolean
 */
const useToggleDisplayMQ = (size) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width:${size}px)`);
    const screenTest = (e) => setIsMobile(!e.matches);

    // Some future proofing
    if (mql.addEventListener) {
      mql.addEventListener("change", screenTest);
    } else {
      // Add listener is need for <= safari 13
      mql.addListener(screenTest);
    }

    setIsMobile(!mql.matches);

    return () => {
      if (mql.addEventListener) {
        mql.removeEventListener("change", screenTest);
      } else {
        // remove listener is need for <= safari 13
        mql.removeListener(screenTest);
      }
    };
  }, [size]);

  return isMobile;
};

export default useToggleDisplayMQ;

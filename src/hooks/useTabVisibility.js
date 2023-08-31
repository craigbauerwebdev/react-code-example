import { useEffect, useState } from "react";
/**
 * A hook that will inform you if the browser tab is active.
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/useTabVisibility
 *
 * @returns {boolean}
 */
const useTabVisibility = () => {
  const [isVisible, setIsVisible] = useState(null);

  useEffect(() => {
    const keys = {};
    const handleTabVisibility = () => {
      const tabIsVisible = document[keys.test];

      setIsVisible(!tabIsVisible);
    };

    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      keys.evt = "visibilitychange";
      keys.test = "hidden";
    } else if (typeof document.msHidden !== "undefined") {
      keys.evt = "msHidden";
      keys.test = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      keys.evt = "webkitHidden";
      keys.test = "webkitvisibilitychange";
    }

    if (keys.evt) {
      document.addEventListener(keys.evt, handleTabVisibility);

      setIsVisible(!document[keys.test]);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (keys.evt) {
        document.removeEventListener(keys.evt, handleTabVisibility);
      }
    };
  }, []);

  return isVisible;
};

export default useTabVisibility;

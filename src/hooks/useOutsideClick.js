import { useEffect } from "react";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Outside-Click
 * Add event listener for if user has click outside the element.
 * @param {node} ref
 * @param {function} callBack
 */
const useOutsideClick = (ref, callBack) => {
  useEffect(() => {
    /**
     * Trigger callback function if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        let filterPath = event?.path?.filter((e) => {
          return e.classList?.contains("k-popup");
        });
        if (filterPath?.length === 0) callBack();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callBack]);
};

export default useOutsideClick;

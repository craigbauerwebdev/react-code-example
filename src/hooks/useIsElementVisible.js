import { useEffect, useState } from "react";
/**
 * Check to see if element is in view
 * @param {Node} elem
 * @returns {Boolean} True if element is in view
 */
export default function useIsElementVisible(
  elem,
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  }
) {
  const [isVisible, setIsVisible] = useState(false);
  const current = elem?.current;
  const callbackFunction = (entries) => {
    const [entry] = entries;
    if (entry) setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [current, options]);

  return isVisible;
}

import { useCallback, useEffect, useState } from "react";

export default function useWindowDimensions() {
  const getWindowDimensions = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const handleResize = useCallback(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowDimensions;
}

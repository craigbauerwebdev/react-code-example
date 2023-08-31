import { setCurrentSession } from "Components/OEPAnalytics";
import { useEffect } from "react";

const useTrackCurrentSession = (session) => {
  useEffect(() => {
    if (session) {
      setCurrentSession(session);
    }

    return () => {
      setCurrentSession(null);
    };
  }, [session]);
};

export default useTrackCurrentSession;

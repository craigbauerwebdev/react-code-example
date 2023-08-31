import { algoliaSetting } from "Components/Profile/store/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

/**
 * This set and clear algolia index's.
 * If you don't clear the index algolia will pull search results for cache.
 * It won't reflect the most up to date data.
 */
const useAlgoliaSetting = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(algoliaSetting("attendee"));

    return () => {
      dispatch(algoliaSetting("destroy"));
    };
  }, [dispatch]);
};

export default useAlgoliaSetting;

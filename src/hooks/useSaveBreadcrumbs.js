import { useDispatch, useSelector } from "react-redux";

import { SET_BREADCRUMB_LABEL_AND_URL } from "Components/Filters/store/actions/actionsTypes";
import { useEffect } from "react";
import useGetPageByPathname from "hooks/useGetPageByPathname";

export default function useSaveBreadcrumbs() {
  const dispatch = useDispatch();
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );

  const { pageTitle } = useGetPageByPathname();

  const handleHashChangeEvent = () => {
    const newBreadcrumbUrl = `${window.location.pathname}${window.location.hash}`;

    dispatch({
      type: SET_BREADCRUMB_LABEL_AND_URL,
      payload: {
        breadcrumbLabel: pageTitle,
        breadcrumbUrl: newBreadcrumbUrl,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChangeEvent);
    if (
      breadcrumbLabel !== pageTitle ||
      !breadcrumbUrl.includes(window.location.pathname)
    ) {
      // in case the user went from exhibitorsList page with some filters applied to let's say OnDemand sessionsList page
      // without default filters. Hash won't change until the user interacts with them on OnSemand sessionsList page
      // so we need to handle it manually for the first time
      handleHashChangeEvent();
    }
    return () =>
      window.removeEventListener("hashchange", handleHashChangeEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
}

import * as React from "react";

import {
  getExhibitorsLocation,
  getExhibitorsLogo,
} from "Components/Exhibitor/utils/getSideBar";
import { useDispatch, useSelector } from "react-redux";

import { dataTypes } from "store/utils/dataTypes";
import generatedName from "util/generatedName";
import { getPayload } from "store/actions";

export const useExhibitors = (meeting: Meeting) => {
  const exhibitors = useSelector((state: any) => state.global.exhibitors);
  const [exhibitor, setExhibitor]: any = React.useState(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  }, [exhibitors, dispatch]);

  React.useEffect(() => {
    if (meeting?.fuzionExhibitorId && exhibitors?.length) {
      let showcaseExhibitor: any = exhibitors.find(
        (z: { exhibitor_company_id: any }) =>
          z.exhibitor_company_id === meeting.fuzionExhibitorId
      );
      if (
        showcaseExhibitor?.custom_attributes &&
        typeof showcaseExhibitor?.custom_attributes === "string"
      ) {
        const { custom_attributes, ...rest }: any = showcaseExhibitor;
        showcaseExhibitor = {
          ...rest,
          custom_attributes: JSON.parse(custom_attributes),
        };
      }

      if (showcaseExhibitor) {
        const exhibitorLocation = getExhibitorsLocation(showcaseExhibitor);

        const exhibitorUrl = `/${
          process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE
        }/${showcaseExhibitor.fuzion_exhibitor_id}/${generatedName(
          showcaseExhibitor.exhibitor_name
        )}`;
        const logo = getExhibitorsLogo(showcaseExhibitor);

        setExhibitor({
          ...showcaseExhibitor,
          exhibitorLocation,
          exhibitorUrl,
          logo,
        });
      }
    }
  }, [meeting, exhibitors]);

  return { exhibitor };
};

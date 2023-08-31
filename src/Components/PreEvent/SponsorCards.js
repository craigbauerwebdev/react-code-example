import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import sponsorCardsStyle from "./scss/sponsor-cards.module.scss";

const SponsorCards = () => {
  const dispatch = useDispatch();
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const [exhibitorsData, setExhibitorsData] = useState(null);

  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    } else if (exhibitors) {
      setExhibitorsData(
        exhibitors.filter((sponsor) => sponsor.membership_flag)
      );
    }
  }, [exhibitors, dispatch]);

  if (!exhibitorsData) {
    return <Loader />;
  }

  return (
    <section>
      <h1 className={sponsorCardsStyle.title}>Sponsors</h1>
      <div className={sponsorCardsStyle.preEventSponsorCards}>
        {exhibitorsData.map((sponsor) => {
          return (
            <div
              className={sponsorCardsStyle.smallCardSponsor}
              key={sponsor.exhibitor_name}
            >
              <div>
                <LinkWrapper
                  to={`/exhibitors/${sponsor.fuzion_exhibitor_id}/${sponsor.exhibitor_name}`}
                  key={sponsor.name}
                  componentName="Sponsor logo"
                  exhibitorId={sponsor.fuzion_exhibitor_id}
                >
                  <img
                    src={sponsor.logo_image_path}
                    alt={`${sponsor.exhibitor_name} Logo`}
                  />
                </LinkWrapper>
              </div>
              <h1>
                <LinkWrapper
                  to={`/exhibitors/${sponsor.fuzion_exhibitor_id}/${sponsor.exhibitor_name}`}
                  key={sponsor.name}
                  componentName={sponsor.exhibitor_name}
                  exhibitorId={sponsor.fuzion_exhibitor_id}
                >
                  {sponsor.exhibitor_name}
                </LinkWrapper>
              </h1>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SponsorCards;

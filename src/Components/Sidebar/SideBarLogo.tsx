import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import formatUrl from "util/formatter";
import sideBarStyles from "./scss/single-side-bar.module.scss";

type SideBarLogoProps = {
  boothUrl: any;
  data: {
    img: string;
    name: string;
    url?: string;
  };
  exhibitorId?: string;
};
const SideBarLogo: React.SFC<SideBarLogoProps> = ({
  boothUrl,
  data: { img, name, url },
  exhibitorId,
}) => {
  const logoContent = () => {
    return (
      <div className={sideBarStyles.companyImage}>
        <img src={img} alt={name} />
      </div>
    );
  };
  return img ? (
    <section className={sideBarStyles.sessionMeta}>
      {boothUrl || url ? (
        <LinkWrapper
          to={url ? formatUrl(url) : boothUrl}
          external={boothUrl ? false : true}
          // @ts-ignore
          className={sideBarStyles.companyImageLink}
          page="single exhibitor"
          componentType="Logo"
          trackingUrl={boothUrl || url}
          componentName="Single Exhibitor Logo"
          exhibitorId={exhibitorId}
        >
          {logoContent()}
        </LinkWrapper>
      ) : (
        <OEPAnalytics
          page="single exhibitor"
          componentType="Logo"
          url={boothUrl || url}
          componentName="Exhibitor Single Logo"
          exhibitorId={exhibitorId}
        >
          {logoContent()}
        </OEPAnalytics>
      )}
    </section>
  ) : (
    <div />
  );
};
export default SideBarLogo;

import React, { useCallback, useEffect, useState } from "react";

import ConfigService from "services/ConfigService";
import FooterLegalList from "./FooterLegalList";
import freemanFooterStyles from "./scss/freeman-footer.module.scss";
import lodash from "lodash";
import staticData from "../../util/staticData/Components/Footer/Footer.data";

const FreemanFooter = () => {
  const footerData = staticData.freemanFooter;
  const [freemanData, setFreemanData] = useState(null);
  const setData = useCallback((footerData) => {
    const dataLeft = lodash.sortBy(footerData.legalLeft, "sort");
    const dataRight = lodash.sortBy(footerData.legalRight, "sort");

    footerData.legalLeft = dataLeft;
    footerData.legalRight = dataRight;

    setFreemanData(footerData);
  }, []);

  useEffect(() => {
    setData(footerData);
  }, [footerData, setData]);

  if (!freemanData) {
    return null;
  }

  return (
    <div className={freemanFooterStyles.freemanFooter}>
      <div
        className={`${freemanFooterStyles.freemanFooterContainer} ${
          ConfigService.runValues.enableChatbot &&
          freemanFooterStyles.freemanFooterContainerChatbotPadding
        }`}
      >
        <div className={freemanFooterStyles.freemanFooterCopyright}>
          <FooterLegalList list={freemanData.legalLeft} />
        </div>
        <nav
          className={freemanFooterStyles.freemanFooterLinks}
          aria-label="Freeman"
        >
          <FooterLegalList list={freemanData.legalRight} />
        </nav>
      </div>
    </div>
  );
};

export default FreemanFooter;

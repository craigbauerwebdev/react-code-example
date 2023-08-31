import React, { useEffect, useReducer } from "react";
import { actionTypesFooter, footerIntState, footerReducer } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./Footer";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import lodash from "lodash";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Footer
 * This component is pulling data from Liferay by default.
 * If this is not the desired outcome you can replace it with static data.
 */
const FooterWrapper = () => {
  const dispatch = useDispatch();
  const [footerState, dispatchFooter] = useReducer(
    footerReducer,
    footerIntState
  );
  const topNav = useSelector((state) => state.global.topNav);
  const footerData = useSelector((state) => state.global.footer);
  const preEvent = useSelector((state) => state.global.isPreventOn);

  /**
   * This is getting liferay data.
   * To use statice data replace what is inside this useEffect with this.
   *  dispatchFooter({
        type: actionTypesFooter.SET_FOOTER_DATA,
        payload: {
          nav: preEvent ? staticData.preEvent : staticData.nav.mainNav,
          social: staticData.socialLinks,
          logo: [
            {
              imageAltText: "Your Event Live",
              imageLinkTarget: "",
              imageLinkURL: "/",
              imageURL: "/images/your-event-white.png",
            },
          ],
        },
      });
   */
  useEffect(() => {
    if (!footerData && topNav) {
      dispatch(getPayload(dataTypes.footerData));
    } else if (footerData) {
      if (!lodash.isEmpty(footerData)) {
        dispatchFooter({
          type: actionTypesFooter.SET_FOOTER_DATA,
          payload: {
            nav: preEvent ? footerData.preEvent : footerData.mainNav,
            social: footerData.socialIcons,
            logo: footerData.logoArea,
          },
        });
      } else {
        dispatchFooter({
          type: actionTypesFooter.SET_NO_FOOTER,
          payload: null,
        });
      }
    }
  }, [dispatch, footerData, topNav, preEvent]);

  if (!footerState.nav) {
    return null;
  }

  return (
    <Footer
      nav={footerState.nav}
      socialLinks={footerState.socialLinks}
      logo={footerState.logo}
      legal={footerData.legalFooter}
    />
  );
};

export default FooterWrapper;

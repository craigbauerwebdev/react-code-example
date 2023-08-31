import formatNavData from "util/formatNavData";
import lodash from "lodash";
export const actionTypesFooter = {
  SET_FOOTER_DATA: "SET_FOOTER_DATA",
  SET_NO_FOOTER: "SET_NO_FOOTER",
};

export const footerIntState = {
  nav: null,
  socialLinks: null,
  logo: null,
};

const setSocial = (social) => lodash.sortBy(social, "sortOrder");

export const footerReducer = (state, action) => {
  switch (action.type) {
    case actionTypesFooter.SET_FOOTER_DATA:
      return {
        ...state,
        nav: formatNavData(action.payload.nav),
        socialLinks: setSocial(action.payload.social),
        logo: action.payload.logo,
      };
    case actionTypesFooter.SET_NO_FOOTER:
      return {
        ...state,
        nav: null,
      };
    default:
      return {
        ...state,
      };
  }
};

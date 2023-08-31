export const actionTypesExhibitors = {
  SET_DROP_CARD: "SET_DROP_CARD",
  SHOW_MODAL_AND_DISCLOSURE: "SHOW_MODAL_AND_DISCLOSURE",
  HIDE_MODAL_AND_DISCLOSURE: "HIDE_MODAL_AND_DISCLOSURE",
};

export const businessCardReducer = (state, action) => {
  switch (action.type) {
    case actionTypesExhibitors.SET_DROP_CARD:
      return {
        ...state,
        dropCard: false,
      };
    case actionTypesExhibitors.SHOW_MODAL_AND_DISCLOSURE:
      return {
        ...state,
        showModal: true,
        showDisclosure: true,
      };
    case actionTypesExhibitors.HIDE_MODAL_AND_DISCLOSURE:
      return {
        ...state,
        showModal: false,
        showDisclosure: false,
        dropCard: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

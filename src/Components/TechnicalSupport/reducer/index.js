export const actionTypes = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
};

export const technicalSupportModalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case actionTypes.HIDE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    default:
      return {
        ...state,
      };
  }
};

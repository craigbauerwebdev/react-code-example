export const actionTypesFAQS = {
  SET_FAQS: "SET_FAQS",
  SET_EMPTY: "SET_EMPTY",
};

export const faqReducer = (state, action) => {
  switch (action.type) {
    case actionTypesFAQS.SET_FAQS:
      return {
        ...state,
        faqsContent: action.payload,
      };
    case actionTypesFAQS.SET_EMPTY:
      return {
        ...state,
        empty: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

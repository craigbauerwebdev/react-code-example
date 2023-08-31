export const actionTypesSessionsTab = {
  UPDATE_EXPAND_DESCRIPTION: "UPDATE_EXPAND_DESCRIPTION",
  UPDATE_RENDER_HIDDEN_CONTENT: "UPDATE_RENDER_HIDDEN_CONTENT",
};

const setExpandDescription = (state) => {
  const expand = !state.expandDescription;

  return {
    ...state,
    expandDescription: expand,
    renderHiddenContent: expand ? true : state.renderHiddenContent,
  };
};

export const sessionTabReducer = (state, action) => {
  switch (action.type) {
    case actionTypesSessionsTab.UPDATE_EXPAND_DESCRIPTION:
      return setExpandDescription(state);
    case actionTypesSessionsTab.UPDATE_RENDER_HIDDEN_CONTENT:
      return {
        ...state,
        renderHiddenContent: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

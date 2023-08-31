export default function formatExhibitors(state, payload) {
  const user = state.user;
  const exhibitorIds = payload.map((e) => e.fuzion_exhibitor_id);

  // Set up the local storage object with user id and a list of all exhibitor IDs
  const businessCardItem = {
    userID: user?.fuzion_attendee_id,
  };
  exhibitorIds.forEach((exh) => {
    businessCardItem[exh] = false;
  });
  const businessCardLocalItem = JSON.parse(
    localStorage.getItem("business_card")
  );

  // if localStorage does not have business card object, set it with user and exhibitor info
  if (
    !businessCardLocalItem ||
    (businessCardLocalItem &&
      businessCardLocalItem["userID"] !== user?.fuzion_attendee_id)
  ) {
    localStorage.setItem("business_card", JSON.stringify(businessCardItem));
  }

  return {
    ...state,
    exhibitors: payload,
  };
}

export default function getExhibitor(exhibitorsData, id) {
  const data = exhibitorsData.find((e) => e.fuzion_exhibitor_id === id);

  if (data) {
    data.industry_category =
      data.industry_category !== null && !Array.isArray(data.industry_category)
        ? data.industry_category.split("|")
        : data.industry_category || [];

    data.custom_attributes =
      typeof data.custom_attributes == "object"
        ? data.custom_attributes
        : JSON.parse(data.custom_attributes);

    data.custom_attributes.phone = data.custom_attributes.phone
      ? data.custom_attributes.phone.replace(/ /g, "-")
      : "";
  }

  return data;
}

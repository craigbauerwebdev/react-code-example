// template for attendee filter buttons data
// the filter buttons data will come from API
export const attendeesFilterData = [
  {
    name: "Country",
    searchField: "Region",
    subfilters: [
      "African Region",
      "Région Afrique",
      "European Region",
      "Región europea",
      "Region of the Americas (excl USA)",
    ],
  },

  {
    name: "Place of Work",
    searchField: "WorkSetting",
    subfilters: [
      "Government Institute",
      "Group or Private Practice",
      "Hospital",
      "University or Medical School",
      "Industry (Biotech, Pharma, Device Manufacturer)",
    ],
  },
  {
    name: "Primary Professional Focus",
    searchField: "Focus",
    subfilters: ["Administration", "Basic Research", "Clinical / Patient Care"],
  },
];

export default attendeesFilterData;

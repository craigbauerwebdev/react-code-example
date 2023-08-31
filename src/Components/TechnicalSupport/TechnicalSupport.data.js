const problemAreaOptions = [
  {
    label: "Event Networking Issues",
    value: "networking",
  },
  {
    label: "Audio/Video Issues",
    value: "audioVideo",
  },
  {
    label: "Registration/Login Issues",
    value: "user",
  },
  {
    label: "Session Issues",
    value: "sessions",
  },
  {
    label: "Speaker Issues",
    value: "speakers",
  },
  {
    label: "Poster Issues",
    value: "posters",
  },
  {
    label: "Exhibitor Issues",
    value: "exhibitor",
  },
  {
    label: "Technical Issues",
    value: "technical",
  },
  {
    label: "Other",
    value: "other",
  },
];

const deviceOptions = [
  {
    label: "Desktop/Laptop",
    value: "desktop",
  },
  {
    label: "Tablet/Mobile",
    value: "mobile",
  },
  {
    label: "Other",
    value: "other",
  },
];

const browserOptions = [
  {
    label: "Google Chrome",
    value: "chrome",
  },
  {
    label: "Firefox",
    value: "firefox",
  },
  {
    label: "Safari",
    value: "safari",
  },
  {
    label: "Other",
    value: "other",
  },
];

const operatingSystemOptions = [
  {
    label: "Windows",
    value: "microsoft",
  },
  {
    label: "MacOS",
    value: "mac",
  },
  {
    label: "Linux",
    value: "linux",
  },
  {
    label: "Other",
    value: "other",
  },
];

const formFields = [
  // {
  //   id: "showNameOrId",
  //   label: "Show ID or name",
  //   type: "text",
  //   required: true,
  //   // helpText: null,
  // },
  {
    id: "emailAddress",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "i.e. john.doe@example.com",
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "i.e. John Doe",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    type: "tel",
    // required: true,
    placeholder: "i.e. 999-999-9999",
  },
  {
    id: "problemArea",
    label: "Problem Area",
    type: "dropdown",
    required: true,
    options: problemAreaOptions,
    // helpText: null,
    placeholder: "Select a problem area...",
  },
  {
    id: "device",
    label: "Device",
    type: "dropdown",
    required: true,
    options: deviceOptions,
    // helpText: null,
    placeholder: "Select a device...",
  },
  {
    id: "browser",
    label: "Browser",
    type: "dropdown",
    required: true,
    options: browserOptions,
    // helpText: null,
    placeholder: "Select a browser...",
  },
  {
    id: "operatingSystem",
    label: "OS",
    type: "dropdown",
    required: true,
    options: operatingSystemOptions,
    // helpText: null,
    placeholder: "Select an OS...",
  },
];

const technicalSupportFormTitle = "Technical Support Form";

export default {
  formFields,
  problemAreaOptions,
  deviceOptions,
  browserOptions,
  operatingSystemOptions,
  technicalSupportFormTitle,
};

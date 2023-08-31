const MockSurveyConfig = {
  title: "CME Survey",
  slug: "cme-survey",
  starts: "12/21/2222 10:00 am",
  ends: "12/30/2222 10:00 am",
  description: "Please answer the questions below to qualify for CME credits",
  preMessage:
    "Please check back after the sessions is over to submit your survey for CME.",
  postMessage: "Thank you for submitting your CME credit Survey.",
  details: [
    {
      required: true,
      label: "Did you enjoy the session?",
      inputType: "radio",
      sortOrder: 1,
      placeHolder: "Placeholder Text test message",
      errorMessage: "Survey Details Error Message",
      options: [
        {
          text: "Yes",
          value: "yes",
          default: false,
          sortOrder: 1,
        },
        {
          text: "No",
          value: "no",
          default: false,
          sortOrder: 2,
        },
      ],
    },
    {
      required: true,
      label: "How much did you like the survey",
      inputType: "dropdown",
      sortOrder: 2,
      placeHolder: "Select",
      errorMessage: "",
      options: [
        {
          text: "5",
          value: "5",
          default: false,
          sortOrder: 1,
        },
        {
          text: "4",
          value: "4",
          default: false,
          sortOrder: 2,
        },
        {
          text: "3",
          value: "3",
          default: false,
          sortOrder: 3,
        },
        {
          text: "2",
          value: "2",
          default: false,
          sortOrder: 4,
        },
        {
          text: "1",
          value: "1",
          default: false,
          sortOrder: 5,
        },
      ],
    },
    {
      required: true,
      label: "Select what best describes this session.",
      inputType: "checkbox",
      sortOrder: 5,
      placeHolder: "",
      errorMessage: "",
      options: [
        {
          text: "Informative",
          value: "informative",
          default: false,
          sortOrder: 1,
        },
        {
          text: "Funny",
          value: "funny",
          default: false,
          sortOrder: 2,
        },
        {
          text: "Scary",
          value: "scary",
          default: true,
          sortOrder: 3,
        },
        {
          text: "Whimsical",
          value: "whimsical",
          default: false,
          sortOrder: 4,
        },
      ],
    },
    {
      required: true,
      label: "Any additional thoughts?",
      inputType: "text_input",
      sortOrder: 3,
      placeHolder: "Type here...",
      errorMessage: "",
      options: [
        {
          text: "",
          value: "",
          default: false,
          sortOrder: null,
        },
      ],
    },
    {
      required: true,
      label: "Wanna write more thoughts?",
      inputType: "text_area",
      sortOrder: 4,
      placeHolder: "Type more here...",
      errorMessage: "",
      options: [
        {
          text: "",
          value: "",
          default: false,
          sortOrder: null,
        },
      ],
    },
  ],
  confirmationMessage: "Rudolph the Red Nosed Reindeer",
  errorMessage: "Christmas is the best time of the year",
};

export default MockSurveyConfig;

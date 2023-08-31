import lodash from "lodash";

/**
 * Format Liferay survey data
 * @param {object} state
 * @param {object} data payload from Liferay
 */
export default function formatSurveys(state, data) {
  if (!data || lodash.isEmpty(data)) {
    return {
      ...state,
      surveys: [],
    };
  }

  // Sort the surveys
  const formattedSurveys = lodash.sortBy(
    data.map((survey) => {
      // Sort the fields in each survey
      survey.details = lodash.sortBy(
        survey.details.map((field) => {
          // Sort the options in each field
          field.options = lodash.sortBy(
            field.options.map((option) => {
              // Remap the field options to include a label and a value
              return {
                label: option.displayText || option.text,
                value: option.selected || option.displayText || option.text,
                ...option,
              };
            }),
            ["sortOrder"]
          );
          return field;
        }),
        ["sortOrder"]
      );
      return survey;
    }),
    ["sortOrder"]
  );

  return {
    ...state,
    surveys: formattedSurveys,
  };
}

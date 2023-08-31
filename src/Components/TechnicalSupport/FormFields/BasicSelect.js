import React from "react";
import formFieldStyles from "./scss/form-fields.module.scss";

const BasicSelect = ({
  id,
  label,
  required = false,
  classNames,
  options = [],
  placeholder = "Select an option",
  selectedOptionValue = "",
  errorMessage,
  helpMessage,
  isSurvey,
  ...attrs
}) => {
  const renderOption = (option, index) => {
    return (
      <option key={option.key || index} value={option.value}>
        {option.label}
      </option>
    );
  };

  return (
    <div
      className={`${formFieldStyles.fieldWrapper} ${
        errorMessage ? formFieldStyles.invalidField : ""
      } ${classNames}`}
    >
      <label htmlFor={id}>
        {label}
        {required ? (
          <span className={formFieldStyles.requiredText} aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span aria-hidden="true"> (Optional)</span>
        )}
      </label>
      <div
        className={`${formFieldStyles.inputGroup}  ${
          isSurvey ? formFieldStyles.surveyInputGroup : ""
        }`}
      >
        <div className={formFieldStyles.selectWrapper}>
          <select
            id={id}
            value={selectedOptionValue}
            aria-invalid={errorMessage ? true : false}
            aria-describedby={`${errorMessage ? `${id}-error` : ""} ${
              helpMessage ? `${id}-help` : ""
            }`}
            {...attrs}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options && options.map((opt, index) => renderOption(opt, index))}
          </select>
        </div>
        {errorMessage && (
          <div
            id={`${id}-error`}
            className={formFieldStyles.fieldErrorText}
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        {helpMessage && (
          <div id={`${id}-help`} className={formFieldStyles.fieldHelpText}>
            {helpMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicSelect;

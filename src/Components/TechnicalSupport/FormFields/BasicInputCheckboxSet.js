import React from "react";
import formFieldStyles from "./scss/form-fields.module.scss";

const BasicInputCheckboxSet = ({
  id,
  name,
  label,
  values = [],
  required = false,
  classNames,
  options = [],
  errorMessage,
  helpMessage,
  ...attrs
}) => {
  const renderOption = (option, index) => {
    const optionKey = option.key || index;
    const optionId = `${id}-${optionKey}`;
    const optionName = name || id;
    return (
      <div key={optionKey} className={formFieldStyles.horizontalRow}>
        <input
          {...attrs}
          type="checkbox"
          name={optionName}
          id={optionId}
          checked={values.includes(option.value) ? "checked" : false}
          value={option.value}
        />
        <label htmlFor={optionId}>{option.label}</label>
      </div>
    );
  };

  return (
    <div
      className={`${formFieldStyles.fieldWrapper} ${
        errorMessage ? formFieldStyles.invalidField : ""
      } ${classNames}`}
    >
      <fieldset className={formFieldStyles.radioFieldSet}>
        <legend>
          {label}
          {required ? (
            <span className={formFieldStyles.requiredText} aria-hidden="true">
              {" "}
              *
            </span>
          ) : (
            <span aria-hidden="true"> (Optional)</span>
          )}
        </legend>
        {options && options.map((opt, index) => renderOption(opt, index))}
      </fieldset>
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
  );
};

export default BasicInputCheckboxSet;

import React from "react";
import formFieldStyles from "./scss/form-fields.module.scss";

const BasicInput = ({
  id,
  label,
  value = "",
  type = "text",
  required = false,
  classNames,
  placeholder = "Input Text",
  errorMessage,
  helpMessage,
  ...attrs
}) => {
  return (
    <div
      className={`${formFieldStyles.fieldWrapper} 
        ${type === "checkbox" && formFieldStyles.checkboxWrapper} 
        ${errorMessage ? formFieldStyles.invalidField : ""} 
        ${classNames}`}
    >
      {type !== "checkbox" ? (
        <React.Fragment>
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
          <div className={formFieldStyles.inputGroup}>
            <input
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
              aria-invalid={errorMessage ? true : false}
              aria-describedby={`${errorMessage ? `${id}-error` : ""} ${
                helpMessage ? `${id}-help` : ""
              }`}
              {...attrs}
            />
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
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={formFieldStyles.radioFieldSet}>
            <div className={formFieldStyles.horizontalRow}>
              <input
                id={id}
                name={id}
                type="checkbox"
                defaultChecked={value}
                aria-invalid={errorMessage ? true : false}
                aria-describedby={`${errorMessage ? `${id}-error` : ""} ${
                  helpMessage ? `${id}-help` : ""
                }`}
                {...attrs}
              />
              <label htmlFor={id}>{label}</label>
            </div>
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
        </React.Fragment>
      )}
    </div>
  );
};

export default BasicInput;

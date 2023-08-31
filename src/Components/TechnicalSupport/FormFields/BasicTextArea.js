import React from "react";
import formFieldStyles from "./scss/form-fields.module.scss";

const BasicTextArea = ({
  id,
  label,
  value = "",
  required = false,
  classNames,
  placeholder = "Enter your text here...",
  errorMessage,
  helpMessage,
  ...attrs
}) => {
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
      <div className={formFieldStyles.inputGroup}>
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
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
    </div>
  );
};

export default BasicTextArea;

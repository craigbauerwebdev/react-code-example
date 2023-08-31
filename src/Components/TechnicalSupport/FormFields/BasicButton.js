import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import formFieldStyles from "./scss/form-fields.module.scss";

const BasicButton = ({
  label,
  type = "button",
  onClickFunction,
  classLevel = "primary",
  page = "Technical Support Form",
  componentType,
}) => {
  const buttonClassLevels = {
    primary: formFieldStyles.formButtonPrimary,
    secondary: formFieldStyles.formButtonSecondary,
    alternate: formFieldStyles.formButtonAlternate,
  };
  return (
    <OEPAnalytics
      page={page}
      componentType={componentType || "Button"}
      url={label}
      componentName={label}
    >
      <button
        className={buttonClassLevels[classLevel]}
        type={type}
        onClick={onClickFunction}
      >
        {label}
      </button>
    </OEPAnalytics>
  );
};

export default BasicButton;

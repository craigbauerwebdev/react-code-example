import { Hint, Label } from "@progress/kendo-react-labels";

import { RadioGroup } from "@progress/kendo-react-inputs";
import React from "react";
import accountProfileStyles from "./scss/account-profile.module.scss";

/**
 * TODO: fill out prop types and the settings? Do these value come for kendo?
 * @param {*} fieldRenderProps
 */
const FormRadioGroup = (fieldRenderProps) => {
  const {
    validationMessage,
    touched,
    id,
    label,
    layout,
    valid,
    disabled,
    hint,
    ...others
  } = fieldRenderProps;

  const hindId = `${id}_hint`;
  const labelId = label ? `${id}_label` : "";

  return (
    <div>
      <Label
        id={labelId}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        className={accountProfileStyles.displayNone}
      >
        {label}
      </Label>
      <RadioGroup
        id={id}
        ariaDescribedBy={hindId}
        ariaLabelledBy={labelId}
        valid={valid}
        disabled={disabled}
        layout={layout}
        {...others}
      />
      <Hint id={hindId} className={accountProfileStyles.displayNone}>
        {hint}
      </Hint>
    </div>
  );
};

export default FormRadioGroup;

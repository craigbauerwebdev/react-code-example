import { Field } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import React from "react";
import { Switch } from "@progress/kendo-react-inputs";
import settingStyles from "./scss/setting.module.scss";

/**
 * TODO: fill out prop types.
 * What does this do?
 * @param {*} param0
 */
const CustomSwitch = ({ onChange, value, onFocus, onBlur, id, editorId }) => {
  return (
    <div onFocus={onFocus} onBlur={onBlur}>
      <Switch
        onChange={onChange.bind(null, { value: !value })}
        checked={value}
        ariaLabelledBy={id}
        id={editorId}
      />
    </div>
  );
};

/**
 * TODO: fill out prop types.
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.label
 *
 */
const Setting = ({ name, label, onClick }) => {
  return (
    <div className={settingStyles.setting} onClick={onClick}>
      <Field
        name={name}
        id={`${name}-label`}
        editorId={`${name}-editor`}
        component={CustomSwitch}
      />
      <Label
        className={settingStyles.switchLabel}
        id={`${name}-label`}
        editorId={`${name}-editor`}
      >
        {label}
      </Label>
    </div>
  );
};

export default Setting;

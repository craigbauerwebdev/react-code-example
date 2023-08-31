import React from "react";
import ReactTooltip from "react-tooltip";
import isEmail from "validator/es/lib/isEmail";
import { loginActionTypes } from "./reducer";
import loginRectangleStyles from "./scss/login-form.module.scss";

const LoginInputs = ({ inputs, userNameError, dispatch, displayLabels }) => {
  const generateIds = (name) => {
    if (name) {
      return name.split(" ").join("-").toLowerCase();
    }
  };
  const handleChange = (name, e) => {
    const value = e.currentTarget.value;
    if (value) {
      switch (name?.toLowerCase()) {
        case "email address":
          if (isEmail(value)) {
            e.currentTarget.style = {};
            e.currentTarget.focus();
          }
          break;
        case "last name":
        case "confirmation number":
        case "registration number":
          e.currentTarget.style = {};
          e.currentTarget.focus();
          break;
        default:
          break;
      }
    }

    dispatch({
      type: loginActionTypes.UPDATE_INPUT,
      payload: {
        name,
        value: e.currentTarget.value,
      },
    });
  };

  return (
    <section>
      {inputs.map((input) => (
        <div className={loginRectangleStyles.loginFormFields} key={input.label}>
          <label
            htmlFor={generateIds(input.label)}
            className={loginRectangleStyles.loginFormLabel}
          >
            <span className={!displayLabels ? "sr-only" : ""}>
              {input.label} <span aria-hidden="true">*</span>
            </span>
          </label>
          <input
            data-tip={
              !input.value?.length
                ? `${input.label} is Required.`
                : input.label?.toLowerCase() === "email address" &&
                  isEmail(input.value)
                ? ""
                : "A Valid Email Address is Required."
            }
            aria-required="true"
            id={generateIds(input.label)}
            type={input.type}
            className={loginRectangleStyles.loginFormInput}
            value={input.value}
            onChange={handleChange.bind(null, input.label)}
            required={input.required}
            placeholder={input.placeholder}
            name={input.label}
          />
          {!input.value?.length && (
            <ReactTooltip
              type="error"
              textColor="#ffffff"
              backgroundColor="#000000"
            />
          )}
          {input.type === "email" && userNameError && (
            <div className={loginRectangleStyles.loginFormMessageError}>
              <p>{userNameError}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default LoginInputs;

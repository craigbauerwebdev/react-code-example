import React, { useState } from "react";

import BasicButton from "Components/TechnicalSupport/FormFields/BasicButton.js";
import BasicInput from "Components/TechnicalSupport/FormFields/BasicInput.js";
import BasicInputCheckboxSet from "Components/TechnicalSupport/FormFields/BasicInputCheckboxSet";
import BasicInputRadioSet from "Components/TechnicalSupport/FormFields/BasicInputRadioSet.js";
import BasicSelect from "Components/TechnicalSupport/FormFields/BasicSelect.js";
import BasicTextArea from "Components/TechnicalSupport/FormFields/BasicTextArea.js";
import axios from "axios";
import { debug } from "App";
import dompurify from "dompurify";
import lodash from "lodash";
import surveyStyles from "./scss/survey-form.module.scss";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const SurveyForm = ({
  config,
  closeModalFunction,
  sessionData = null,
  page = "Session Survey Form",
}) => {
  const user = useSelector((state) => state.global.user);
  const siteConfig = useSelector((state) => state.global.siteConfig);

  const sanitizer = dompurify.sanitize;
  const [processingSubmit, setProcessingSubmit] = useState(false); // Toggle for disabling submit button for form
  const [showError, setShowError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [formMessage, setFormMessage] = useState(null);
  /**
   * Updates the form data with a new value for a specific form field.
   *
   * @param {Object} event
   */
  const updateValue = (event) => {
    const { id, name, value: newValue, checked, type } = event.target;

    if (type === "checkbox") {
      setFormData((prevState) => {
        let currentList = prevState[name] || [];
        if (!currentList.includes(newValue) && checked) {
          currentList.push(sanitizer(newValue)); // Remove any XSS attacks from the values when storing
        } else if (currentList.includes(newValue) && !checked) {
          currentList = currentList.filter((item) => item !== newValue);
        }
        return {
          ...prevState,
          [name]: currentList,
        };
      });
    } else if (type === "radio") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: sanitizer(newValue), // Remove any XSS attacks from the values when storing
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: sanitizer(newValue), // Remove any XSS attacks from the values when storing
      }));
    }
  };

  const renderField = (field, key) => {
    if (field.inputType === "dropdown") {
      return (
        <BasicSelect
          key={key}
          id={`session-survey-queston-${key}`}
          label={field.label}
          required={field.required === "true" || field.required === true}
          options={field.options}
          classNames={surveyStyles.rowWrapper}
          selectedOptionValue={formData[`session-survey-queston-${key}`]}
          placeholder={field.placeHolder}
          helpMessage={field.helpText}
          errorMessage={
            showError &&
            !formData[`session-survey-queston-${key}`] &&
            field.errorMessage
          }
          onChange={updateValue}
          isSurvey
        />
      );
    } else if (field.inputType === "radio") {
      return (
        <BasicInputRadioSet
          key={key}
          type={field.inputType}
          id={`session-survey-queston-${key}`}
          label={field.label}
          required={field.required === "true" || field.required === true}
          classNames={surveyStyles.rowWrapper}
          options={field.options}
          value={formData[`session-survey-queston-${key}`]}
          helpMessage={field.description}
          errorMessage={
            showError &&
            !formData[`session-survey-queston-${key}`] &&
            field.errorMessage
          }
          onChange={updateValue}
        />
      );
    } else if (field.inputType === "checkbox") {
      return (
        <BasicInputCheckboxSet
          key={key}
          type={field.inputType}
          id={`session-survey-queston-${key}`}
          label={field.label}
          required={field.required === "true" || field.required === true}
          classNames={surveyStyles.rowWrapper}
          options={field.options}
          values={formData[`session-survey-queston-${key}`]}
          helpMessage={field.description}
          onChange={updateValue}
        />
      );
    } else if (field.inputType === "text_area") {
      return (
        <BasicTextArea
          key={key}
          id={`session-survey-queston-${key}`}
          label={field.label}
          required={field.required === "true" || field.required === true}
          classNames={`${surveyStyles.rowWrapper} ${surveyStyles.rowWrapperVertical}`}
          value={formData[`session-survey-queston-${key}`]}
          placeholder={field.placeHolder}
          helpMessage={field.description}
          errorMessage={
            showError &&
            !formData[`session-survey-queston-${key}`] &&
            field.errorMessage
          }
          onChange={updateValue}
          rows={10}
        />
      );
    }

    return (
      <BasicInput
        key={key}
        type={field.inputType === "text_input" ? "text" : field.inputType}
        id={`session-survey-queston-${key}`}
        label={field.label}
        required={field.required === "true" || field.required === true}
        classNames={surveyStyles.rowWrapper}
        value={formData[`session-survey-queston-${key}`]}
        helpMessage={field.description}
        placeholder={field.placeHolder}
        errorMessage={
          showError &&
          !formData[`session-survey-queston-${key}`] &&
          field.errorMessage
        }
        onChange={updateValue}
      />
    );
  };

  const cancelForm = () => {
    if (typeof closeModalFunction === "function") {
      closeModalFunction();
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    const requiredFields = config.details
      .map((question, key) => {
        question.id = `session-survey-queston-${key}`;
        return question;
      })
      .filter((question) => question.required);

    // Check if all required fields are filled in.
    const areAllRequiredFieldsFilled = Object.values(requiredFields).every(
      (formItem) => formData[formItem.id]
    );

    // If not all required fields are filled in, set the error message and stop the form processing.
    if (!areAllRequiredFieldsFilled) {
      setShowError(true);
      return;
    }

    setProcessingSubmit(true); // Disable the submit button

    const formattedData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          const valueAsAString = value.join(",");
          return { ...acc, [key]: valueAsAString };
        }
        return { ...acc, [key]: value };
      },
      {}
    );

    // This sort needs to match how it is sorted when displayed
    const answers = lodash.sortBy(config.details, "sortOrder").map((q, key) => {
      return {
        sortOrder: q.sortOrder,
        question: q.label,
        questionType: q.inputType,
        answer: formattedData[`session-survey-queston-${key}`],
      };
    });

    const formattedFormData = {
      eventName: siteConfig.eventInfo.name,
      fuzionEventId: process.env.REACT_APP_FUZION_EVENT_ID,
      surveySlug: config.slug,
      answers: answers,
      timestamp: new Date(), // Include timestamp of when the submission occurs
      sessionId: sessionData?.sessionId || null, // Include the session ID (if applicable)
      surveySubmissionId: nanoid(),
      user: {
        id: user.fuzion_attendee_id,
        region: user.region,
        language: user.language,
      }, // Include Registrant data (e.g. user)
    };

    axios
      .post(`${process.env.REACT_APP_API_HOST}/survey`, formattedFormData)
      .then((res) => {
        if (
          res.status === 200 &&
          !res.isError &&
          !res.data?.isError &&
          !res.data?.error
        ) {
          setFormMessage(
            config.confirmationMessage ||
              "Success: Your survey has been submitted!"
          );
          setFormData({}); // Clear the form data back to initial values
          setFormSubmitted(true); // This will force the pre-populated fields to re-populate with the detected data
          setProcessingSubmit(false); // Enable the submit button
        } else {
          debug(res);
          setFormMessage(`Error: ${res}`);
          setProcessingSubmit(false); // Enable the submit button
        }
      })
      .catch((error) => {
        debug(error);
        setFormMessage(`Error During Submission: ${error}`);
        setProcessingSubmit(false); // Enable the submit button
      });
  };

  return user ? (
    <section className={surveyStyles.formWrapper}>
      {formSubmitted ? (
        <div className={surveyStyles.submitPostMessage}>{formMessage}</div>
      ) : (
        <React.Fragment>
          {config.title && (
            <div className={surveyStyles.formTitle}>{config.title}</div>
          )}
          {config.description && (
            <div className={surveyStyles.formDescription}>
              {config.description}
            </div>
          )}
          {formMessage && (
            <div
              id="generalError"
              role="alert"
              className={`${surveyStyles.submitPostMessage} ${surveyStyles.submitPostMessageError}`}
            >
              {formMessage}
            </div>
          )}
          <form onSubmit={submitForm}>
            <div
              className={`${surveyStyles.formGridWrapper} ${surveyStyles.gridTwoColumn}`}
            >
              {config.details &&
                lodash
                  .sortBy(config.details, "sortOrder")
                  .map((field, key) => renderField(field, key))}
            </div>

            <div className={surveyStyles.buttonRowWrapper}>
              <BasicButton
                label="Cancel"
                onClickFunction={cancelForm}
                classLevel="alternate"
                page={page}
                componentType="Survey"
              />
              <BasicButton
                label="Submit"
                type="submit"
                disabled={processingSubmit}
                page={page}
                componentType="Survey"
              />
            </div>
          </form>
        </React.Fragment>
      )}
    </section>
  ) : (
    <section>
      <div className={surveyStyles.errorTitle}>Please Sign In</div>
      Please sign in to use this feature.
    </section>
  );
};

export default SurveyForm;

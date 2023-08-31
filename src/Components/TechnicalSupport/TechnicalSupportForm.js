import React, { useEffect, useState } from "react";
import {
  detectDevice,
  detectOperatingSystem,
} from "util/checkForOperatingSystem";

import BasicButton from "./FormFields/BasicButton.js";
import BasicInput from "./FormFields/BasicInput.js";
import BasicSelect from "./FormFields/BasicSelect.js";
import BasicTextArea from "./FormFields/BasicTextArea.js";
// import LinkWrapper from "Components/LinkWrapper/LinkWrapper.js";
import axios from "axios";
import { debug } from "App";
import { detectBrowser } from "util/checkForBrowser";
import dompurify from "dompurify";
import isEmail from "validator/es/lib/isEmail";
import staticData from "./TechnicalSupport.data.js";
import technicalSupportStyles from "./scss/technical-support.module.scss";
import { useSelector } from "react-redux";

/**
 * Form where a user can fill out information regarding a techincal issue they are having with the site.
 * The form will send ticket data to a support team/ticket system that includes the information provided by the user.
 *
 * Note: the following needs to be configured:
 * process.env.FD_API_KEY - API - The FreshDesk API key
 * process.env.REACT_APP_EVENT_URL - UI - The current base URL of the site
 *
 * @param user The user information
 * @param referrerUrl The referrer URL that will be passed into the data sent out.
 */
const TechnicalSupportForm = ({
  user,
  referrerUrl,
  isModal,
  closeModalFunction,
}) => {
  // https://github.com/Klowd/onlineeventpro-product-ui/wiki/Site-Config
  const eventName = useSelector((state) => state.global.siteConfig); // Liferay Site Config data - used to determine the event name/slug/id
  const sanitizer = dompurify.sanitize;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    showNameOrId: null,
    emailAddress: "",
    name: "",
    phoneNumber: "",
    problemArea: "", // Must set to "" for select fields
    device: "", // Must set to "" for select fields
    browser: "", // Must set to "" for select fields
    operatingSystem: "", // Must set to "" for select fields
    description: "",
    referrerUrl: null,
  }); // Set of form fields and "hidden" fields that will be passed through to Freshdesk

  const [formErrors, setFormErrors] = useState(null); // Set of form field errors
  const [processingSubmit, setProcessingSubmit] = useState(false); // Toggle for disabling submit button for form
  const [successfulSubmission, setSuccessfulSubmission] = useState(false); // Toggle for success alert message visibility

  /**
   * Updates the show data when available
   */
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      showNameOrId: eventName?.eventInfo?.name.toUpperCase(), // Default to the event's name in liferay
    }));
  }, [eventName, formSubmitted]);

  /**
   * Updates the user data for the form when available
   */
  useEffect(() => {
    const userPhone =
      user?.contact?.phone_number ||
      user?.contact?.mobile_number ||
      user?.contact?.other_phone_number;
    setFormData((prevState) => ({
      ...prevState,
      emailAddress: user?.contact?.email || "", // Default to user email address if available
      name:
        user?.contact?.first_name && user?.contact?.last_name
          ? `${user?.contact?.first_name} ${user?.contact?.last_name}`
          : "", // Default to user's name if available
      phoneNumber: userPhone || "", // Default to a user's phone number if available (main, mobile, or other)
    }));
  }, [user, formSubmitted]);

  /**
   * Updates the referrer URL data when available
   */
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      referrerUrl: referrerUrl, // Default to the provided referrer URL
    }));
  }, [referrerUrl, formSubmitted]);

  /**
   * Detects the browser, OS, and device and updates the fields when applicable
   */
  useEffect(() => {
    const browserDetected = detectBrowser();
    const osDetected = detectOperatingSystem();
    const deviceDetected = detectDevice();

    const detectedBrowserExistsInOptions = staticData.browserOptions
      .map((opt) => opt.value)
      .includes(browserDetected);
    const detectedOsExistsInOptions = staticData.operatingSystemOptions
      .map((opt) => opt.value)
      .includes(osDetected);
    const detectedDeviceExistsInOptions = staticData.deviceOptions
      .map((opt) => opt.value)
      .includes(deviceDetected);

    setFormData((prevState) => ({
      ...prevState,
      browser: detectedBrowserExistsInOptions ? browserDetected : "other", // Default to the detected browser
      operatingSystem: detectedOsExistsInOptions ? osDetected : "other", // Default to the detected operating system
      device: detectedDeviceExistsInOptions ? deviceDetected : "other", // Default to the detected device
    }));
  }, [formSubmitted]);

  /**
   * Updates the form data with a new value for a specific form field.
   *
   * @param {Object} event
   */
  const updateValue = (event) => {
    const { id, value: newValue } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: sanitizer(newValue), // Remove any XSS attacks from the values when storing
    }));

    setFormErrors(null);
  };

  /**
   * Validates the string to be alphnumeric.
   *
   * @param {string} val
   */
  const isAlphaNumeric = (val) => {
    return /[a-zA-Z0-9 -]/g.test(val);
  };

  /**
   * Validates a phone number based on US phone number patterns.
   *
   * @param {string} val The phone number to evaluate
   */
  const isPhoneNumber = (val) => {
    return /^([+]?\d{1,2}[.\s])?\(?([0-9]{3})\)?[-+x.●\s]?([0-9]{3})[-+x.●\s]?([0-9]{4})[x]?[0-9]*$/gim.test(
      val
    );
  };

  /**
   * Validates the selected option for a dropdown form field.
   *
   * @param {string} value The current value for the dropdown to evaluate
   * @param {Array} options The list of options available
   * @param {boolean} required Is the dropdown form field required or not
   */
  const validateSelectField = (value, options, required = false) => {
    return (
      (required && !value) || !options.map((opt) => opt.value).includes(value)
    );
  };

  /**
   * Performs validation checks against the form data in formData object.
   * Returns flag if the data is valid or not.
   */
  const checkForValidForm = () => {
    let validForm = true;
    /**
     * TODO: do validation on element blur to avoid long validation block
     * use HTML patter attributes for validation https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
     * move all this logic to a local reducer to manger state better
     */
    if (!formData["emailAddress"]) {
      setFormErrors((prevState) => ({
        ...prevState,
        emailAddress: "Please provide an email address.",
      }));
      validForm = false;
    }

    if (!isEmail(formData["emailAddress"])) {
      setFormErrors((prevState) => ({
        ...prevState,
        emailAddress: "Please provide a valid email address.",
      }));
      validForm = false;
    }

    if (!formData["name"]) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "Please provide your name.",
      }));
      validForm = false;
    }

    if (formData["name"] && !isAlphaNumeric(formData["name"])) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "Please provide your name.",
      }));
      validForm = false;
    }

    if (formData["phoneNumber"] && !isPhoneNumber(formData["phoneNumber"])) {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Please provide a valid phone number.",
      }));
      validForm = false;
    }

    if (
      validateSelectField(
        formData["problemArea"],
        staticData.problemAreaOptions,
        true
      )
    ) {
      setFormErrors((prevState) => ({
        ...prevState,
        problemArea: "Please select a valid problem area.",
      }));
      validForm = false;
    }

    if (
      validateSelectField(formData["device"], staticData.deviceOptions, true)
    ) {
      setFormErrors((prevState) => ({
        ...prevState,
        problemArea: "Please select a valid device.",
      }));
      validForm = false;
    }

    if (
      validateSelectField(formData["browser"], staticData.browserOptions, true)
    ) {
      setFormErrors((prevState) => ({
        ...prevState,
        problemArea: "Please select a valid browser.",
      }));
      validForm = false;
    }

    if (
      validateSelectField(
        formData["operatingSystem"],
        staticData.operatingSystemOptions,
        true
      )
    ) {
      setFormErrors((prevState) => ({
        ...prevState,
        problemArea: "Please select a valid operating system.",
      }));
      validForm = false;
    }

    if (!formData["description"]) {
      setFormErrors((prevState) => ({
        ...prevState,
        description: "Please provide a description.",
      }));
      validForm = false;
    }

    return validForm;
  };

  /**
   * Sets the error message that will appear at the beginning of the form and changes the focus to that message.
   *
   * @param {string} errorMessage The message that will appear inside the alert.
   */
  const setGeneralError = (errorMessage) => {
    setSuccessfulSubmission(false);
    setFormErrors((prevState) => ({
      ...prevState,
      general: errorMessage,
    }));

    // Change focus to the top most error on the page
    const errorElement = document.getElementById("generalError");

    if (errorElement) {
      errorElement.focus();
    }
  };

  /**
   * Sets the success message that will appear at the beginning of the form and changes the focus to that message.
   *
   * @param {string} successMessage The message that will appear inside the alert.
   */
  const setGeneralSuccess = (successMessage) => {
    setSuccessfulSubmission(successMessage);
    setFormErrors(null);

    // Change focus to the top most alert on the page
    const successElement = document.getElementById("generalSuccess");

    if (successElement) {
      successElement.focus();
    }
  };

  const cancelSupportForm = () => {
    if (typeof closeModalFunction === "function") {
      closeModalFunction();
    }
    if (referrerUrl && !isModal) {
      window.history.back();
    }
  };

  /**
   * Validates the form fields for errors during submission.
   * If no errors are present, it will build a ticket and send it to the support team.
   * Otherwise, it will trigger error message(s) to display.
   *
   * @param {Object} event
   */
  const submitSupportForm = (event) => {
    event.preventDefault();

    setProcessingSubmit(true);

    if (checkForValidForm()) {
      // Clear the form of errors in case anything was left over
      setFormErrors(null);

      const operatingSystem = staticData.operatingSystemOptions.find(
        (item) => item.value === formData.operatingSystem
      );
      const browser = staticData.browserOptions.find(
        (item) => item.value === formData.browser
      );
      const device = staticData.deviceOptions.find(
        (item) => item.value === formData.device
      );
      const problemArea = staticData.problemAreaOptions.find(
        (item) => item.value === formData.problemArea
      );

      // Clean up the data before sending to API
      const cleanShowNameOrId = sanitizer(formData.showNameOrId);
      const cleanReferrerUrl = sanitizer(formData.referrerUrl);
      const cleanName = sanitizer(formData.name);
      const cleanEmail = sanitizer(formData.emailAddress);
      const cleanPhone = sanitizer(formData.phoneNumber);
      const cleanDescription = sanitizer(formData.description);

      const msg = {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        type: problemArea.label,
        subject: `${cleanShowNameOrId} - ${problemArea.label}`,
        tags: ["Support Form"],
        description: `<p>This attendee is asking for technical help with the following information:</p>
                <ul>
                    <li>Show Name/ID: ${cleanShowNameOrId}</li>
                    <li>Show URL: ${process.env.REACT_APP_EVENT_URL}</li>
                    <li>Referrer URL: ${cleanReferrerUrl}</li>
                    <li>Email Address: ${cleanEmail}</li>
                    <li>Name: ${cleanName}</li>
                    <li>Phone Number: ${cleanPhone}</li>
                    <li>Problem Area: ${problemArea.label} [${formData.problemArea}]</li>
                    <li>Device: ${device.label} [${formData.device}]</li>
                    <li>Browser: ${browser.label} [${formData.browser}]</li>
                    <li>Operating System: ${operatingSystem.label} [${formData.operatingSystem}]</li>
                    <li>Description: ${cleanDescription}</li>
                </ul>`,
      };

      debug(
        `${staticData.technicalSupportFormTitle} - Valid Form - message`,
        msg
      );

      axios
        .post(`${process.env.REACT_APP_API_HOST}/createTicket`, msg)
        .then((res) => {
          debug("Create Ticket Response", res);
          if (res.status === 200 && !res.data.isError && !res.data.error) {
            setGeneralSuccess(
              "Success: Your support question has been submitted!"
            );
          } else {
            debug(res.data.message);
            setGeneralError("Error: Please try to submit again!");
          }
        });
      // Clear the form data back to initial values
      setFormData({
        showNameOrId: null,
        emailAddress: "",
        name: "",
        phoneNumber: "",
        problemArea: "", // Must set to "" for select fields
        device: "", // Must set to "" for select fields
        browser: "", // Must set to "" for select fields
        operatingSystem: "", // Must set to "" for select fields
        description: "",
        referrerUrl: null,
      });

      // This will force the pre-populated fields to re-populate with the detected data
      setFormSubmitted(true);
    } else {
      debug(
        `${staticData.technicalSupportFormTitle} - Invalid Form - data`,
        formData
      );

      setGeneralError("General error occurred. Please review.");
    }

    setProcessingSubmit(false);
  };

  /**
   * Renders a form field based on the form field data provided.
   *
   * @param {Object} field
   * @param {string} key
   */
  const renderField = (field, key) => {
    if (field) {
      if (!field.type || ["text", "email", "tel"].includes(field.type)) {
        return (
          <BasicInput
            key={key}
            type={field.type}
            id={field.id}
            label={field.label}
            required={field.required === "true" || field.required === true}
            classNames={technicalSupportStyles.rowWrapper}
            errorMessage={formErrors && formErrors[field.id]}
            value={formData[field.id]}
            helpMessage={field.helpText}
            placeholder={field.placeHolder}
            onChange={updateValue}
          />
        );
      } else if (field.type === "dropdown") {
        return (
          <BasicSelect
            key={key}
            id={field.id}
            label={field.label}
            required={field.required === "true" || field.required === true}
            options={field.options}
            classNames={technicalSupportStyles.rowWrapper}
            errorMessage={formErrors && formErrors[field.id]}
            selectedOptionValue={formData[field.id]}
            helpMessage={field.helpText}
            placeholder={field.placeHolder || "Select"}
            onChange={updateValue}
          />
        );
      }
    }
  };

  return (
    <section className={technicalSupportStyles.supportFormWrapper}>
      {!isModal && <h1>{staticData.technicalSupportFormTitle}</h1>}
      <form onSubmit={submitSupportForm} noValidate>
        {successfulSubmission && (
          <div
            id="generalSuccess"
            role="alert"
            className={`${technicalSupportStyles.formGeneralAlert} ${technicalSupportStyles.formGeneralSuccessAlert}`}
          >
            {successfulSubmission}
          </div>
        )}
        {formErrors && Object.keys(formErrors).includes("general") && (
          <div
            id="generalError"
            role="alert"
            className={`${technicalSupportStyles.formGeneralAlert} ${technicalSupportStyles.formGeneralErrorAlert}`}
          >
            {formErrors["general"]}
          </div>
        )}
        <div
          className={`${technicalSupportStyles.formGridWrapper} ${technicalSupportStyles.gridTwoColumn}`}
        >
          {staticData?.formFields.map((field, index) =>
            renderField(field, index)
          )}
        </div>
        <div className={technicalSupportStyles.formGridWrapper}>
          <BasicTextArea
            id="description"
            label="Description"
            rows={10}
            required={true}
            classNames={`${technicalSupportStyles.rowWrapper} ${technicalSupportStyles.rowWrapperVertical}`}
            errorMessage={formErrors && formErrors["description"]}
            value={formData["description"]}
            placeholder="Explain your technical issue here..."
            onChange={updateValue}
          />
        </div>
        <div className={technicalSupportStyles.buttonRowWrapper}>
          {(referrerUrl || isModal) && (
            <BasicButton
              label="Cancel"
              onClickFunction={cancelSupportForm}
              classLevel="secondary"
            />
          )}
          <BasicButton
            label="Submit"
            type="submit"
            disabled={processingSubmit}
          />
        </div>
      </form>
    </section>
  );
};

export default TechnicalSupportForm;

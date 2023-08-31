/**
 * Format login data from Liferay.
 * Split up data so we can loop out the filed in the component.
 * @param {object} data
 */
export default function formatLogin(data) {
  const { login } = data;
  // Setting used for both login and logout page
  const settings = {
    loginPageBackgroundColor: login.loginPageBackgroundColor,
    loginPageBackgroundImageURL: login.loginPageBackgroundImageURL,
  };
  const loginRemap = {
    // Login page settings
    pageSettings: {
      loginFormAlignment: login.loginFormAlignment,
      loginLogoImageURL: login.loginLogoImageURL,
      loginLogoImageAltText: login.loginLogoImageAltText,
      loginHeaderText: login.loginHeaderText,
      displayInputLabels: login.displayInputLabels,
      loginFooterText: login.loginFooterText,
    },
    // Currently supported inputs from Liferay
    inputs: [
      {
        label: login.input1Labelemailaddress,
        required: login.input1Required,
        placeholder: login.input1PlaceholderText,
        type: "email",
        value: "",
      },
      {
        label: login.input2LabelConfirmationNumberorBadgeID,
        required: login.input2Required,
        placeholder: login.input2PlaceholderText,
        type: "text",
        value: "",
      },
    ],
    // Currently Supported buttons from Liferay.
    buttons: [
      {
        name: login.loginButtonLabel,
        type: "login",
      },
      {
        name: login.registerNowButtonLabel,
        type: "register",
        url: login.registerNowButtonURL,
      },
      {
        name: login.forgotConfirmationNumberButtonLabel,
        type: "forgot",
        url: login.forgotConfirmationNumberURL,
      },
    ],
  };

  return {
    settings,
    messages: data.messages,
    logout: data.logout,
    login: loginRemap,
    redirect: data.redirects,
  };
}

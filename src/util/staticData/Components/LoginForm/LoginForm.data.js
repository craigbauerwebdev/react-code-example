const logInData = {
  messages: {
    "1_authentication_error":
      "Means an issue occured while attempting to respond to the Client Auth Services Request.",
    "2_non_authenticated":
      "Means that the response from the Client Auth Services Request that the user was is not be authenticated.",
    "3_user_generation":
      "For just in time user creation, a user has been added to Fuzion.",
    "4_basic_authentication":
      "User is Authorized.  We pass back an encoded message with user information and a refresh? bool instructing the front end to fetch additional data from Fuzion or not.",
    "5_authorization_error":
      "An error occurred while checking if an Authenticated user exists in Fuzion.",
    "6_non_authorized": "An authenticated user does not exist in Fuzion.",
    "7_event_coming_soon": "Event not open Front end uses custom text.",
    "8_event_closed": "Event not open Front end uses custom text.",
  },
  settings: {
    loginPageBackgroundImageURL:
      "https://res.cloudinary.com/freemanoeptest/image/upload/v1604419003/Demosite/Login%20Images/register-bkgnd-img-1_e1rqbg.png",
    loginPageBackgroundColor: "#0066B2",
  },
  login: {
    pageSettings: {
      loginFormAlignment: "left",
      loginLogoImageURL:
        "https://res.cloudinary.com/freemanoeptest/image/upload/v1601576274/Demosite/Liferay%20Site%20Config/your-event_vxndpj.png",
      loginLogoImageAltText: "Your Event LIVE!",
      loginHeaderText: "Sign In",
      displayInputLabels: true,
      loginFooterText:
        'The process of resetting your password is handled through a third-party authentication service. Clicking <a href="#"> Forget Password?</a> will redirect you to this service.',
    },
    inputs: [
      {
        label: "Email Address",
        required: true,
        placeholder: "Enter Email Address",
        type: "email",
        value: "",
      },
      {
        label: "Confirmation Number",
        required: true,
        placeholder: "Enter Confirmation Number",
        type: "text",
        value: "",
      },
    ],
    buttons: [
      {
        name: "Sign In",
        type: "login",
      },
      {
        name: "Still need to register? Click here",
        type: "register",
        url: "",
      },
      {
        name: "Forgot Confirmation Number?",
        type: "forgot",
        url: "https://xpressreg.net/register/sale1120/resend-confirmation.asp",
      },
    ],
  },
  logout: {
    primaryText: "You are currently signed out.",
    subtext: "Click below to sign back in.",
    buttonLabel: "Sign In",
    buttonURL: "/login",
  },
};

export default {
  logInData,
};

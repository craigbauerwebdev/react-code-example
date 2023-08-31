import axios from "axios";
import { debug } from "../../../App";
import isEmail from "validator/es/lib/isEmail";

export default function forgotConfirmationEmail({ emailAddress }, callback) {
  const msg = {
    to: `${process.env.REACT_APP_EMAIL_TO}`,
    from: `${process.env.REACT_APP_EMAIL_FROM}`,
    subject: `${process.env.REACT_APP_EMAIL_SUBJECT}`,
    text: "Request Confirmation Number",
    html: `This attendee is requesting their registration number : <strong>${emailAddress}</strong>`,
  };
  if (isEmail(emailAddress)) {
    debug("Forgot confirmation number - message", msg);

    axios
      .post(`${process.env.REACT_APP_API_HOST}/requestMail`, { msg })
      .then((res) => {
        debug("Request Mail Response", res);
        if (res.status === 200 && !res.data.isError) {
          callback({ success: true });
        } else {
          callback({ success: false, message: res.data.message });
        }
      });
  } else {
    callback({
      success: false,
      userName: true,
      message: "Please enter a valid email address",
    });
  }
}

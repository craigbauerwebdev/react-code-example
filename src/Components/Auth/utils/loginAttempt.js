import { debug } from "../../../App";
import isEmail from "validator/es/lib/isEmail";

/**
 * Try to login
 * @param {string} emailAddress
 * @param {string} confirmationNumber
 * @param {function} onLogin
 * @param {function} callBack
 */
const loginAttempt = async (
  { emailAddress, confirmationNumber, onLogin, recapToken },
  callBack
) => {
  try {
    if (!isEmail(emailAddress)) {
      throw new Error("Please enter a valid email address");
    }

    const payload = {
      userName: emailAddress.trim(),
      password: confirmationNumber.trim(),
      recapToken: recapToken,
    };
    const user = await onLogin(payload);
    if (!user || user.isError) {
      debug("Login error - failed to log user in", user);
      const { response_type } = user;

      callBack({
        response_type,
      });
    }
  } catch (error) {
    debug("User authentication failed", error);
    callBack({
      message: error.message || error.errorMessage,
    });
  }
};

export default loginAttempt;

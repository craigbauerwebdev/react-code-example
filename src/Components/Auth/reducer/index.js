import updateInputs from "./utils/updateInputs";

export const loginActionTypes = {
  UPDATE_INPUT: "UPDATE_INPUT",
  SET_DATA: "SET_DATA",
  SET_BUTTONS: "SET_BUTTONS",
  SUBMIT_FORM: "SUBMIT_FORM",
  ERROR_MESSAGE: "ERROR_MESSAGE",
  FORGOT_CONFIRMATION: "FORGOT_CONFIRMATION",
  FORGOT_SUCCESS: "FORGOT_SUCCESS",
  USER_NAME_ERROR: "USER_NAME_ERROR",
};

export const loginIntState = {
  inputs: null,
  emailAddress: null,
  confirmationNumber: null,
  disableLoginBtn: false,
  generalMessage: null,
  userNameError: null,
  showForgotRequestSuccess: false,
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case loginActionTypes.SET_DATA:
      return {
        ...state,
        inputs: action.payload.inputs,
      };
    case loginActionTypes.UPDATE_INPUT:
      return updateInputs(state, action.payload);
    case loginActionTypes.SUBMIT_FORM:
      return {
        ...state,
        generalMessage: null,
        disableLoginBtn: true,
        userNameError: null,
        showForgotRequestSuccess: false,
      };
    case loginActionTypes.ERROR_MESSAGE:
      return {
        ...state,
        generalMessage: action.payload,
        disableLoginBtn: false,
      };
    case loginActionTypes.FORGOT_CONFIRMATION:
      return {
        ...state,
        userNameError: null,
        generalMessage: null,
        showForgotRequestSuccess: false,
      };
    case loginActionTypes.FORGOT_SUCCESS:
      return {
        ...state,
        showForgotRequestSuccess: true,
      };
    case loginActionTypes.USER_NAME_ERROR:
      return {
        ...state,
        userNameError: action.payload,
        showForgotRequestSuccess: false,
      };
    default:
      return {
        ...state,
      };
  }
};

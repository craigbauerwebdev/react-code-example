import "purecss";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./wdyr";

import * as serviceWorker from "./serviceWorker";

import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import App from "./App";
import Auth from "./services/Auth";
import ConfigService from "services/ConfigService";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
// @eslint-ignore
import axios from "axios";
import chatReducer from "Components/Chat/store/reducers";
import chimeMeetingReducer from "Components/Meeting/store/reducer";
import filterReducer from "Components/Filters/store/reducer";
import profileReducer from "Components/Profile/store/reducer";
import reducer from "./store/reducers";
import thunk from "redux-thunk";

//import { stopReportingRuntimeErrors } from "react-error-overlay";

// This will disable error overlays because this information will be displayed by ErrorBoundary component
// if (process.env.NODE_ENV === "development") {
// For some reason this is causing an issue when saving css files the app goes blank and throws an error.
//TODO: look into error on save for scss files
// stopReportingRuntimeErrors(); // disables error overlays
// }

const hasExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers =
  process.env.NODE_ENV === "development" && hasExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

/**
 * fetch and set the user token for the auth header
 */
axios.interceptors.request.use(async (config) => {
  const user = Auth.load();
  if (user) {
    config.headers.common["x-oep-auth"] = user.authToken;
  }
  return config;
});

(async () => {
  const result = await ConfigService.init();
  // eslint-disable-next-line no-console
  console.log({ result });
})();

// eslint-disable-next-line no-console
console.log({
  run: ConfigService.runValues,
});

const rootReducer = combineReducers({
  global: reducer,
  filters: filterReducer,
  chat: chatReducer,
  profile: profileReducer,
  chimeMeeting: chimeMeetingReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

if (process.env.NODE_ENV === "development") {
  import("react-axe").then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

export default store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

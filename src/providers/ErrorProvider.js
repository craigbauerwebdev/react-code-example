import React, { useState } from "react";
const context = React.createContext({
  errorMessage: "",
  updateErrorMessage: (_) => {},
});
export function getErrorContext() {
  return context;
}
export default function ErrorProvider({ children }) {
  const [errorMessage, setErrorMesage] = useState("");
  const ErrorContext = getErrorContext();
  const updateErrorMessage = (message) => {
    setErrorMesage(message);
  };
  const providerValue = {
    errorMessage,
    updateErrorMessage,
  };
  return React.createElement(
    ErrorContext.Provider,
    { value: providerValue },
    children
  );
}
//# sourceMappingURL=ErrorProvider.js.map

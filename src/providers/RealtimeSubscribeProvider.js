import React from "react";
import { RealTimeSubscribeChatStateProvider } from "./RealtimeSubscribeChatProvider";
import { useContext } from "react";

export const RealTimeSubscribeStateContext = React.createContext(null);

export const useRealTimeSubscribeState = () => {
  const state = useContext(RealTimeSubscribeStateContext);
  if (!state) {
    throw new Error("Error using RealTimeSubscribeState context!");
  }
  return state;
};

export const RealTimeSubscribeStateProvider = ({ children }) => {
  const providerValue = {};

  return React.createElement(
    RealTimeSubscribeStateContext.Provider,
    { value: providerValue },
    React.createElement(RealTimeSubscribeChatStateProvider, null, children)
  );
};
//# sourceMappingURL=RealtimeSubscribeProvider.js.map

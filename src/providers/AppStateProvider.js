import React, { useContext, useState } from "react";

const AppStateContext = React.createContext(null);

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return state;
}

const query = new URLSearchParams(window.location.search);
// TODO: document me how do I work?
export function AppStateProvider({ children }) {
  const [meetingId, setMeeting] = useState(query.get("meetingId") || "");
  const [region, setRegion] = useState(query.get("region") || "");
  const [localUserName, setLocalName] = useState("");
  const [theme] = useState(() => {
    return "dark";
  });
  const setAppMeetingInfo = (meetingId, name, region) => {
    setRegion(region);
    setMeeting(meetingId);
    setLocalName(name);
  };
  const providerValue = {
    meetingId,
    localUserName,
    theme,
    region,
    setAppMeetingInfo,
  };
  return React.createElement(
    AppStateContext.Provider,
    { value: providerValue },
    children
  );
}
//# sourceMappingURL=AppStateProvider.js.map

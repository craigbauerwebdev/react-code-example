import { useContext, useEffect, useState } from "react";

import React from "react";
import { useAppState } from "./AppStateProvider";
import { useAudioVideo } from "../lib/chimeComponents";
import { v4 } from "uuid";

const RealTimeSubscribeChatStateContext = React.createContext(null);

export const useRealTimeSubscribeChatState = () => {
  const state = useContext(RealTimeSubscribeChatStateContext);
  if (!state) {
    throw new Error("Error using RealTmeSubscribe in context!");
  }
  return state;
};

export const RealTimeSubscribeChatStateProvider = ({ children }) => {
  const audioVideo = useAudioVideo();
  const { localUserName } = useAppState();
  const [chatData, setChatData] = useState([]);
  const sendChatData = (text) => {
    const mess = {
      uuid: v4(),
      action: "sendmessage",
      cmd: "TEXT",
      data: text,
      createdDate: new Date().getTime(),
      senderName: localUserName,
    };
    audioVideo === null || audioVideo === void 0
      ? void 0
      : audioVideo.realtimeSendDataMessage("CHAT", JSON.stringify(mess));
    setChatData([...chatData, mess]);
  };
  const receiveChatData = (mess) => {
    const data = JSON.parse(mess.text());
    setChatData([...chatData, data]);
  };
  const providerValue = {
    chatData,
    sendChatData,
  };

  useEffect(() => {
    audioVideo === null || audioVideo === void 0
      ? void 0
      : audioVideo.realtimeSubscribeToReceiveDataMessage(
          "CHAT",
          receiveChatData
        );
    return () => {
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.realtimeUnsubscribeFromReceiveDataMessage("CHAT");
    };
  });

  return React.createElement(
    RealTimeSubscribeChatStateContext.Provider,
    { value: providerValue },
    children
  );
};
//# sourceMappingURL=RealtimeSubscribeChatProvider.js.map

import {
  ChatBubble,
  ChatBubbleContainer,
} from "../../../../lib/chimeComponents";
import { Roster, RosterHeader } from "../../../../lib/chimeComponents";

import LiveStreamChat from "../../../../Components/Chat/LiveStreamChat";
import React from "react";
import chatViewStyle from "./scss/chat-view.module.scss";
import { useAppState } from "../../../../providers/AppStateProvider";
import { useNavigation } from "../../../../providers/NavigationProvider";
import { useRealTimeSubscribeChatState } from "providers/RealtimeSubscribeChatProvider";
import { useSelector } from "react-redux";

const bubbleStyles = `
  margin: 1rem;
`;

const ChatView = ({ meeting }) => {
  const { localUserName } = useAppState();
  const { closeChat, refreshChat } = useNavigation();
  const {
    chatData,
    //   sendChatData
  } = useRealTimeSubscribeChatState();

  //const [chatMessage, setChatMessage] = useState("");
  /** @type {User} */
  const user = useSelector((state) => state.global.user);

  const attendeeItems = [];

  for (let c of chatData) {
    const senderName = c.senderName;
    // eslint-disable-next-line no-unused-vars
    const text = c.data;
    const time = new Date(c.createdDate).toLocaleTimeString("en-US");
    attendeeItems.push(
      React.createElement(
        ChatBubbleContainer,
        { timestamp: time, key: time + senderName },
        React.createElement(ChatBubble, {
          variant: localUserName === senderName ? "outgoing" : "incoming",
          senderName: senderName,
          showTail: true,
          css: bubbleStyles,
        })
      )
    );
  }
  return React.createElement(
    Roster,
    { className: chatViewStyle.roster },
    React.createElement(RosterHeader, {
      title: "Chat",
      onClose: closeChat,
    }),
    attendeeItems,
    meeting && !refreshChat && (
      <LiveStreamChat
        user={user}
        streamChannelId={meeting.streamChannelId}
        isMeeting
      />
    )
  );
};

export default ChatView;

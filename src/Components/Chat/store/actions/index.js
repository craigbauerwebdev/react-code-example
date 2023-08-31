import * as actionTypes from "./actionTypes";

import axios from "axios";
import { dataTypes } from "store/utils/dataTypes";

export const setChatUserFlag = (payload) => {
  return {
    type: actionTypes.SET_CHAT_USER_FLAG,
    payload,
  };
};

export const setChatClient = (payload) => {
  return {
    type: actionTypes.SET_CHAT_CLIENT,
    payload,
  };
};

export const setChannels = (payload) => {
  return {
    type: actionTypes.SET_CHANNELS,
    payload,
  };
};

const compareChannels = (channelStore, channelResponse) => {
  if (!channelStore) {
    return false;
  }
  if (channelStore.length !== channelResponse.length) {
    return false;
  }

  const channelMap = new Map();
  channelStore.forEach((id) => {
    channelMap.set(id, id);
  });

  for (let c of channelResponse) {
    if (!channelMap.has(c)) {
      return false;
    }
  }
  return true;
};

// const setChatLogout = () => ({
//   type: actionTypes.CHAT_LOGOUT,
// });

export const setChatUser = (user, chatClient, accountProfile) => (dispatch) => {
  const name =
    user.contact.preferred_name ||
    `${user.contact.first_name} ${user.contact.last_name}`;
  chatClient
    .connectUser(
      {
        id: user.fuzion_attendee_id,
        name: name,
        image: accountProfile?.avatar,
      },
      user.token
    )
    .then(() => {
      dispatch(setChatClient(chatClient));
      dispatch(setChatUserFlag(true));
    });
};

export const getChannels = ({ channels }) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_HOST}${dataTypes.addChatUserToChannel}`,
      [
        {
          channels,
        },
      ]
    )
    .then((response) => response.data)
    .then((channelIds) => {
      if (!compareChannels(channels, channelIds)) {
        dispatch(setChannels(channelIds));
      }
    });
};

export const setChatBotOpen = (payload) => {
  return {
    type: actionTypes.CHAT_BOTOPEN,
    payload,
  };
};

export const setChatUnreadCount = (payload) => {
  return {
    type: actionTypes.CHAT_UNREAD_COUNT,
    payload,
  };
};

export const updateChatUnreadCount = (chatClient, dispatch) => {
  /**
   * chatClient.user.total_unread_count / chatClient.user.unread_channels / chatClient.user.unread_count give incorrect values for unread count
   * The only way to get the correct unread count is to iterate through active channels and add up the unread count of each channel
   */
  let count = 0;
  for (let key in chatClient.activeChannels) {
    const channel = chatClient.activeChannels[key];
    count += channel.state.unreadCount;
  }
  dispatch(setChatUnreadCount(count));
};

import "stream-chat-react/dist/css/index.css";
import "./Chat.scss";

import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  InfiniteScrollPaginator,
  MessageInput,
  MessageList,
  MessageTeam,
  Thread,
  Window,
} from "stream-chat-react";
import React, { useCallback, useEffect, useState } from "react";
import { getChannels, setChatUser } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import ChannelListTeamOEP from "./ChannelListDirectChat";
import ErrorModal from "Components/Modal/ErrorModal";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import Logger from "js-logger";
import OEPAnalytics from "../OEPAnalytics";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import { StreamChat } from "stream-chat";
import axios from "axios";
import storage from "../../util/storage";
import { useHistory } from "react-router-dom";

const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme") || "light";

const chatClient = StreamChat.getInstance(process.env.REACT_APP_CHAT_ID, {
  timeout: 60000,
});

const ChatLoader = () => <Loader loaderType="chat" />;

const channelList = document.getElementsByClassName(
  "str-chat str-chat-channel-list team light "
);

function toggleMenu(event) {
  if (
    event.target.className !== "str-chat__header-hamburger" &&
    event.target.className !== "str-chat__header-hamburger--line"
  ) {
    channelList[0].classList.remove("str-chat-channel-list--open");
  } else {
    channelList[0].classList.add("str-chat-channel-list--open");
  }
}

export default function DirectChat({ match }) {
  const history = useHistory();
  const [showDirectChat, toggleDirectChat] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const channels = useSelector((state) => state.chat.channels);
  const eventNetworking = useSelector(
    (state) => state.global.networkSettings?.eventNetworking
  );
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  //const mutes = useSelector((state) => state.global.mutes);
  const mutes = storage.get("oep_chat_mutes", []);
  const chatUserFlag = useSelector((state) => state.chat.chatUserFlag);
  const chatClientStore = useSelector((state) => state.chat.chatClient);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const onRefSet = useCallback((node) => {
    // ref value changed to node
    if (node !== null) {
      setTimeout(() => {
        const elem = node.querySelector(".str-chat__input-emojiselect");

        if (elem) {
          elem.setAttribute("tabindex", "0");
        }
      }, 500);
    }
  }, []);

  // Only run once per mount to see if channels have changed
  useEffect(() => {
    if (!componentLoaded && user) {
      dispatch(
        getChannels({
          user,
          channels,
        })
      );
      setComponentLoaded(true);
    } else if (componentLoaded && channels && channels.length === 0) {
      dispatch(
        getChannels({
          user,
          channels,
        })
      );
    }
  }, [dispatch, user, channels, componentLoaded]);

  useEffect(() => {
    if (!user.token) {
      createUserChatToken(user.fuzion_attendee_id)
        .then(async (response) => {
          user.token = response;
          if (!chatUserFlag && channels) {
            await dispatch(setChatUser(user, chatClient, accountProfile));
          }
          toggleDirectChat(true);
        })
        .catch((e) => {
          setShowErrorModal(true);
        });
    } else {
      if (!chatUserFlag && channels) {
        dispatch(setChatUser(user, chatClient, accountProfile));
      }
      toggleDirectChat(true);
      window.addEventListener("click", toggleMenu);
    }
    return () => {
      try {
        window.removeEventListener("click", toggleMenu);
      } catch (e) {
        Logger.log("failed chatClient.disconnect", e);
      }
    };
  }, [user, dispatch, channels, chatUserFlag, accountProfile]);

  useEffect(() => {
    let clientListener;
    let channelName;
    const sendNotification = async (attendee, channelName, cid) => {
      const firstName = attendee.name.split(" ")[0];
      const lastName = attendee.name.split(" ")[1];
      return await axios.post(
        `${process.env.REACT_APP_API_HOST}/chat/mention`,
        {
          hostAttendee: {
            id: user.fuzion_attendee_id,
            name: `${user.contact.first_name} ${user.contact.last_name}`,
            avatar: user.avatar ? user.avatar : "no_avatar_available",
          },
          guestAttendee: {
            id: attendee.id,
            name: `${firstName} ${lastName}`,
          },
          channelName,
          cid,
        }
      );
    };
    if (chatClientStore && user) {
      //set up mentions listener
      clientListener = chatClientStore.on("message.new", (e) => {
        if (
          e.message.mentioned_users &&
          e.user.id === user.fuzion_attendee_id
        ) {
          chatClientStore.queryChannels({ cid: e.cid }).then((res) => {
            channelName = res[0].data.name;
            for (let i in e.message.mentioned_users) {
              sendNotification(
                e.message.mentioned_users[i],
                channelName,
                e.channel_id
              );
            }
          });
        }
      });
    }
    return () => {
      if (chatClientStore) {
        //unsubscribe the listener when navigating away from page
        clientListener.unsubscribe();
      }
    };
  }, [chatClientStore, user]);

  const createUserChatToken = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/createUserChatToken`
    );
    return response.data;
  };

  const muteUser = async (mutedUser) => {
    const newMute = {
      target: {
        mutingUser: user.fuzion_attendee_id,
        id: mutedUser.id,
        name: mutedUser.name,
      },
    };
    const newMutes = mutes.concat(newMute);
    //add user to list of muted users in redux
    storage.set("oep_chat_mutes", newMutes);
    setComponentLoaded(false);
  };

  const onCloseErrorModal = (event) => {
    setShowErrorModal(true);
    history.push(`/`);
  };

  if (!showDirectChat) {
    return (
      <ErrorModal
        isActive={showErrorModal}
        onCloseErrorModal={onCloseErrorModal}
        customMessage={
          <div>
            Sorry, Chat is currently not available. Please use the{" "}
            <LinkWrapper to="/support" componentName="Support">
              Technical Support Form
            </LinkWrapper>{" "}
            to report issue.
          </div>
        }
      />
    );
  }

  const filters = {
    type: { $in: ["team", "user_created_public"] },
    members: { $in: [user.fuzion_attendee_id] },
  };

  const noNetworkFilters = {
    type: { $in: ["team", "direct", "user_created_public"] },
    members: { $in: [user.fuzion_attendee_id] },
  };

  const mentionFilters = {
    filters: { teams: { $contains: process.env.REACT_APP_FUZION_EVENT_ID } },
  };

  const sort = {
    name: 1,
  };

  const options = {
    member: true,
    watch: true,
    limit: 30,
  };

  const userClickHandler = (event, user) => {
    window.open(`/attendee/${user.id}/directchat`, "_blank");
  };

  if (!chatClientStore || showErrorModal) {
    return <ChatLoader />;
  }

  return (
    <>
      <OEPAnalytics
        componentType="Button"
        page="Chat"
        url="Channel Chat"
        componentName="Channel Chat"
      >
        <div>
          <div className="chat-container">
            <div className="team-chat-container" ref={onRefSet}>
              <Chat client={chatClientStore} theme={`team ${theme}`}>
                <ChannelList
                  Avatar={(props) => <ProfileAvatar size={32} {...props} />}
                  allowNewMessagesFromUnfilteredChannel={false}
                  filters={eventNetworking ? filters : noNetworkFilters}
                  sort={sort}
                  options={options}
                  lockChannelOrder={true}
                  List={ChannelListTeamOEP}
                  LoadingIndicator={ChatLoader}
                  LoadingErrorIndicator={ChatLoader}
                  Paginator={(props) => (
                    <InfiniteScrollPaginator threshold={300} {...props} />
                  )}
                  customActiveChannel={match?.params?.cid}
                />
                <Channel
                  onMentionsHover={(e, user) => {
                    //Logger.log(e, user);
                  }}
                  onMentionsClick={(e, user) => {
                    //Logger.log(e, user);
                  }}
                >
                  <Window>
                    <ChannelHeader />
                    <MessageList
                      Message={(props) => {
                        // Hide messages from muted user
                        const muteList = props?.mutes?.length
                          ? props?.mutes
                          : mutes;
                        if (
                          muteList &&
                          muteList.findIndex(
                            (m) =>
                              m.target.id === props.message?.user.id &&
                              m.target.mutingUser === user.fuzion_attendee_id
                          ) > -1
                        ) {
                          return null;
                        }

                        return (
                          <MessageTeam {...props} Avatar={ProfileAvatar} />
                        );
                      }}
                      hideDeletedMessages={true}
                      messageActions={["edit", "delete", "react", "reply"]}
                      getMuteUserSuccessNotification={muteUser}
                      onUserClick={(e, user) => {
                        userClickHandler(e, user);
                      }}
                      onUserHover={(e, user) =>
                        (e.target.style.cursor = "pointer")
                      }
                    />
                    <MessageInput
                      focus
                      mentionAllAppUsers={true}
                      disableMentions={false}
                      mentionQueryParams={mentionFilters}
                    />
                  </Window>
                  <Thread Message={MessageTeam} />
                </Channel>
              </Chat>
            </div>
          </div>
        </div>
      </OEPAnalytics>
    </>
  );
}

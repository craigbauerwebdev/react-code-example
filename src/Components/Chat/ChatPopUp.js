import "./Chat.scss";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  MessageTeam,
  Thread,
  Window,
} from "stream-chat-react";
import React, { useCallback, useEffect, useState } from "react";
import { setIsMinimized, setShow } from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import CustomChannelHeader from "./CustomChannelHeader";
import ErrorModal from "Components/Modal/ErrorModal";
import { Fragment } from "react";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import LoaderModal from "Components/Profile/LoaderModal";
import OEPAnalytics from "Components/OEPAnalytics";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import SVGTypes from "Components/SVG/SvgTypes";
import { StreamChat } from "stream-chat";
import axios from "axios";
import chatPopUpStyles from "./scss/chat-pop-up.module.scss";
import customChannelHeaderStyles from "./scss/custom-channel-header.module.scss";
import { enableParentPageScroll } from "Components/Modal/utils/toggleParentPageScrolling";
import { setChatUser, updateChatUnreadCount } from "./store/actions";
import storage from "../../util/storage";

const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme") || "light";

const chatClient = StreamChat.getInstance(process.env.REACT_APP_CHAT_ID, {
  timeout: 60000,
});

const ChatLoader = () => <Loader loaderType="chat" />;

export default function ChatPopUp() {
  const [showDirectChat, toggleDirectChat] = useState(false);
  const [channel, setChannel] = useState(null);
  const [hasUnread, setHasUnread] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  // const [channelId, setChannelId] = useState({});

  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const blockedUsers = useSelector((state) => state.profile.blockedUsers);
  const nowPlayingDrawerIsOpen = useSelector(
    (state) => state.global.nowPlayingDrawerIsOpen
  );
  const chatBotOpen = useSelector((state) => state.chat.chatBotOpen);
  const mutes = storage.get("oep_chat_mutes", []);
  const chatUserFlag = useSelector((state) => state.chat.chatUserFlag);
  const chatClientStore = useSelector((state) => state.chat.chatClient);
  const [channelLoaded, setChannelLoaded] = useState(false);
  const show = useSelector((state) => state.profile.show);
  const isMinimized = useSelector((state) => state.profile.isMinimized);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  //const recentChannels = useSelector((state) => state.profile.recentChannels);
  const selectedAttendee = useSelector(
    (state) => state.profile.selectedAttendee
  );

  const [updatedAttendee, setUpdatedAttendee] = useState();
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

  const getDirectChat = useCallback(async (attendee, user) => {
    if (attendee.Profile) {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/direct-chat/open-chat`,
        {
          hostAttendee: {
            id: user.fuzion_attendee_id,
            name: `${user.contact.first_name} ${user.contact.last_name}`,
            avatar: user.avatar ? user.avatar : "no_avatar_available",
          },
          guestAttendee: {
            id: attendee.id,
            name: `${attendee.Profile.firstName} ${attendee.Profile.lastName}`,
          },
        }
      );

      attendee.ChannelInfo = response.data;
      return attendee;
    }
  }, []);

  const getRecentChatList = useCallback(
    async (attendee) => {
      let response;
      try {
        response = await axios.get(
          `${process.env.REACT_APP_API_HOST}/direct-chat/recent/`
        );
      } catch (e) {
        setShowErrorModal(true);
        return [attendee];
      }
      if (user) {
        for (var i = 0; i < response.data.length; i++) {
          const splitName = response.data[i].name.split(",");

          if (
            splitName.includes(user.fuzion_attendee_id) &&
            splitName.includes(attendee.id)
          ) {
            // Need to check case where user tries to chat with themself
            if (user.fuzion_attendee_id === attendee.id) {
              if (splitName.every((x) => x === user.fuzion_attendee_id)) {
                attendee.ChannelInfo = response.data[i];
                return [attendee];
              }
              // If all users in channel don't match me, continue to next channel in list
              continue;
            }
            attendee.ChannelInfo = response.data[i];

            return [attendee];
          }
        }

        return [attendee];
      }
    },
    [user]
  );

  const getChannel = useCallback(
    async (attendee) => {
      if (!attendee.ChannelInfo) {
        await getDirectChat(attendee, user);
      }

      const channels = await chatClientStore.queryChannels(
        { id: attendee.ChannelInfo.channelId },
        {
          cid: 1,
        },
        {
          watch: true, // this is the default
          state: true,
        }
      );

      attendee.Channel = channels[0];
      setChannelLoaded(true);

      return attendee;
    },
    [chatClientStore, getDirectChat, user]
  );

  const dispatchAction = (action) => {
    dispatch(action);
  };

  const setChatDisplayInfo = (chatProfile) => {
    selectedAttendee.Profile.firstName =
      chatProfile?.Profile?.data?.data?.preferredName ||
      chatProfile?.Profile?.data?.data?.firstName;
    selectedAttendee.Profile.lastName =
      chatProfile?.Profile?.data?.data?.lastName;
    selectedAttendee.Profile.avatar = chatProfile?.Profile?.data?.data?.avatar;
  };

  const getChats = useCallback(() => {
    setChannelLoaded(false);
    getRecentChatList(selectedAttendee).then((chats) => {
      Promise.all(
        chats.map((cwp) => {
          return getChannel(cwp);
        })
      ).then((chatsWithProfileAndChannel) => {
        //if the profile doesn't have the attendee name and avatar, set them to display when user clicks the reply button
        if (
          !chatsWithProfileAndChannel[0]?.Profile?.lastName ||
          !chatsWithProfileAndChannel[0]?.Profile?.firstName ||
          !chatsWithProfileAndChannel[0]?.Profile?.avatar
        ) {
          setChatDisplayInfo(chatsWithProfileAndChannel[0]);
        }
        setUpdatedAttendee(chatsWithProfileAndChannel[0]);
        setChannel(chatsWithProfileAndChannel[0].Channel);
      });
    });
  }, [getChannel, getRecentChatList, selectedAttendee]);

  const handleClick = () => {
    dispatch(setShow(false));
    handleResize();
    enableParentPageScroll();
  };

  const handleMinimize = useCallback(() => {
    dispatch(setIsMinimized(true));
  }, [dispatch]);

  const handleResize = useCallback(() => {
    if (show) {
      dispatch(setIsMinimized(false));
    }
  }, [dispatch, show]);

  const handleOutsideClick = () => {
    handleMinimize();
  };
  const dispatchChat = useCallback(
    (user, chatClient) => {
      dispatch(setChatUser(user, chatClient, accountProfile));
    },
    [accountProfile, dispatch]
  );

  const updateUnreadCount = useCallback(() => {
    if (chatClientStore) {
      setTimeout(() => updateChatUnreadCount(chatClientStore, dispatch), 1000);
    }
  }, [chatClientStore, dispatch]);

  useEffect(() => {
    if (
      user &&
      (selectedAttendee?.id || selectedAttendee?.Profile?.fuzionAttendeeId)
    ) {
      if (selectedAttendee.Channel) {
        setUpdatedAttendee(selectedAttendee);
        setChannel(selectedAttendee.Channel);
        setChannelLoaded(true);
        return; //End execution
      }

      if (selectedAttendee) {
        getChats();
      }
    }
  }, [selectedAttendee, getChats, user]);

  useEffect(() => {
    if (user) {
      if (!user.token) {
        createUserChatToken().then((response) => {
          user.token = response;
          if (!chatUserFlag) {
            dispatchChat(user, chatClient);
          }
          toggleDirectChat(true);
        });
      }
    }
  }, [user, chatUserFlag, dispatchChat]);

  useEffect(() => {
    if (!isMinimized && hasUnread) {
      setHasUnread(false);
    }
  }, [isMinimized, hasUnread]);

  useEffect(() => {
    if (!isMinimized) updateUnreadCount();
  }, [isMinimized, updateUnreadCount]);

  useEffect(() => {
    if (updatedAttendee?.Channel) {
      updatedAttendee.Channel.on("message.new", (event) => {
        if (event.total_unread_count > 0) {
          setHasUnread(true);
        } else {
          setHasUnread(false);
        }
      });
    }
  }, [updatedAttendee]);

  useEffect(() => {
    if (channelLoaded && show && !showErrorModal) {
      updateUnreadCount();
    }
  }, [channelLoaded, show, showErrorModal, updateUnreadCount]);

  const createUserChatToken = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/createUserChatToken`
    );
    return response.data;
  };

  const onCloseErrorModal = (event) => {
    setShowErrorModal(false);
    window.location.reload(false);
  };

  if (!showDirectChat || !accountProfile) {
    return null;
  }

  return (
    <Fragment>
      {isMinimized ? (
        <div
          className={
            (nowPlayingDrawerIsOpen
              ? chatPopUpStyles.minimizedHolder
              : chatPopUpStyles.minimizedHolderNoBanner) +
            " " +
            (chatBotOpen
              ? chatPopUpStyles.minimizedBot
              : chatPopUpStyles.minimizedNoBot)
          }
        >
          <div
            className={chatPopUpStyles.minimizedPopover}
            onClick={handleResize}
          >
            {show && !showErrorModal && (
              <div className={chatPopUpStyles.pop} onClick={handleResize}>
                <div className={chatPopUpStyles.main}>
                  <ProfileAvatar
                    firstName={updatedAttendee.Profile.firstName}
                    preferredName={updatedAttendee.Profile.preferredName}
                    lastName={updatedAttendee.Profile.lastName}
                    url={updatedAttendee.Profile.avatar}
                    size={35}
                  />
                  <div className={chatPopUpStyles.nameContainer}>
                    <span className={chatPopUpStyles.boldWords}>
                      {`${
                        updatedAttendee.Profile.preferredName ||
                        `${updatedAttendee.Profile.firstName} ${updatedAttendee.Profile.lastName}`
                      }`}
                    </span>
                    <br />
                    <span className={chatPopUpStyles.title}>
                      {updatedAttendee.Profile.title} from{" "}
                      <span className={chatPopUpStyles.boldWords}>
                        {updatedAttendee.Profile.company}
                      </span>{" "}
                    </span>
                  </div>
                  <div className={chatPopUpStyles.btnContainer}>
                    {hasUnread && (
                      <div className={chatPopUpStyles.dotContainer}>
                        {" "}
                        <span className={chatPopUpStyles.dot}></span>
                      </div>
                    )}
                    <OEPAnalytics
                      componentType="Button"
                      page="Chat"
                      url="Show more chat options"
                      componentName="Show more chat options"
                    >
                      <button
                        className={customChannelHeaderStyles.button}
                        type="button"
                        aria-label="more chat options"
                      >
                        <SVGTypes name="overflow-menu" />
                      </button>
                    </OEPAnalytics>
                    <OEPAnalytics
                      componentType="Button"
                      page="Chat"
                      url="Close chat"
                      componentName="Close chat"
                    >
                      <button
                        className={chatPopUpStyles.button}
                        type="button"
                        aria-label="close chat"
                        onClick={handleClick}
                      >
                        <SVGTypes name="close-icon" />
                      </button>
                    </OEPAnalytics>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {show && channelLoaded && !showErrorModal && (
            <Fragment>
              <div
                className={chatPopUpStyles.popUpMainContainer}
                onClick={handleOutsideClick}
              />
              <div className={chatPopUpStyles.popup} ref={onRefSet}>
                {channel && (
                  <Chat
                    client={chatClientStore}
                    theme={`team ${theme} dropdown`}
                  >
                    <Channel
                      LoadingIndicator={ChatLoader}
                      channel={updatedAttendee.Channel}
                    >
                      <Window>
                        <CustomChannelHeader
                          attendee={updatedAttendee}
                          blockedUsers={blockedUsers}
                          handleClick={handleClick}
                          user={accountProfile}
                          isMinimized={isMinimized}
                          dispatchAction={dispatchAction}
                          userId={user.fuzion_attendee_id}
                        />
                        <MessageList
                          Avatar={(props) => {
                            return (
                              <ProfileAvatar
                                firstName={props.name.split(" ")[0]}
                                lastName={props.name.split(" ")[1]}
                                url={props.image}
                                size={40}
                              />
                            );
                          }}
                          Message={(props) => {
                            // Hide messages from muted user
                            const muteList = props.mutes.length
                              ? props.mutes
                              : mutes;

                            if (
                              muteList &&
                              muteList.findIndex(
                                (m) =>
                                  m.target.id === props.message.user.id &&
                                  m.target.mutingUser ===
                                    user.fuzion_attendee_id
                              ) > -1
                            ) {
                              return null;
                            }

                            return <MessageTeam {...props} />;
                          }}
                          hideDeletedMessages={true}
                        />
                        {updatedAttendee.Channel?.state?.membership.banned ? (
                          <div style={{ textAlign: "center" }}>
                            <span>You may not send messages to this user.</span>
                          </div>
                        ) : (
                          <MessageInput focus disableMentions={true} />
                        )}
                      </Window>
                      <Thread Message={MessageTeam} />
                    </Channel>
                  </Chat>
                )}
              </div>
            </Fragment>
          )}
          {show && !channelLoaded && (
            <LoaderModal
              active={!channelLoaded}
              message={"Loading Chat"}
              disableParentPageScroll={false}
            />
          )}
          {show && (
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
          )}
        </div>
      )}
    </Fragment>
  );
}

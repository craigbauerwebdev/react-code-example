import "stream-chat-react/dist/css/index.css";
import "./Chat.scss";

import { ChannelList, Chat, LoadMorePaginator } from "stream-chat-react";
import React, { useEffect, useState } from "react";
import {
  setBlockedByUsers,
  setShowList,
} from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import { ChannelListOneToOne } from "./stream/ChannelListOneToOne";
import { ChannelPreviewLastMessage } from "./stream/ChannelPreviewLastMessage";
import OEPAnalytics from "Components/OEPAnalytics";
import ReactTooltip from "react-tooltip";
import SVGTypes from "Components/SVG/SvgTypes";
import axios from "axios";
import messagesListStyles from "./scss/messages-list.module.scss";
import { updateChatUnreadCount } from "./store/actions";

let newMessageListener;

export default function MessagesList() {
  const dispatch = useDispatch();
  const [node, setNode] = useState(null);
  const [show, setShow] = useState(false);

  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const showList = useSelector((state) => state.profile.showList);
  const chatClientStore = useSelector((state) => state.chat.chatClient);
  const unreadCount = useSelector((state) => state.chat.chatUnreadCount);
  const chatPopupShown = useSelector((state) => state.profile.show);

  const handleClick = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      if (!showList) {
        dispatch(setShowList(true));
      }
    }
  };

  const handleOutsideClick = (e) => {
    if (node === e.target) {
      if (show) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  };

  useEffect(() => {
    const retrieveBannedUserList = async (eventId, userId) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/retrieveBannedByList`,
        [
          {
            eventId: eventId,
            userId: userId,
          },
        ]
      );

      dispatch(setBlockedByUsers(response.data));
    };
    retrieveBannedUserList(
      process.env.REACT_APP_FUZION_EVENT_ID,
      user.fuzion_attendee_id
    );
  }, [user.fuzion_attendee_id, dispatch]);

  const filters = {
    type: { $in: ["one_to_one"] },
    members: { $in: [user.fuzion_attendee_id] },
  };
  const sort = {
    last_message_at: -1,
  };
  const options = {
    member: true,
    watch: true,
    limit: 30,
  };

  useEffect(() => {
    /**
     * Fetches channels to get unread counts on first load
     * Fetched channels are auto added to activeChannels in chatClientStore
     */
    const fetchOneToOneChannels = async () => {
      await chatClientStore.queryChannels(filters, sort, options);
      updateChatUnreadCount(chatClientStore, dispatch);
    };

    fetchOneToOneChannels();
  }, [chatClientStore, dispatch, filters, options, sort]);

  useEffect(() => {
    if (!newMessageListener && !chatPopupShown && chatClientStore) {
      newMessageListener = chatClientStore.on("message.new", () => {
        updateChatUnreadCount(chatClientStore, dispatch);
      });
    } else if (newMessageListener && chatPopupShown) {
      newMessageListener.unsubscribe();
      newMessageListener = null;
    }
    return () => {
      if (newMessageListener !== null && chatClientStore) {
        newMessageListener.unsubscribe();
      }
    };
  }, [chatClientStore, chatPopupShown, dispatch]);

  // const isBlockedBy = (fuz_attendee_id) => {
  //   let blockedBy = blockedList?.filter((id) => {
  //     return id === fuz_attendee_id;
  //   });
  //   return blockedBy?.length > 0;
  // };

  return (
    <>
      <OEPAnalytics
        componentType="Button"
        page="Chat"
        url="View Recent Messages"
        componentName="View Recent Messages"
      >
        <button
          className={messagesListStyles.popUpButton}
          onClick={handleClick}
          aria-label="View Recent Messages"
          type="button"
          label="View Recent Messages"
          id="recentMessages"
        >
          <div
            className={`${messagesListStyles.unreadIndicator} ${
              unreadCount && messagesListStyles.active
            }`}
          />
          <SVGTypes name="chat" />
          <ReactTooltip />
        </button>
      </OEPAnalytics>

      <div>
        {showList && (
          <div
            className={
              show
                ? messagesListStyles.clickLayer
                : messagesListStyles.hidePopOver
            }
            ref={(node) => {
              setNode(node);
            }}
            onClick={handleOutsideClick}
          >
            <div className={messagesListStyles.popoverInnerHolder}>
              <div
                className={
                  show
                    ? messagesListStyles.popoverContainer
                    : messagesListStyles.hidePopOver
                }
              >
                <div className={messagesListStyles.popup}>
                  <div className={messagesListStyles.titleContainer}>
                    <h4>Messages</h4>
                  </div>
                  <Chat client={chatClientStore} theme={`team light dropdown`}>
                    <ChannelList
                      Preview={ChannelPreviewLastMessage}
                      filters={filters}
                      EmptyStateIndicator={() => <p>No messages</p>}
                      List={ChannelListOneToOne}
                      sort={sort}
                      options={options}
                      setActiveChannelOnMount={false}
                      Paginator={(props) => (
                        <LoadMorePaginator threshold={30} {...props} />
                      )}
                    />
                  </Chat>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

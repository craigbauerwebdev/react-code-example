import "./Chat.scss";
import "stream-chat-react/dist/css/index.css";

import { Channel, Chat, Window, withChatContext } from "stream-chat-react";
import {
  MessageInput,
  MessageList,
  MessageLivestream,
} from "stream-chat-react";
import { MessageInputSmall, Thread } from "stream-chat-react";

import Auth from "../../services/Auth";
import ErrorModal from "Components/Modal/ErrorModal";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Logger from "js-logger";
import OEPAnalytics from "../OEPAnalytics";
import ProfileAvatar from "../Profile/ProfileAvatar";
import React from "react";
import { SET_CHAT_CLIENT } from "./store/actions/actionTypes";
import { StreamChat } from "stream-chat";
import axios from "axios";
import { connect } from "react-redux";
import liveStreamChatStyles from "./scss/live-stream-chat.module.scss";
import storage from "../../util/storage";

const errorRegEx = /^\s*<div>\s*error:(.*)<\/div>$/i;
let muteList;

let clientListener;

const mentionFilters = {
  filters: { teams: { $contains: process.env.REACT_APP_FUZION_EVENT_ID } },
};

class LiveStreamChat extends React.Component {
  state = {
    showLiveStream: false,
    userSession: {},
    chatClient: {},
    channel: {},
    mutes: [],
    showErrorModal: false,
  };

  componentWillUnmount = () => {
    try {
      if (this.state.chatClient) {
        clientListener.unsubscribe();
      }
    } catch (e) {
      Logger.log("failed listener unsubscribe", e);
    }
  };

  componentDidMount = async () => {
    muteList = await storage.get("oep_chat_mutes", []);
    this.setState({ mutes: muteList });

    await this.setChatClient();
    let userSession = this.props.user || Auth.load();

    if (userSession) {
      this.tid = setInterval(() => {
        let elems = document.getElementsByClassName(
          "str-chat str-chat-channel livestream"
        );
        if (elems && elems.length > 0) {
          const match = elems[0].innerHTML.match(errorRegEx);
          if (match !== null) {
            alert(match[1] + ". The page will now reload.");
            clearInterval(this.tid);
            window.location.reload();
          }
        }
      }, 1000);

      if (!userSession.token) {
        this.createUserChatToken()
          .then((response) => {
            let userSessionCopy = userSession;
            userSessionCopy.token = response;
            this.setState({
              showLiveStream: true,
              userSession: userSessionCopy,
            });
            this.setLiveStreamUser().then(() => {
              this.setChannel();
              this.setChatListener();
            });
          })
          .catch((e) => {
            this.setState({ showErrorModal: true });
            this.setState({ showLiveStream: true, userSession: {} });
          });
      } else {
        this.setState(
          { showLiveStream: true, userSession: this.props.user },
          () => {
            this.setLiveStreamUser().then(() => {
              this.setChannel();
              this.setChatListener();
            });
          }
        );
      }
    } else {
      this.setState({ showLiveStream: false, userSession: {} });
    }
  };
  sendNotification = async (attendee, channelName, cid) => {
    const firstName = attendee.name.split(" ")[0];
    const lastName = attendee.name.split(" ")[1];

    // remove the first char if it is "/" which it most certaily is.
    // cid becomes "notification.actionId" and
    // later on, in "ActionButton.js handleChatMentionClick" we use actionId in history.push with "/"
    const path = window.location.pathname.split("/true")[0].replace(/^\//, "");

    return await axios.post(`${process.env.REACT_APP_API_HOST}/chat/mention`, {
      hostAttendee: {
        id: this.state.userSession.fuzion_attendee_id,
        name: `${this.state.userSession.contact.first_name} ${this.state.userSession.contact.last_name}`,
        avatar: this.state.userSession.avatar
          ? this.state.userSession.avatar
          : "no_avatar_available",
      },
      guestAttendee: {
        id: attendee.id,
        name: `${firstName} ${lastName}`,
      },
      channelName,
      cid: path,
      isLiveStreamMention: true,
    });
  };

  setChatListener = () => {
    let channelName;
    clientListener = this.state.chatClient.on("message.new", (e) => {
      if (
        e.message.mentioned_users &&
        e.user.id === this.state.userSession.fuzion_attendee_id
      ) {
        this.state.chatClient.queryChannels({ cid: e.cid }).then((res) => {
          channelName = res[0].data.name;
          for (let i in e.message.mentioned_users) {
            this.sendNotification(
              e.message.mentioned_users[i],
              channelName,
              e.channel_id
            );
          }
        });
      }
    });
  };

  setChatClient = async () => {
    if (!this.props.chatClient) {
      const chatClient = StreamChat.getInstance(process.env.REACT_APP_CHAT_ID, {
        timeout: 60000,
      });
      this.props.setChatClientStore({
        type: SET_CHAT_CLIENT,
        payload: chatClient,
      });
      this.setState({ chatClient: chatClient });
    } else {
      this.setState({ chatClient: this.props.chatClient });
    }
  };

  setChannel = async () => {
    if (!this.state.userSession.contact) {
      return;
    }
    //if not exhibitor chat, add fuzion_event_id to make the cid more unique and prevent data issues
    const isNotExhibitorId = !this.props.isExhibitor
      ? `-${process.env.REACT_APP_FUZION_EVENT_ID}`
      : "";
    const streamChannelId = this.props.sessionId
      ? `${this.props.sessionId}-${process.env.REACT_APP_ENV}${isNotExhibitorId}`
      : this.props.streamChannelId;
    const filter = {
      cid: `livestream:${streamChannelId}`,
    };
    //find if channel with cid exists
    const cc = await this.state.chatClient.queryChannels(filter, {}, {});

    if (!cc || cc.length === 0) {
      const channel = this.state.chatClient.channel(
        "livestream",
        streamChannelId,
        {
          name: this.props.sessionName,
          team: process.env.REACT_APP_FUZION_EVENT_ID,
        }
      );
      this.setState({ channel: channel });
    } else {
      this.setState({ channel: cc[0] });
    }
  };

  createUserChatToken = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/createUserChatToken`
    );
    return response.data;
  };

  setLiveStreamUser = async () => {
    if (!this.state.chatClient.userToken && this.state.userSession.contact) {
      this.state.chatClient.setUser(
        {
          id: this.state.userSession.fuzion_attendee_id,
          name: `${this.state.userSession.contact?.first_name} ${this.state.userSession.contact?.last_name}`,
        },
        this.state.userSession.token
      );
    }
  };

  onCloseErrorModal = (event) => {
    this.setState({ showErrorModal: false });
    window.location.reload(false);
  };

  muteUser = async (mutedUser) => {
    const newMute = {
      target: {
        mutingUser: this.state.userSession.fuzion_attendee_id,
        id: mutedUser.id,
        name: mutedUser.name,
      },
    };
    const newMutes = muteList.concat(newMute);
    storage.set("oep_chat_mutes", newMutes);
    return "User was muted";
  };

  render() {
    if (!this.state.showLiveStream) {
      return null;
    }

    return (
      <>
        <OEPAnalytics
          page="Chat"
          url={this.props.sessionName}
          componentType="Chat"
          componentName={this.props.componentName}
        >
          <div
            className={`${liveStreamChatStyles.liveStreamContainer} ${
              this.props.classNameProp
                ? liveStreamChatStyles[this.props.classNameProp]
                : ""
            }`}
          >
            <Chat
              client={this.state.chatClient}
              theme={"livestream dark"}
              width="300px"
            >
              <Channel
                channel={this.state.channel}
                // Message={MessageLivestream}
                Message={(props) => {
                  // Hide messages from muted user
                  const muteList = props.mutes?.length
                    ? props.mutes
                    : this.state.mutes;
                  if (
                    muteList.length &&
                    muteList.findIndex(
                      (m) =>
                        m.target.id === props.message.user.id &&
                        m.target.mutingUser ===
                          this.state.userSession.fuzion_attendee_id
                    ) > -1
                  ) {
                    return null;
                  }

                  return <MessageLivestream {...props} />;
                }}
              >
                <Window hideOnThread>
                  {/* <ChannelHeader live title={" "} /> */}
                  <MessageList
                    getMuteUserSuccessNotification={this.muteUser}
                    hideDeletedMessages={true}
                    messageActions={["edit", "delete", "react"]}
                    onUserClick={(e, author) => {
                      window.open(
                        `/attendee/${author.id}/directchat`,
                        "_blank"
                      );
                    }}
                    Avatar={(props) => {
                      return <ProfileAvatar size={32} {...props} />;
                    }}
                  />
                  <MessageInput
                    Input={MessageInputSmall}
                    focus={this.props.isMention ? true : false}
                    mentionAllAppUsers={true}
                    disableMentions={this.props.isMeeting ? true : false}
                    mentionQueryParams={mentionFilters}
                  />
                </Window>
                <Thread fullWidth />
              </Channel>
            </Chat>
          </div>
        </OEPAnalytics>
        <ErrorModal
          isActive={this.state.showErrorModal}
          onCloseErrorModal={this.onCloseErrorModal}
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chatClient: state.chat.chatClient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChatClientStore: (data) => dispatch(data),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withChatContext(LiveStreamChat));

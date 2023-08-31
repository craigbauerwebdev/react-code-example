import {
  Avatar,
  ChatDown,
  LoadingChannels,
  withChatContext,
} from "stream-chat-react";
import React, { PureComponent } from "react";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";

import { ChannelListSubHeader } from "./ChannelListSubHeader";
import ConfigService from "services/ConfigService";
import Logger from "js-logger";
import ModalChatCreateChannel from "./ModalChatCreateChannel";
import ModalChatSelectUser from "./ModalSelectChatUser";
import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { v1 as uuidv1 } from "uuid";

const TRANSFORMS = "fl_lossy,f_auto";

// import addDirectChat from "/images/icons/iconChatDirectChatChannelCreate.svg";
// import addPublicChat from "/images/icons/iconChatPublicChannelCreate.svg";

/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ./examples/ChannelList.md
 */
class ChannelListTeamOEP extends PureComponent {
  state = {
    modalSelectUserShown: false,
    modalCreateChannelShown: false,
  };
  static propTypes = {
    /** When true, loading indicator is shown - [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js) */
    loading: PropTypes.bool,
    /** When true, error indicator is shown - [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js) */
    error: PropTypes.bool,
    /** Stream chat client object */
    client: PropTypes.object,
    /** When true, sidebar containing logo of the team is visible */
    showSidebar: PropTypes.bool,
    /** Url for sidebar logo image. */
    sidebarImage: PropTypes.string,
    /**
     * Loading indicator UI Component. It will be displayed if `loading` prop is true.
     *
     * Defaults to and accepts same props as:
     * [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js)
     *
     */
    LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Error indicator UI Component. It will be displayed if `error` prop is true
     *
     * Defaults to and accepts same props as:
     * [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js)
     *
     */
    LoadingErrorIndicator: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    error: false,
    LoadingIndicator: LoadingChannels,
    LoadingErrorIndicator: ChatDown,
  };

  handleShowDirectUserClick = () => {
    Logger.log("show direct chat");
    this.setState({ modalSelectUserShown: true });
  };

  handleHideDirectUserClick = () => {
    Logger.log("hide direct chat");
    this.setState({ modalSelectUserShown: false });
  };

  handleShowCreateChannelClick = () => {
    Logger.log("show public chat");
    this.setState({ modalCreateChannelShown: true });
    disableParentPageScroll();
  };

  handleHideCreateChannelClick = () => {
    Logger.log("hide public chat");
    this.setState({ modalCreateChannelShown: false });
    enableParentPageScroll();
  };

  createChannel = async (type, channelName, memberArray) => {
    let channelId = uuidv1();

    const data = {
      id: channelId,
      type: type,
      channelNames: [channelName],
      memberArray: memberArray,
    };

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_HOST}/createChannel`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    this.props.dispatch({ type: "resetChannelList" });
    return response.data;
  };

  renderChannelListHeader = () => {
    let eventChannels;
    let userCreatedChannels;
    let directChannels;

    let channelSet = [];

    if (this.props.children.props.children) {
      eventChannels = React.Children.toArray(
        this.props.children.props.children
      ).filter((c) => c.props.channel.type === "team");
      userCreatedChannels = React.Children.toArray(
        this.props.children.props.children
      ).filter((c) => c.props.channel.type === "user_created_public");
      directChannels = React.Children.toArray(
        this.props.children.props.children
      ).filter((c) => c.props.channel.type === "direct");

      if (eventChannels.length) {
        channelSet.push(
          <ChannelListSubHeader
            caption={"EVENT PUBLIC CHANNELS"}
            showFilter={true}
            channels={eventChannels}
            index={0}
          />
        );
      }

      if (
        !this.props.networkSettings?.eventNetworking &&
        directChannels.length
      ) {
        channelSet.push(
          <ChannelListSubHeader
            caption={"DIRECT CHAT CHANNELS"}
            showFilter={true}
            channels={directChannels}
            index={1}
          />
        );
      }

      if (userCreatedChannels.length) {
        channelSet.push(
          <ChannelListSubHeader
            caption={"USER-CREATED CHANNELS"}
            showFilter={true}
            channels={userCreatedChannels}
            index={2}
          />
        );
      }
    }

    return channelSet;
  };

  render() {
    const selectUser = this.state.modalSelectUserShown ? (
      <ModalChatSelectUser
        thisUser={this.props.client.user}
        cancelClick={this.handleHideDirectUserClick}
        createChannel={this.createChannel}
      />
    ) : null;
    const directChatBtn =
      ConfigService.runValues.enableDirectChat &&
      !this.props.networkSettings?.eventNetworking ? (
        <OEPAnalytics
          componentType="Button"
          page="Chat"
          url="Start a direct chat"
          componentName="Start a direct chat"
        >
          <button
            className="str-chat__channel-list-team__header--button chat_channel_header_btn"
            onClick={this.handleShowDirectUserClick}
            title="Start a direct chat"
          >
            <img
              src="/images/icons/iconChatDirectChannelCreate.png"
              alt="Start a direct chat"
            />
          </button>
        </OEPAnalytics>
      ) : null;

    const createChannel = this.state.modalCreateChannelShown ? (
      <ModalChatCreateChannel
        thisUser={this.props.client.user}
        cancelClick={this.handleHideCreateChannelClick}
        createChannel={this.createChannel}
      />
    ) : null;

    const userPublicChannelBtn = ConfigService.runValues
      .enableUserPublicChannelChat ? (
      <OEPAnalytics
        componentType="Button"
        page="Chat"
        url="Create a new public chat"
        componentName="Create a new public chat"
      >
        <button
          className="str-chat__channel-list-team__header--button chat_channel_header_btn"
          onClick={this.handleShowCreateChannelClick}
          title="Create a new public chat"
        >
          <img
            src="/images/icons/iconChatPublicChannelCreate.png"
            alt="Create a new public chat"
          />
        </button>
      </OEPAnalytics>
    ) : null;

    const { showSidebar, LoadingErrorIndicator, LoadingIndicator } = this.props;
    if (this.props.error) {
      return <LoadingErrorIndicator type="Connection Error" />;
    } else if (this.props.loading) {
      return <LoadingIndicator />;
    }

    const avatarImageUrl = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${TRANSFORMS}/${this.props.client.user.image}`;

    return (
      <div className="str-chat__channel-list-team">
        {selectUser}
        {createChannel}
        {showSidebar && (
          <div className="str-chat__channel-list-team__sidebar">
            <div className="str-chat__channel-list-team__sidebar--top">
              <Avatar image={this.props.sidebarImage} size={50} />
            </div>
          </div>
        )}
        <div className="str-chat__channel-list-team__main">
          <div className="str-chat__channel-list-team__header">
            <div className="str-chat__channel-list-team__header--left">
              <Avatar
                image={avatarImageUrl}
                name={this.props.client.user.name || this.props.client.user.id}
                size={40}
              />
            </div>
            <div className="str-chat__channel-list-team__header--middle">
              <div className="str-chat__channel-list-team__header--title">
                {this.props.client.user.name || this.props.client.user.id}
              </div>
              <div
                className={`str-chat__channel-list-team__header--status ${this.props.client.user.status}`}
              >
                {this.props.client.user.status}
              </div>
            </div>
            <div className="str-chat__channel-list-team__header--right">
              {directChatBtn}
              {userPublicChannelBtn}
            </div>
          </div>
          {this.renderChannelListHeader()}
        </div>
      </div>
    );
  }
}
const networkSettings = (state) => {
  return {
    networkSettings: state.global.networkSettings,
  };
};

export default connect(networkSettings)(withChatContext(ChannelListTeamOEP));

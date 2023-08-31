import React, { PureComponent } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import { withChatContext } from "stream-chat-react";

/**
 * Used as channel list subheader component.
 *
 * @extends PureComponent
 */

class ChannelListSubHeader extends PureComponent {
  state = {
    ShowChannels: true,
    filterText: "",
  };

  static propTypes = {
    /** **Available from [chat context](https://getstream.github.io/stream-chat-react/#chat)** */
    // channel: PropTypes.object.isRequired,
    /** Current selected channel object */
    activeChannel: PropTypes.object,
    /** Setter for selected channel */
    // setActiveChannel: PropTypes.func.isRequired,
    /**
     * Object containing watcher parameters
     * @see See [Pagination documentation](https://getstream.io/chat/docs/#channel_pagination) for a list of available fields for sort.
     * */
    watchers: PropTypes.object,
    /** Number of unread messages */
    unread: PropTypes.number,
    /** If channel of component is active (selected) channel */
    active: PropTypes.bool,
    /** Latest message's text. */
    latestMessage: PropTypes.string,
    /** Length of latest message to truncate at */
    latestMessageLength: PropTypes.number,
  };

  static defaultProps = {
    latestMessageLength: 20,
  };

  channelPreviewButton = React.createRef();

  onSelectChannel = () => {
    this.props.setActiveChannel(this.props.channel, this.props.watchers);
    this.channelPreviewButton.current.blur();
  };

  onToggleVisible = () => {
    let showVal = this.state.ShowChannels ? false : true;
    this.setState({ ShowChannels: showVal });
  };

  onFilterChange = (e) => {
    const { value } = e.target;
    this.setState({
      filterText: value.toLowerCase(),
    });
  };

  filterChannelList = (channels) => {
    let cList;

    if (this.state.filterText) {
      cList = channels.filter((c) => {
        let cName = c.props.channel.data.name?.toLowerCase();
        return cName.includes(this.state.filterText);
      });
    } else {
      cList = channels;
    }

    return cList;
  };

  onCancelFilter = (e) => {
    let { target } = e;
    let idx = target.getAttribute("data-idx");
    let cancelInput = document.getElementsByClassName(
      "chat-filter-input w-placeholder"
    );
    cancelInput.forEach((e) => {
      if (idx === e.getAttribute("data-idx")) {
        e.value = "";
      }
    });
    this.setState({
      filterText: "",
    });
  };

  render() {
    let iconClass = this.state.ShowChannels
      ? "str-chat__channel-subheader-image"
      : "str-chat__channel-subheader-image str-chat__channel-subheader-image-rotate";

    let channelContent = this.state.ShowChannels
      ? this.filterChannelList(this.props.channels)
      : "";

    const filters = (
      <div>
        <label htmlFor="filterText" className="sr-only">
          Channel Name
        </label>
        <OEPAnalytics
          componentType="Input"
          page="Chat"
          url="Search Channel"
          componentName="Search Channel"
        >
          <input
            id="filterText"
            data-idx={this.props.index}
            name="filterText"
            type="text"
            className="chat-filter-input w-placeholder"
            onKeyUp={this.onFilterChange}
            placeholder="Filter by Channel Name"
          />
        </OEPAnalytics>
        <OEPAnalytics
          componentType="Button"
          page="Chat"
          url="Clear filters"
          componentName="Clear filters"
        >
          <button
            onClick={this.onCancelFilter}
            className="chat-filter-cancel-button"
            title="Clear filters"
            type="reset"
            data-idx={this.props.index}
          >
            x
          </button>
        </OEPAnalytics>
      </div>
    );

    const filterDisplay =
      this.props.showFilter && this.state.ShowChannels ? filters : null;

    return (
      <div>
        <div className="str-chat__channel-subheader">
          <div className="str-chat__channel-list-team__header--right">
            <OEPAnalytics
              componentType="Button"
              page="Chat"
              url="Toggle channel list view"
            >
              <button
                onClick={this.onToggleVisible}
                className="str-chat__channel-list-team__header--button"
              >
                <img
                  className={iconClass}
                  src={"/images/icons/chevron-down.svg"}
                  alt=""
                  role="presentation"
                />
                <span className="str-chat__channel-preview-info">
                  <span className="str-chat__channel-preview-title">
                    {this.props.caption}
                  </span>
                </span>
              </button>
            </OEPAnalytics>
          </div>
          {filterDisplay}
        </div>
        <div>{channelContent}</div>
      </div>
    );
  }
}

/* eslint-disable */
ChannelListSubHeader = withChatContext(ChannelListSubHeader);
export { ChannelListSubHeader };

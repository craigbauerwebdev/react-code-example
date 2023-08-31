import Logger from "js-logger";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import axios from "axios";
export default class ModalChatCreateChannel extends React.Component {
  state = {
    closed: false,
    channelName: "",
    showDuplicateNameWarning: false,
  };

  getChatChannelByName = async (channelName) => {
    const data = {
      channelType: ["user_created_public"],
      channelName: channelName,
    };

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_HOST}/getChatChannels`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  };

  onChannelNameChange = (e) => {
    const { value } = e.target;

    if (e.keyCode === 13) {
      this.onAddChannelExecute();
    } else {
      this.setState({
        channelName: value,
      });
      if (this.state.showDuplicateNameWarning) {
        this.setState({
          showDuplicateNameWarning: false,
        });
      }
    }
  };

  onAddChannelExecute = async () => {
    if (!this.state.channelName.length) return;

    //check to see if the channel name already exists
    let exists = await this.getChatChannelByName(this.state.channelName);

    Logger.log("exists", exists);

    if (exists.length) {
      this.setState({ showDuplicateNameWarning: true });
      //prompt user to create new name
      return;
    }

    //create the channel
    await this.props.createChannel(
      ["user_created_public"],
      this.state.channelName
    );
    this.props.cancelClick();
  };

  render() {
    const duplicateWarning = this.state.showDuplicateNameWarning ? (
      <p className="modal-create-chat-channel-warning">
        Channel name already in use - please choose another name.
      </p>
    ) : (
      ""
    );

    return (
      <div className="modal-create-chat-channel" style={{ display: "flex" }}>
        <div
          className="modal-create-chat-channel-inner-wrapper"
          ref={(modal) => (this.modal = modal)}
        >
          <h2>Add Public Chat Channel</h2>
          <p>Please note: this new channel will be visible to all users.</p>
          {duplicateWarning}
          <div className="chat-channel-wrapper">
            <label htmlFor="channelName" className="sr-only">
              Channel Name
            </label>
            <input
              id="channelName"
              type="text"
              className="chat-channel-input w-placeholder"
              onKeyUp={this.onChannelNameChange}
              placeholder="Enter a Channel Name"
            />
            <OEPAnalytics
              componentType="Button"
              page="Chat"
              url="Add a new Public Chat Channel"
              componentName="Add a new Public Chat Channel"
            >
              <button
                onClick={this.onAddChannelExecute}
                className="chat-channel-button"
                aria-label="Add a new Public Chat Channel"
              >
                Add
              </button>
            </OEPAnalytics>
            <OEPAnalytics
              componentType="Button"
              page="Chat"
              url="Cancel a new Public Chat Channel"
              componentName="Cancel a new Public Chat Channel"
            >
              <button
                onClick={this.props.cancelClick}
                className="chat-channel-button chat-channel-cancel-button"
                aria-label="Cancel a new Public Chat Channel"
              >
                Cancel
              </button>
            </OEPAnalytics>
          </div>
        </div>
      </div>
    );
  }
}

import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import axios from "axios";
export default class ModalChatSelectUser extends React.Component {
  state = {
    closed: false,
    users: [],
    search: "",
    currentUsers: [],
    currentUserNames: {},
  };

  getChatUsers = async (queryText) => {
    let { data } = await axios.get(
      `${process.env.REACT_APP_API_HOST}/listChatUsersBy?name=${queryText}`
    );

    this.setState({ users: data.users });
  };

  chatUserClick = (e) => {
    const { value } = e.target;

    let userObj = JSON.parse(value);

    //keep track of user names
    let currUserNameCopy = this.state.currentUserNames;
    currUserNameCopy[userObj.id] = userObj.name;

    let currUserCopy = this.props.multiselect ? this.state.currentUsers : [];

    if (this.state.currentUsers.includes(userObj.id)) {
      delete currUserCopy[userObj.id];
    } else {
      currUserCopy.push(userObj.id);
    }

    this.setState({
      currentUsers: currUserCopy,
      currentUserNames: currUserNameCopy,
    });
  };

  onSearchChange = (e) => {
    const { value } = e.target;

    if (e.keyCode === 13) {
      this.onSearchExecute();
    } else {
      this.setState({
        search: value,
      });
    }
  };

  onSearchExecute = () => {
    if (this.state.search) {
      this.getChatUsers(this.state.search);
    }
  };

  startChatClick = () => {
    if (!this.state.currentUsers.length) return;

    let channelName = `Direct Chat - ${
      this.state.currentUserNames[this.state.currentUsers]
    }, ${this.props.thisUser.name}`;

    let memberArray = this.state.currentUsers;
    memberArray.push(this.props.thisUser.id);

    this.props.createChannel(["direct"], channelName, memberArray);
    this.props.cancelClick();
  };

  render() {
    let userList = this.state.users?.map((user) => {
      let userData = JSON.stringify(user);
      let highlight = this.state.currentUsers.includes(user.id)
        ? " selected"
        : "";
      return (
        <OEPAnalytics
          componentType="Button"
          page="Chat"
          url="Select user"
          componentName={user.name}
        >
          <button
            className={"chat-user-select" + highlight}
            key={user.id}
            value={userData}
            onClick={this.chatUserClick}
            aria-label={`Select ${user.name}`}
          >
            {user.name}
          </button>
        </OEPAnalytics>
      );
    });

    return (
      <div
        className="modal-select-chat-user"
        style={
          this.state.closed === true ? { display: "none" } : { display: "flex" }
        }
      >
        <div
          className="modal-select-chat-user-inner-wrapper"
          ref={(modal) => (this.modal = modal)}
        >
          <h2>Direct Chat</h2>
          <div className="chat-search-wrapper">
            <input
              type="text"
              className="chat-search-input w-placeholder"
              onKeyUp={this.onSearchChange}
              placeholder="Search for an attendee"
            />
            <OEPAnalytics
              componentType="Button"
              page="Chat"
              url="Search for an attendee"
              componentName="Search for an attendee"
            >
              <button
                onClick={this.onSearchExecute}
                className="chat-search-button"
                aria-label="Search for an attendee"
              >
                Search
              </button>
            </OEPAnalytics>
          </div>
          <h4>Select an Attendee</h4>
          <div className="chat-search-result-wrapper">{userList}</div>
          <div className="chat-search-button-wrapper">
            <OEPAnalytics
              componentType="Button"
              page="Chat"
              url="Start Chat"
              componentName="Start Chat"
            >
              <button
                className="details-button chat-modal-button"
                onClick={this.startChatClick}
              >
                Start Chat
              </button>
            </OEPAnalytics>
            <OEPAnalytics
              componentType="Button"
              page="Chat"
              url="Cancel attendee search"
            >
              <button
                className="details-button chat-modal-button cancel-modal-button"
                onClick={this.props.cancelClick}
                aria-label="Cancel attendee search"
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

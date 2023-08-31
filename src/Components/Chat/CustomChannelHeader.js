import {
  blockOrMuteUser,
  unblockOrUnmuteUser,
} from "Components/Profile/store/actions";

import OEPAnalytics from "Components/OEPAnalytics";
import { Popup } from "@progress/kendo-react-popup";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import React from "react";
import { Redirect } from "react-router-dom";
import SVGTypes from "Components/SVG/SvgTypes";
import { chatOptions } from "Components/Profile/store/utils/chatTypes";
import customChannelHeaderStyles from "./scss/custom-channel-header.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";
import { withChannelContext } from "stream-chat-react";

const CustomChannelHeader = withChannelContext(
  class CustomChannelHeader extends React.PureComponent {
    anchor = null;
    popUpContainer = null;
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        redirect: null,
        status: null,
      };
    }

    blockOrMuteUser = (type) => {
      this.props.dispatchAction(
        blockOrMuteUser(
          this.props.attendee.id || this.props.attendee.Profile.attendeeId,
          type,
          this.props.user,
          this.props.userId
        )
      );

      this.setState({ show: false });
    };

    unblockOrUnMuteUser = (type) => {
      this.props.dispatchAction(
        unblockOrUnmuteUser(
          this.props.attendee.id || this.props.attendee.Profile.attendeeId,
          type,
          this.props.userId
        )
      );
      this.setState({ show: false });
    };

    handleClick = () => {
      if (this.state.show) {
        this.setState({ show: false });
      } else {
        this.setState({ show: true });
      }
    };

    handleProfileClick = () => {
      const otherAttendeeId = this.props.attendee.Profile.attendeeId
        ? this.props.attendee.Profile.attendeeId
        : this.props.attendee.Profile.fuzionAttendeeId;
      if (this.props.user.attendeeId !== otherAttendeeId) {
        saveAnalytic({
          page: "Attendee Profile",
          pageId: "Attendee Profile",
          componentType: "Link",
          componentName: `${this.props.attendee.Profile.firstName} ${this.props.attendee.Profile.lastName}`,
          url: `/attendee/${otherAttendeeId}`,
        });
        this.setState({
          redirect: `/attendee/${otherAttendeeId}`,
        });
      }
    };

    isMemberBlocked = () => {
      const blockedMember = this.props?.blockedUsers?.filter((user) => {
        return (
          user ===
          (this.props.attendee.Profile.attendeeId
            ? this.props.attendee.Profile.attendeeId
            : this.props.attendee.Profile.fuzionAttendeeId)
        );
      });
      return blockedMember.length > 0;
    };

    render() {
      return (
        <div className={customChannelHeaderStyles.main} id="customHeaderMain">
          <div
            style={{ cursor: "pointer" }}
            onClick={this.handleProfileClick.bind(null, this.props.attendee)}
          >
            <ProfileAvatar
              firstName={this.props.attendee.Profile.firstName}
              preferredName={this.props.attendee.Profile.preferredName}
              lastName={this.props.attendee.Profile.lastName}
              url={this.props.attendee.Profile.avatar}
              isSquare={true}
              size={35}
              handleProfileClick={this.handleProfileClick}
            />
          </div>
          <div className={customChannelHeaderStyles.nameContainer}>
            {this.props.attendee && (
              <span className={customChannelHeaderStyles.boldWords}>
                {`${
                  this.props.attendee.Profile.preferredName ||
                  `${this.props.attendee.Profile.firstName} ${this.props.attendee.Profile.lastName}`
                }`}
              </span>
            )}

            <br />
            {this.props.attendee && (
              <div className={customChannelHeaderStyles.title}>
                {this.props.attendee.Profile.title} from{" "}
                <span className={customChannelHeaderStyles.boldWords}>
                  {this.props.attendee.Profile.company}
                </span>
                <span className={customChannelHeaderStyles.blockedText}>
                  {this.isMemberBlocked() ? " Blocked" : ""}
                </span>
              </div>
            )}
          </div>
          <div className={customChannelHeaderStyles.btnContainer}>
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
                ref={(button) => {
                  this.anchor = button;
                }}
                onClick={this.handleClick}
              >
                <SVGTypes name="overflow-menu" />
              </button>
            </OEPAnalytics>
            <div
              ref={(div) => {
                this.popUpContainer = div;
              }}
            />
            <Popup
              anchor={this.anchor}
              appendTo={this.popUpContainer}
              anchorAlign={{
                horizontal: "right",
                vertical: "bottom",
              }}
              popupAlign={{
                horizontal: "right",
                vertical: "top",
              }}
              show={this.state.show}
              popupClass={customChannelHeaderStyles.popUpBox}
            >
              <div className={customChannelHeaderStyles.popUp} id="menuPopUp">
                <OEPAnalytics
                  componentType="Button"
                  page="Chat"
                  url={this.isMemberBlocked() ? "Unblock user" : "Block user"}
                  componentName={
                    this.isMemberBlocked() ? "Unblock user" : "Block user"
                  }
                >
                  <button
                    className={customChannelHeaderStyles.button}
                    type="button"
                    aria-label={`Block ${this.props.attendee.Profile.firstName} ${this.props.attendee.Profile.lastName} `}
                    onClick={
                      this.isMemberBlocked()
                        ? this.unblockOrUnMuteUser.bind(
                            this,
                            chatOptions.UNBLOCK
                          )
                        : this.blockOrMuteUser.bind(this, chatOptions.BLOCK)
                    }
                  >
                    {this.isMemberBlocked() ? "Unblock" : "Block"}
                  </button>
                </OEPAnalytics>
                <br />
              </div>
            </Popup>
            <OEPAnalytics
              componentType="Button"
              page="Chat"
              url="Close chat window"
              componentName="Close chat window"
            >
              <button
                className={customChannelHeaderStyles.button}
                type="button"
                aria-label="Close Chat Window"
                onClick={this.props.handleClick}
              >
                <SVGTypes name="close-icon" />
              </button>
            </OEPAnalytics>
          </div>
          {this.state.redirect && <Redirect to={this.state.redirect} />}
        </div>
      );
    }
  }
);
export default CustomChannelHeader;

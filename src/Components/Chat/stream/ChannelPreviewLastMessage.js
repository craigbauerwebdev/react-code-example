import "../Chat.scss";

import React, { useEffect, useRef, useState } from "react";
import { setOpenChat, setShowList } from "../../Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import PropTypes from "prop-types";
import { getUserProfileByFuzionId } from "util/api";
import { truncate } from "./utils";

/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 *
 * @example ../../docs/ChannelPreviewLastMessage.md
 * @type {import('types').ChannelPreviewLastMessage}
 */
const ChannelPreviewLastMessage = (props) => {
  const dispatch = useDispatch();
  /** @type {React.MutableRefObject<HTMLButtonElement | null>} Typescript syntax */
  const channelPreviewButton = useRef(null);
  const [otherAttendeeProfileData, setOtherAttendeeProfileData] = useState(
    null
  );
  const user = useSelector((state) => state.global.user);
  let otherAttendee = {};

  const getOtherUserId = () => {
    for (let key in props.channel.state.members) {
      if (key !== user.fuzion_attendee_id) {
        otherAttendee = props.channel.state.members[key].user;
        break;
      }
    }
  };
  const onSelectChannel = () => {
    props.setActiveChannel(props.channel, props.watchers);
    getOtherUserId();
    handleChatClick(otherAttendee);
    if (channelPreviewButton?.current) {
      channelPreviewButton.current.blur();
    }
  };

  const unreadClass =
    props.unread >= 1 ? "str-chat__channel-preview--unread" : "";
  const activeClass = props.active ? "str-chat__channel-preview--active" : "";

  let newDisplayTitle = "";

  const handleChatClick = async (otherAttendee) => {
    const res = await getUserProfileByFuzionId(otherAttendee.id);

    dispatch(
      setOpenChat({
        selectedAttendee: { id: otherAttendee.id, Profile: res.data.data },
        isMinimized: false,
        show: true,
      })
    );
    dispatch(setShowList(false));
  };

  const getOtherUserIdDisplay = () => {
    for (let m in props.channel.state.members) {
      if (m !== user.fuzion_attendee_id) {
        newDisplayTitle = props.channel.state.members[m].user.name;
        otherAttendee = props.channel.state.members[m].user;
        break;
      }
    }
    if (props.channel.data.member_count === 1) {
      let ids = props.channel.data.name.split(",");
      let otherUser = ids.filter((i) => i !== user.fuzion_attendee_id);
      otherAttendee.id = otherUser[0];
    }
  };
  useEffect(() => {
    if (!otherAttendeeProfileData) {
      getUserProfileByFuzionId(otherAttendee.id).then((res) =>
        setOtherAttendeeProfileData(res.data.data)
      );
    }
  }, [otherAttendeeProfileData, otherAttendee]);

  getOtherUserIdDisplay();

  return (
    <div className={`str-chat__channel-preview ${unreadClass} ${activeClass}`}>
      <OEPAnalytics
        componentType="Button"
        page="Chat"
        url="Channel Preview Last Message"
        componentName="Channel Preview Last Message"
      >
        <button
          onClick={onSelectChannel}
          ref={channelPreviewButton}
          data-testid="channel-preview-button"
        >
          {props.unread >= 1 && (
            <div className="str-chat__channel-preview--dot--dropdown" />
          )}
          <ProfileAvatar
            firstName={otherAttendeeProfileData?.firstName}
            preferredName={otherAttendeeProfileData?.preferredName}
            lastName={otherAttendeeProfileData?.lastName}
            url={otherAttendeeProfileData?.avatar}
            size={25}
          />
          <div className="str-chat__channel-preview-info">
            <span className="str-chat__channel-preview-title">
              <span>
                {newDisplayTitle
                  ? newDisplayTitle + " "
                  : otherAttendeeProfileData
                  ? otherAttendeeProfileData.preferredName
                    ? otherAttendeeProfileData.preferredName +
                      " " +
                      otherAttendeeProfileData.lastName +
                      " "
                    : otherAttendeeProfileData.firstName +
                      " " +
                      otherAttendeeProfileData.lastName +
                      " "
                  : "loading..."}
              </span>
              {otherAttendeeProfileData?.company &&
              otherAttendeeProfileData?.company !== "" ? (
                <span>
                  from
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {otherAttendeeProfileData?.company}
                  </span>
                </span>
              ) : null}
            </span>
            <span className="str-chat__channel-preview-last-message">
              {truncate(props.latestMessage, props.latestMessageLength)}
            </span>
            {props.unread >= 1 && (
              <span className="str-chat__channel-preview-unread-count">
                {props.unread}
              </span>
            )}
          </div>
        </button>
      </OEPAnalytics>
    </div>
  );
};

ChannelPreviewLastMessage.propTypes = {
  /** **Available from [chat context](https://getstream.github.io/stream-chat-react/#chat)** */
  channel: PropTypes.object.isRequired,
  /** Current selected channel object */
  activeChannel: PropTypes.object,
  /**
   * Custom UI component to display user avatar
   *
   * Defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.js)
   * */
  Avatar: /** @type {PropTypes.Validator<React.ElementType<import('types').AvatarProps>>} */ (PropTypes.elementType),
  /** Setter for selected channel */
  setActiveChannel: PropTypes.func.isRequired,
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
  /** Title of channel to display */
  displayTitle: PropTypes.string,
  /** Image of channel to display */
  displayImage: PropTypes.string,
};

ChannelPreviewLastMessage.defaultProps = {
  latestMessageLength: 20,
};

export { ChannelPreviewLastMessage };

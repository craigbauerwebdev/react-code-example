import React from "react";
import PropTypes from "prop-types";

import { Avatar as DefaultAvatar } from "./Avatar";
import ChatDown from "./ChatDown";
import LoadingChannels from "./LoadingChannels";

/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ../../docs/ChannelList.md
 * @type React.FC<import('types').ChannelListUIComponentProps>
 */
const ChannelListOneToOne = ({
  error = false,
  loading,
  sidebarImage,
  showSidebar,
  Avatar = DefaultAvatar,
  LoadingErrorIndicator = ChatDown,
  LoadingIndicator = LoadingChannels,
  children,
}) => {
  if (error) {
    return <LoadingErrorIndicator type="Connection Error" />;
  }
  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <div className="str-chat__channel-list-team">
      {showSidebar && (
        <div className="str-chat__channel-list-team__sidebar">
          <div className="str-chat__channel-list-team__sidebar--top">
            <Avatar image={sidebarImage} size={50} />
          </div>
        </div>
      )}
      <div
        className="str-chat__channel-list-team__main"
        style={{ width: "335px", textAlign: "center" }}
      >
        {children}
      </div>
    </div>
  );
};

ChannelListOneToOne.propTypes = {
  /** When true, loading indicator is shown - [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js) */
  loading: PropTypes.bool,
  /** When true, error indicator is shown - [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js) */
  error: PropTypes.bool,
  /** When true, sidebar containing logo of the team is visible */
  showSidebar: PropTypes.bool,
  /** Url for sidebar logo image. */
  sidebarImage: PropTypes.string,
  /**
   * Custom UI component to display user avatar
   *
   * Defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.js)
   * */
  Avatar: /** @type {PropTypes.Validator<React.ElementType<import('types').AvatarProps>>} */ (PropTypes.elementType),
  /**
   * Loading indicator UI Component. It will be displayed if `loading` prop is true.
   *
   * Defaults to and accepts same props as:
   * [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js)
   *
   */
  LoadingIndicator: /** @type {PropTypes.Validator<React.ElementType<import('types').LoadingIndicatorProps>>} */ (PropTypes.elementType),
  /**
   * Error indicator UI Component. It will be displayed if `error` prop is true
   *
   * Defaults to and accepts same props as:
   * [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js)
   *
   */
  LoadingErrorIndicator: /** @type {PropTypes.Validator<React.ElementType<import('types').ChatDownProps>>} */ (PropTypes.elementType),
};

export { ChannelListOneToOne };

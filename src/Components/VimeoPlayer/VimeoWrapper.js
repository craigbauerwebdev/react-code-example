import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import React, { Fragment, useEffect, useReducer } from "react";
import {
  fullscreenReducer,
  vimeoFullscreenIntState,
  vimeoFullscreenPlayerActionTypes,
} from "./reducer/fullscreen";
import { vimeoIntState, vimeoPlayerActionTypes, vimeoReducer } from "./reducer";

import VimeoFullscreenPlayer from "./VimeoFullscreenPlayer";
import VimeoInlinePlayer from "./VimeoInlinePlayer";
import videoSkin from "./scss/video-player.module.scss";

// https://github.com/Klowd/onlineeventpro-product-ui/wiki/Vimeo-Player
const VimeoWrapper = ({
  id,
  page,
  componentType,
  fullWidth = false,
  sessionData = {},
}) => {
  const divId = id.split("/").pop();
  const trackingId = () => {
    if (!(id.indexOf("vimeo") > -1)) {
      return "https://player.vimeo.com/video/" + id;
    }

    return id;
  };
  const [vimeoPlayerState, dispatchVimeo] = useReducer(
    vimeoReducer,
    vimeoIntState
  );
  const [vimeoFullscreenPlayerState, dispatchFullscreenPlayer] = useReducer(
    fullscreenReducer,
    vimeoFullscreenIntState
  );
  const closeFullscreen = () => {
    /**
     * Close Fullscreen player.
     * Copy player settings from when user closed fullscreen player over to inline player.
     */
    dispatchVimeo({
      type: vimeoPlayerActionTypes.CLOSE_FULLSCREEN,
      payload: {
        open: false,
        currentTime: vimeoFullscreenPlayerState.currentTime,
        progress: vimeoFullscreenPlayerState.progress,
        rawCurrentTime: vimeoFullscreenPlayerState.rawCurrentTime,
        currentVolume: vimeoFullscreenPlayerState.currentVolume,
        currentSpeed: vimeoFullscreenPlayerState.currentSpeed,
      },
    });
  };

  useEffect(() => {
    if (vimeoPlayerState.isFullscreenOpen) {
      /**
       * Open inline payer to fullscreen.
       * Copy where user setting from inline player to fullscreen player.
       */
      dispatchFullscreenPlayer({
        type: vimeoFullscreenPlayerActionTypes.RESUME_PLAY_FULLSCREEN,
        payload: {
          currentTime: vimeoPlayerState.currentTime,
          progress: vimeoPlayerState.progress,
          rawCurrentTime: vimeoPlayerState.rawCurrentTime,
          currentVolume: vimeoPlayerState.currentVolume,
          currentSpeed: vimeoPlayerState.currentSpeed,
        },
      });
    }
  }, [
    vimeoPlayerState.isFullscreenOpen,
    vimeoPlayerState.currentTime,
    vimeoPlayerState.progress,
    vimeoPlayerState.rawCurrentTime,
    vimeoPlayerState.currentVolume,
    vimeoPlayerState.currentSpeed,
  ]);

  return (
    <Fragment>
      <div className={`${fullWidth && videoSkin.holder}`}>
        <VimeoInlinePlayer
          id={id}
          divId={divId}
          state={vimeoPlayerState}
          dispatch={dispatchVimeo}
          page={page}
          componentType={componentType}
          trackingId={trackingId()}
          sessionData={sessionData}
        />
      </div>
      {vimeoPlayerState.isFullscreenOpen && (
        <Modal
          active={vimeoPlayerState.isFullscreenOpen}
          closeCallback={closeFullscreen}
          modalType={MODAL_TYPES.fullscreen}
          closeInside={true}
          page={"VimeoFullscreenPlayer"}
        >
          <VimeoFullscreenPlayer
            id={id}
            divId={divId}
            state={vimeoFullscreenPlayerState}
            dispatch={dispatchFullscreenPlayer}
            page={page}
            componentType={componentType}
            trackingId={trackingId()}
            sessionData={sessionData}
          />
        </Modal>
      )}
    </Fragment>
  );
};

export default VimeoWrapper;

import {
  ControlBarButton,
  Modal,
  ModalBody,
  ModalButton,
  ModalButtonGroup,
  ModalHeader,
  Phone,
  useMeetingManager,
} from "lib/chimeComponents";
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StyledP } from "./Styled";
import { endMeeting } from "util/api";
import { updateMeetingStatus } from "Components/Profile/store/actions";

// import { useMeetingParticipants } from "hooks/useMeetingParticipants";

const EndMeetingControl = ({ host }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const meetingManager = useMeetingManager();
  // const { moderators } = useMeetingParticipants();
  const meeting = useSelector((state) => state.chimeMeeting.currentMeeting);
  const [currentUserCanLeave, setCurrentUserCanLeave] = useState(!host);

  const [isEnded, setIsEnded] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    host
      ? "Leave meeting or you can end the meeting for all. The meeting cannot be used once it ends."
      : "Are you sure you want to leave the meeting?"
  );

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    setCurrentUserCanLeave(!host);
  }, [host]);

  useEffect(() => {
    if (!currentUserCanLeave) {
      setModalMessage(`You must promote someone else to host before leaving`);
    }
    if (currentUserCanLeave) {
      setModalMessage("Are you sure you want to leave the meeting?");
    }
    if (!host) {
      setModalMessage("Are you sure you want to leave the meeting?");
    }
  }, [currentUserCanLeave, host]);

  const leaveMeeting = async () => {
    try {
      if (currentUserCanLeave) {
        await meetingManager.leave();
        history.push("/account/schedule");
      }
    } catch (e) {
      //
    }
  };

  const endMeetingForAll = async () => {
    try {
      if (meeting?.meetingId) {
        const { meetingId } = meeting;
        setIsEnded(true);
        dispatch(updateMeetingStatus({ ...meeting, meetingStatus: "ended" }));
        await endMeeting(meetingId);
        await meetingManager.leave();
        history.push("/account/schedule");
      }
    } catch (e) {
      //
    }
  };

  const primaryButtons = [];

  if (host) {
    primaryButtons.push(
      React.createElement(ModalButton, {
        onClick: endMeetingForAll,
        variant: "primary",
        label: "End meeting for all",
        closesModal: true,
      })
    );
  }
  if (currentUserCanLeave) {
    primaryButtons.push(
      React.createElement(ModalButton, {
        onClick: leaveMeeting,
        variant: "primary",
        label: "Leave Meeting",
        closesModal: true,
      })
    );
  }

  primaryButtons.push(
    React.createElement(ModalButton, {
      variant: "secondary",
      label: "Cancel",
      closesModal: true,
    })
  );

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(ControlBarButton, {
      icon: React.createElement(Phone, null),
      onClick: toggleModal,
      label: "Leave",
    }),
    host && (
      <Prompt
        when={host && !isEnded}
        message="You must promote someone else to host before leaving"
      />
    ),
    showModal &&
      React.createElement(
        Modal,
        { size: "md", onClose: toggleModal, rootId: "modal-root" },
        React.createElement(ModalHeader, { title: "Leave Meeting" }),
        React.createElement(
          ModalBody,
          null,
          React.createElement(StyledP, null, modalMessage)
        ),
        React.createElement(ModalButtonGroup, {
          primaryButtons: primaryButtons,
        })
      )
  );
};

export default EndMeetingControl;

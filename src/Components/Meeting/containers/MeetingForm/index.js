import {
  Flex,
  FormField,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  PrimaryButton,
  useMeetingManager,
} from "lib/chimeComponents";
import React, { useContext, useState } from "react";
import { fetchMeeting, getJoinToken } from "util/api";

import Card from "../../../Card/Card";
import DevicePermissionPrompt from "../DevicePermissionPrompt";
import RegionSelection from "./RegionSelection";
import { getErrorContext } from "providers/ErrorProvider";
import routes from "routes";
import { useAppState } from "providers/AppStateProvider";
import { useHistory } from "react-router-dom";

const MeetingForm = () => {
  const meetingManager = useMeetingManager();
  const {
    setAppMeetingInfo,
    region: appRegion,
    meetingId: appMeetingId,
  } = useAppState();
  const [meetingId, setMeetingId] = useState(appMeetingId);
  const [meetingErr, setMeetingErr] = useState(false);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [region, setRegion] = useState(appRegion);
  const { errorMessage, updateErrorMessage } = useContext(getErrorContext());
  const history = useHistory();
  const handleJoinMeeting = async (e) => {
    e.preventDefault();
    const id = meetingId.trim().toLocaleLowerCase();
    const attendeeName = name.trim();
    if (!id || !attendeeName) {
      if (!attendeeName) {
        setNameErr(true);
      }
      if (!id) {
        setMeetingErr(true);
      }
      return;
    }
    meetingManager.getAttendee = getJoinToken(id);
    try {
      const { JoinInfo } = await fetchMeeting(id, attendeeName, region);
      await meetingManager.join({
        meetingInfo: JoinInfo.Meeting,
        attendeeInfo: JoinInfo.Attendee,
      });
      setAppMeetingInfo(id, attendeeName, region);
      history.push(routes.DEVICE);
    } catch (error) {
      updateErrorMessage(error.message);
    }
  };
  const closeError = () => {
    updateErrorMessage("");
    setMeetingId("");
    setName("");
  };
  return React.createElement(
    "form",
    null,
    React.createElement(
      Heading,
      { tag: "h1", level: 4, css: "margin-bottom: 1rem" },
      "Join a meeting"
    ),
    React.createElement(FormField, {
      field: Input,
      label: "Meeting Id",
      value: meetingId,
      infoText: "Anyone with access to the meeting ID can join",
      fieldProps: {
        name: "meetingId",
        placeholder: "Enter Meeting Id",
      },
      errorText: "Please enter a valid meeting ID",
      error: meetingErr,
      onChange: (e) => {
        setMeetingId(e.target.value);
        if (meetingErr) {
          setMeetingErr(false);
        }
      },
    }),
    React.createElement(FormField, {
      field: Input,
      label: "Name",
      value: name,
      fieldProps: {
        name: "name",
        placeholder: "Enter Your Name",
      },
      errorText: "Please enter a valid name",
      error: nameErr,
      onChange: (e) => {
        setName(e.target.value);
        if (nameErr) {
          setNameErr(false);
        }
      },
    }),
    React.createElement(RegionSelection, {
      setRegion: setRegion,
      region: region,
    }),
    React.createElement(
      Flex,
      {
        container: true,
        layout: "fill-space-centered",
        style: { marginTop: "2.5rem" },
      },
      React.createElement(PrimaryButton, {
        label: "Continue",
        onClick: handleJoinMeeting,
      })
    ),
    errorMessage &&
      React.createElement(
        Modal,
        { size: "md", onClose: closeError },
        React.createElement(ModalHeader, { title: `Meeting ID: ${meetingId}` }),
        React.createElement(
          ModalBody,
          null,
          React.createElement(Card, {
            title: "Unable to join meeting",
            description:
              "There was an issue finding that meeting. The meeting may have already ended, or your authorization may have expired.",
            smallText: errorMessage,
          })
        )
      ),
    React.createElement(DevicePermissionPrompt, null)
  );
};
export default MeetingForm;
//# sourceMappingURL=index.js.map

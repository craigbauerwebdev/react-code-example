import { Flex, SecondaryButton } from "../../../../lib/chimeComponents";
import { StyledDiv, StyledWrapper } from "./Styled";

import MeetingForm from "../MeetingForm";
import React from "react";
import { useToggle } from "../../../../hooks/useToggle";

const MeetingFormSelector = () => {
  const [isActive, toggle] = useToggle(false);
  const formToShow = React.createElement(MeetingForm, null);
  const buttonText = isActive ? "Join without SIP" : "Join via SIP";
  return React.createElement(
    StyledWrapper,
    null,
    React.createElement(StyledDiv, null, formToShow),
    React.createElement(
      Flex,
      {
        container: true,
        layout: "fill-space-centered",
        style: { padding: "2rem" },
      },
      React.createElement(SecondaryButton, {
        label: buttonText,
        onClick: toggle,
      })
    )
  );
};
export default MeetingFormSelector;
//# sourceMappingURL=index.js.map

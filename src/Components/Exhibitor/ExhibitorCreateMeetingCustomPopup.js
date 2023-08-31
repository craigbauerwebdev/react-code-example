import * as React from "react";
import { Popup } from "@progress/kendo-react-popup";

const CustomPopup = (props) => {
  return (
    <Popup
      {...props}
      collision={{
        horizontal: "fit",
        vertical: "fit",
      }}
      popupClass={"popup-content"}
    />
  );
};

export default CustomPopup;

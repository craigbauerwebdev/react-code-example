import * as React from "react";

import { Dialog } from "@progress/kendo-react-dialogs";
import ExhibitorAvailability from "./ExhibitorAvailability";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import exhibitorAvailabilityModalStyles from "./scss/exhibitor-availability-modal.module.scss";

const ExhibitorAvailabilityModal = ({ close, fuzionId }) => {
  return (
    <Dialog autoFocus={true} aria-modal={true} aria-describedby="modal_desc">
      <div id="modal_desc">
        <div className={exhibitorAvailabilityModalStyles.header}>
          <h1 className={exhibitorAvailabilityModalStyles.title} tabIndex="0">
            Availability
          </h1>
          <OEPAnalytics
            componentType="Button"
            page="Modal"
            url="Close modal"
            componentName="Close modal"
          >
            <button
              className={exhibitorAvailabilityModalStyles.closeButton}
              type="button"
              aria-label="close modal"
              onClick={close.bind(null)}
            >
              <SvgTypes name="close-icon" />
            </button>
          </OEPAnalytics>
        </div>

        <ExhibitorAvailability fuzionId={fuzionId} />
      </div>
    </Dialog>
  );
};

export default ExhibitorAvailabilityModal;

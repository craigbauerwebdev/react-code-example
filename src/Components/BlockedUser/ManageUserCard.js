import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, {
  ALIGNMENT_TYPES,
  BUTTON_TYPES,
} from "Components/Modal/ModalButtons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import { chatOptions } from "../Profile/store/utils/chatTypes";
import getAnalyticsPage from "util/getAnalyticsPage";
import getAttendeeFullName from "util/getAttendeeFullName";
import manageUserCardStyles from "./scss/manage-user-card.module.scss";
import { unblockOrUnmuteUser } from "Components/Profile/store/actions";
import { useLocation } from "react-router-dom";

const ManageUserCard = ({ attendee, url }) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const type =
    url === "/account/muted-users" ? chatOptions.UNMUTE : chatOptions.UNBLOCK;
  const showConfirmModal = () => {
    setShowModal(true);
  };
  const closeAndConfirm = (event, noYes) => {
    // Modal returns 0 for cancel and 1 for confirm
    if (noYes) {
      dispatch(
        unblockOrUnmuteUser(attendee.attendeeId, type, user.fuzion_attendee_id)
      );
    }
    setShowModal(false);
  };

  return (
    <div className={manageUserCardStyles.row}>
      <div
        className={`${manageUserCardStyles.column} ${manageUserCardStyles.blue}`}
      >
        <strong>
          {attendee.preferredName ? attendee.preferredName : attendee.firstName}{" "}
          {attendee.lastName}
        </strong>
      </div>
      <div className={manageUserCardStyles.column}>{attendee.company}</div>
      <div className={manageUserCardStyles.column}>
        <div className={manageUserCardStyles.rightMostColumn}>
          <div>{attendee.title}</div>
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            componentName={
              url === "/account/muted-users" ? "Unmute User" : "Unblock User"
            }
            url={
              url === "/account/muted-users" ? "Unmute user" : "Unblock user"
            }
          >
            <button onClick={showConfirmModal} type="button">
              {url === "/account/muted-users" ? "unmute user" : "Unblock"}
            </button>
          </OEPAnalytics>
        </div>
        <Modal
          closeCallback={closeAndConfirm}
          active={showModal}
          modalType={MODAL_TYPES.short}
          button={[
            <ModalButtons
              type={BUTTON_TYPES.confirmationOrDismiss}
              key={BUTTON_TYPES.confirmation}
              alignment={ALIGNMENT_TYPES.right}
              page="Blocked Users"
              componentType="Button"
              confirmationButtonText="Confirm"
              url="blocked-users"
              componentName="Close blocked users"
            />,
            <ModalButtons type={BUTTON_TYPES.closeIcon} />,
          ]}
        >
          <ModalBody
            className={manageUserCardStyles.confirmationMsg}
            title={`Are you sure you want to unblock ${getAttendeeFullName(
              attendee
            )}`}
          ></ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default ManageUserCard;

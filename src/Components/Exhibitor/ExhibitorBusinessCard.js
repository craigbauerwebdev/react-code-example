import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, {
  ALIGNMENT_TYPES,
  BUTTON_TYPES,
} from "Components/Modal/ModalButtons";
import React, { Fragment, useEffect, useReducer } from "react";
import { actionTypesExhibitors, businessCardReducer } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import exhibitorBusinessCardStyles from "./scss/exhibitor-business-card.module.scss";
import getBusinessCards from "util/getBusinessCards";
import { updateBusinessCardsList } from "store/actions";

const ExhibitorBusinessCard = ({ exhibitor, id }) => {
  const dispatch = useDispatch();
  const businessCardList = useSelector(
    (state) => state.global.droppedBusinessCards
  );
  const cards = getBusinessCards();
  const userSession = useSelector((state) => state.global.user);
  /**
   * set initial state for Drop a Business Card -
   * the button is initially active, disclosure modal not showing
   */
  const [businessCardState, dispatchBusinessCard] = useReducer(
    businessCardReducer,
    {
      dropCard: true,
      showModal: false,
      showDisclosure: false,
    }
  );
  const showDisclosureModal = () => {
    dispatchBusinessCard({
      type: actionTypesExhibitors.SHOW_MODAL_AND_DISCLOSURE,
    });
  };
  //Close popup
  const handleOk = (e, val) => {
    if (val) {
      cards[id] = true;

      dispatch(updateBusinessCardsList(id));
      localStorage.setItem("business_card", JSON.stringify(cards));
    }

    dispatchBusinessCard({
      type: actionTypesExhibitors.HIDE_MODAL_AND_DISCLOSURE,
      payload: val > 0 ? false : true,
    });
  };

  // Deactivate button if user has already clicked drop a business card
  useEffect(() => {
    if (businessCardList.length > 0 && businessCardList.includes(id)) {
      dispatchBusinessCard({
        type: actionTypesExhibitors.SET_DROP_CARD,
      });
    }
  }, [businessCardList, id]);

  /*
    if user is logged in, the Drop a Business Card button will be visible
    on click, the button will change to inactive an a popup modal will appear
    the function of the button is to record an analytic that the user clicked on it
  */
  if (!userSession) {
    return null;
  }

  return (
    <Fragment>
      <div className={exhibitorBusinessCardStyles.scheduleMeetingContainer}>
        {businessCardState.dropCard ? (
          <OEPAnalytics
            componentType="Button"
            page="Single Exhibitor"
            url={`business card modal open`}
            componentName="Drop a business card"
            exhibitorId={exhibitor.fuzion_exhibitor_id}
          >
            <button
              className={`${exhibitorBusinessCardStyles.detailsButton} gtm-exhibitor-chat`}
              onClick={showDisclosureModal}
            >
              Drop a Business Card
            </button>
          </OEPAnalytics>
        ) : (
          <OEPAnalytics
            componentType="Button"
            page="Single Exhibitor"
            url={`business card modal open`}
            componentName="Drop a business card"
            exhibitorId={exhibitor.fuzion_exhibitor_id}
          >
            <button
              className={`${exhibitorBusinessCardStyles.detailsButton} ${exhibitorBusinessCardStyles.inactive} gtm-exhibitor-chat`}
            >
              Drop a Business Card
            </button>
          </OEPAnalytics>
        )}
      </div>

      {businessCardState.showDisclosure && (
        <Modal
          closeCallback={handleOk}
          active={businessCardState.showModal}
          modalType={MODAL_TYPES.short}
          button={[
            <ModalButtons
              type={BUTTON_TYPES.confirmationOrDismiss}
              key={BUTTON_TYPES.confirmation}
              alignment={ALIGNMENT_TYPES.right}
              page="single exhibitor"
              componentType="Button"
              url="Drop a Business Card"
              componentName="Drop a Business Card"
            />,
          ]}
        >
          <ModalBody title="Drop a Business Card">
            <p>
              By clicking OK you are agreeing to have your information shared
              with the event organizer and event exhibitors.
            </p>
          </ModalBody>
        </Modal>
      )}
    </Fragment>
  );
};

export default ExhibitorBusinessCard;

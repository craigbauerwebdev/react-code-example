import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, {
  ALIGNMENT_TYPES,
  BUTTON_TYPES,
} from "Components/Modal/ModalButtons";
import React, { Fragment, useState } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import LoaderModal from "Components/Profile/LoaderModal";
import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import checkForLiveStream from "util/checkForLiveStream";
import checkForShowcaseSession from "util/checkForShowcaseSession";
import checkForWatchNow from "util/checkForWatchNow";
import { dataTypes } from "store/utils/dataTypes";
import { deleteProfileData } from "Components/Profile/store/actions";
import { favoriteTypes } from "./Favorites";
import favoritesCardStyles from "./scss/card.module.scss";
import getMeetingUrl from "util/getMeetingUrl";
import getSessionLink from "../Session/utils/getSessionLink";
import { timeSetting } from "util/staticData/timeOffset";
import { useDispatch } from "react-redux";

const FavoritesCard = ({
  children,
  linkTo,
  linkTrackingUrl,
  type,
  favoriteId,
  name,
  data,
  subSessionFavoriteIds,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [hide, setHide] = useState(false);
  const isShowcaseSession = checkForShowcaseSession(data);
  const exhibitorId = data.fuzion_exhibitor_id || null;

  const handleOk = (e, val) => {
    if (val) {
      const params = { [type]: [`${favoriteId}`] };
      const deletePayload = subSessionFavoriteIds
        ? { ...params, [favoriteTypes.subsessions]: subSessionFavoriteIds }
        : params;

      dispatch(deleteProfileData(dataTypes.favorites, deletePayload));
      setHide(true);
    }
    setShowModal(false);
  };

  const handleUnFavorite = () => {
    setShowModal(true);
  };

  const getWatchNowBtn = (data) => {
    if (checkForLiveStream(data) || checkForChimeMeeting(data)) {
      const watchNow = checkForWatchNow(
        data,
        checkForChimeMeeting(data) && timeSetting
      );

      if (watchNow) {
        return (
          <LinkWrapper
            className={favoritesCardStyles.details}
            to={
              checkForChimeMeeting(data)
                ? getMeetingUrl(data, isShowcaseSession)
                : getSessionLink(data, isShowcaseSession)
            }
            aria-label={`Watch "${data.sessionName}" Now`}
            page="Sessions List"
            componentType="Button"
            trackingUrl={`${data.sessionName}`}
            componentName="Watch Now"
            exhibitorId={exhibitorId}
            sessionId={data.sessionId}
          >
            Watch
          </LinkWrapper>
        );
      }
    }

    return (
      <LinkWrapper
        className={favoritesCardStyles.details}
        to={linkTo}
        page="favorites"
        componentType="Button"
        trackingUrl={linkTrackingUrl}
        aria-label={`See Details for "${name}"`}
        componentName="Details"
        exhibitorId={exhibitorId}
        sessionId={data.sessionId}
      >
        Details
      </LinkWrapper>
    );
  };

  if (hide) {
    return <LoaderModal active={true} disableParentPageScroll={false} />;
  }

  return (
    <Fragment>
      <div className={favoritesCardStyles.card}>
        <div className={favoritesCardStyles.contentAndLinkWrapper}>
          <div className={favoritesCardStyles.contentWrapper}>{children}</div>
          <div className={favoritesCardStyles.linkWrapper}>
            {getWatchNowBtn(data)}
          </div>
        </div>
        <div className={favoritesCardStyles.unFavoriteWrapper}>
          <OEPAnalytics
            componentType="Button"
            page="favorites"
            url={`Unfavorite ${name}`}
            componentName="Unfavorite FAQ"
          >
            <button onClick={handleUnFavorite} title={`Unfavorite "${name}"`}>
              <img src="/images/icons/x.svg" alt={`Unfavorite "${name}"`} />
            </button>
          </OEPAnalytics>
        </div>
      </div>
      <Modal
        closeCallback={handleOk}
        active={showModal}
        modalType={MODAL_TYPES.short}
        button={[
          <ModalButtons
            type={BUTTON_TYPES.confirmationOrDismiss}
            key={BUTTON_TYPES.confirmation}
            alignment={ALIGNMENT_TYPES.right}
            page="favorites"
            componentType="Button"
            confirmationButtonText="REMOVE"
            url="Un-Favorite"
            componentName="Close Modal"
          />,
          <ModalButtons type={BUTTON_TYPES.closeIcon} />,
        ]}
      >
        <ModalBody title={"Are you sure you want to remove from favorites?"} />
      </Modal>
    </Fragment>
  );
};

export default FavoritesCard;

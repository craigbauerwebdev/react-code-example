import CreateMeetingModal, {
  MODAL_TYPES as CREATE_MEETING_MODAL_TYPES,
} from "./CreateMeetingModal";
import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, { BUTTON_TYPES } from "Components/Modal/ModalButtons";
import React, { useCallback, useEffect, useState } from "react";
import { emptyFilterData, setFullList } from "Components/Filters/store/actions";
import { useDispatch, useSelector } from "react-redux";

import CustomErrorBoundary from "Components/ErrorBoundary/CustomErrorBoundary";
import FilterWrapper from "Components/Filters/FilterWrapper";
import Loader from "Components/Loader";
import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import ScheduleList from "Components/Schedule/ScheduleList";
import ScopedSearch from "../Search/ScopedSearch";
import SvgTypes from "Components/SVG/SvgTypes";
import { dataTypes } from "store/utils/dataTypes";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getPayload } from "store/actions/index";
import { pageTypes } from "Components/Filters/store/reducer";
import sortResults from "util/sortResults";
import { useLocation } from "react-router-dom";
import webinarStyles from "./scss/webinar.module.scss";

const normalizeTier = (tier = "") => {
  const noWhitespace = tier.replace(/\s+/g, "");
  return noWhitespace.toLowerCase();
};

const WebinarSetup = ({ exhibitorAdminCompanyId }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [sortedSchedule, setSortedSchedule] = useState(null);
  const webinarsData = useSelector((state) => state.global.webinars);
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const filteredSchedule = useSelector((state) => state.filters.filteredData);
  const location = useLocation();
  const [displayPage, setDisplayPage] = useState(false);
  const [showWebinarModal, setShowWebinarModal] = useState(false);
  const [showOutOfWebinarsModal, setShowOutOfWebinarsModal] = useState(false);
  const [maxShowcases, setMaxShowcases] = useState(null);

  const toggleWebinarDialog = () => {
    setShowWebinarModal(!showWebinarModal);
  };

  const newWebinarClick = () => {
    if (filteredSchedule.length < maxShowcases) {
      toggleWebinarDialog();
    } else {
      setShowOutOfWebinarsModal(true);
    }
  };

  const filterWebinarsByCompanyId = useCallback((webinars, companyId) => {
    if (webinars) {
      return webinars.filter(
        (webinar) => webinar.fuzionExhibitorId === companyId
      );
    }

    return [];
  }, []);

  // Get the data that we need to filter things by.
  useEffect(() => {
    if (webinarsData) {
      const sortedSchedule = sortResults(
        filterWebinarsByCompanyId(webinarsData, exhibitorAdminCompanyId),
        "startEndTimeAndName"
      );

      setSortedSchedule(sortedSchedule);
    }
  }, [webinarsData, exhibitorAdminCompanyId, filterWebinarsByCompanyId]);

  useEffect(() => {
    if (filteredSchedule && !displayPage) {
      dispatch(emptyFilterData());
    } else if (!filteredSchedule && !displayPage) {
      // Set the data to the store to be filtered by.
      setDisplayPage(true);
    }
  }, [dispatch, displayPage, filteredSchedule]);

  useEffect(() => {
    if (sortedSchedule) {
      dispatch(setFullList({ data: sortedSchedule, page: pageTypes.SCHEDULE }));
    }
  }, [dispatch, sortedSchedule]);

  // Get Networking Settings
  useEffect(() => {
    if (!networkSettings) {
      dispatch(getPayload(dataTypes.networkSettings));
    }
  }, [networkSettings, dispatch]);

  // Get exhibitors data
  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  }, [exhibitors, dispatch]);

  // Get Webinars data
  useEffect(() => {
    dispatch(
      getPayload(
        dataTypes.webinars,
        process.env.REACT_APP_FUZION_EVENT_ID,
        true
      )
    );
  }, [dispatch]);

  // Run on change to networkSettings or exhibitors data
  useEffect(() => {
    if (networkSettings && exhibitors) {
      const exhibitor = exhibitors.find(
        (z) => z.exhibitor_company_id === exhibitorAdminCompanyId
      );

      if (!exhibitor) {
        setError(true);
        return;
      }

      const tier = networkSettings.networkingMeetings.tiers.find(
        (z) =>
          normalizeTier(z.tierName) ===
          normalizeTier(exhibitor.membership_level)
      );

      if (tier) {
        setMaxShowcases(parseInt(tier.productShowcaseLimit));
      }
    }
  }, [networkSettings, exhibitors, exhibitorAdminCompanyId]);

  if (!displayPage || !filteredSchedule) {
    return <Loader />;
  }

  return error ? (
    <CustomErrorBoundary />
  ) : (
    <div className={webinarStyles.schedulePage}>
      <div>
        <div className={webinarStyles.schedulePageInnerHolder}>
          <h2>
            <strong>
              {exhibitorAdminCompanyId ? "Live Showcases" : "Schedule"}
            </strong>
          </h2>
        </div>
        <div>
          <FilterWrapper
            search={<ScopedSearch fullWidth page="Webinars List" />}
          />
        </div>
        <div className={webinarStyles.newWebinarButtonWrapper}>
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="New Live Showcase"
            componentName="New Live Showcase"
          >
            <button
              type="button"
              className={webinarStyles.newWebinarButton}
              onClick={newWebinarClick}
            >
              <SvgTypes name="chalkboard-teacher" />
              <span>New Live Showcase</span>
            </button>
          </OEPAnalytics>
        </div>
      </div>
      <ScheduleList
        filteredSchedule={filteredSchedule}
        exhibitorAdminCompanyId={exhibitorAdminCompanyId}
      />
      {filteredSchedule && filteredSchedule.length === 0 && (
        <div className={webinarStyles.emptyContent}>
          No Live Showcases have been scheduled. Click "New Live Showcase"
          button to create one.
        </div>
      )}
      {showWebinarModal && (
        <CreateMeetingModal
          toggleDialog={toggleWebinarDialog}
          modalType={CREATE_MEETING_MODAL_TYPES.webinar}
          meetingTypes={["Showcase"]}
        />
      )}
      <Modal
        modalType={MODAL_TYPES.short}
        active={showOutOfWebinarsModal}
        closeCallback={setShowOutOfWebinarsModal.bind(null, false)}
        button={[
          <ModalButtons
            type={BUTTON_TYPES.closeIcon}
            componentName="Close modal"
          />,
        ]}
      >
        <ModalBody
          title={"You have created all of your Live Showcase events."}
        />
      </Modal>
    </div>
  );
};

export default WebinarSetup;

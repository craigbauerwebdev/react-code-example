import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, { BUTTON_TYPES } from "Components/Modal/ModalButtons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import { dataTypes } from "store/utils/dataTypes";
import formatUrl from "util/formatter";
import { getPayload } from "store/actions";
import surveyStyles from "./scss/session-survey-link.module.scss";
import isURL from "validator/es/lib/isURL";
import SurveySection from "Components/Survey/SurveySection";
import { enableParentPageScroll } from "../Modal/utils/toggleParentPageScrolling";

const SessionSurveyLink = ({
  link,
  subSession = false,
  page,
  sessionData,
  surveySlug = "cme-survey",
}) => {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.global.surveys);
  const [surveyConfig, setSurveyConfig] = useState(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  /**
   * Check that survey data is available or not
   */
  useEffect(() => {
    if (!surveys) {
      dispatch(getPayload(dataTypes.surveys));
    } else {
      if (surveys && surveys.length > 0) {
        setSurveyConfig(surveys.find((s) => s.slug === surveySlug));
      }
    }
  }, [dispatch, surveys, surveySlug]);

  const closeSurveyModal = () => {
    enableParentPageScroll();
    setShowSurveyModal(false);
  };

  const openSurveyModal = () => {
    setShowSurveyModal(true);
  };

  const showAsLink = isURL(link);

  return showAsLink ? (
    <LinkWrapper
      external={true}
      to={formatUrl(link)}
      className={`${surveyStyles.sessionSurveyLink} ${
        subSession && surveyStyles.subSession
      }`}
      page={page}
      componentType="link"
      trackingUrl={link}
      componentName={link}
    >
      <span>
        <SvgTypes name="survey" />
      </span>{" "}
      Survey
    </LinkWrapper>
  ) : (
    <React.Fragment>
      <OEPAnalytics
        page={page}
        componentType="Button"
        url="Open session survey modal"
        componentName="Open session survey modal"
      >
        <button
          className={`${surveyStyles.sessionSurveyLink} ${
            subSession && surveyStyles.subSession
          }`}
          onClick={(e) => {
            openSurveyModal(e);
          }}
        >
          <span>
            <SvgTypes name="survey" />
          </span>{" "}
          Survey
        </button>
      </OEPAnalytics>
      <Modal
        closeCallback={closeSurveyModal}
        active={showSurveyModal}
        modalType={MODAL_TYPES.survey}
        button={[
          <ModalButtons
            type={BUTTON_TYPES.closeIcon}
            key={BUTTON_TYPES.closeIcon}
            componentName="Close session survey modal"
            componentType="Button"
            url="Close session survey modal"
            page={page}
          />,
        ]}
      >
        {surveyConfig ? (
          <SurveySection
            surveyConfig={surveyConfig}
            sessionData={sessionData}
            closeSurveyModal={closeSurveyModal}
          />
        ) : (
          <div>
            <p>Error with session survey configuration</p>
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default SessionSurveyLink;

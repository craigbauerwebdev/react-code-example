import React, { useEffect, useState } from "react";

import CreateMeetingModal from "Components/Profile/CreateMeetingModal";
import ExhibitorAvailabilityModal from "Components/Exhibitor/ExhibitorAvailabilityModal";
import LoaderModal from "Components/Profile/LoaderModal";
import Pagination from "Components/Paginate/ApiPagination";
import RepresentativeListBody from "./RepresentativeListBody";
import attendeeListStyles from "Components/Attendees/scss/attendee-list.module.scss";
import { bpMap } from "util/bpMap";
import representativeSetupStyles from "./scss/representative-setup.module.scss";
import { searchActionTypes } from "Components/AttendeeSearch/AttendeeSearchReducer";
import useAlgoliaSetting from "hooks/useAlgoliaSetting";
import { useSelector } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const RepresentativeSetup = ({
  searchState,
  dispatchSearchState,
  mobileFilter,
}) => {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [exhibitorRepIdForEditing, setExhibitorRepIdForEditing] = useState(
    false
  );
  // const attendeeIndex = useSelector(
  //   (state) => state.profile.algoliaSearchIndex.attendeeData
  // );
  // const { searchState, dispatchSearchState } = useSearch(attendeeIndex);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const [isUpdateInProgress, setIsUpdateInProgress] = useState(false);
  const [exhibitor, setExhibitor] = useState({});
  const tableRef = React.createRef();
  const isMobile = useToggleDisplayMQ(bpMap.tablet);

  const toggleMeetingDialog = () => {
    setShowMeetingModal(!showMeetingModal);
  };

  const closeAvailabilityDialog = () => {
    setExhibitorRepIdForEditing(null);
  };

  const handleClick = (attendee) => {
    setExhibitor(attendee);
    setShowMeetingModal(true);
  };

  const handleEditClick = (fuzionAttendeeId) => {
    setExhibitorRepIdForEditing(fuzionAttendeeId);
  };

  //only show from same company
  useEffect(() => {
    if (accountProfile) {
      dispatchSearchState({
        type: searchActionTypes.SET_FILTER,
        payload: `companyId:${accountProfile.companyId}`,
      });
    }
  }, [accountProfile, dispatchSearchState]);

  useAlgoliaSetting();

  return (
    <div className={representativeSetupStyles.main}>
      <div
        className={representativeSetupStyles.representativeSetupHeaderWrapper}
      >
        <div className={representativeSetupStyles.representativeSetupHeader}>
          <h2>Representative Setup</h2>
        </div>
      </div>

      {mobileFilter && mobileFilter()}
      <div className={attendeeListStyles.scrollingContent}>
        <table
          className={attendeeListStyles.table}
          ref={tableRef}
          autoFocus={true}
          tabIndex="-1"
        >
          <thead
            className={`${isMobile && representativeSetupStyles.tableHeader}`}
          >
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Job Title</th>
              <th scope="col">Booth Staff</th>
              {/* <th scope="col">VIP</th>
              <th scope="col">Edit Calendar</th>
              <th scope="col">New Meeting</th> */}
            </tr>
          </thead>
          {searchState.hits && (
            <RepresentativeListBody
              data={searchState.hits}
              handleEditClick={handleEditClick}
              handleClick={handleClick}
              dispatchSearchState={dispatchSearchState}
              setIsUpdateInProgress={setIsUpdateInProgress}
            />
          )}
          <tfoot>
            <tr>
              <td colSpan="6">
                {searchState.resultsInfo &&
                  searchState.resultsInfo.nbHits > 0 && (
                    <Pagination
                      totalPages={searchState.resultsInfo.nbPages}
                      currentPage={searchState.page}
                      dispatchSearchState={dispatchSearchState}
                      listRef={tableRef}
                      pageTitle="Representatives"
                    />
                  )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {showMeetingModal && (
        <CreateMeetingModal
          toggleDialog={toggleMeetingDialog}
          exhibitor={exhibitor}
          preLoadedAttendeeProp={exhibitor}
        />
      )}
      {exhibitorRepIdForEditing && (
        <ExhibitorAvailabilityModal
          close={closeAvailabilityDialog}
          fuzionId={exhibitorRepIdForEditing}
        />
      )}
      <LoaderModal active={isUpdateInProgress} />
    </div>
  );
};

export default RepresentativeSetup;

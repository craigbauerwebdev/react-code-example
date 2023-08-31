import ProfileAvatar from "Components/Profile/ProfileAvatar";
import React from "react";
import { Switch } from "@progress/kendo-react-inputs";
import { addOverride } from "Components/AttendeeSearch/AttendeeSearchReducer";
import attendeeListStyles from "Components/Attendees/scss/attendee-list.module.scss";
import { bpMap } from "util/bpMap";
import favoritesListStyles from "../Favorites/scss/favorites-list.module.scss";
import { patchGuestProfileData } from "Components/Profile/store/actions";
import representativeSetupStyles from "./scss/representative-setup.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const RepresentativeListBody = ({
  data,
  // handleEditClick,
  handleClick,
  dispatchSearchState,
  setIsUpdateInProgress,
}) => {
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const updateSetting = ({ field, fuzionAttendeeId }, event) => {
    saveAnalytic({
      page: "representative setup",
      url: "/account/representative-setup",
      componentType: "Button",
      componentName: "Booth Staff",
    });

    setIsUpdateInProgress(true);
    patchGuestProfileData(fuzionAttendeeId, {
      networking: {
        [field]: event.target.value,
      },
    }).then((res) => {
      if (res.code === 200 && res.data) {
        addOverride(
          {
            ...res.data,
            fuzionAttendeeId,
          },
          dispatchSearchState
        );
      }
      setIsUpdateInProgress(false);
    });
  };

  return (
    <tbody>
      {data.length > 0 ? (
        data.map((attendee) => {
          return (
            <tr
              key={attendee.fuzionAttendeeId}
              className={`${isMobile && representativeSetupStyles.tr}`}
            >
              <th scope="row">
                <div className={attendeeListStyles.avatarContainer}>
                  <ProfileAvatar
                    firstName={attendee.firstName}
                    lastName={attendee.lastName}
                    url={attendee.avatar}
                    size={40}
                  />
                  <div className={attendeeListStyles.flexTDText}>
                    <div className={attendeeListStyles.attendeeName}>
                      {attendee.name}
                    </div>
                  </div>
                </div>
              </th>
              <td>
                <div className={attendeeListStyles.flexTDText}>
                  {isMobile && <label>Title:</label>}
                  {attendee.title}
                </div>
              </td>
              <td>
                <div className={attendeeListStyles.flexTDText}>
                  {isMobile && <label>Booth Staff:</label>}
                  <Switch
                    onChange={updateSetting.bind(null, {
                      field: "boothStaff",
                      fuzionAttendeeId: attendee.fuzionAttendeeId,
                    })}
                    checked={attendee.networking.boothStaff.BOOL}
                    ariaLabelledBy={`${attendee.fuzionAttendeeId}-booth-staff`}
                  />

                  <span
                    id={`${attendee.fuzionAttendeeId}-booth-staff`}
                    className="sr-only"
                  >
                    Is {attendee.name} Booth Staff
                  </span>
                </div>
              </td>
              {/* <td>
              <div className={attendeeListStyles.flexTDText}>
                <Switch
                  onChange={updateSetting.bind(null, {
                    field: "isVIP",
                    id: attendee.fuzionAttendeeId,
                  })}
                  checked={attendee.networking.isVIP.BOOL}
                  ariaLabelledBy={`${attendee.fuzionAttendeeId}-vip-staff`}
                />
                <span
                  id={`${attendee.fuzionAttendeeId}-vip-staff`}
                  className="sr-only"
                >
                  Is {attendee.name} VIP
                </span>
              </div>
            </td>
            <td>
              {attendee.networking.boothStaff.BOOL && (
                <div className={attendeeListStyles.flexTDText}>
                  <div className={attendeeListStyles.svgContainer}>

                      <button
                        type="button"
                        className={attendeeListStyles.attendeeButton}
                        onClick={handleEditClick.bind(
                          null,
                          attendee.fuzionAttendeeId
                        )}
                        aria-label={`Edit ${attendee.name}'s availability`}
                      >
                        Edit
                      </button>
                    
                  </div>
                </div>
              )}
            </td> 
            <td>
              <div className={attendeeListStyles.flexTDText}>
                <div className={attendeeListStyles.svgContainer}>

                    <button
                      type="button"
                      className={attendeeListStyles.attendeeButton}
                      aria-label={`Open Video Meeting with ${attendee.name}`}
                      onClick={handleClick.bind(null, attendee)}
                    >
                      Schedule Meeting
                    </button>
                  
                </div>
              </div>
            </td>
            */}
            </tr>
          );
        })
      ) : (
        <p className={favoritesListStyles.noResults}>
          There are no results that match your search
        </p>
      )}
    </tbody>
  );
};

export default RepresentativeListBody;

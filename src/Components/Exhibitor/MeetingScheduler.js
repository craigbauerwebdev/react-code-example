import "../../css/kendo/subset.scss";

import { Form, FormElement } from "@progress/kendo-react-form";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  actionTypesMeetingScheduler,
  meetingSchedulerInitState,
  meetingSchedulerReducer,
} from "./reducer/meetingSchedulerReducer";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import CustomTag from "Components/Profile/CustomTag";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Dialog } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Loader from "Components/Loader";
import { MEETING_TYPES } from "util/meetingTypes";
import MultiSelectItem from "Components/Profile/MultiSelectItem";
import OEPAnalytics from "Components/OEPAnalytics";
import SaveSuccessModal from "Components/SaveSuccess/SaveSuccessModal";
import SvgTypes from "Components/SVG/SvgTypes";
import buttonList from "util/staticData/Components/Profile/ButtonList";
import { createMeeting } from "Components/Profile/store/actions";
import { dataTypes } from "store/utils/dataTypes";
import dateToTime from "util/dateToTime";
import getAttendeeFullName from "util/getAttendeeFullName";
import { getPayload } from "store/actions";
import meetingSchedulerStyles from "./scss/meeting-scheduler.module.scss";
import moment from "moment-timezone";
import { options } from "../../util/staticData/Components/Exhibitor/MeetingScheduler";
import { searchActionTypes } from "Components/AttendeeSearch/AttendeeSearchReducer";
import toDate from "util/toDate";
import useAlgoliaSetting from "hooks/useAlgoliaSetting";
import useGuestProfiles from "hooks/useGuestProfiles";
import { useReducer } from "react";
import useSearch from "hooks/useSearch";
import useWindowDimensions from "hooks/useWindowDimensions";
import { zoneName } from "util/getZoneName";

const START_TIME_INTERVAL = 30; //30 minutes e.g. 9:00 AM, 9:30 AM, 10:00 AM
const MAX_WIDTH = 700;
const PADDING = 40;
const MEETING_TYPES_LIST = ["Chat", "Video"];

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Meeting-Scheduler
 * @param {object} props
 * @param {Function} props.closeCallback
 * @param {Exhibitor} props.exhibitor
 * @param {String} props.repAttendeeId
 * @param {String} props.page
 *
 * @returns {JSX.meetingDuration}
 */
const MeetingScheduler = ({
  closeCallback,
  exhibitor,
  repAttendeeId,
  repAttendee,
  page,
}) => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.global.permissions);
  const timezone = useSelector((state) => state.global.timezone);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const attendeeIndex = useSelector(
    (state) => state.profile.algoliaSearchIndex.attendeeData
  );
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const { searchState, dispatchSearchState } = useSearch(attendeeIndex);
  const [allReps, setAllReps] = useState([]);
  const [filteredReps, setFilteredReps] = useState([]);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [meetingSchedulerState, dispatchMeetingSchedulerState] = useReducer(
    meetingSchedulerReducer,
    meetingSchedulerInitState
  );
  const [repError, setRepError] = useState(null);
  const { width } = useWindowDimensions();
  const { listWithGuestProfileData: repsWithGuestProfiles } = useGuestProfiles(
    searchState?.hits,
    "fuzionAttendeeId"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const durationDropdownRef = useRef(null);
  const chooseTimeRef = useRef(null);
  const tierLevelInfoRef = useRef();
  const [tierLevelData, setTierLevelData] = useState(null);
  const [meetingType, setMeetingType] = useState(null);

  const blockedByUsers = useSelector((state) => state.profile.blockedByUsers);

  const isBlockedBy = useCallback(
    (fuz_attendee_id) => {
      let blockedBy =
        blockedByUsers !== "" &&
        blockedByUsers?.filter((id) => {
          return id === fuz_attendee_id;
        });
      return blockedBy[0];
    },
    [blockedByUsers]
  );

  const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));

  const closeSuccessModal = () => {
    setIsSuccess(false);
    closeCallback(false);
  };

  /**
   * Take a date or a exhibitor rep and find what times that rep has available.
   * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Meeting-Scheduler#getting-time-slots
   */
  const calculateTimeAvailabilities = useCallback(
    (date = meetingSchedulerState.date, reps) => {
      if (!reps) {
        if (meetingSchedulerState.byRep) {
          reps = [meetingSchedulerState.chosenReps];
        } else if (meetingSchedulerState.byTime) {
          reps = allReps;
        }
      }

      if (reps.length) {
        const dates = reps.map((z) =>
          z.meetingTimes.map((y) => {
            return {
              ...y,
              attendeeId: z.attendeeId,
            };
          })
        );

        const flatten = dates.flat();
        const uniform = flatten.map((z) => {
          const uniformDate = moment(z.date).format("YYYY-MM-DD");
          z.uniformDate = uniformDate;
          //the from and the to are saved in the DB in the event time zone
          const eventTZFrom = moment
            .tz(
              `${date} ${z.from}`,
              "YYYY-MM-DD hh:mm A",
              ConfigService.runValues.momentTimezone
            )
            .toDate();
          z.uniformFrom = eventTZFrom;

          const eventTZTo = moment
            .tz(
              `${date} ${z.to}`,
              "YYYY-MM-DD hh:mm A",
              ConfigService.runValues.momentTimezone
            )
            .toDate();
          z.uniformTo = eventTZTo;

          return z;
        });

        const filtered = uniform.filter(
          (z) => !z.isNotAvailable && z.uniformDate === date
        );

        if (filtered.length) {
          const sortedStartTimeAsc = filtered.sort((a, b) =>
            a.uniformFrom > b.uniformFrom ? 1 : -1
          );
          let startTimeIterator = sortedStartTimeAsc[0].uniformFrom;
          const sortedEndTimeDesc = filtered.sort((a, b) =>
            a.uniformTo < b.uniformTo ? 1 : -1
          );
          const latestEndTime = sortedEndTimeDesc[0].uniformTo;
          const latestStartTime = moment(latestEndTime)
            .subtract(meetingSchedulerState.meetingDuration, "minutes")
            .toDate();
          const currentTime = moment.tz(new Date(), timezone).toDate();

          if (startTimeIterator < latestStartTime) {
            const timeOptions = []; // List of available time to meet for a rep.

            while (startTimeIterator <= latestStartTime) {
              const i = startTimeIterator;
              //don't allow scheduling before current time
              if (i > currentTime) {
                const endTimeIterator = moment(i)
                  .add(meetingSchedulerState.meetingDuration, "minutes")
                  .toDate();
                //if there's one rep (filtered) where from is <= starTimeIterator and to is >= endTimeIterator
                const matches = filtered.filter(
                  (z) => z.uniformFrom <= i && z.uniformTo >= endTimeIterator
                );

                if (matches.length) {
                  const timeDisplay = moment(i).tz(timezone).format("h:mm A");
                  timeOptions.push({
                    time: timeDisplay,
                    reps: matches.map((z) => z.attendeeId),
                  });
                }
              }

              startTimeIterator = moment(i)
                .add(START_TIME_INTERVAL, "minutes")
                .toDate();
            }

            return timeOptions;
          }
        }
      }
    },
    [
      meetingSchedulerState.chosenReps,
      meetingSchedulerState.date,
      allReps,
      meetingSchedulerState.byRep,
      meetingSchedulerState.byTime,
      meetingSchedulerState.meetingDuration,
      timezone,
    ]
  );

  const handleDateChange = (event) => {
    const getDateVal = moment(event.target.value).format("YYYY-MM-DD");
    const timeAvailabilities = calculateTimeAvailabilities(getDateVal);

    dispatchMeetingSchedulerState({
      type: actionTypesMeetingScheduler.HANDLE_DATE_CHANGE,
      payload: {
        date: getDateVal,
        availabilityTimes: timeAvailabilities,
      },
    });
  };

  const handleRepSelected = (event) => {
    dispatchMeetingSchedulerState({
      type: actionTypesMeetingScheduler.SET_CHOSEN_REPS,
      payload: {
        chosenReps: event.value,
        availabilityTimes: meetingSchedulerState.byRep
          ? calculateTimeAvailabilities(
              moment
                .tz(
                  meetingSchedulerState.availabilityStartDate,
                  ConfigService.runValues.momentTimezone
                )
                .format("YYYY-MM-DD"),
              [event.value]
            )
          : null,
      },
    });
  };

  const handleChooseATimeButton = () => {
    const availabilities = calculateTimeAvailabilities(
      moment
        .tz(
          meetingSchedulerState.availabilityStartDate,
          ConfigService.runValues.momentTimezone
        )
        .format("YYYY-MM-DD"),
      allReps
    );

    if (availabilities && availabilities.length > 0) {
      setFilteredReps(filterReps(availabilities[0].reps));
    }

    dispatchMeetingSchedulerState({
      type: actionTypesMeetingScheduler.HANDLE_CHOOSE_A_TIME_BUTTON,
      payload: availabilities,
    });
  };

  const handleChooseARepButton = () => {
    dispatchMeetingSchedulerState({
      type: actionTypesMeetingScheduler.HANDLE_CHOOSE_A_REP_BUTTON,
      payload: null,
    });
  };

  const filterReps = useCallback(
    (repIds) => {
      return allReps.filter((z) => repIds.includes(z.attendeeId));
    },
    [allReps]
  );

  const handleMeetingTimeSelect = (event) => {
    if (event.value !== meetingSchedulerState.meetingTime) {
      dispatchMeetingSchedulerState({
        type: actionTypesMeetingScheduler.SET_MEETING_TIME,
        payload: event.value,
      });

      if (meetingSchedulerState.byTime) {
        setFilteredReps(
          filterReps(
            meetingSchedulerState.availabilityTimes.find(
              (a) => a.time === event.value
            ).reps
          )
        );
      }
    }
  };

  const handleMeetingDurationChange = (event) => {
    dispatchMeetingSchedulerState({
      type: actionTypesMeetingScheduler.SET_MEETING_DURATION,
      payload: event.value.value,
    });
  };

  const handleScheduleMeetingSubmit = () => {
    const rep = meetingSchedulerState.chosenReps;
    const attendeeName = `${
      accountProfile.preferredName || accountProfile.firstName
    } ${accountProfile.lastName}`;
    const startDateString = moment(meetingSchedulerState.date).format(
      "YYYY-MM-DD"
    );
    const startTimeUserTimezone = moment.tz(
      `${startDateString} ${meetingSchedulerState.meetingTime}`,
      "YYYY-MM-DD hh:mm A",
      timezone
    );
    const startTimeEventTimezone = moment.tz(
      startTimeUserTimezone,
      ConfigService.runValues.momentTimezone
    );
    const endTimeEventTimezone = startTimeEventTimezone
      .clone()
      .add("minutes", meetingSchedulerState.meetingDuration);

    setIsSaving(true);
    dispatch(
      createMeeting({
        meetingTitle: `Meeting Requested by ${attendeeName}`,
        startTime: startTimeEventTimezone.format("YYYY-MM-DDTHH:mm:ss"),
        endTime: endTimeEventTimezone.format("YYYY-MM-DDTHH:mm:ss"),
        host: {
          fuzionAttendeeId: user.fuzion_attendee_id,
          name: attendeeName,
        },
        meetingType: meetingSchedulerState.meetingType,
        description: `${attendeeName} has requested a meeting with ${getAttendeeFullName(
          rep
        )}`,
        attendees: [
          {
            fuzionAttendeeId: rep.attendeeId,
            name: `${getAttendeeFullName(rep)}`,
          },
        ],
        createdBy: user.fuzion_attendee_id,
      })
    ).then(
      (data) => {
        if (data) {
          setIsSaving(false);
          setSuccessMessage("Your meeting has been requested.");
          setIsSuccess(true);
        }
      },
      () => {
        setIsSaving(false);
        setSuccessMessage("Sorry something when wrong please try again!");
        setIsSuccess(true);
      }
    );
  };

  const handleMeetingType = (type) => {
    setMeetingType(type);
    dispatchMeetingSchedulerState({
      type: actionTypesMeetingScheduler.SET_MEETING_TYPE,
      payload: type,
    });
    setShowFirstPage(false);
  };

  const tagRender = (element, value) => {
    if (!value) {
      return element;
    }

    return React.cloneElement(element, { ...element.props }, [
      <CustomTag tag={value} key={value.attendeeId} />,
      value.firstName,
    ]);
  };

  const repListRender = (li, itemProps) => {
    const item = itemProps.dataItem;

    return React.cloneElement(
      li,
      li.props,
      <MultiSelectItem item={item} key={item.attendeeId} />
    );
  };

  //get list of reps for exhibitor
  useEffect(() => {
    if (exhibitor) {
      const filter = `networking.boothStaff.BOOL:true AND companyId:${exhibitor.exhibitor_company_id}`;

      dispatchSearchState({
        type: searchActionTypes.SET_FILTER,
        payload: filter,
      });
    }
  }, [exhibitor, dispatchSearchState]);

  //set the date range on the calendar that includes when at least one rep is available
  const calculateDateRange = useCallback(
    (hits) => {
      const dates = hits.map((z) => z.meetingTimes);
      const flattened = dates.flat();
      const filtered = flattened.filter((z) => !z.isNotAvailable);
      const sortedAsc = filtered.sort((a, b) => (a.date > b.date ? 1 : -1));

      if (sortedAsc.length > 0) {
        const currentTime = moment.tz(new Date(), timezone).format();
        const startDate =
          sortedAsc[0].date > currentTime ? sortedAsc[0].date : currentTime;

        return {
          startDate: startDate,
          endDate: sortedAsc[sortedAsc.length - 1].date,
        };
      }
    },
    [timezone]
  );

  const isDefaultAvailability = (availability) => {
    return (
      availability.length === 1 &&
      availability[0].date === "" &&
      availability[0].available
    );
  };

  //map to shape expected by dropdown, add default availability if necessary
  const addAvailabilities = useCallback(
    (hits) => {
      return hits
        .map((z) => {
          const rep = {
            ...z.guestProfile,
            name: `${z.guestProfile && getAttendeeFullName(z.guestProfile)}`,
          };

          if (
            rep.meetingTimes &&
            isDefaultAvailability(rep.meetingTimes) &&
            networkSettings
          ) {
            rep.meetingTimes = networkSettings.meetingTimes;
          }

          return rep;
        })
        .filter((z) => z.meetingTimes);
    },
    [networkSettings]
  );

  // PJX-662 message added for no time slots available for selected date
  const noTimesAvailable = (element) => {
    const noData = <div>No times available this day</div>;

    return React.cloneElement(element, { ...element.props }, noData);
  };

  //set reps to dropdown options
  useEffect(() => {
    if (repsWithGuestProfiles?.length) {
      const repsWithAvailabilities = addAvailabilities(repsWithGuestProfiles);

      if (repsWithAvailabilities.length) {
        const filteredReps = repsWithAvailabilities
          .filter(
            (z) =>
              z.networking.allowNetworking === true &&
              z.networking.allowUserNetworking === true &&
              z.networking.boothStaff === true
          )
          .filter((z) => !repAttendeeId || z.attendeeId === repAttendeeId)
          .filter((z) => {
            return z.attendeeId !== isBlockedBy(z.attendeeId);
          });

        if (filteredReps.length) {
          const dateRange = calculateDateRange(filteredReps);

          setAllReps(filteredReps);

          if (dateRange) {
            dispatchMeetingSchedulerState({
              type: actionTypesMeetingScheduler.SET_AVAILABILITY_DATE_RANGE,
              payload: dateRange,
            });
          }
        } else {
          setRepError(
            "Representative is not able to take meeting requests at this time."
          );
        }
      }
    } else if (
      searchState.resultsInfo &&
      searchState.resultsInfo.nbHits === 0
    ) {
      setRepError(
        "Exhibitor is not able to take meeting requests at this time."
      );
    }
  }, [
    repsWithGuestProfiles,
    searchState.resultsInfo,
    addAvailabilities,
    calculateDateRange,
    repAttendeeId,
    isBlockedBy,
  ]);

  //get network settings if not loaded
  useEffect(() => {
    if (!networkSettings) {
      dispatch(getPayload(dataTypes.networkSettings));
    }
  }, [networkSettings, dispatch]);

  //get exhiitors if not loaded
  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  });

  // compute data based on tier level Settings
  const computeTierLevelInfo = () => {
    if (exhibitors && !tierLevelData && repsWithGuestProfiles) {
      const hostExhibitor = exhibitors.find(
        (ex) => ex.exhibitor_company_id === user.exhibitor_company_id
      );
      const hostTier = networkSettings.networkingMeetings.tiers.find(
        (tier) => tier.tierName === hostExhibitor?.membership_level
      );
      const isHostVideoChatToggleOn = hostTier?.videoChat;
      const isHostChatToggleOn = hostTier?.chat;
      let videoOffAttendeesArr = [];
      let chatOffAttendeesArr = [];
      repsWithGuestProfiles.map((invitee) => {
        const exhibitor = exhibitors.find((ex) => {
          return ex.exhibitor_company_id === invitee.companyId;
        });
        if (exhibitor) {
          const tier = networkSettings.networkingMeetings.tiers.find(
            (tier) => tier.tierName === exhibitor?.membership_level
          );
          if (
            tier?.videoChat === false &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            videoOffAttendeesArr.push(invitee);
          }
          if (
            tier?.chat === false &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            chatOffAttendeesArr.push(invitee);
          }
        }
        return null;
      });
      setTierLevelData({
        isHostChatToggleOn: isHostChatToggleOn,
        isHostVideoChatToggleOn: isHostVideoChatToggleOn,
        videoOffAttendees: videoOffAttendeesArr,
        chatOffAttendees: chatOffAttendeesArr,
      });
    } else if (tierLevelData && exhibitors) {
      let videoOffAttendeesArr = tierLevelData.videoOffAttendees;
      let chatOffAttendeesArr = tierLevelData.chatOffAttendees;
      let chatOffAttendeeIds = chatOffAttendeesArr.map(
        (attendee) => attendee.fuzionAttendeeId
      );
      let videoOffAttendeeIds = videoOffAttendeesArr.map(
        (attendee) => attendee.fuzionAttendeeId
      );
      repsWithGuestProfiles.map((invitee) => {
        const exhibitor = exhibitors.find((ex) => {
          return ex.exhibitor_company_id === invitee.companyId;
        });
        if (exhibitor) {
          const tier = networkSettings.networkingMeetings.tiers.find(
            (tier) => tier.tierName === exhibitor?.membership_level
          );
          if (
            tier?.videoChat === false &&
            !videoOffAttendeeIds.includes(invitee.fuzionAttendeeId) &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            videoOffAttendeesArr.push(invitee);
            videoOffAttendeeIds.push(invitee.fuzionAttendeeId);
          }
          if (
            tier?.chat === false &&
            !chatOffAttendeeIds.includes(invitee.fuzionAttendeeId) &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            chatOffAttendeesArr.push(invitee);
            chatOffAttendeeIds.push(invitee.fuzionAttendeeId);
          }
        }
        return null;
      });
      setTierLevelData({
        ...tierLevelData,
        chatOffAttendees: chatOffAttendeesArr,
        videoOffAttendees: videoOffAttendeesArr,
      });
    }
  };
  tierLevelInfoRef.current = computeTierLevelInfo;

  useEffect(() => {
    if (exhibitors && repsWithGuestProfiles) {
      tierLevelInfoRef.current();
    }
  }, [exhibitors, repsWithGuestProfiles]);

  useEffect(() => {
    if (allReps.length) {
      if (durationDropdownRef.current) {
        durationDropdownRef.current.focus();
      }
    }
  }, [allReps.length]);

  useEffect(() => {
    if (!showFirstPage) {
      if (chooseTimeRef.current) {
        chooseTimeRef.current.focus();
      }
    }
  }, [showFirstPage]);

  const filteredMeetingTypeBasedOnPermission = () => {
    if (tierLevelData) {
      const isHostVideoChatToggleOn = tierLevelData.isHostVideoChatToggleOn;
      const isBoothStaffOrExhibitorAdmin =
        permissions.boothStaff || permissions.exhibitorAdmin;
      const isVideoAllowed =
        (isBoothStaffOrExhibitorAdmin && isHostVideoChatToggleOn) ||
        !isBoothStaffOrExhibitorAdmin;
      const isHostChatToggleOn = tierLevelData.isHostChatToggleOn;
      const isChatAllowed =
        (isBoothStaffOrExhibitorAdmin && isHostChatToggleOn) ||
        !isBoothStaffOrExhibitorAdmin;
      return (
        buttonList
          .filter((z) => MEETING_TYPES_LIST.includes(z.name))
          // PJX-706 allowVideoChatAccess flag for enable the video meeting option
          .filter((z) => {
            return (
              (z.value === MEETING_TYPES.VIDEO &&
                permissions.allowVideoChatAccess &&
                isVideoAllowed) ||
              z.value !== MEETING_TYPES.VIDEO
            );
          })
          // PJX-701 allowNetworkingChatMeetings flag for enable the chat meeting option
          .filter((z) => {
            return (
              (z.value === MEETING_TYPES.CHAT &&
                permissions.allowNetworkingChatMeetings &&
                networkSettings.networkingMeetings.meetingFormats.chat &&
                isChatAllowed) ||
              z.value !== MEETING_TYPES.CHAT
            );
          })
      );
    } else {
      return (
        buttonList
          .filter((z) => MEETING_TYPES_LIST.includes(z.name))
          // PJX-706 allowVideoChatAccess flag for enable the video meeting option
          .filter(
            (z) =>
              (z.value === MEETING_TYPES.VIDEO &&
                permissions.allowVideoChatAccess) ||
              z.value !== MEETING_TYPES.VIDEO
          )
          // PJX-701 allowNetworkingChatMeetings flag for enable the chat meeting option
          .filter(
            (z) =>
              (z.value === MEETING_TYPES.CHAT &&
                permissions.allowNetworkingChatMeetings &&
                networkSettings.networkingMeetings.meetingFormats.chat) ||
              z.value !== MEETING_TYPES.CHAT
          )
      );
    }
  };

  const getAttendees = () => {
    if (meetingType === "chat") {
      if (meetingSchedulerState.byTime) {
        let maxInviteChat = filteredReps.length > 0 ? filteredReps : [];
        if (repAttendee !== undefined && repAttendee.attendeeId) {
          maxInviteChat = filteredReps.filter(
            (rep) => rep.attendeeId === repAttendee.attendeeId
          );
        }
        // remove chatOffAttendees
        return maxInviteChat.filter((invitee) => {
          return !tierLevelData.chatOffAttendees.find((chatOffAttendee) => {
            return invitee.attendeeId === chatOffAttendee.fuzionAttendeeId;
          });
        });
      }
      // by rep
      if (meetingSchedulerState.byRep) {
        let maxInviteChat = allReps.length > 0 ? allReps : [];
        if (repAttendee !== undefined && repAttendee.attendeeId) {
          maxInviteChat = allReps.filter(
            (rep) => rep.attendeeId === repAttendee.attendeeId
          );
        }
        // remove chatOffAttendees
        return maxInviteChat.filter((invitee) => {
          return !tierLevelData.chatOffAttendees.find((chatOffAttendee) => {
            return invitee.attendeeId === chatOffAttendee.fuzionAttendeeId;
          });
        });
      }
    } else if (meetingType === "video") {
      if (meetingSchedulerState.byTime) {
        let maxInviteVideo = filteredReps.length > 0 ? filteredReps : [];
        if (repAttendee !== undefined && repAttendee.attendeeId) {
          maxInviteVideo = filteredReps.filter(
            (rep) => rep.attendeeId === repAttendee.attendeeId
          );
        }
        // remove videoOffAttendees
        return maxInviteVideo.filter((invitee) => {
          return !tierLevelData.videoOffAttendees.find((videoOffAttendee) => {
            return invitee.attendeeId === videoOffAttendee.fuzionAttendeeId;
          });
        });
      }
      // by rep
      if (meetingSchedulerState.byRep) {
        let maxInviteVideo = allReps.length > 0 ? allReps : [];
        if (repAttendee !== undefined && repAttendee.attendeeId) {
          maxInviteVideo = allReps.filter(
            (rep) => rep.attendeeId === repAttendee.attendeeId
          );
        }
        // remove videoOffAttendees
        return maxInviteVideo.filter((invitee) => {
          return !tierLevelData.videoOffAttendees.find((videoOffAttendee) => {
            return invitee.attendeeId === videoOffAttendee.fuzionAttendeeId;
          });
        });
      }
    }
  };

  useEffect(() => {
    dispatchMeetingSchedulerState({
      type: actionTypesMeetingScheduler.HANDLE_USER_TIMEZONE_CHANGE,
      payload: timezone,
    });
  }, [timezone]);

  useAlgoliaSetting();

  return (
    <div className={meetingSchedulerStyles.meetingScheduler}>
      <div>
        <Dialog
          title={
            <span id="modal_title" tabIndex="0">
              Schedule a Meeting
            </span>
          }
          onClose={closeCallback.bind(null, false)}
          width={Math.min(MAX_WIDTH, width - PADDING)}
          autoFocus={true}
          aria-modal={true}
          aria-labelledby="modal_title"
          aria-describedby="modal_desc"
        >
          <div id="modal_desc" className={meetingSchedulerStyles.main}>
            {repError}
            {!repError && (!allReps.length || isSaving) && <Loader />}
            {!repError && allReps.length > 0 && !isSaving && (
              <Form
                className="form-horizontal"
                onSubmit={handleSubmit}
                render={(formRenderProps) => (
                  <FormElement className={meetingSchedulerStyles.form}>
                    <div>
                      <div>
                        {showFirstPage && (
                          <div
                            className={meetingSchedulerStyles.flexContainerRow}
                          >
                            <span className={meetingSchedulerStyles.miniTitle}>
                              <strong>Choose a Meeting Type</strong>
                            </span>

                            <div className={meetingSchedulerStyles.duration}>
                              <span className="sr-only">
                                <label id="durationLabel">
                                  Meeting Duration
                                </label>
                              </span>
                              <DropDownList
                                id="durationDropdown"
                                ref={durationDropdownRef}
                                ariaLabelledBy="durationLabel"
                                data={options}
                                onChange={handleMeetingDurationChange}
                                textField="label"
                                defaultValue={options[0]}
                              />
                            </div>
                          </div>
                        )}

                        {showFirstPage && (
                          <div className={meetingSchedulerStyles.buttonRow}>
                            {filteredMeetingTypeBasedOnPermission().map(
                              (button, i, arr) => (
                                <OEPAnalytics
                                  page={page}
                                  componentType="Button"
                                  key={button.name}
                                  url="Select meeting type option"
                                  componentName={button.name}
                                >
                                  <button
                                    type="button"
                                    disabled={
                                      !meetingSchedulerState.meetingDuration
                                    }
                                    className={
                                      meetingSchedulerStyles.meetingTypeButton
                                    }
                                    onClick={handleMeetingType.bind(
                                      null,
                                      button.value
                                    )}
                                    selected={
                                      meetingSchedulerState.meetingType ===
                                      button.value
                                    }
                                  >
                                    <span
                                      className={
                                        meetingSchedulerStyles.buttonCenteredIcon
                                      }
                                    >
                                      <SvgTypes name={button.icon} />
                                      <span className="sr-only">
                                        {`Select meeting type option ${
                                          i + 1
                                        } of ${arr.length}`}
                                      </span>
                                      {button.name}
                                    </span>
                                  </button>
                                </OEPAnalytics>
                              )
                            )}
                          </div>
                        )}
                        {!showFirstPage && (
                          <div
                            className={meetingSchedulerStyles.flexContainerRow}
                          >
                            <div
                              className={meetingSchedulerStyles.meetingTypeText}
                            >
                              <SvgTypes
                                name={meetingSchedulerState.meetingType}
                              />
                              {
                                buttonList.find(
                                  (z) =>
                                    z.value ===
                                    meetingSchedulerState.meetingType
                                ).name
                              }
                            </div>
                            <div
                              className={meetingSchedulerStyles.meetingDuration}
                            >
                              {meetingSchedulerState.meetingDuration &&
                                meetingSchedulerState.meetingType &&
                                meetingSchedulerState.meetingDuration}
                              &nbsp;min
                            </div>
                          </div>
                        )}

                        {meetingSchedulerState.date &&
                          meetingSchedulerState.meetingTime && <hr />}
                        <div
                          className={meetingSchedulerStyles.flexContainerRow}
                        >
                          <div
                            className={meetingSchedulerStyles.meetingTypeText}
                          >
                            {meetingSchedulerState.date &&
                              meetingSchedulerState.meetingTime &&
                              !showFirstPage && (
                                <div>
                                  <div>
                                    <SvgTypes name="availability" />
                                    {`${moment(
                                      meetingSchedulerState.date
                                    ).format("dddd, MMMM DD")} at ${
                                      meetingSchedulerState.meetingTime
                                    }`}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>

                        {!showFirstPage && (
                          <div>
                            <hr />
                            <div>
                              <div className={meetingSchedulerStyles.buttonRow}>
                                <OEPAnalytics
                                  page={page}
                                  componentType="Button"
                                  url="Chose a meeting time"
                                  componentName="Chose a meeting time"
                                >
                                  <button
                                    id="chooseTime"
                                    ref={chooseTimeRef}
                                    className={`
                                  ${meetingSchedulerStyles.meetingTypeButton}
                                  ${
                                    meetingSchedulerState.byTime &&
                                    meetingSchedulerStyles.active
                                  }
                                `}
                                    look="outline"
                                    onClick={handleChooseATimeButton}
                                  >
                                    <span
                                      className={
                                        meetingSchedulerStyles.buttonInlineIcon
                                      }
                                    >
                                      <SvgTypes name="availability" />
                                      <span className="sr-only">
                                        Schedule flow option 1 of 2
                                      </span>
                                      Choose a Time
                                    </span>
                                  </button>
                                </OEPAnalytics>
                                <OEPAnalytics
                                  page={page}
                                  componentType="Button"
                                  url="Choose a rep"
                                  componentName="Choose a rep"
                                >
                                  <button
                                    className={`
                                  ${meetingSchedulerStyles.meetingTypeButton}
                                  ${
                                    meetingSchedulerState.byRep &&
                                    meetingSchedulerStyles.active
                                  }
                                `}
                                    look="outline"
                                    onClick={handleChooseARepButton}
                                  >
                                    <span
                                      className={
                                        meetingSchedulerStyles.buttonInlineIcon
                                      }
                                    >
                                      <SvgTypes name="profile" />
                                      <span className="sr-only">
                                        Schedule flow option 2 of 2
                                      </span>
                                      Choose a Rep
                                    </span>
                                  </button>
                                </OEPAnalytics>
                              </div>
                            </div>
                          </div>
                        )}

                        {meetingSchedulerState.byRep && !showFirstPage && (
                          <div>
                            <hr />
                            <div>
                              <label id="chooseRep">Choose Rep</label>
                              <DropDownList
                                ariaLabelledBy="chooseRep"
                                data={getAttendees()}
                                onChange={handleRepSelected}
                                valueRender={tagRender}
                                itemRender={repListRender}
                              />
                            </div>
                            <hr />
                          </div>
                        )}

                        {!showFirstPage &&
                          meetingSchedulerState.calendarVisible && (
                            <div className={meetingSchedulerStyles.container}>
                              <div
                                className={
                                  meetingSchedulerStyles.DateTimePicker
                                }
                              >
                                <label
                                  id="chooseDate"
                                  className={meetingSchedulerStyles.dateLabel}
                                >
                                  Date
                                </label>
                                <DatePicker
                                  id="chooseDate"
                                  min={toDate(
                                    meetingSchedulerState.availabilityStartDate,
                                    timezone
                                  )}
                                  max={toDate(
                                    meetingSchedulerState.availabilityEndDate,
                                    timezone
                                  )}
                                  value={dateToTime(meetingSchedulerState.date)}
                                  onChange={handleDateChange}
                                />
                              </div>
                              <div>
                                <label id="chooseTimeDropdown">
                                  Times in {zoneName(timezone, "long")}
                                </label>
                                <DropDownList
                                  ariaLabelledBy="chooseTimeDropdown"
                                  data={
                                    meetingSchedulerState.availabilityTimes
                                      ? meetingSchedulerState.availabilityTimes.map(
                                          (a) => a.time
                                        )
                                      : []
                                  }
                                  listNoDataRender={noTimesAvailable}
                                  onChange={handleMeetingTimeSelect}
                                  value={meetingSchedulerState.meetingTime}
                                  disabled={!meetingSchedulerState.date}
                                />
                              </div>
                            </div>
                          )}
                      </div>

                      {meetingSchedulerState.byTime &&
                        meetingSchedulerState.meetingTime &&
                        !showFirstPage && (
                          <div>
                            <hr />
                            <div>
                              <label id="chooseRep">Choose Rep</label>
                              <DropDownList
                                ariaLabelledBy="chooseRep"
                                data={getAttendees()}
                                onChange={handleRepSelected}
                                valueRender={tagRender}
                                itemRender={repListRender}
                              />
                            </div>
                          </div>
                        )}

                      {meetingSchedulerState.meetingType &&
                        (meetingSchedulerState.byTime ||
                          meetingSchedulerState.byRep) &&
                        meetingSchedulerState.date &&
                        meetingSchedulerState.meetingTime &&
                        meetingSchedulerState.chosenReps &&
                        !showFirstPage &&
                        (permissions.allowScheduleMeetingsAttendeeToAttendee ||
                          permissions.allowScheduleMeetingsExhibitorToAttendee) &&
                        (permissions.allowVideoChatAccess ||
                          permissions.allowNetworkingChatMeetings) &&
                        permissions.allowNetworking &&
                        permissions.allowUserNetworking && (
                          <div
                            className={
                              meetingSchedulerStyles.bottomButtonsContainer
                            }
                          >
                            <OEPAnalytics
                              page={page}
                              componentType="Button"
                              url="Cancel"
                              componentName="Cancel"
                            >
                              <button
                                type="button"
                                className={meetingSchedulerStyles.cancelButton}
                                onClick={closeCallback.bind(null, false)}
                              >
                                Cancel
                              </button>
                            </OEPAnalytics>
                            <OEPAnalytics
                              page={page}
                              componentType="Button"
                              url="Schedule a meeting modal open"
                              componentName="Schedule a meeting"
                            >
                              <button
                                type="button"
                                disabled={
                                  !meetingSchedulerState.meetingTime ||
                                  !meetingSchedulerState.chosenReps
                                }
                                className={
                                  meetingSchedulerStyles.scheduleMeetingSubmitButton
                                }
                                onClick={handleScheduleMeetingSubmit}
                              >
                                Schedule a Meeting
                              </button>
                            </OEPAnalytics>
                          </div>
                        )}
                    </div>
                  </FormElement>
                )}
              />
            )}
          </div>
          <SaveSuccessModal
            show={isSuccess}
            close={closeSuccessModal}
            message={successMessage}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default MeetingScheduler;

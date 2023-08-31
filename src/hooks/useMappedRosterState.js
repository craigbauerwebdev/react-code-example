import { useEffect, useState } from "react";

import { useRosterState } from "../lib/chimeComponents";
import { useSelector } from "react-redux";

const useMappedRosterState = () => {
  //this hook must be used as descendant of RosterProvider
  const { roster } = useRosterState();
  const [mappedRoster, setMappedRoster] = useState([]);
  const rosterMapping = useSelector(
    (state) => state.chimeMeeting.rosterMapping
  );

  useEffect(() => {
    const rosterAsList = Object.values(roster);
    const mapped = rosterAsList.map((z) => {
      return {
        ...z,
        fuzionAttendeeId: rosterMapping[z.externalUserId],
      };
    });
    setMappedRoster(mapped);
  }, [roster, rosterMapping]);

  return { mappedRoster };
};

export default useMappedRosterState;

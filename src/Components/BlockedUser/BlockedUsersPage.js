import React, { useEffect, useState } from "react";

import Loader from "Components/Loader";
import ManageUserCard from "./ManageUserCard";
import manageUsersStyles from "./scss/manage-users.module.scss";
import useGuestProfiles from "hooks/useGuestProfiles";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const BlockedUsersPage = ({ match }) => {
  const profile = useSelector((state) => state.profile);
  const { loadProfiles } = useGuestProfiles();
  const loadedProfiles = useSelector((state) => state.profile.guestProfiles);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    if (loadedProfiles) {
      if (match.url === "/account/muted-users") {
        loadProfiles(profile.mutedUsers);
        setUserList(
          loadedProfiles.filter((lp) =>
            profile.mutedUsers.includes(lp.attendeeId)
          )
        );
      } else {
        loadProfiles(profile.blockedUsers);
        setUserList(
          loadedProfiles.filter((lp) =>
            profile?.blockedUsers?.includes(lp.attendeeId)
          )
        );
      }
    }
  }, [
    loadedProfiles,
    loadProfiles,
    profile.blockedUsers,
    profile.mutedUsers,
    match,
  ]);

  return (
    <div className={manageUsersStyles.wrapper}>
      <h1 className={manageUsersStyles.title}>{`${
        match.url === "/account/muted-users" ? "Muted" : "Blocked"
      } Users`}</h1>
      <p>
        {` Once you ${
          match.url === "/account/muted-users" ? "mute" : "block"
        } someone, that person can no longer invite you to events or groups, or start a conversation with you.`}
      </p>
      <h2 className={manageUsersStyles.title}>{`Manage ${
        match.url === "/account/muted-users" ? "Muted" : "Blocked"
      } Users`}</h2>
      {!userList && <Loader />}
      {userList && userList.length > 0 && (
        <div className={manageUsersStyles.overflowHolder}>
          <div className={manageUsersStyles.overflowWrapper}>
            <section className={manageUsersStyles.table}>
              <header className={manageUsersStyles.header}>
                <div className={manageUsersStyles.column}>Name</div>
                <div className={manageUsersStyles.column}>Company</div>
                <div className={manageUsersStyles.column}>Job Title</div>
              </header>
              {/* Apply a filter here since profiles are not removed from guestProfiles if they are unblocked */}
              {userList.map((user) => (
                <ManageUserCard
                  attendee={user}
                  key={user.attendeeId}
                  url={match.url}
                />
              ))}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(BlockedUsersPage);

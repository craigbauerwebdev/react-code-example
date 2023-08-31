import React from "react";
import { Redirect } from "react-router-dom";
import matchMakingStyles from "./scss/match-making.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";
import { useSelector } from "react-redux";

export default function MatchMaking() {
  let iframeRef = React.createRef();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);

  const registrationNumber = user?.fuzion
    ? user.fuzion.registration_number
    : "";

  let gripLink =
    "https://matchmaking.grip.events/AACRVirtualMeetingI?badgeid=" +
    registrationNumber +
    "&email=" +
    user?.email;

  const iFrameListener = window.addEventListener("blur", function (e) {
    if (iframeRef && document.activeElement === iframeRef.current) {
      const data = iframeRef.current.getAttribute("data-oepa");
      saveAnalytic(JSON.parse(data));
      window.removeEventListener("blur", iFrameListener);
    }
    window.removeEventListener("blur", iFrameListener);
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {user ? (
        <div className="iframe-wrapper matchmaking">
          <iframe
            ref={iframeRef}
            title="Matchmaking"
            src={gripLink}
            width="100%"
            height="745px"
            className={matchMakingStyles.iframeNetworking}
            data-oepa={JSON.stringify({
              page: "Matchmaking",
              componentType: "Link",
              url: "Video",
              componentName: "Matchmaking iFrame",
            })}
          ></iframe>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

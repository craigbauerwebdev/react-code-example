import "./CookieBanner.css";

import React, { useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import { bpMap } from "util/bpMap";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

export default function CookieBanner() {
  const { isMobile } = useToggleDisplayMQ(bpMap.phablet);
  const [drawerIsOpen, setDrawerIsOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setDrawerIsOpen(false);
    }
  }, [isMobile, setDrawerIsOpen]);

  const wrapperClassName = `cookie-drawer-wrapper drawer--${
    drawerIsOpen ? "open" : "closed"
  }`;
  // TO-DO add logic to check users current cookie policy
  // navigator.cookieEnabled
  // or
  // document.cookie="testcookie";
  // let cookieEnabled = document.cookie.indexOf("testcookie") != -1

  return (
    <div className={wrapperClassName}>
      <div className="cookie-drawer-container">
        <section>
          <div className="description-container">
            This site uses third-party cookies. Please enable cookies to use
            chat.
          </div>
        </section>
        <div className="cookie-drawer-buttons-container">
          <OEPAnalytics
            componentType="Button"
            page="homepage"
            url="Enable cookies"
            componentName="Enable cookies"
          >
            <a
              className="details-button cookie-button"
              onClick={() => setDrawerIsOpen(false)}
              href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Enable Cookies"
            >
              Enable
            </a>
          </OEPAnalytics>
          <OEPAnalytics
            componentType="Button"
            page="Cookies"
            url="Close cookies"
          >
            <button
              className="details-button cookie-button"
              onClick={() => setDrawerIsOpen(false)}
            >
              Close
            </button>
          </OEPAnalytics>
        </div>
      </div>
    </div>
  );
}

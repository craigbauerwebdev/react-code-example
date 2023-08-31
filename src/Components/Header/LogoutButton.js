import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";

export default function LogoutButton() {
  return (
    <ul>
      <div className="nav-button">
        <LinkWrapper
          to="/logout"
          rel="noopener noreferrer"
          target="_self"
          className="buttonprimary inactive"
          page="Header"
          componentType="button"
          trackingUrl="/logout"
          componentName="Log out"
        >
          Sign Out
        </LinkWrapper>
      </div>
    </ul>
  );
}

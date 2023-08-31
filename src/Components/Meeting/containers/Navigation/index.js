import { Attendees, Chat, Navbar, NavbarItem } from "lib/chimeComponents";

import { createElement } from "react";
import { useNavigation } from "providers/NavigationProvider";

const Navigation = () => {
  const { toggleRoster, closeNavbar, toggleChat } = useNavigation();

  return createElement(
    Navbar,
    { className: "nav", flexDirection: "column", container: true },
    createElement(NavbarItem, {
      title: "Navigation",
      onClose: closeNavbar,
    }),
    createElement(NavbarItem, {
      icon: createElement(Chat, null),
      onClick: toggleChat,
      label: "Chat",
    }),
    createElement(NavbarItem, {
      icon: createElement(Attendees, null),
      onClick: toggleRoster,
      label: "Attendees",
    })
  );
};

export default Navigation;
//# sourceMappingURL=index.js.map

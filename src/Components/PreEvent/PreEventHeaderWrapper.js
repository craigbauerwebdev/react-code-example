import React from "react";
import { PreEventHeader } from "./PreEventHeader";
import PreEventMobileHeader from "./PreEventMobileHeader";

export default class PreEventHeaderWrapper extends React.Component {
  state = {
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false,
    tab5: false,
  };

  // Header is triggered by hover
  // Mobile is triggered by click

  // To change Header to be triggered by click, remove
  // `.header-label:hover + .inactive-dropdown` and uncomment out class logic on the inactive-dropdown element

  updateOpenMenu = (menu) => {
    const newState = {};
    const setTofalse = Object.keys(this.state).filter((key) => key !== menu);
    const setToTrue = Object.keys(this.state).find((key) => key === menu);

    setTofalse.map((key) => (newState[key] = false));
    newState[setToTrue] = !this.state[setToTrue];
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <PreEventHeader
          user={this.props.user}
          updateOpenMenu={this.updateOpenMenu}
          state={this.state}
        />
        <PreEventMobileHeader
          user={this.props.user}
          updateOpenMenu={this.updateOpenMenu}
          state={this.state}
        />
      </div>
    );
  }
}

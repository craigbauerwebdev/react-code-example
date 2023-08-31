import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import aboutStyles from "./scss/about.module.scss";

const About = () => (
  <div className={aboutStyles.aboutContainer}>
    <section className={aboutStyles.aboutContent}>
      <h1>Lorem ipsum dolor sit amet consectetur</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
      </p>
    </section>
    <section className={aboutStyles.registerTodayHolder}>
      <div className={aboutStyles.registerToday}>
        <h1>Register Today</h1>
        <p>
          Engage in interactive sessions and virtual networking opportunities
          that drive success
        </p>
      </div>
      <div className={aboutStyles.signUp}>
        <LinkWrapper
          to="/"
          page="About"
          componentType="Signup Link"
          trackingUrl="Sign Me Up"
          componentName="sign me up"
        >
          SIGN ME UP
        </LinkWrapper>
      </div>
    </section>
  </div>
);

export default About;

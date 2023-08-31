import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
export default class PreEventMobileHeader extends React.Component {
  state = {
    openMenu: false,
  };

  toggleMenu = () => {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  };

  render() {
    const { openMenu } = this.state;
    return (
      <div className="header-container-mobile">
        <section>
          <LinkWrapper
            to="/"
            className="primarylogo"
            page="PreEvent Header"
            componentType="Home"
            trackingUrl="/"
            componentName="Home"
          >
            <img
              src="images/your-event.png"
              alt="Your Event"
              className="image"
            />
          </LinkWrapper>
          <OEPAnalytics
            componentType="Button"
            page="Header"
            url="Toggle prevent header"
            componentName="Toggle prevent header"
          >
            <button className="img-button" onClick={this.toggleMenu}>
              <img
                className="hamburger-icon"
                alt="Toggle Primary Menu"
                src="/images/icons/menu.png"
              />
            </button>
          </OEPAnalytics>
        </section>
        {openMenu ? (
          <section>
            <ul className="header-spacer w-inline-block">
              <li>
                <LinkWrapper
                  to="/"
                  className="buttonprimary w-button"
                  page="PreEvent Header"
                  componentType="Register Now"
                  trackingUrl="/"
                  componentName="Register now"
                >
                  REGISTER NOW
                </LinkWrapper>
              </li>
            </ul>
            {!this.props.user && (
              <ul className="header-spacer w-inline-block">
                <li>
                  <LinkWrapper
                    to="/FAQS"
                    className="buttonprimary w-button faqs-button"
                    page="PreEvent Header"
                    componentType="FAQ"
                    trackingUrl="/FAQS"
                    componentName="FAQs"
                  >
                    FAQS
                  </LinkWrapper>
                </li>
              </ul>
            )}
          </section>
        ) : (
          ""
        )}
      </div>
    );
  }
}

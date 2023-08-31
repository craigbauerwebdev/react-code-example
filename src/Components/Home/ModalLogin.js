import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";

export default class ModalLogin extends React.Component {
  state = {
    closed: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.modal.contains(e.target)) {
      return;
    } else {
      this.setState({
        closed: true,
      });
    }
  };

  render() {
    return (
      <div
        className="home-login-modal-wrapper"
        style={
          this.state.closed === true ? { display: "none" } : { display: "flex" }
        }
      >
        <div
          className="home-login-inner-wrapper"
          ref={(modal) => (this.modal = modal)}
        >
          <form>
            <section>
              <img
                src="/images/your-event.png"
                className="login-logo"
                alt="Your Event LIVE!"
              />
              <h2>Sign In</h2>
              <div>
                <label className="home-login-label" htmlFor="email">
                  Email Address*
                </label>
                <input id="email" required className="home-login-input" />
              </div>
              <div>
                <label className="home-login-label" htmlFor="password">
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="home-login-input"
                />
              </div>
            </section>
            <section>
              <div>
                <input type="checkbox" className="modal-login-checkbox" />
                <label htmlFor="remember_me" className="modal-checkbox-label">
                  Remember me
                </label>
              </div>
              <div>
                <LinkWrapper
                  to="/login"
                  className="forgot-password-link"
                  page="Modal Login"
                  componentType="Link"
                  trackingUrl="Forgot Password"
                  componentName="Forgot Password"
                >
                  Forgot password?
                </LinkWrapper>
              </div>
            </section>
            <OEPAnalytics
              page="Login Page"
              componentType="Button"
              url="Log In"
              componentName="Log In"
            >
              <button
                type="submit"
                className="details-button modal-login-button"
              >
                Sign In
              </button>
            </OEPAnalytics>
            <OEPAnalytics
              page="Login Page"
              componentType="Button"
              url="Still need to register? Click here"
              componentName="Register"
            >
              <button
                type="submit"
                className="details-button modal-register-button"
              >
                Still need to register? Click here
              </button>
            </OEPAnalytics>
            <div className="modal-bottom-text">
              <p>* Required</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

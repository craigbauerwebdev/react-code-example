import React, { Fragment } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Meta from "Components/Meta";
import errorPageStyles from "./scss/error-boundary.module.scss";

export default class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  // listen for route change and reset state
  componentDidUpdate(prevProps) {
    if (this.props.pathname !== prevProps.pathname) {
      this.setState({
        error: null,
        errorInfo: null,
      });
    }
  }
  // hook version of componentDidCatch does not exist for hooks
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  resetError = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    if (this.state.error || this.state.errorInfo) {
      // You can render any custom fallback UI
      return (
        <Fragment>
          <Meta pageTitle="Error" />
          <section className={errorPageStyles.sorry}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="187.953"
                height="187.953"
                viewBox="0 0 187.953 187.953"
              >
                <g id="iconLikertVerySadDark" transform="translate(12 12)">
                  <g
                    id="iconLikertVerySadDark-2"
                    data-name="iconLikertVerySadDark"
                    transform="translate(-12 -12)"
                  >
                    <path
                      id="Path_143"
                      d="M93.977 0C42.289 0 0 42.289 0 93.977s42.289 93.977 93.977 93.977 93.977-42.289 93.977-93.977S145.664 0 93.977 0zm0 172.29a78.314 78.314 0 1178.313-78.313 78.544 78.544 0 01-78.313 78.313z"
                      data-name="Path 143"
                    />
                    <circle
                      id="Ellipse_3"
                      cx="12"
                      cy="12"
                      r="12"
                      data-name="Ellipse 3"
                      transform="translate(117 54)"
                    />
                    <circle
                      id="Ellipse_4"
                      cx="12"
                      cy="12"
                      r="12"
                      data-name="Ellipse 4"
                      transform="translate(47 54)"
                    />
                    <path
                      id="Path_144"
                      d="M39.326 23.831A23.075 23.075 0 0162.82 47.326h7.831a31.326 31.326 0 00-62.651 0h7.831a23.075 23.075 0 0123.495-23.495z"
                      data-name="Path 144"
                      transform="translate(54.651 109.302)"
                    />
                  </g>
                </g>
              </svg>
              <h1>Error</h1>
              <h2>
                We are sorry, something went wrong with the page you requested.
              </h2>
              <LinkWrapper
                to="/"
                onClick={this.resetError}
                componentName="Home"
              >
                Take me Home
              </LinkWrapper>
              <details
                className={errorPageStyles.detailsDropdowns}
                open={process.env.REACT_APP_ENV !== "prod"}
              >
                <pre>{this.state.error.toString()}</pre>
                <pre>componentStack: {this.state.errorInfo.componentStack}</pre>
              </details>
            </div>
          </section>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

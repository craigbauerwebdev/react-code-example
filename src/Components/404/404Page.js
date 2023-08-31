import React, { Fragment, useEffect, useState } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Meta from "Components/Meta";
import SvgTypes from "Components/SVG/SvgTypes";
import sorryStyles from "./scss/sorry.module.scss";
import { withRouter } from "react-router-dom";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/404-Page
 * @param {object} location
 */
const SorryPage = ({ location }) => {
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (location.state) {
      const { message, title } = location.state;

      if (message) {
        setMessage(message);
      }

      if (title) {
        setTitle(title);
      }
    }
  }, [location.state]);

  return (
    <Fragment>
      <Meta pageTitle="404" />
      <section className={sorryStyles.sorry}>
        <div>
          <SvgTypes name="404" />
          {!title && (
            <Fragment>
              <h1>404</h1>
              <h2>PAGE NOT FOUND</h2>
            </Fragment>
          )}
          {title && <h1>{title}</h1>}
          {!message && (
            <p>WE’RE SORRY, the page you requested is not available.</p>
          )}
          {message && <p>{message}</p>}
          <LinkWrapper to="/" componentName="Home">
            Home
          </LinkWrapper>
        </div>
      </section>
    </Fragment>
  );
};

export default withRouter(SorryPage);

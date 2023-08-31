import React, { Fragment } from "react";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Meta from "Components/Meta";
import SvgTypes from "Components/SVG/SvgTypes";
import errorPageStyles from "./scss/error-boundary.module.scss";

export default class CustomErrorBoundary extends React.Component {
  render() {
    return (
      <Fragment>
        <Meta pageTitle="Error" />
        <section className={errorPageStyles.customSorry}>
          <div>
            <SvgTypes name="question-mark" />
            <h1>Oops</h1>
            <h2>
              We are sorry, something went wrong. Please contact Help Desk for
              support.
            </h2>
            <LinkWrapper to="/support" componentName="Support">
              Support
            </LinkWrapper>
          </div>
        </section>
      </Fragment>
    );
  }
}

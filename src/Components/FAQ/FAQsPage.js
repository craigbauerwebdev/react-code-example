import React, { Fragment, Suspense, lazy } from "react";

import Loader from "Components/Loader";
import Meta from "Components/Meta";
import faqStyles from "./scss/faqs.module.scss";

const FAQs = lazy(() => import("./FAQs"));

const FAQsPage = () => {
  return (
    <Fragment>
      <Meta pageTitle="FAQ" />
      <Suspense
        fallback={
          <div className={faqStyles.faq}>
            <Loader />
          </div>
        }
      >
        <FAQs pageName="faqs" />
      </Suspense>
    </Fragment>
  );
};

export default FAQsPage;

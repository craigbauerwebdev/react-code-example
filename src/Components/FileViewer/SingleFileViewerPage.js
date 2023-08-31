import React, { Fragment, Suspense, lazy } from "react";

import Loader from "Components/Loader";
import fileViewerStyles from "./scss/file-viewer.module.scss";

const SingleFileViewer = lazy(() => import("./SingleFileViewer"));

export default function SingleFileViewerPage() {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className={fileViewerStyles.main}>
            <Loader />
          </div>
        }
      >
        <SingleFileViewer />
      </Suspense>
    </Fragment>
  );
}

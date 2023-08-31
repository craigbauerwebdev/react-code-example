import { useEffect, useState } from "react";

import WebViewer from "@pdftron/webviewer";

const usePDFTron = (domRef, docRef, settings, pdf) => {
  const [hasSet, setHasSet] = useState(false);

  useEffect(() => {
    // Check to see if component was mounted
    if (pdf && !hasSet) {
      const pdfName = pdf.split("/").pop();

      setHasSet(true);

      WebViewer(
        {
          l: process.env.REACT_APP_VIEWER_LICENSE,
          path: "/webviewer/lib",
          initialDoc: pdf,
        }, // This is not configurable and should not be changed
        docRef.current
      ).then((instance) => {
        // Add the complete URL to the S3 bucket and specify the file name along with file ext in "filename"
        instance.loadDocument(pdf, { filename: pdfName });
        // Use instance.disableElements([]) to disable features. List of elements that can be disabled are listed here : https://www.pdftron.com/documentation/web/guides/hiding-elements/
        // Use instance.enableElements([]) to enable features.
        instance.disableElements(settings);
        // const { docViewerIns } = instance;
        // docViewerIns.on("documentLoaded", () => {
        //   // perform document operations
        // });
      });
    }
  }, [domRef, settings, pdf, docRef, hasSet]);
};

export default usePDFTron;

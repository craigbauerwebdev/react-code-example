import React, {
  Fragment,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Meta from "Components/Meta";
import axios from "axios";
import { disableElements } from "util/pdfTronSettings";
import { excludeExt } from "../Poster/utils/excludeExt";
import getPDFLink from "util/getPDFLink";
import singleFileViewerStyles from "./scss/single-file-viewer.module.scss";
import usePDFTron from "hooks/usePDFTron";
import { withRouter } from "react-router-dom";

const SingleFileViewer = ({ match }) => {
  const id = match.params.id;
  const docViewerPDF = useRef(null);
  const dom_object = createRef();
  const [pdfTronLink, setPDFTronLink] = useState(null);
  const [pageTitle, setPageTitle] = useState("");
  const fetchPoster = useCallback((postersData) => {
    const posterFile = postersData.presentationFiles.find(
      (file) => !excludeExt.includes(file.fileName) && file.isStartupFile
    );
    const pdfLink = getPDFLink(posterFile.filePath);

    setPDFTronLink(pdfLink);
    setPageTitle(postersData.subSessionName);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/orch/singlePoster?id=${id}`)
      .then((response) => {
        fetchPoster(response.data);
      });
  }, [fetchPoster, id]);

  usePDFTron(dom_object, docViewerPDF, disableElements, pdfTronLink);

  return (
    <Fragment>
      <Meta pageTitle={pageTitle} />
      <div
        className={singleFileViewerStyles.docViewerPDF}
        id="docViewerPDF"
        ref={docViewerPDF}
      />
    </Fragment>
  );
};

export default withRouter(SingleFileViewer);

import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, {
  Fragment,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getAudioPlayer,
  getPosterDisclosures,
  getPosterSupplementalFiles,
  getPosterTopic,
  getPresenters,
} from "./utils/sideBarContent";
import { useDispatch, useSelector } from "react-redux";

import AudioPlayer from "Components/AudioPlayer/AudioPlayer";
import { Breadcrumbs } from "Components/Breadcrumbs";
import ConfigService from "services/ConfigService";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import LiveStreamChat from "../Chat/LiveStreamChat";
import Loader from "Components/Loader";
import Meta from "../Meta";
import SideBar from "Components/Sidebar/SingleSideBar";
import SideBarDisclosureBtn from "Components/Sidebar/SideBarDisclosureBtn";
import SideBarItem from "Components/Sidebar/SideBarItem";
import SideBarPresenters from "Components/Sidebar/SideBarPresenters";
import SideBarSupplemental from "Components/Sidebar/SideBarSupplemental";
import SideBarTitle from "Components/Sidebar/SideBarTitle";
import VimeoWrapper from "Components/VimeoPlayer/VimeoWrapper";
import { bpMap } from "util/bpMap";
import { dataTypes } from "store/utils/dataTypes";
import { disableElements } from "util/pdfTronSettings";
import { excludeExt } from "./utils/excludeExt";
import getPDFLink from "util/getPDFLink";
import { getPayload } from "store/actions";
import getSiteUrl from "util/getSiteUrl";
import singlePosterStyles from "./scss/single-poster.module.scss";
import usePDFTron from "hooks/usePDFTron";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import { withRouter } from "react-router-dom";

const SinglePoster = ({ match }) => {
  const dispatch = useDispatch();
  /**@type {Poster[]} */
  const posters = useSelector((state) => state.global.posters);
  const { breadcrumbLabel, breadcrumbUrl } = useSelector(
    (state) => state.filters
  );
  /**@type {[Poster, Function]} */
  const [poster, setPoster] = useState(null);
  const [posterSupplemental, setPosterSupplemental] = useState(null);
  const [posterMedia, setPosterMedia] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [posterPresenters, setPosterPresenters] = useState(null);
  const [posterTopic, setPosterTopic] = useState(null);
  const [posterDisclosures, setPosterDisclosures] = useState(null);
  const [pdfTronLink, setPDFTronLink] = useState(null);
  const userSession = useSelector((state) => state.global.user);
  const id = match.params.id;
  const docViewerPDF = useRef(null);
  const dom_object = createRef();
  const isMobile = useToggleDisplayMQ(bpMap.tablet);

  const generateFileViewerDocumentURL = useCallback((poster) => {
    const videoId = poster?.subSessionVideoSource;
    const posterFile = poster?.presentationFiles?.find(
      (file) => !excludeExt.includes(file.fileName) && file.isStartupFile
    );
    const supplementalFiles = poster?.presentationFiles?.filter(
      (file) => !file.isStartupFile
    );
    const mediaFiles =
      poster?.mediaFiles?.length > 0 ? poster.mediaFiles : null;

    //Sidebar Data
    setPosterMedia(mediaFiles); // Sidebar Audio player
    setPosterSupplemental(supplementalFiles); // Sidebar Supplemental Files
    setPosterPresenters(getPresenters(poster)); // Sidebar Presenters
    setPosterTopic(getPosterTopic(poster)); // Sidebar Topic
    setPosterDisclosures(getPosterDisclosures(poster)); // Sidebar Disclosures

    if (posterFile) {
      setPDFTronLink(getPDFLink(posterFile.filePath));
    }

    if (videoId) {
      setVideoId(videoId);
    }
  }, []);
  const fetchPoster = useCallback(
    (postersData) => {
      const data = postersData.find(
        (e) => e && e.subSessionId && `${e.subSessionId}` === id
      );

      setPoster(data);

      // FileViewer
      generateFileViewerDocumentURL(data);
    },
    [setPoster, id, generateFileViewerDocumentURL]
  );
  const breadcrumbs = [
    {
      path: breadcrumbUrl || "/posters",
      label: breadcrumbLabel || "Posters",
    },
  ];
  const getFavorites = () => {
    return (
      <Favorites
        page="Single Poster"
        type={favoriteTypes.posters}
        id={poster.subSessionId}
        url={poster.subSessionName}
        data={poster}
      />
    );
  };

  useEffect(() => {
    if (!posters) {
      dispatch(getPayload(dataTypes.posters));
    } else {
      fetchPoster(posters);
    }
  }, [posters, dispatch, fetchPoster]);

  usePDFTron(dom_object, docViewerPDF, disableElements, pdfTronLink);

  if (!poster) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Meta pageTitle={poster.subSessionName} />
      <div className={singlePosterStyles.singlePosterNav}>
        <Breadcrumbs
          crumbs={breadcrumbs}
          page="Single Poster"
          componentType="Navigation Item"
        />
      </div>
      <div className={singlePosterStyles.customSessionContainer}>
        <SideBar>
          <SideBarTitle title={poster.subSessionName} node={getFavorites()} />
          {posterPresenters && <SideBarPresenters data={posterPresenters} />}
          {posterTopic && <SideBarItem data={posterTopic} />}
          {posterMedia && (
            <AudioPlayer
              data={getAudioPlayer(posterMedia)}
              posterData={poster}
            />
          )}
          {posterSupplemental?.length > 0 && (
            <SideBarSupplemental
              data={getPosterSupplementalFiles(posterSupplemental, poster)}
              pageType="Posters"
            />
          )}
          {posterDisclosures && (
            <SideBarDisclosureBtn
              data={posterDisclosures}
              rawData={poster}
              page="Single Poster"
            />
          )}

          {ConfigService.runValues.enablePosterChat && (
            <div
              className={`${singlePosterStyles.liveStreamPluginContainer} ${singlePosterStyles.posterChat}`}
            >
              <LiveStreamChat
                user={userSession}
                sessionId={poster.subSessionId}
                sessionName={`${poster.subSessionName} - Poster Chat`}
                componentName="Poster Chat"
                isMention={match.params.ismention}
              />
            </div>
          )}
        </SideBar>
        <section className={singlePosterStyles.posterInfo}>
          {!isMobile && (
            <h1 className={singlePosterStyles.posterTitle}>
              {poster.subSessionName}
              {getFavorites()}
            </h1>
          )}
          {pdfTronLink && (
            <LinkWrapper
              className={singlePosterStyles.posterButton}
              to={`${getSiteUrl()}/single-file-viewer/${id}`}
              external={true}
              page="Single Poster"
              componentType="button"
              trackingUrl={`${getSiteUrl()}/single-file-viewer/${id}`}
              componentName="View Poster Full Screen"
            >
              View Poster Full Screen
            </LinkWrapper>
          )}
          {pdfTronLink && (
            <div
              id="docViewerPDF"
              className={singlePosterStyles.docViewerPDF}
              ref={docViewerPDF}
            />
          )}
          {videoId && (
            <VimeoWrapper
              id={videoId}
              page="Single Poster"
              componentType="On-Demand"
            />
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default withRouter(SinglePoster);

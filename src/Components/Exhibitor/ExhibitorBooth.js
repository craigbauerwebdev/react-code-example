import OEPAnalytics, { saveAnalytic } from "../OEPAnalytics";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Modal from "./ExhibitorBoothModal";
import { event } from "react-ga";

let modal = false;

export const ExhibitorBooth = (props) => {
  const { booth, exhibitor } = props;
  const [modalContent, setModalContent] = useState();
  const [modalFor, setModalFor] = useState();
  const [modalID, setModalID] = useState();
  const iframeRef = useRef();

  const pedastals = {
    0: (
      <path
        d="M555.778,617.045c0,48.234-.625,121.492,0,144,58.766,1.042,143.373,0,143.373,0v-144Z"
        transform="translate(-268 -49)"
        fill="transparent"
      />
    ),
    1: (
      <path
        d="M555.778,617.045c0,48.234-.625,121.492,0,144,58.766,1.042,143.373,0,143.373,0v-144Z"
        fill="transparent"
      ></path>
    ),
    2: (
      <path
        d="M555.791,617.045c0,50.212-.655,126.473,0,149.9,61.579,1.085,150.235,0,150.235,0v-149.9Z"
        transform="translate(330 20)"
        fill="transparent"
      ></path>
    ),
    3: (
      <path
        d="M555.791,617.045c0,50.212-.655,126.473,0,149.9,61.579,1.085,150.235,0,150.235,0v-149.9Z"
        transform="translate(663)"
        fill="transparent"
      ></path>
    ),
    4: (
      <path
        d="M555.791,617.045c0,50.212-.655,126.473,0,149.9,61.579,1.085,150.235,0,150.235,0v-149.9Z"
        transform="translate(933 -46)"
        fill="transparent"
      />
    ),
  };

  const pedastalOffset = booth.booth_products.length === 3 ? 1 : 0;

  const monitors = {
    landscape: (
      <g transform="translate(-197 1)">
        <path
          d="M1738.069,192.135c-200.89-5.3-405.123-5.523-498.4-7.623-2.2,42.2-1.423,96.647-1.76,146.087-.47,69.016-1.488,128-1.488,128l484.318,36.768Z"
          fill="transparent"
        />
        <image
          className="glow"
          width="531"
          height="335"
          transform="translate(1222 171)"
          href="/images/virtual-booth-horizontal-glow.png"
        ></image>
      </g>
    ),
  };

  const introEnded = () => {
    document
      .getElementById("booth-intro-video-container")
      .classList.add("hidden");
  };

  const showModal = useCallback((content, contentFor, id) => {
    if (!modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      content = false;
      contentFor = false;
      id = false;
    }
    setModalContent(content);
    modal = !modal;
    setModalFor(contentFor);
    setModalID(id);
  }, []);

  const encodeFileName = (url) => {
    // eslint-disable-next-line no-console
    console.debug(url);
    let splitURL = url.split("/");
    let fileName = splitURL.pop();
    splitURL.push(encodeURIComponent(decodeURIComponent(fileName)));
    return splitURL.join("/");
  };

  const openModal = useCallback(
    (i, e, name) => {
      // OEPAnalytics.save(e.currentTarget, this, e);
      showModal(
        name,
        `Product ${i + 1}`,
        `${exhibitor.fuzion_exhibitor_id}-popup-${i + 1}`
      );
    },
    [exhibitor, showModal]
  );

  useEffect(() => {
    const iFrameListener = () => {
      if (document.activeElement === iframeRef.current) {
        const dataOepa = iframeRef.current.getAttribute("data-oepa");
        saveAnalytic(JSON.parse(dataOepa));
        window.removeEventListener("blur", iFrameListener);
      }
    };
    window.addEventListener("blur", iFrameListener);
    return () => {
      window.removeEventListener("blur", iFrameListener);
    };
  }, [iframeRef]);

  return (
    <div className="single-exhibitor-booth">
      <svg id="booth" width="100%" viewBox="0 0 1920 1080">
        <image
          id="booth_image_matrox"
          width="100%"
          height="100%"
          x="0"
          y="0"
          href={booth.booth_still}
        />
        <g id="interactive-points">
          {booth.booth_products &&
            booth.booth_products.map((boothItem, index) => {
              return boothItem.external_url ? (
                <OEPAnalytics
                  key={`${index + 1}-${boothItem.external_url}`}
                  page="Single Exhibitor"
                  pageId={booth.name}
                  componentName={`Booth Pedestal ${index + 1}`}
                  componentType={`Booth Pedestal ${index + 1}`}
                  url={boothItem.external_url}
                  exhibitorId={exhibitor.fuzion_exhibitor_id}
                >
                  {
                    // eslint-disable-next-line
                      <a
                      href={boothItem.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex="0"
                      role="button"
                      key={boothItem.external_url}
                      className="interactive-element"
                    >
                      {pedastals[index + pedastalOffset]}
                    </a>
                  }
                </OEPAnalytics>
              ) : boothItem.popup ? (
                <OEPAnalytics
                  key={`${index + 1}-${boothItem.popup}`}
                  page="Single Exhibitor"
                  pageId={booth.name}
                  componentName={`Booth Pedestal ${index + 1}`}
                  componentType={`Booth Pedestal ${index + 1}`}
                  url={boothItem.popup}
                  exhibitorId={exhibitor.fuzion_exhibitor_id}
                >
                  {
                    // eslint-disable-next-line
                      <a
                      tabIndex="0"
                      role="button"
                      key={boothItem.popup}
                      onClick={() => {
                        openModal(
                          index,
                          event,
                          encodeFileName(boothItem.popup)
                        );
                      }}
                      className="interactive-element"
                    >
                      {pedastals[index + pedastalOffset]}
                    </a>
                  }
                </OEPAnalytics>
              ) : (
                ""
              );
            })}
          {booth.monitor?.popup && (
            <OEPAnalytics
              key={booth.monitor.popup}
              page="Single Exhibitor"
              pageId={booth.name}
              componentName="single booth monitor"
              componentType="Booth Monitor"
              url={booth.monitor.popup}
              exhibitorId={exhibitor.fuzion_exhibitor_id}
            >
              {
                // eslint-disable-next-line
                    <a
                  tabIndex="0"
                  role="button"
                  onClick={() => {
                    openModal(
                      "monitor",
                      event,
                      encodeFileName(booth.monitor.popup)
                    );
                  }}
                  className="interactive-element"
                >
                  {monitors.landscape}
                </a>
              }
            </OEPAnalytics>
          )}
        </g>
      </svg>

      <Modal
        onClose={showModal}
        show={modal}
        exhibitor={booth.name}
        content={modalContent}
        modalFor={modalFor}
        modalID={modalID}
      />
      {booth.booth_video_animation ? (
        <div id="booth-intro-video-container">
          <video
            poster={booth.entry_image}
            id="intro-video"
            onEnded={() => introEnded()}
            autoPlay
            muted
            playsInline
            ref={iframeRef}
            data-oepa={JSON.stringify({
              page: "Single Exhibitor",
              pageId:
                exhibitor.fuzion_exhibitor_id ===
                "11EAA125CD5FF0208428BFDD5E82739E"
                  ? booth.name.replace(/\|/g, "")
                  : booth.name,
              componentType: "Booth Video",
              url: booth.booth_video_animation,
            })}
          >
            <source src={booth.booth_video_animation} type="video/mp4" />
          </video>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

import React, { useState } from "react";

import mapStyles from "./scss/maps.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";

export default function Map() {
  let iframeRef = React.createRef();
  const [isIE, setIsInternetExplorer] = useState(false);
  const [isEdge, setIsEdge] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const isInternetExplorer = /*@cc_on!@*/ false || !!document.documentMode;
    setIsInternetExplorer(isInternetExplorer); // Internet Explorer 6-11
    setIsEdge(!isInternetExplorer && !!window.StyleMedia); // Edge 20+
  }, [setIsInternetExplorer, setIsEdge]);

  const iFrameListener = window.addEventListener("blur", function (e) {
    if (iframeRef && document.activeElement === iframeRef.current) {
      const data = iframeRef.current.getAttribute("data-oepa");
      saveAnalytic(JSON.parse(data));
      window.removeEventListener("blur", iFrameListener);
    }
    window.removeEventListener("blur", iFrameListener);
  });

  return (
    <div>
      {!isIE && !isEdge ? (
        <div className={mapStyles.iframeWrapper}>
          <iframe
            ref={iframeRef}
            title="Map"
            src="https://pro-staging.blueprintpro.info/?show=yel"
            width="100%"
            height="645px"
            frameBorder="0"
            data-oepa={JSON.stringify({
              page: "Map",
              componentType: "Link",
              url: "Map iFrame",
              componentName: "Map iFrame",
            })}
          ></iframe>
        </div>
      ) : (
        <div className={mapStyles.iframeWrapperUnsupported}>
          <p>It looks like you are using an unsupported browser.</p>
          <p>
            Chrome is the recommended browser for accessing Blueprint on a PC
            and Mac.
          </p>
          <p>Currently there is limited support for other browsers.</p>
        </div>
      )}
    </div>
  );
}

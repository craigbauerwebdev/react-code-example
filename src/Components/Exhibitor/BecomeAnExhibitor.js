import React from "react";
import becomeAnExhibitorStyles from "./scss/become-an-exhibitor.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";
export default class BecomeAnExhibitor extends React.Component {
  iframeRef = React.createRef();

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const iFrameListener = window.addEventListener("blur", function (e) {
      if (this.iframeRef && document.activeElement === this.iframeRef.current) {
        const data = this.iframeRef.current.getAttribute("data-oepa");
        saveAnalytic(JSON.parse(data));
        window.removeEventListener("blur", iFrameListener);
      }
      window.removeEventListener("blur", iFrameListener);
    });

    return (
      <div>
        <div className={becomeAnExhibitorStyles.iframeWrapper}>
          <iframe
            ref={this.iframeRef}
            title="Become An Exhibitor"
            src="https://bp-staging.blueprintpro.info/app/slug/yel/embed#floorplan-ui-96038918-16"
            width="100%"
            height="645px"
            frameBorder="0"
            data-oepa={JSON.stringify({
              page: "Become An Exhibitor Banner",
              componentType: "Video",
              url: "Become An Exhibitor Iframe",
              componentName: "Become An Exhibitor",
            })}
          ></iframe>
        </div>
      </div>
    );
  }
}

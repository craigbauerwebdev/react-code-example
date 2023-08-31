import ConfigService from "services/ConfigService";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import sideBarStyles from "./scss/single-side-bar.module.scss";

export const assetUrl = "https://assets.onlineeventapp.com/";

/**
 * Sidebar Supplemental files
 * @param {object} data
 * @param {array} data.data list of supplement files for display
 * @param {string} data.title section title
 */
const SideBarSupplemental = ({ data: { data, title }, pageType }) => {
  return (
    <section className={sideBarStyles.sessionMeta}>
      <h2>{title}</h2>
      <ul>
        {data.map((supplemental) => (
          <li key={supplemental.fileName}>
            <LinkWrapper
              className={`${sideBarStyles.pdfLink} gtm-exhibitor-resource-link`}
              to={`${assetUrl}${ConfigService.runValues.fileviewerAsset}/${supplemental.filePath}`}
              external={true}
              page={`Sidebar : ${pageType}`}
              componentType="Download"
              trackingUrl={`${assetUrl}${ConfigService.runValues.fileviewerAsset}/${supplemental.filePath}`}
              componentName={supplemental.fileName}
            >
              <img src="/images/icons/pdf.svg" alt="" role="presentation" />
              <span className={sideBarStyles.supplementalFileName}>
                {supplemental.fileName}
              </span>
            </LinkWrapper>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SideBarSupplemental;

SideBarSupplemental.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        fileName: PropTypes.string.isRequired,
        subName: PropTypes.string.isRequired,
        filePath: PropTypes.string.isRequired,
      }).isRequired
    ),
  }).isRequired,
};

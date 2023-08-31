import "../ContentWrapper/scss/app.module.scss";

import breadcrumbsStyles from "../scss/breadcrumbs.module.scss";
import exhibitorBusinessCardStyles from "./scss/exhibitor-business-card.module.scss";
import exhibitorContactsStyles from "./scss/exhibitor-contacts.module.scss";
import exhibitorDocumentStyles from "./scss/exhibitor-documents.module.scss";
import headerStyles from "../Header/scss/desktop.module.scss";
import sideBarStyles from "../Sidebar/scss/single-side-bar.module.scss";
import singleExhibitorStyles from "./scss/single-exhibitor.module.scss";
import socialLinkStyles from "../SocialLinks/scss/social-links.module.scss";

const ExhibitorBoothStyles = (props) => {
  const { booth } = props;

  const subheader_link_color = booth.colors.subheader_link_color
    ? booth.colors.subheader_link_color.startsWith("#")
      ? booth.colors.subheader_link_color
      : `#${booth.colors.subheader_link_color}`
    : "#00A0DF";

  return `<style
              type="text/css"
              id="exhibitor-theme"
            >
.single-exhibitor-dark-theme .${singleExhibitorStyles.mainWrapper},
.single-exhibitor-dark-theme .${singleExhibitorStyles.main} {
  background: #171516;}
.single-exhibitor-light-theme .${socialLinkStyles.linkListItem},
.single-exhibitor-dark-theme .${socialLinkStyles.linkListItem} {
  background-color: ${subheader_link_color};
  border: 1px solid ${subheader_link_color};
  color: #ffffff; }
      
.single-exhibitor-dark-theme .${singleExhibitorStyles.content} .${singleExhibitorStyles.singleListDetails} li{
  color: #ffffff; }
  .single-exhibitor-dark-theme .${headerStyles.activeDropdown} {
  background-color: #2e2c2d;
}
.single-exhibitor-dark-theme .${headerStyles.headerLabel} div .${headerStyles.mainLink} .${headerStyles.dropdownLink} li > a {
  color: #ffffff;
}
.single-exhibitor-light-theme .${headerStyles.headerLabel} div, .${headerStyles.mainLink} li > a {
  color: #0066b2;
}
.single-exhibitor-light-theme .${headerStyles.dropdownLink} li > a {
  color: #2e2c2d;
}
.single-exhibitor-dark-theme .${headerStyles.dropDownTitle}:after {
  background: url("/images/icons/chevron-down.svg") top center no-repeat;
}
.single-exhibitor-light-theme .${singleExhibitorStyles.singleWebsite},
.single-exhibitor-dark-theme .${singleExhibitorStyles.singleWebsite},
.${singleExhibitorStyles.singleListDetails} .representative-wrapper li.exhibitor-contact-phone,
.${singleExhibitorStyles.singleListDetails} a {
  color: ${subheader_link_color}; }    
.single-exhibitor-light-theme .${exhibitorDocumentStyles.pdfLinks} svg circle,
.single-exhibitor-dark-theme .${exhibitorDocumentStyles.pdfLinks} svg circle {
  fill: ${subheader_link_color}; }

.single-exhibitor-dark-theme .${exhibitorDocumentStyles.pdfLinks} .${exhibitorDocumentStyles.linkTitle} {
  color: ${subheader_link_color} !important; }
.single-exhibitor-dark-theme .${singleExhibitorStyles.content} {
  background-color: #171516; }
.single-exhibitor-dark-theme .${breadcrumbsStyles.backButton},
.single-exhibitor-dark-theme .${breadcrumbsStyles.separator},
.single-exhibitor-dark-theme .${breadcrumbsStyles.backButton}:hover {
  color: ${subheader_link_color}; }
.single-exhibitor-dark-theme .${breadcrumbsStyles.backButton} svg polyline {
  stroke: ${subheader_link_color}; }
.single-exhibitor-dark-theme .${sideBarStyles.sideBar} {
  background-color: #2e2c2d !important; 
 .single-exhibitor-dark-theme .${sideBarStyles.sessionMeta} h2 {
  color: ${subheader_link_color};
  border-bottom-color: ${subheader_link_color}; }
.single-exhibitor-dark-theme .${sideBarStyles.sideBar} li,
.single-exhibitor-dark-theme .${sideBarStyles.sessionMeta} p,
.single-exhibitor-dark-theme .${sideBarStyles.sideBar} .exhibitor-product-categories li {
  color: #ffffff; }
  .single-exhibitor-dark-theme .${sideBarStyles.sessionMeta} p, li {
  color: #ffffff; }
.single-exhibitor-light-theme .${sideBarStyles.sideBar} li,
.single-exhibitor-light-theme .${sideBarStyles.sideBar} .exhibitor-product-categories li {
  color: #2E2C2D; }
.single-exhibitor-dark-theme .${singleExhibitorStyles.content} p,
.single-exhibitor-dark-theme .${singleExhibitorStyles.content} p span {
  color: #ffffff !important; }
  .single-exhibitor-dark-theme .${singleExhibitorStyles.content} p a {
  color: ${subheader_link_color} !important; }
.single-exhibitor-dark-theme .${singleExhibitorStyles.content} h1 {
  color: #ffffff !important; }
.${exhibitorBusinessCardStyles.detailsButton}, 
.${singleExhibitorStyles.scheduleMeetingContainer} .${singleExhibitorStyles.detailsButton} {
  background-color: ${subheader_link_color};
  border-color: ${subheader_link_color} !important; }
.${exhibitorBusinessCardStyles.detailsButton}:hover,
.${singleExhibitorStyles.scheduleMeetingContainer} .${singleExhibitorStyles.detailsButton}:hover {
  color: ${subheader_link_color}; }
.content-wrapper-with-contact h4,
.${exhibitorContactsStyles.representativeWrapper} h2 {
  color: ${subheader_link_color};
  border-bottom: 1px solid ${subheader_link_color}; }
            </style>`;
};

export default ExhibitorBoothStyles;

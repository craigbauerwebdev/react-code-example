import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import exhibitorDocumentStyles from "./scss/exhibitor-documents.module.scss";

export const ExhibitorDocuments = ({
  documents,
  exhibitorName,
  exhibitorId,
}) => {
  return (
    <ul>
      {documents &&
        documents.map((document, index) => {
          const documentUrl = document["url"];
          const documentName = document["name"];
          const documentId = index + 1;
          return (
            <li
              key={`${exhibitorName} Document ${documentId} - ${documentUrl}`}
            >
              <LinkWrapper
                key={`${exhibitorName} Document ${documentId} - ${documentUrl}`}
                id={`exhibitor-document-${documentId}`}
                className={`${exhibitorDocumentStyles.pdfLinks} gtm-exhibitor-resource-link`}
                to={documentUrl}
                external={true}
                page="Single Exhibitor"
                componentType="Download"
                trackingUrl={documentUrl}
                componentName={documentUrl}
                exhibitorId={exhibitorId}
              >
                <img
                  src="/images/icons/pdf.svg"
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                />
                <p className={exhibitorDocumentStyles.linkTitle}>
                  {documentName}
                </p>
              </LinkWrapper>
            </li>
          );
        })}
    </ul>
  );
};

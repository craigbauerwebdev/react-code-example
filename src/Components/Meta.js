import MetaTags from "react-meta-tags";
import React from "react";

export default function Meta({ pageTitle, pageDescription }) {
  const { REACT_APP_META_TITLE, REACT_APP_META_DESCRIPTION } = process.env;
  const title = pageTitle
    ? `${pageTitle} | ${REACT_APP_META_TITLE}`
    : REACT_APP_META_TITLE;
  const description = pageDescription
    ? `${pageDescription} | ${REACT_APP_META_DESCRIPTION}`
    : REACT_APP_META_DESCRIPTION;

  return (
    <MetaTags>
      <title>{title && title.replace(/(<([^>]+)>)/gi, "")}</title>
      <meta
        name="description"
        content={description && description.replace(/(<([^>]+)>)/gi, "")}
      />

      <meta
        name="twitter:title"
        content={title && title.replace(/(<([^>]+)>)/gi, "")}
      />
      <meta
        name="twitter:description"
        content={description && description.replace(/(<([^>]+)>)/gi, "")}
      />

      <meta
        property="og:title"
        content={title && title.replace(/(<([^>]+)>)/gi, "")}
      />
      <meta
        property="og:description"
        content={description && description.replace(/(<([^>]+)>)/gi, "")}
      />
    </MetaTags>
  );
}

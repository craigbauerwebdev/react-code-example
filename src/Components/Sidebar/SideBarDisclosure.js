import React from "react";
import imgTest from "util/imgTest";
import sideBarStyles from "./scss/single-side-bar.module.scss";
/**
 * Sidebar Modal content for Disclosure pop up
 * @param {object} data
 * @param {string} data.title section title
 * @param {string} data.content disclosure content
 */
const SideBarDisclosure = ({ data: { title, content } }) => {
  const disclosureContent = (content) => {
    const isImg = imgTest(content);

    if (isImg) {
      return (
        <img
          className={sideBarStyles.disclosuresImg}
          src={content}
          alt="Head Shot"
        />
      );
    }

    return (
      <p>
        Disclaimer: <br /> {content}
      </p>
    );
  };
  return (
    <section className={sideBarStyles.sessionMeta}>
      <h2>{title}</h2>
      {disclosureContent(content)}
    </section>
  );
};

export default SideBarDisclosure;

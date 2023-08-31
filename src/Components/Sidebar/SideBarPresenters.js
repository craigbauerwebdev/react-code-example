import PropTypes from "prop-types";
import React from "react";
import imgTest from "util/imgTest";
import sideBarStyles from "./scss/single-side-bar.module.scss";
/**
 * Sidebar item for Presenters
 * @param {object} data
 * @param {string} data.title section title
 * @param {array} data.data list of presenter to be displayed
 */
const SideBarPresenters = ({ data: { title, data } }) => {
  const getAuthorImg = (img, name) => {
    const isImg = imgTest(img);

    if (isImg) {
      return (
        <div className={sideBarStyles.headShot}>
          <img src={img} alt={name} />
        </div>
      );
    }
    return null;
  };

  return (
    <section className={sideBarStyles.sessionMeta}>
      <h2>{title}</h2>
      {data.map((presenter) => (
        <div key={presenter.name} className={sideBarStyles.presenterHolder}>
          {getAuthorImg(presenter.img, presenter.name)}
          <div>
            <h3>{presenter.name}</h3>
            <h4>{presenter.organization}</h4>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SideBarPresenters;

SideBarPresenters.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
        img: PropTypes.string,
      }).isRequired
    ),
  }).isRequired,
};

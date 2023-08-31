import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import languageStyles from "./scss/language-selector.module.scss";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Multi-Language-dropdown-selector-for-Sessions
 * @param {object} languageOptions
 * @param {function} handleChange
 * @param {string} selectedLanguage
 */
const LanguageSelector = ({
  languageOptions,
  handleChange,
  selectedLanguage,
}) => {
  return (
    <div className={languageStyles.languageSelector}>
      <img src="/images/icons/language-earth.svg" alt="language icon" />
      <div className={languageStyles.holder}>
        <SvgTypes name="arrow-filled" />
        <select
          id="selectLanguage"
          className={languageStyles.selectLanguage}
          onBlur={handleChange}
          onChange={handleChange}
          value={selectedLanguage}
          name="select video language"
        >
          {languageOptions.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;

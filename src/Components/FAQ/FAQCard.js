import React, { useState } from "react";

import ExpandToggle from "Components/Buttons/ExpandToggle";
import OEPAnalytics from "Components/OEPAnalytics";
import faqCardStyles from "./scss/faq-card.module.scss";

const FAQCard = ({ page, answer, question, mobileBorder, index }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div
      className={`${faqCardStyles.faqCard} ${
        mobileBorder && faqCardStyles.mobileBorder
      }`}
    >
      <div className={faqCardStyles.faqItem}>
        <OEPAnalytics
          page={page}
          componentType="Text Link"
          url={question}
          componentName={question}
        >
          <p
            className={`${faqCardStyles.faqQuestion} gtm-FAQ-question`}
            onClick={toggleExpand}
            role="presentation"
          >
            {question}
          </p>
        </OEPAnalytics>
        <ExpandToggle
          expanded={expand}
          page={page}
          handleClick={toggleExpand}
          ariaLabel={[
            "frequently asked question collapse",
            "frequently asked question expand",
          ]}
          ariaControls={`faq-answer-${index}`}
          classList={["faq"]}
        />
      </div>
      <div
        id={`faq-answer-${index}`}
        className={`${faqCardStyles.faqAnswer} ${
          expand && faqCardStyles.expand
        }`}
        aria-hidden={!expand}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: answer,
          }}
        />
      </div>
    </div>
  );
};

export default FAQCard;

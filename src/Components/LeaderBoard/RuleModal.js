import React from "react";
import ruleModalStyles from "./scss/rule-modal.module.scss";

const RuleModal = ({ data: { title, content } }) => {
  return (
    <div className={ruleModalStyles.rule}>
      <h1 id="modal_label" tabIndex="-1">
        {title}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
};

export default RuleModal;

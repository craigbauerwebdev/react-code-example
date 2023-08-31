import React, { useCallback, useEffect, useReducer } from "react";
import { actionTypesFAQS, faqReducer } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import BannerWrapper from "Components/Banners/BannerWrapper";
import FAQCard from "./FAQCard";
import Loader from "Components/Loader";
import { dataTypes } from "store/utils/dataTypes";
import faqStyles from "./scss/faqs.module.scss";
import { getPayload } from "store/actions";
import lodash from "lodash";

// import staticData from "../../util/staticData/Components/FAQ/FAQs.data";

/**
 * Faq Data
 * Data is being pulled from liferay
 * If this is not the desired outcome you can replace it with static data.
 * Faqs are grouped by catagories and sorted by catagories and individual faq items are also sorted.
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/FAQ's
 * @param {boolean} preevent is prevent page
 * @param {string} pageName what data should be used for liferay or staticData object
 */
const FAQs = ({ preevent, pageName }) => {
  const dispatch = useDispatch();
  const faqsData = useSelector((state) => state.global.faqs);
  const [faqData, dispatchFaq] = useReducer(faqReducer, {
    empty: false,
    faqsContent: null,
  });
  const setFaqs = useCallback(
    (faqData) => {
      const data = lodash
        .orderBy(faqData, ["sortOrder"], ["asc"]) // Sort catagories
        .map((faq) => {
          const copy = { ...faq };
          copy.questions = lodash.orderBy(
            copy.questions,
            ["sortOrder"],
            ["asc"]
          ); // Sort faq items

          return copy;
        })
        .map((faq) => {
          const copy = { ...faq };
          // Make a left and right set of faq items
          const [left, right] = lodash.chunk(
            faq.questions,
            Math.round(faq.questions.length / 2)
          );

          copy.left = left;
          copy.right = right;

          return copy;
        });

      dispatchFaq({
        type: actionTypesFAQS.SET_FAQS,
        payload: data,
      });
    },
    [dispatchFaq]
  );

  /**
   * This is getting liferay data.
   * To use statice data replace what is inside this useEffect with this.
   * setFaqs(staticData.faqs[pageName]);
   */
  useEffect(() => {
    if (!faqsData) {
      dispatch(getPayload(dataTypes.faqs));
    } else {
      const hasNoData = lodash.isEmpty(faqsData[pageName]);

      if (hasNoData) {
        // Sorry no FAQs available.
        dispatchFaq({
          type: actionTypesFAQS.SET_EMPTY,
          payload: true,
        });
      } else {
        setFaqs(faqsData[pageName]);
      }
    }
  }, [setFaqs, dispatch, faqsData, pageName]);

  if (faqData.empty) {
    return (
      <section className={faqStyles.faq}>
        <BannerWrapper pageName="faqs" />
        <div className={`${faqStyles.faq} ${faqStyles.emptyMessage}`}>
          <h2>There are no FAQs at this time</h2>
        </div>
      </section>
    );
  }

  if (!faqData.faqsContent) {
    return (
      <div className={faqStyles.faq}>
        <Loader />
      </div>
    );
  }

  return (
    <section
      className={`${faqStyles.faq} ${preevent ? faqStyles.preEvent : ""}`}
    >
      {preevent ? <h1>FAQS</h1> : <BannerWrapper pageName="faqs" />}
      <div>
        {faqData.faqsContent.map((content) => (
          <div key={content.category} className={faqStyles.faqWrapper}>
            {content.categoryTitle && <h2>{content.categoryTitle}</h2>}
            {content.left && (
              <div className={faqStyles.col}>
                {content.left.map((questionLeft, index) => (
                  <FAQCard
                    page={pageName}
                    key={questionLeft.title}
                    index={`left-${index}`}
                    question={questionLeft.title}
                    answer={questionLeft.description}
                  />
                ))}
              </div>
            )}
            {content.right && (
              <div className={faqStyles.col}>
                {content.right.map((questionRight, index) => (
                  <FAQCard
                    page={pageName}
                    key={questionRight.title}
                    index={`right-${index}`}
                    question={questionRight.title}
                    answer={questionRight.description}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;

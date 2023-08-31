import lodash from "lodash";

export default function formatFaqs(data) {
  const faqData = {};

  data.faqs.forEach((faq) => {
    if (faqData[faq.page]) {
      const data = faqData[faq.page];

      if (!lodash.isEmpty(faq.questions)) {
        data.push({
          category: faq.category,
          categoryTitle: faq.categoryTitle,
          questions: faq.questions,
          sortOrder: faq.sortOrder,
        });
      }
    } else {
      if (!lodash.isEmpty(faq.questions)) {
        faqData[faq.page] = [
          {
            category: faq.category,
            categoryTitle: faq.categoryTitle,
            questions: faq.questions,
            sortOrder: faq.sortOrder,
          },
        ];
      }
    }
  });

  return faqData;
}

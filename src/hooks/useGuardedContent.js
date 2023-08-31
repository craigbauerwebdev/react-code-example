import { useEffect, useState } from "react";
/**
 * If user doesn't have the right permissions to view all content.
 * Here is were we filter out guarded content from being display.
 * This file can be used in many ways however it has no logic in place for removing content.
 * Removing content should be handled when clear user rules have been established.
 * @param {boolean} guard
 * @param {Array} content
 * @returns {Array}
 */
const useGuardedContent = (guard, content) => {
  const [guardedContent, setGuardedContent] = useState([]);

  useEffect(() => {
    if (content && content.length && guard) {
      setGuardedContent(content);
    } else {
      setGuardedContent(content);
    }
  }, [content, guard]);

  return guardedContent;
};

export default useGuardedContent;

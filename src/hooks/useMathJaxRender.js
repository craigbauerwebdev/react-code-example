import { useEffect } from "react";

/*
  This hook will force MathJax to re-parse the page
  when any of the dependencies change.

  Import and use it in any component where you intend to
  have dynamic (API) data rendered as mathematical expressions.

  Its parameter is a dependency array, similar to useEffect.

  Be sure that the MathJax CDN is enabled in index.html.

  Note: This hook will only work in a functional component.
  If you are working in a class component, you should
  manually invoke the reRenderMathJax util function
  in util/mathJaxUtil.js after loading data.
*/

export default function useMathJaxRender(dependencies = []) {
  useEffect(() => {
    const { MathJax } = window;
    if (MathJax) {
      MathJax.typesetPromise();
    }
  }, [dependencies]);
}

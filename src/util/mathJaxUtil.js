/*
  Use this function to prepare a string containing TeX formatting
    to be rendered by MathJax.
  Be sure that the MathJax CDN is included in index.html.
  This function looks for parts of strings wrapped in dollar signs
    and wraps them in escaped parens, which is what MathJax
    looks for as input.
*/
export function formatTeX(str) {
  return str.replace(/\$([^$]+)\$/g, (_, content) => {
    return `\\(${content}\\)`;
  });
}

/*
  You can manually call this function to force MathJax
  to re-parse the page after loading dynamic data.
  
  If you are working in a functional component, a better
  alternative is to use the `useMathJaxRender` hook, which
  will run automatically when the data changes.

  Be sure that the MathJax CDN is included in index.html.
*/
export function reRenderMathJax() {
  const { MathJax } = window;
  if (MathJax) {
    MathJax.typesetPromise();
  }
}

export default {
  formatTeX,
  reRenderMathJax,
};

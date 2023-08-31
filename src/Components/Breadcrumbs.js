import LinkWrapper from "./LinkWrapper/LinkWrapper";
import React from "react";
import breadcrumbsStyles from "./scss/breadcrumbs.module.scss";
/**
 * Shows a "history" of links that the user can utilize to navigate back to parent pages.
 *
 * Example 1 - Single Item:
 * crumbs =>     [{path: "/example", "Example Link"}]
 * results =>    < Example Link
 *
 * Example 2 - Multiple Items:
 * crumbs =>     [{path: "/example", "Example Link"}, {path: "/example2", "Example Link 2"}]
 * results =>    Example Link / Example Link 2
 *
 * @param crumbs The list of items that will be displayed as breadcrumb links.
 */
export const Breadcrumbs = ({ crumbs, page, componentType }) => {
  let output = [];
  let ariaLabel = "";
  if (crumbs) {
    crumbs.forEach((crumb, index) => {
      ariaLabel += crumb.label + " ";
      output.push(
        <li key={index}>
          {crumb.path && (
            <LinkWrapper
              to={crumb.path}
              className={breadcrumbsStyles.backButton}
              page={page}
              componentType={componentType}
              trackingUrl={crumb.path}
              componentName={crumb.label}
            >
              {index === 0 && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  data-svg="chevron-left"
                  role="presentation"
                  aria-hidden="true"
                >
                  <polyline
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.03"
                    points="13 16 7 10 13 4"
                  ></polyline>
                </svg>
              )}
              <span>{crumb.label}</span>
            </LinkWrapper>
          )}
          {!crumb.path && (
            <span className={breadcrumbsStyles.backButton}>{crumb.label}</span>
          )}
          {crumbs.length - 1 !== index && (
            <span
              className={breadcrumbsStyles.separator}
              role="presentation"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </li>
      );
    });
  }
  return (
    <nav
      aria-label={`Breadcrumbs - ${ariaLabel}`}
      className={breadcrumbsStyles.breadcrumbsContainer}
    >
      <ol>{output}</ol>
    </nav>
  );
};

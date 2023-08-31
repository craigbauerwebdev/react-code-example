import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";

import ExpandToggle from "Components/Buttons/ExpandToggle";
import filterStyles from "Components/Filters/scss/filters.module.scss";

const AttendeeCustomFilter = ({
  customFields,
  customFilterToggle,
  showMore,
  page,
  onToggleShowMore,
  onHandleCustomFilterChange,
  onToggleCustomSection,
}) => {
  if (!customFields || customFields.length === 0) {
    return null;
  }

  return customFields?.map((field, idx) => (
    <div key={idx} className={filterStyles.filterWithBorder}>
      <h4 className={filterStyles.title}>
        <span>{field.label}</span>
        <ExpandToggle
          expanded={customFilterToggle[idx]}
          page={page}
          pageId="Filters"
          handleClick={() => {
            onToggleCustomSection(idx);
          }}
          ariaLabel={["filter collapse", "filter expand"]}
          ariaControls="filter-Date"
          classList={["sessionTab"]}
          sessionName="Collapsed toggle"
        />
      </h4>
      {customFilterToggle[idx] && (
        <div
          className={`${filterStyles.filterSubFilterHolder} ${filterStyles.active}`}
        >
          {field.checkboxFilter && (
            <div className={filterStyles.list}>
              {field.checkboxSchema.map((filter, checkIdx) => {
                const renderIt = !showMore[idx] || checkIdx < 5;
                if (!renderIt) return null;
                return (
                  <OEPAnalytics
                    page={page}
                    pageId="Filters"
                    componentType="Button"
                    key={filter.key}
                    url={`Select ${filter.key}`}
                    componentName={filter.key}
                  >
                    <div key={checkIdx}>
                      <input
                        id={filter.key}
                        name={field.attr + " " + filter.key}
                        type="checkbox"
                        value={filter.key}
                        data-idx={checkIdx}
                        checked={filter.value}
                        onChange={(event) => {
                          onHandleCustomFilterChange(
                            field,
                            idx,
                            checkIdx,
                            event
                          );
                        }}
                        className={filterStyles.active}
                      />
                      <label htmlFor={filter.key + field.attr}>
                        {filter.key.length <= 25
                          ? filter.key
                          : filter.key.substring(0, 24) + "..."}
                      </label>
                    </div>
                  </OEPAnalytics>
                );
              })}
              <OEPAnalytics
                page={page}
                pageId="Filters"
                componentType="Link"
                url={
                  showMore[idx] && field.checkboxSchema.length > 5
                    ? "Show More"
                    : "Show Less"
                }
                componentName="Show Toggle"
              >
                <div className={filterStyles.showMoreWrapper}>
                  {showMore[idx] && field.checkboxSchema.length > 5 ? (
                    <span
                      className={filterStyles.showMore}
                      onClick={() => {
                        onToggleShowMore(idx);
                      }}
                    >
                      Show More
                    </span>
                  ) : (
                    field.checkboxSchema.length > 5 && (
                      <span
                        className={filterStyles.showMore}
                        onClick={() => {
                          onToggleShowMore(idx);
                        }}
                      >
                        Show Less
                      </span>
                    )
                  )}
                </div>
              </OEPAnalytics>
            </div>
          )}
        </div>
      )}
    </div>
  ));
};

export default AttendeeCustomFilter;

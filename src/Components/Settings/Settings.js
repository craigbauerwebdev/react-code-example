import "../../css/kendo/subset.scss";

import { Field, Form, FormElement } from "@progress/kendo-react-form";

import FormButtons from "Components/Profile/FormButtons";
import { Fragment } from "react";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import LoaderModal from "Components/Profile/LoaderModal";
import React from "react";
import Setting from "./Setting";
import { Tooltip } from "@progress/kendo-react-tooltip";
import getAnalyticsPage from "util/getAnalyticsPage";
import { profileTimezoneValues } from "util/profileTimezoneValues";
import { saveAnalytic } from "Components/OEPAnalytics";
import settingsStyles from "./scss/settings.module.scss";
import useAccountProfile from "hooks/useAccountProfile";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const timezoneOptions = [
  { label: "Event", value: profileTimezoneValues.ACTIVE },
  { label: "Local", value: profileTimezoneValues.INACTIVE },
];

const Settings = () => {
  const location = useLocation();
  const analyticsPage = getAnalyticsPage(location.pathname);
  const {
    accountProfile,
    patch,
    editKey,
    incrementEditKey,
    isAccountProfileLoaded,
    isUpdateInProgress,
    startLoader,
  } = useAccountProfile();
  const permissions = useSelector((state) => state.global.permissions);
  const profileConfigurations = useSelector(
    (state) => state.global.profileConfigurations
  );
  const eventNotificationPermissions = useSelector(
    (state) => state.global.networkSettings?.enableNotifications
  );

  const handleSubmit = (dataItem) => {
    // This will avoid stacking dispatchers.
    startLoader();

    // Pass data to be saved in the DB
    patch({
      autoAcceptMeetings: dataItem.autoAcceptMeetings,
      viewInNetworking: dataItem.viewInNetworking,
      notifications: dataItem.notifications,
      useEventTimezone: dataItem.useEventTimezone,
      networking: dataItem.networking,
    });
  };

  const resetForm = () => incrementEditKey();

  const radioGroup = (fieldRenderProps) => {
    const { value, onChange, data, hint } = fieldRenderProps;

    return (
      <div>
        <div className={settingsStyles.radioGroup}>
          {data.map((item) => (
            <div key={item.label}>
              <input
                id={item.label}
                name="useEventTimezone"
                type="radio"
                value={item.value}
                onChange={onChange}
                onClick={() =>
                  saveAnalytic({
                    page: analyticsPage,
                    componentType: "Button",
                    url: "/account/settings",
                    componentName: "Choose event or local timezone",
                  })
                }
                checked={Number(item.value) === Number(value)}
              />
              <label htmlFor={item.label}>{item.label}</label>
            </div>
          ))}
        </div>
        <p className={settingsStyles.hint}>{hint}</p>
      </div>
    );
  };

  if (!isAccountProfileLoaded || !profileConfigurations?.settings) {
    return <Loader />;
  }

  return (
    <div className={settingsStyles.settingsContainer}>
      <LoaderModal
        active={isUpdateInProgress}
        disableParentPageScroll={false}
      />
      <Form
        className="form-horizontal"
        onChange={(e) => alert(JSON.stringify(e))}
        onSubmit={handleSubmit}
        initialValues={accountProfile}
        key={editKey}
        render={(formRenderProps) => (
          <FormElement className={settingsStyles.form}>
            <div className={`k-block ${settingsStyles.kBlock}`}>
              <fieldset className={settingsStyles.fieldset}>
                <h2>Settings</h2>
                {permissions.allowNetworking &&
                  !profileConfigurations.settings.disableNetworking.hide && (
                    <div>
                      {/* default value is set to networking_opt_in_flag coming from registration */}
                      <h3 className={settingsStyles.innerSubHeader}>
                        Networking
                      </h3>
                      <Setting
                        name={"networking.allowUserNetworking"}
                        label="View in Networking"
                        onClick={() => {
                          saveAnalytic({
                            page: analyticsPage,
                            componentType: "Button",
                            url: "/account/settings",
                            componentName: "Toggle View in networking",
                          });
                        }}
                      />
                    </div>
                  )}

                {permissions.showSettingsManageMyOptions && (
                  <Fragment>
                    <h3 className={settingsStyles.innerSubHeader}>Manage My</h3>
                    <ul className={settingsStyles.manageUserWrapper}>
                      <li>
                        <LinkWrapper
                          to={"/account/blocked-users"}
                          title="Manage My Blocked Users"
                          aria-label="Manage My Blocked Users"
                          componentName="Blocked Users"
                          componentType="link"
                          page={analyticsPage}
                          trackingUrl={"/account/blocked-users"}
                        >
                          Blocked Users
                        </LinkWrapper>
                      </li>
                    </ul>
                  </Fragment>
                )}
                {eventNotificationPermissions && (
                  <div>
                    <h3 className={settingsStyles.innerSubHeader}>
                      Notifications
                    </h3>
                    <Setting
                      name={"notifications"}
                      label="Browser based pop-ups"
                      onClick={() => {
                        saveAnalytic({
                          page: "Settings",
                          componentType: "Button",
                          url: "/account/settings",
                          componentName: "Toggle Browser based pop-ups",
                        });
                      }}
                    />
                  </div>
                )}
                <div className={settingsStyles.timeZoneHeaderWrapper}>
                  <h3
                    className={`${settingsStyles.inlineHeader} ${settingsStyles.innerSubHeader}`}
                  >
                    Timezone
                  </h3>
                  <div className={settingsStyles.timeZoneTooltipWrapper}>
                    <Tooltip
                      position="right"
                      anchorElement="target"
                      tooltipClassName={settingsStyles.tooltip}
                      showCallout={false}
                    >
                      <img
                        title="Change the display of the event to match your device."
                        role="button"
                        tabIndex="0"
                        src="/images/icons/question.svg"
                        alt="Change the display of the event to match your device."
                        className={settingsStyles.timeZoneTooltip}
                      />
                    </Tooltip>
                  </div>
                </div>
                <Field
                  id={"useEventTimezone"}
                  name={"useEventTimezone"}
                  label={"Timezone"}
                  hint={"Hint: choose to use event or local timezone"}
                  component={radioGroup}
                  data={timezoneOptions}
                />
              </fieldset>
              <FormButtons
                formRenderProps={formRenderProps}
                cancelCallback={resetForm}
              />
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};

export default Settings;

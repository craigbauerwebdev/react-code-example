import "../../css/kendo/subset.scss";

import { Field, Form, FormElement } from "@progress/kendo-react-form";

import EditItem from "./EditItem";
import { Error } from "@progress/kendo-react-labels";
import FormButtons from "./FormButtons";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import LoaderModal from "./LoaderModal";
import Logger from "js-logger";
import ManageProfileAvatar from "./ManageProfileAvatar";
import React from "react";
import { ValidatedInput } from "../ValidatedInput/ValidatedInput";
import accountProfileStyles from "./scss/account-profile.module.scss";
import { getter } from "@progress/kendo-react-common";
import { saveAnalytic } from "Components/OEPAnalytics";
import useAccountProfile from "hooks/useAccountProfile";
import { useSelector } from "react-redux";

/**
 * TODO: document me. Link to kendo would be nice.
 */
const AccountProfile = () => {
  const profileConfigurations = useSelector(
    (state) => state.global.profileConfigurations
  );
  const { error: errorPayload } = useSelector((state) =>
    state?.profile?.error ? state?.profile?.error : false
  );

  const {
    accountProfile,
    patch,
    startLoader,
    editKey,
    incrementEditKey,
    isAccountProfileLoaded,
    isUpdateInProgress,
  } = useAccountProfile();

  function isHiddenReducer(obj) {
    if (typeof obj !== "object") return true;
    return Object.keys(obj).reduce(function (prev, curr) {
      if (typeof obj[curr] !== "boolean")
        prev = prev && isHiddenReducer(obj[curr]);
      else if (curr === "hide") prev = prev && obj[curr];
      return prev;
    }, true);
  }

  const getAttribute = (key) => {
    return accountProfile.attributes[key];
  };

  const profileValidator = (values) => {
    const preferredNameGetter = getter("preferredName");
    const companyGetter = getter("company");
    const titleGetter = getter("title");
    const validationSummary = {};

    if (preferredNameGetter(values)?.length > 50) {
      validationSummary.preferredName = "Field must not exceed 50 characters";
    }

    if (companyGetter(values)?.length > 256) {
      validationSummary.company = "Field must not exceed 256 characters";
    }

    if (titleGetter(values)?.length > 256) {
      validationSummary.title = "Field must not exceed 256 characters";
    }

    return validationSummary;
  };
  const handleSubmit = (dataItem) => {
    saveAnalytic({
      page: "Profile",
      componentType: "Button",
      componentName: "Submit",
    });

    // This will avoid stacking dispatchers.
    startLoader();

    // Pass data to be saved in the DB
    if (dataItem) {
      patch({
        prefix: dataItem.prefix,
        suffix: dataItem.suffix,
        preferredName: dataItem.preferredName,
        firstName: dataItem.firstName,
        lastName: dataItem.lastName,
        company: dataItem.company,
        title: dataItem.title,
        occupation: dataItem.occupation,
        language: dataItem.language,
        region: dataItem.region,
        social: {
          website: dataItem.social.website,
          facebook: dataItem.facebook,
          instagram: dataItem.instagram,
          twitter: dataItem.twitter,
          linkedin: dataItem.linkedin,
          snapchat: dataItem.snapchat,
        },
        address: {
          city: dataItem.city,
          state: dataItem.state,
          country: dataItem.country,
          postalCode: dataItem.postalCode,
          postalCodePlusFour: dataItem.postalCodePlusFour,
        },
      });
    } else Logger.log("no valid patch item");
  };

  const resetForm = () => {
    saveAnalytic({
      page: "Profile",
      componentType: "Button",
      componentName: "Reset Form",
    });

    incrementEditKey();
  };

  if (!isAccountProfileLoaded) {
    return <Loader />;
  }

  return (
    <div className={`${accountProfileStyles.accountProfile}`}>
      <LoaderModal
        active={isUpdateInProgress}
        disableParentPageScroll={false}
      />
      <Form
        className={`form-horizontal`}
        onSubmit={handleSubmit}
        initialValues={accountProfile}
        validator={profileValidator}
        key={editKey}
        render={(formRenderProps) => (
          <FormElement className={`${accountProfileStyles.form}`}>
            <div className={`k-block ${accountProfileStyles.kBlock}`}>
              <fieldset className={accountProfileStyles.fieldset}>
                <div className={`${accountProfileStyles.pageGrid}`}>
                  <div className={accountProfileStyles.pageGridHeader}>
                    <div className={accountProfileStyles.profileHeaderDisplay}>
                      <h2 className={accountProfileStyles.innerHeader}>
                        Profile
                      </h2>
                      <LinkWrapper
                        to={`/attendee/${accountProfile.attendeeId}/attendees`}
                        page={"profile"}
                        componentType={"link"}
                        componentName={"view public profile"}
                        trackingUrl={`/attendee/${accountProfile.attendeeId}/attendees`}
                      >
                        View Public Profile
                      </LinkWrapper>
                    </div>
                  </div>
                  <div className={accountProfileStyles.pageGridAvatar}>
                    <div className="k-hbox-container">
                      <div className={accountProfileStyles.avatar}>
                        <ManageProfileAvatar
                          hideControl={
                            profileConfigurations?.settings?.profilePhotoUpload
                              ?.hide
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={accountProfileStyles.pageGridForm}>
                    <div className={`${accountProfileStyles.pageGridForm}`}>
                      {!isHiddenReducer(profileConfigurations?.basic) && (
                        <div>
                          <div className={accountProfileStyles.basicSection}>
                            <h3 className={accountProfileStyles.innerSubHeader}>
                              Basic
                            </h3>
                          </div>
                          <div className={`${accountProfileStyles.formGrid}`}>
                            {!profileConfigurations?.basic?.preferredName
                              ?.hide &&
                              !profileConfigurations?.basic?.preferredName
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.preferredName}`}
                                >
                                  <Field
                                    label="Preferred First Name"
                                    name="preferredName"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload &&
                                    errorPayload?.preferredName && (
                                      <Error>
                                        {errorPayload &&
                                          errorPayload?.preferredName?.message}
                                      </Error>
                                    )}
                                </div>
                              )}
                            {!profileConfigurations?.basic?.preferredName
                              ?.hide &&
                              profileConfigurations?.basic?.preferredName
                                ?.readOnly &&
                              accountProfile.preferredName && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.preferredName}`}
                                >
                                  <EditItem
                                    label="Preferred First Name"
                                    name={accountProfile.preferredName}
                                    component={ValidatedInput}
                                  />
                                </div>
                              )}
                            {!profileConfigurations?.basic?.prefix?.hide &&
                              !profileConfigurations?.basic?.prefix
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.prefix}`}
                                >
                                  <Field
                                    label="Prefix"
                                    name="prefix"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.prefix && (
                                    <Error>
                                      {errorPayload?.prefix?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.basic?.prefix?.hide &&
                              profileConfigurations?.basic?.prefix?.readOnly &&
                              accountProfile.prefix && (
                                <EditItem
                                  label="Prefix"
                                  name={accountProfile.prefix}
                                  className={accountProfileStyles.prefix}
                                />
                              )}
                            {!profileConfigurations?.basic?.firstName?.hide &&
                              !profileConfigurations?.basic?.firstName
                                .readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.firstName}`}
                                >
                                  <Field
                                    label="First Name"
                                    name="firstName"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.firstName && (
                                    <Error>
                                      {errorPayload?.firstName?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.basic?.firstName?.hide &&
                              profileConfigurations?.basic?.firstName
                                .readOnly &&
                              accountProfile.firstName && (
                                <EditItem
                                  label="First Name"
                                  name={accountProfile.firstName}
                                  className={accountProfileStyles.firstName}
                                />
                              )}
                            {!profileConfigurations?.basic?.lastName?.hide &&
                              !profileConfigurations?.basic?.lastName
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.lastName}`}
                                >
                                  <Field
                                    label="Last Name"
                                    name="lastName"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.lastName && (
                                    <Error>
                                      {errorPayload?.prefix?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.basic?.lastName?.hide &&
                              profileConfigurations?.basic?.lastName
                                ?.readOnly &&
                              accountProfile.lastName && (
                                <EditItem
                                  label="Last Name"
                                  name={accountProfile.lastName}
                                  className={accountProfileStyles.lastName}
                                />
                              )}
                            {!profileConfigurations?.basic?.suffix?.hide &&
                              !profileConfigurations?.basic?.suffix
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.suffix}`}
                                >
                                  <Field
                                    label="Suffix"
                                    name="suffix"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.suffix && (
                                    <Error>
                                      {errorPayload?.suffix?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.basic?.suffix?.hide &&
                              profileConfigurations?.basic?.suffix?.readOnly &&
                              accountProfile.suffix && (
                                <EditItem
                                  label="Suffix"
                                  name={accountProfile.suffix}
                                  className={accountProfileStyles.suffix}
                                />
                              )}
                            {!profileConfigurations?.basic?.emailAddress
                              ?.hide && (
                              <div className={accountProfileStyles.email}>
                                <EditItem
                                  label="Email Address"
                                  name={accountProfile.emailAddress}
                                  link={`mailto:${accountProfile.emailAddress}`}
                                  url={`mailto:${accountProfile.emailAddress}`}
                                />
                              </div>
                            )}
                            {!profileConfigurations?.basic?.language?.hide &&
                              !profileConfigurations?.basic?.language
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.language}`}
                                >
                                  <Field
                                    label="Language"
                                    name="language"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.language && (
                                    <Error>
                                      {errorPayload?.language?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.basic?.language?.hide &&
                              profileConfigurations?.basic?.language
                                ?.readOnly &&
                              accountProfile.language && (
                                <EditItem
                                  label="Language"
                                  name={accountProfile.language}
                                  className={accountProfileStyles.language}
                                />
                              )}
                          </div>
                        </div>
                      )}
                      {!isHiddenReducer(profileConfigurations?.company) && (
                        <div>
                          <div>
                            <h3 className={accountProfileStyles.innerSubHeader}>
                              Company
                            </h3>
                          </div>
                          <div
                            className={`${accountProfileStyles.mb3} ${accountProfileStyles.companyGrid}`}
                          >
                            {!profileConfigurations?.company?.companyName
                              ?.hide &&
                              !profileConfigurations?.company?.companyName
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.companyName}`}
                                >
                                  <Field
                                    label="Company Name"
                                    name="company"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.company && (
                                    <Error>
                                      {errorPayload.company?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.company?.companyName
                              ?.hide &&
                              profileConfigurations?.company?.companyName
                                ?.readOnly &&
                              accountProfile.company && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.companyName}`}
                                >
                                  <EditItem
                                    label="Company Name"
                                    name={accountProfile.company}
                                    component={ValidatedInput}
                                  />
                                </div>
                              )}
                            {!profileConfigurations?.company?.jobTitle?.hide &&
                              !profileConfigurations?.company?.jobTitle
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.jobTitle}`}
                                >
                                  <Field
                                    label="Job Title"
                                    name="title"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.title && (
                                    <Error>
                                      {errorPayload?.title?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.company?.jobTitle?.hide &&
                              profileConfigurations?.company?.jobTitle
                                ?.readOnly &&
                              accountProfile.title !== " " && (
                                <EditItem
                                  label="Job Title"
                                  name={accountProfile.title}
                                  className={accountProfileStyles.jobTitle}
                                />
                              )}

                            {!profileConfigurations?.company?.occupation
                              ?.hide &&
                              !profileConfigurations?.company?.occupation
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.occupation}`}
                                >
                                  <Field
                                    label="Occupation"
                                    name="occupation"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.occupation && (
                                    <Error>
                                      {errorPayload?.occupation.message}
                                    </Error>
                                  )}
                                </div>
                              )}

                            {!profileConfigurations?.company?.occupation
                              ?.hide &&
                              profileConfigurations?.company?.occupation
                                ?.readOnly &&
                              accountProfile.occupation && (
                                <EditItem
                                  label="Occupation"
                                  name={accountProfile.occupation}
                                  className={accountProfileStyles.occupation}
                                />
                              )}
                            {!profileConfigurations?.company?.website?.hide &&
                              !profileConfigurations?.company?.website
                                ?.readOnly && (
                                <div
                                  className={`${accountProfileStyles.mb3} ${accountProfileStyles.websiteReadOnly}`}
                                >
                                  <Field
                                    label="Website (including http:// or https://)"
                                    name="social.website"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload &&
                                    errorPayload["social.website"] && (
                                      <Error>
                                        {
                                          errorPayload["social.website"]
                                            ?.message
                                        }
                                      </Error>
                                    )}
                                </div>
                              )}
                            {!profileConfigurations?.company?.website?.hide &&
                              profileConfigurations?.company?.website
                                ?.readOnly &&
                              accountProfile.social.website && (
                                <EditItem
                                  label="Website (including http:// or https://)"
                                  name={accountProfile.social.website}
                                  className={
                                    accountProfileStyles.websiteReadOnly
                                  }
                                />
                              )}
                          </div>
                        </div>
                      )}
                      {!isHiddenReducer(profileConfigurations?.location) && (
                        <div>
                          <div>
                            <h3 className={accountProfileStyles.innerSubHeader}>
                              Location
                            </h3>
                          </div>
                          <div
                            className={`${accountProfileStyles.locationGrid}`}
                          >
                            {!profileConfigurations?.location?.city?.hide &&
                              !profileConfigurations?.location?.city
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="City"
                                    name="city"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload?.address?.city(
                                    <Error>
                                      {errorPayload?.address?.city?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.location?.city?.hide &&
                              profileConfigurations?.location?.city?.readOnly &&
                              accountProfile.address?.city && (
                                <EditItem
                                  label="City"
                                  name={accountProfile.address.city}
                                />
                              )}
                            {!profileConfigurations?.location?.state?.hide &&
                              !profileConfigurations?.location?.state
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="State"
                                    name="state"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload?.address?.state(
                                    <Error>
                                      {errorPayload?.address?.state?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.location?.state?.hide &&
                              profileConfigurations?.location?.state
                                ?.readOnly &&
                              accountProfile.address?.state && (
                                <EditItem
                                  label="State"
                                  name={accountProfile.address.state}
                                />
                              )}
                            {!profileConfigurations?.location?.region?.hide &&
                              !profileConfigurations?.location?.region
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Region"
                                    name="region"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload && errorPayload?.region && (
                                    <Error>
                                      {errorPayload?.region?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.location?.region?.hide &&
                              profileConfigurations?.location?.region
                                ?.readOnly &&
                              accountProfile.region && (
                                <EditItem
                                  label="Region"
                                  name={accountProfile.region}
                                />
                              )}
                            {!profileConfigurations?.location?.country?.hide &&
                              !profileConfigurations?.location?.country
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Country"
                                    name="country"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload?.address?.country(
                                    <Error>
                                      {errorPayload?.address?.country?.message}
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.location?.country?.hide &&
                              profileConfigurations?.location?.country
                                ?.readOnly &&
                              accountProfile.address?.country && (
                                <EditItem
                                  label="Country"
                                  name={accountProfile.address.country}
                                />
                              )}
                            {!profileConfigurations?.location?.postalCode
                              ?.hide &&
                              !profileConfigurations?.location?.postalCode
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Postal Code"
                                    name="postalCode"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload?.address?.postalCode(
                                    <Error>
                                      {
                                        errorPayload?.address?.postalCode
                                          ?.message
                                      }
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.location?.postalCode
                              ?.hide &&
                              profileConfigurations?.location?.postalCode
                                ?.readOnly &&
                              accountProfile.address?.postalCode && (
                                <EditItem
                                  label="Postal Code"
                                  name={accountProfile.address.postalCode}
                                />
                              )}
                            {!profileConfigurations?.location
                              ?.postalCodePlusFour?.hide &&
                              !profileConfigurations?.location
                                ?.postalCodePlusFour?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Postal Code plus four"
                                    name="postalCodePlusFour"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload?.address?.postalCodePlusFour(
                                    <Error>
                                      {
                                        errorPayload?.address
                                          ?.postalCodePlusFour?.message
                                      }
                                    </Error>
                                  )}
                                </div>
                              )}
                            {!profileConfigurations?.location?.country?.hide &&
                              profileConfigurations?.location
                                ?.postalCodePlusFour?.readOnly &&
                              accountProfile.address?.postalCodePlusFour && (
                                <EditItem
                                  label="Postal Code plus four"
                                  name={
                                    accountProfile.address.postalCodePlusFour
                                  }
                                />
                              )}
                          </div>
                        </div>
                      )}
                      {!isHiddenReducer(profileConfigurations?.social) && (
                        <div>
                          <div>
                            <h3 className={accountProfileStyles.innerSubHeader}>
                              Social
                            </h3>
                          </div>
                          <div className={`${accountProfileStyles.socialGrid}`}>
                            {!profileConfigurations?.social?.facebook?.hide &&
                              !profileConfigurations?.social?.facebook
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Facebook"
                                    name="facebook"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload &&
                                    errorPayload["social.facebook"] && (
                                      <Error>
                                        {
                                          errorPayload["social.facebook"]
                                            ?.message
                                        }
                                      </Error>
                                    )}
                                </div>
                              )}
                            {!profileConfigurations?.social?.facebook?.hide &&
                              profileConfigurations?.social?.facebook
                                ?.readOnly &&
                              accountProfile.social.facebook && (
                                <EditItem
                                  label="Facebook"
                                  name={accountProfile.facebook}
                                />
                              )}
                            {!profileConfigurations?.social?.instagram?.hide &&
                              !profileConfigurations?.social?.instagram
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Instagram"
                                    name="instagram"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload &&
                                    errorPayload["social.instagram"] && (
                                      <Error>
                                        {
                                          errorPayload["social.instagram"]
                                            ?.message
                                        }
                                      </Error>
                                    )}
                                </div>
                              )}
                            {!profileConfigurations?.social?.instagram?.hide &&
                              profileConfigurations?.social?.instagram
                                ?.readOnly &&
                              accountProfile.social.instagram && (
                                <EditItem
                                  label="Instagram"
                                  name={accountProfile.instagram}
                                />
                              )}
                            {!profileConfigurations?.social?.linkedin?.hide &&
                              !profileConfigurations?.social?.linkedin
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="LinkedIn"
                                    name="linkedin"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload &&
                                    errorPayload["social.linkedin"] && (
                                      <Error>
                                        {
                                          errorPayload["social.linkedin"]
                                            .message
                                        }
                                      </Error>
                                    )}
                                </div>
                              )}
                            {!profileConfigurations?.social?.linkedin?.hide &&
                              profileConfigurations?.social?.linkedin
                                ?.readOnly &&
                              accountProfile.linkedin && (
                                <EditItem
                                  label="LinkedIn"
                                  name={accountProfile.linkedin}
                                />
                              )}
                            {!profileConfigurations?.social?.twitter?.hide &&
                              !profileConfigurations?.social?.twitter
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Twitter"
                                    name="twitter"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload &&
                                    errorPayload["social.twitter"] && (
                                      <Error>
                                        {
                                          errorPayload["social.twitter"]
                                            ?.message
                                        }
                                      </Error>
                                    )}
                                </div>
                              )}
                            {!profileConfigurations?.social?.twitter?.hide &&
                              profileConfigurations?.social?.twitter
                                ?.readOnly &&
                              accountProfile.twitter && (
                                <EditItem
                                  label="Twitter"
                                  name={accountProfile.twitter}
                                />
                              )}
                            {!profileConfigurations?.social?.snapchat?.hide &&
                              !profileConfigurations?.social?.snapchat
                                ?.readOnly && (
                                <div className={`${accountProfileStyles.mb3}`}>
                                  <Field
                                    label="Snapchat"
                                    name="snapchat"
                                    placeholder=" "
                                    component={ValidatedInput}
                                  />
                                  {errorPayload &&
                                    errorPayload["social.snapchat"] && (
                                      <Error>
                                        {
                                          errorPayload["social.snapchat"]
                                            ?.message
                                        }
                                      </Error>
                                    )}
                                </div>
                              )}
                            {!profileConfigurations?.social?.snapchat?.hide &&
                              profileConfigurations?.social?.snapchat
                                ?.readOnly &&
                              accountProfile.snapchat && (
                                <EditItem
                                  label="Snapchat"
                                  name={accountProfile.snapchat}
                                />
                              )}
                          </div>
                        </div>
                      )}
                      {!profileConfigurations?.attributes.reduce(
                        (acc, obj) => acc && obj.hide,
                        true
                      ) && (
                        <div>
                          <div>
                            <h3 className={accountProfileStyles.innerSubHeader}>
                              Custom Profile
                            </h3>
                          </div>
                          <div>
                            {profileConfigurations?.attributes.map(
                              (attribute, index) =>
                                !attribute.hide &&
                                getAttribute(attribute.attr) && (
                                  <div key={index}>
                                    <EditItem
                                      label={attribute.label}
                                      name={getAttribute(attribute.attr)}
                                      className={
                                        accountProfileStyles.customProfile
                                      }
                                    />
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </fieldset>
              <FormButtons cancelCallback={resetForm} />
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};

export default AccountProfile;

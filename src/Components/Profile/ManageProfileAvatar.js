import React, { useEffect, useState } from "react";

import { CloudinaryContext } from "cloudinary-react";
import ErrorModal from "Components/Modal/ErrorModal";
import OEPAnalytics from "Components/OEPAnalytics";
import ProfileAvatar from "./ProfileAvatar";
import accountProfileStyles from "./scss/account-profile.module.scss";
import axios from "axios";
import getAnalyticsPage from "util/getAnalyticsPage";
import { saveAnalytic } from "Components/OEPAnalytics";
import useAccountProfile from "hooks/useAccountProfile";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

//there is also cloudinary side validation of file formats tied to the upload preset
const ALLOWED_FILE_FORMATS = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png"];

const ManageProfileAvatar = ({ hideControl }) => {
  const location = useLocation();
  const { accountProfile, patch, startLoader } = useAccountProfile();
  const [showErrorModal, setShowErrorModal] = useState(false);

  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const eventName = useSelector((state) => state.global.siteConfig);

  const handleEditPhoto = () => {
    saveAnalytic({
      page: "Profile",
      componentType: "Button",
      componentName: "Edit photo",
    });

    let uploadWidget;
    const uploadOptions = {
      //there is also cloudinary side validation of file formats tied to the upload preset
      clientAllowedFormats: ALLOWED_FILE_FORMATS,
      publicId: `${user.fuzion_attendee_id}`,
      folder: `avatar/${eventName.eventInfo.name}`,
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      uploadSignature: (callback, params_to_sign) => {
        saveAnalytic({
          page: "Profile",
          componentType: "Button",
          componentName: "Upload options",
        });

        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/cloudinary/sign`,
            params_to_sign
          )
          .then((res) => {
            callback(res.data);
          })
          .catch((e) => {
            uploadWidget.destroy();
            setShowErrorModal(true);
          });
      },
      styles: {
        palette: {
          tabIcon: "#0066b2",
          link: "#0066b2",
          action: "#10b0e6",
          inProgress: "#0066b2",
        },
        fonts: {
          default: {
            active: true,
          },
        },
      },
      sources: ["local", "camera"],
      multiple: false,
      maxFiles: 1,
      cropping: true,
      croppingAspectRatio: 1,
      croppingDefaultSelectionRatio: 0.75,
      croppingCoordinatesMode: "custom",
    };
    const upload = true;
    if (upload) {
      uploadWidget = window.cloudinary.createUploadWidget(
        uploadOptions,
        (error, result) => {
          if (result && result.event === "success") {
            // This will avoid stacking dispatchers.
            startLoader();

            patch({
              avatar: result.info.path,
            });

            saveAnalytic({
              page: "Profile",
              componentType: "Button",
            });
          }
          if (error) {
            saveAnalytic({
              page: "Profile",
              componentType: "Button",
            });
          }
        }
      );
      uploadWidget.open();
    }
  };

  const handleDeletePhoto = () => {
    saveAnalytic({
      page: "Profile",
      componentType: "Button",
      componentName: "Delete photo",
    });

    const deleteOptions = {
      publicId: `${user.fuzion_attendee_id}`,
      folder: `avatar/${eventName.eventInfo.name}`,
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    };
    const deleteSignature = (params_to_sign) => {
      saveAnalytic({
        page: "Profile",
        componentType: "Button",
        componentName: "Delete options",
      });

      axios
        .post(
          `${process.env.REACT_APP_API_HOST}/cloudinary/destroy`,
          params_to_sign
        )
        .then((res) => {
          patch({
            avatar: "",
          });
        })
        .catch((e) => {
          setShowErrorModal(true);
        });
    };
    deleteSignature(deleteOptions);
  };

  useEffect(() => {
    if (!window.cloudinary) {
      //Attach Script to head tag
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.id = "addCloudinary";
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    return () => {
      //Remove Script from head tag
      const elem = document.getElementById("addCloudinary");
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    };
  }, []);

  return (
    <CloudinaryContext
      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      uploadPreset={process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}
    >
      <ProfileAvatar
        url={accountProfile.avatar}
        firstName={accountProfile.firstName}
        preferredName={accountProfile.preferredName}
        lastName={accountProfile.lastName}
        size={162}
      />
      <div
        className={accountProfileStyles.editPhotoButtonWrapper}
        style={{ display: "block", textAlign: "center" }}
      >
        {hideControl ? null : (
          <>
            <OEPAnalytics
              page={getAnalyticsPage(location.pathname)}
              componentType="button"
              url="upload"
              componentName={
                !accountProfile.avatar || accountProfile.avatar === ""
                  ? "Upload Photo"
                  : "Upload New Photo"
              }
            >
              <button
                aria-hidden={true}
                type="button"
                className={`${accountProfileStyles.editPhotoButton}`}
                onClick={handleEditPhoto}
              >
                {!accountProfile.avatar || accountProfile.avatar === ""
                  ? "Upload Photo"
                  : "Upload New Photo"}
              </button>
            </OEPAnalytics>
            {accountProfile.avatar !== "" && (
              <button
                aria-hidden={true}
                type="button"
                className={`${accountProfileStyles.editPhotoButton}`}
                onClick={handleDeletePhoto}
              >
                Delete Photo
              </button>
            )}
          </>
        )}
      </div>
      <ErrorModal
        isActive={showErrorModal}
        onCloseErrorModal={() => setShowErrorModal(false)}
      />
    </CloudinaryContext>
  );
};

export default ManageProfileAvatar;

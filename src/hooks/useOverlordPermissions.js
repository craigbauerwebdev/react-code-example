import { getPayload, setPermissions } from "store/actions";
import { useDispatch, useSelector } from "react-redux";

import { dataTypes } from "store/utils/dataTypes";
import { useEffect } from "react";

const useOverlordPermissions = () => {
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const user = useSelector((state) => state.global.user);
  const { networking } =
    useSelector((state) => state.profile.accountProfile) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!networkSettings) {
      // Get Network settings
      dispatch(getPayload(dataTypes.networkSettings));
      // Get Event Profile Permissions
      dispatch(getPayload(dataTypes.profileConfigurations));
    }
  }, [user, networkSettings, dispatch]);

  useEffect(() => {
    if (networkSettings && networking) {
      // Set user permissions
      networkSettings.boothStaff = networking.boothStaff;
      networkSettings.allowChat = networking.allowChat;
      networkSettings.exhibitorAdmin = networking.exhibitorAdmin;
      networkSettings.allowNetworking = networking.allowNetworking;
      networkSettings.allowUserNetworking = networking.allowUserNetworking;
      // Do we need these additional networking values?
      // isVIP
      // networkingAdmin;
      dispatch(
        setPermissions({
          globalSettings: networkSettings,
        })
      );
    }
  }, [networkSettings, networking, dispatch]);
};

export default useOverlordPermissions;

import React from "react";
import { useSelector } from "react-redux";
import { getResponseMessage } from "../../services/Auth";
import GeneralMessage from "./GeneralMessage";

const LifeRayAuthMessage = () => {
  const authMeta = useSelector((state) => state.global.auth);
  const loginData = useSelector((state) => state.global.login);

  const fallbackMsg = getResponseMessage(
    authMeta.response_type,
    (loginData && loginData.messages) || []
  );

  const msg = authMeta.message || fallbackMsg;

  return msg && <GeneralMessage generalMessage={msg} />;
};

export default LifeRayAuthMessage;

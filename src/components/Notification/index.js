import React from "react";
import { Alert } from "antd";
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <Alert message={message} className="error" />;
};

export default Notification;

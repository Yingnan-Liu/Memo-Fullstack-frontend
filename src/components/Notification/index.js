import React from "react";
import { Alert } from "antd";
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <Alert message={message} banner className="error" />;
};

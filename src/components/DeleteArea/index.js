import React from "react";
import styles from "./index.module.scss";
import { DeleteOutlined } from "@ant-design/icons";
const DeleteArea = () => {
  return (
    <div className={styles.DeleteContainer}>
      <DeleteOutlined className={styles.deleteIcon} />
    </div>
  );
};

export default DeleteArea;

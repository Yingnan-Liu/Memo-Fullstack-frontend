import React from "react";
import { Card, Button, Row, Col } from "antd";

import styles from "./index.module.scss";
import { CloseSquareFilled } from "@ant-design/icons";
const Note = ({ note, toggleImportance, handleDeleteNote }) => {
  const importance = note.important;
  // console.log(label);

  return (
    <Card className={styles.noteCard} type="inner" hoverable="true">
      <Row justify="space-between" align="middle">
        <span>{note.content}</span>
        <Button className={styles.noteImportanceBtn} onClick={toggleImportance}>
          {importance ? "important" : "not important"}
        </Button>
        <CloseSquareFilled
          className={styles.deleteIcon}
          onClick={handleDeleteNote}
        />
      </Row>
    </Card>
  );
};

export default Note;

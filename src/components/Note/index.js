import React from "react";
import { Card, Button, Row } from "antd";
import styles from "./index.module.scss";
const Note = ({ note, toggleImportance }) => {
  const label = note.important;
  console.log(label);
  return (
    <Card className={styles.noteCard} type="inner" hoverable="true">
      <Row justify="space-between" align="middle">
        <span>{note.content}</span>
        <Button className={styles.noteImportanceBtn} onClick={toggleImportance}>
          {label ? "important" : "not important"}
        </Button>
      </Row>
    </Card>
  );
};

export default Note;

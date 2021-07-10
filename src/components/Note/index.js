import React from "react";
import { Card, Button, Row } from "antd";

const Note = ({ note, toggleImportance }) => {
  const label = note.important;
  console.log(label);
  return (
    <Card type="inner" hoverable="true">
      <Row justify="space-between" align="middle">
        <p>{note.content}</p>
        <Button onClick={toggleImportance}>
          {label ? "important" : "not important"}
        </Button>
      </Row>
    </Card>
  );
};

export default Note;

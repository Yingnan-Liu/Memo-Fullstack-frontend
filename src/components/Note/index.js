import React from "react";
import { Card, Button, Row } from "antd";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.scss";
import { CloseSquareFilled } from "@ant-design/icons";

const Note = ({ note, index, toggleImportance, handleDeleteNote }) => {
  const importance = note.important;
  // console.log(label);

  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided) => (
        <div
          style={styles.noteContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className={styles.noteCard} type="inner" hoverable="true">
            <Row justify="space-between" align="middle">
              <span>{note.content}</span>
              <Button
                className={styles.noteImportanceBtn}
                onClick={toggleImportance}
              >
                {importance ? "important" : "not important"}
              </Button>
              <CloseSquareFilled
                className={styles.deleteIcon}
                onClick={handleDeleteNote}
              />
            </Row>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Note;

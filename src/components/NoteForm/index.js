import React from "react";
import { useState } from "react";
import { Row, Button, Col, Input } from "antd";
import styles from "./index.module.css";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");
  // input值更新到NewNote中
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const addNote = () => {
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    });
    setNewNote("");
  };
  return (
    <div className={styles.addNoteArea}>
      <Row justify="space-between">
        <Col span={19}>
          <Input value={newNote} onChange={handleNoteChange} />
        </Col>
        <Col>
          <Button onClick={addNote}>confirm</Button>
        </Col>
      </Row>
    </div>
  );
};

export default NoteForm;

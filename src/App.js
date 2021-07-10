import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Input } from "antd";
import Note from "./components/Note";
import Notification from "rc-notification/lib/Notification";
import noteService from "./services/notes";
import styles from "./App.module.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  // 过滤重要的
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      console.log("promise fullfilled");
      console.log(initialNotes);
      setNotes(initialNotes);
    });
  }, []);

  //点击按钮改变重要性 id-->note-->http put替换掉该note
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    //note副本
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = () => {
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    // 发送一个js对象
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      // input置空
      setNewNote("");
    });
  };
  // input值更新到NewNote中
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  // console.log(notesToShow);

  return (
    <div className={styles.appWrapper}>
      <Notification message={errorMessage} />
      <Card
        className={styles.card}
        title="Notes"
        style={{ width: "60vw" }}
        extra={
          <Button onClick={() => setShowAll(!showAll)}>
            <span>show {showAll ? "important" : "all"}</span>
          </Button>
        }
      >
        {notesToShow.map((note, i) => (
          <Note
            toggleImportance={() => toggleImportanceOf(note.id)}
            key={note.id}
            note={note}
          />
        ))}

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
      </Card>
    </div>
  );
}

export default App;

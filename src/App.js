import React, { useState, useEffect, useRef } from "react";
import { Button, Card } from "antd";
import Note from "./components/Note";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";
import Notification from "rc-notification/lib/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";
import styles from "./App.module.css";

function App() {
  const [notes, setNotes] = useState([]);
  // 过滤重要的
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  //user是否有值来判断是否登录
  const [user, setUser] = useState(null);

  //为noteForm外层的Togglable添加ref
  const noteFormRef = useRef();

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

  const createNote = (noteObject) => {
    // 发送一个js对象
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      console.log("returnedNote：", returnedNote);
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  // console.log(notesToShow);

  const handleLoginSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={createNote} />
    </Togglable>
  );

  return (
    <div className={styles.appWrapper}>
      <Notification message={errorMessage} />

      {/* {user === null && <LoginForm handleSubmit={handleLoginSubmit} />} */}
      <Togglable buttonLabel="Login">
        <LoginForm handleSubmit={handleLoginSubmit} />
      </Togglable>
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
        {user !== null && noteForm()}
      </Card>
    </div>
  );
}

export default App;

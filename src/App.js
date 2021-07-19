import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Layout } from "antd";
import Note from "./components/Note";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";
import styles from "./App.module.scss";

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
  // 检查是否登陆过
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      noteService.setToken(user.token);
    }
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
  const deleteNote = (id) => {
    //const noteIndex = notes.find((n) => n.id === id);
    noteService
      .deleteNote(id)
      .then((response) => {
        console.log("app.js:", response);
        setNotes(notes.filter((n) => n.id !== id));
      })
      .catch((error) => {
        setErrorMessage(`Note was already deleted from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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

  // 登录
  const handleLoginSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);
    try {
      //后端返回三个数据：.send({ token, username: user.username, name: user.name }
      const user = await loginService.login({
        username,
        password,
      });
      // console.log("login return data:", user);
      noteService.setToken(user.token);
      // 本地存储token
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials!");
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
      {errorMessage && <Notification message={errorMessage} />}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Welcome! {user ? user.name : "New user"}
        </h2>
      </div>
      {/* {user === null && <LoginForm handleSubmit={handleLoginSubmit} />} */}
      <div className={styles.body}>
        {!user && (
          <aside className={styles.sider}>
            <LoginForm handleSubmit={handleLoginSubmit} />
          </aside>
        )}

        <main className={styles.content}>
          <Card
            className={styles.card}
            title="Notes"
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
                handleDeleteNote={() => deleteNote(note.id)}
              />
            ))}
            {user !== null && noteForm()}
          </Card>
        </main>
      </div>
    </div>
  );
}

export default App;

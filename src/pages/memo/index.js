import React from 'react';
import { useState, useRef } from "react";
import { Alert, Button, Card, } from "antd";
import Note from "../../components/Note";
import NoteForm from "../../components/NoteForm";
import Togglable from "../../components/Togglable";
import noteService from '../../services/notes'

const Index=()=> {
      // 过滤重要的
  const [showAll, setShowAll] = useState(true);
  const [notes,setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
    //为noteForm外层的Togglable添加ref
  const noteFormRef = useRef();

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
      // 登录
      
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
    
      
  return (
    <div>
         { errorMessage && <Alert message={errorMessage} /> }
        <Card
            // className={styles.card}
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
            <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={createNote} />
            </Togglable>
        </Card>
    </div> 
  )
}
export default Index
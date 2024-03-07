import noteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props) =>{
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)
  const host = "https://backendiinkd.onrender.com"
      // {
      //   "authToken": localStorage.getItem("token")
      // }
    const getNotes = async() =>  {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });
      const json = await response.json();
      // console.log(json)
      setnotes(json);
    }

    const addNote = async(title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag})
      });
      // console.log("Adding a new note");
      const note = await response.json();
      setnotes(notes.concat(note));
    }

    const deleteNote = async(id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });
      const deletion = await response.json();
      console.log(deletion);
      const newNote = notes.filter((dnote)=> {
        return dnote._id !== id
      })
      setnotes(newNote);
    }
    
    const editNote = async(noteObj, id) => {
      // console.log(noteObj,id)
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title:noteObj.title,
          description:noteObj.description,
          tag:noteObj.tag})
      });
      const Updation = await response.json();
      console.log(Updation);
    }


    return (
        <noteContext.Provider value={{notes, setnotes, addNote, deleteNote, getNotes, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
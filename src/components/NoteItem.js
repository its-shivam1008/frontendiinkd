import React, {useContext, useState, useEffect} from 'react';
import noteContext from '../context/noteContext';
import { useNavigate } from 'react-router-dom';
// import EditNote from './EditNote';


const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { notes, setnotes, deleteNote, getNotes, editNote } = context;
  const [read, setRead] = useState("Read");
  const [clicked, setClicked] = useState(false);
  const [hold, sethold] = useState(0);
  // const [Notes, setNotes] = useState({e_id:" ", etag: " ", edescription: " ", etitle: " "});
  const [eid, seteid] = useState(" ");
  const [editedTitle, setEditedetitle] = useState(" ");
  const [editedDesc, setEditededescription] = useState(" ");
  const [editedTag, setEditedetag] = useState(" ");

  let History = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      props.setProgress(10);
      getNotes();
      props.setProgress(100);
    }else{
      props.setProgress(50);
      History("/login");
      props.setProgress(100);
    }
  }, [])
  
  

  const readme = (noteId) =>{
    props.setProgress(30);
    setClicked(true);
    const allNotes = document.getElementById("allNotes");
    allNotes.className = "hidden";
    setRead(noteId);
    const readNotes = document.getElementById("readNotes");
    readNotes.className = " ";
    props.setProgress(100);
  }

  const allnotes = () =>{
    props.setProgress(40);
    setClicked(false);
    const allNotes = document.getElementById("allNotes");
    allNotes.className = "grid md:grid-cols-3 gap-10 md:gap-0";
    const readNotes = document.getElementById("readNotes");
    readNotes.className = "hidden";
    const EditNotes = document.getElementById("EditNotes");
    if(EditNotes.className==="Editing"){
      EditNotes.className ="hidden";
    }
    getNotes();
    props.setProgress(100);
  }

  const handleDelete = (id) =>{
    props.setProgress(75);
    deleteNote(id);
    props.showAlert(true, "Note Deleted", "red-300", "red-600");
    allnotes();
    props.setProgress(100);
  }

  const handleEdit = (noteId, holder, note) =>{
    props.setProgress(10);
    const allNotes = document.getElementById("allNotes");
    allNotes.className = "hidden";
    setRead(noteId);
    const EditNotes = document.getElementById("EditNotes");
    EditNotes.className = "Editing";
    if(clicked){
      const readNotes = document.getElementById("readNotes");
      readNotes.className = "hidden";
    }
    sethold(holder);
    // setNotes({e_id:note._id, etag: note.tag, edescription: note.description, etitle: note.title});
    setEditedetitle(note.title);
    setEditededescription(note.description);
    setEditedetag(note.tag);
    seteid(noteId);
    props.setProgress(100);
  }

  const handleChangeTitle = (event) => {
    setEditedetitle(event.target.value);
  }
  const handleChangeDesc = (event) => {
    setEditededescription(event.target.value);
  }
  const handleChangeTag = (event) => {
    setEditedetag(event.target.value);
  }

  const saveChanges = (id) =>{
    props.setProgress(10);
    // const title = document.getElementsByName("etitle").value;
    // const description = document.getElementsByName("edescripton").value;
    // const tag = document.getElementsByName("etag").value;
    const note = {
      title: editedTitle,
      description: editedDesc,
      tag: editedTag
    }
    props.setProgress(50);
    // console.log(Notes)
    // console.log(note,id)
    editNote(note,id);
    props.showAlert(true, "Changes Saved", "green-300", "green-600");
    props.setProgress(100);
  }
  return (
     <div >
      <div id="EditNotes" className="hidden">
            <div >
              <div className=' p-8 space-y-10 my-5 mx-1 rounded-[12px] bg-opacity-20 bg-white shadow-xl backdrop-blur-3xl'>
                <div className='text-3xl text-center'>
                  <h3 className='text-2xl'>Title :</h3>
                  <input value={editedTitle} onChange={handleChangeTitle} minLength={5} required className='md:w-[35vw] w-[40vw] rounded-md  outline-none p-2 border-blue-400 border-4 h-[40px]' type="text" placeholder='Add title' name="etitle" id="titleBox" />
                </div>
                <div className='text-lg text-center'>
                  <h3 className='text-2xl'>Description :</h3>
                  <textarea value={editedDesc} onChange={handleChangeDesc} minLength={5} required id="BodyBox" className='rounded-md outline-none p-2 border-blue-400 border-4 w-[100%] md:w-[40vw] h-[20vh]' name="edescription" placeholder='Add your description here'></textarea>
                </div>
                <div className='flex justify-between space-x-2 items-center'>
                  <h3 className='text-2xl'>Tag :</h3>
                  <input value={editedTag} onChange={handleChangeTag} className='md:w-[35vw] w-[40vw] h-[40px] rounded-md  outline-none p-2 border-blue-400 border-4' type="text" name="etag" placeholder='Add tag (optional)' id="tagBox" />
                </div>
                <div className='-ml-2 space-x-4 flex'>
                  <button onClick={()=>{saveChanges(eid)}} className='text-white border-2 border-green-400 bg-green-400 rounded-md px-2 py-1 font-bold tracking-wider shadow-md hover:shadow-xl shadow-green-400 hover:shadow-green-400 transition-all hover:text-green-400 hover:bg-white hover:border-2 hover:border-green-400 hover:cursor-pointer duration-500'>Save Changes</button>
                </div>
              </div>
              <button disabled={editedTitle.length<5 || editedDesc.length<5} onClick={allnotes} className='text-white ml-2 border-2 border-cyan-500 bg-cyan-500 rounded-md px-2 py-1 font-bold shadow-md hover:shadow-lg shadow-cyan-500 hover:shadow-cyan-500 transition-all hover:text-cyan-500 hover:bg-white hover:border-2 hover:border-cyan-500 hover:cursor-pointer duration-500'>See all notes</button>
            </div>
          {/* }
        })} */}
      </div>
      {/* <div>
        <EditNote/>
      </div> */}
      <div id="readNotes" className="hidden">
        {notes.map((note, ctr=0) =>{
          if(read===note._id){
            return <div key={ctr}>
              <div className=' p-8 space-y-10 my-5 mx-1 rounded-[12px] bg-opacity-20 bg-white shadow-xl backdrop-blur-3xl'>
                <div className='-ml-2 space-x-4 flex'>
                  <button onClick={() => {handleDelete(note._id)}} className='text-white border-2 border-red-500 bg-red-500 rounded-md px-2 py-1 font-bold tracking-wider shadow-md hover:shadow-xl shadow-red-500 hover:shadow-red-500 transition-all hover:text-red-500 hover:bg-white hover:border-2 hover:border-red-500 hover:cursor-pointer duration-500'>Delete</button>
                  <button onClick={()=>{handleEdit(note._id, ctr, note)}} className='text-white border-2 border-green-400 bg-green-400 rounded-md px-2 py-1 font-bold tracking-wider shadow-md hover:shadow-xl shadow-green-400 hover:shadow-green-400 transition-all hover:text-green-400 hover:bg-white hover:border-2 hover:border-green-400 hover:cursor-pointer duration-500'>Edit</button>
                </div>
                <div className='text-3xl text-center'>{note.title}</div>
                <div className='text-lg text-center'>{note.description}</div>
                <div className='flex justify-between space-x-2 items-center'>
                  <div>Tag: {note.tag}</div>
                  <div  className='font-bold text-cyan-800'>{note.date.slice(0,10)}</div>
                </div>
              </div>
              <button onClick={allnotes} className='text-white ml-2 border-2 border-cyan-500 bg-cyan-500 rounded-md px-2 py-1 font-bold shadow-md hover:shadow-lg shadow-cyan-500 hover:shadow-cyan-500 transition-all hover:text-cyan-500 hover:bg-white hover:border-2 hover:border-cyan-500 hover:cursor-pointer duration-500'>See all notes</button>
            </div>
          }
        })}
      </div>
      <div id="allNotes" className='grid md:grid-cols-3 gap-10 md:gap-0'>
        {notes.length ===0 && <div className='text-2xl font-bold text-white flex justify-center p-8 my-5 mx-1 rounded-[12px] bg-opacity-20 bg-black shadow-xl backdrop-blur-3xl'>Add some notes to display here</div>}
          {notes.map((note,ptr=0) =>{
          return <div key={ptr} className=' p-6 space-y-5 m-5  rounded-[12px] bg-opacity-20 bg-white shadow-xl backdrop-blur-3xl'>
            <div className='space-y-8'>
              <div className='-ml-2 space-x-4 flex'>
                <button onClick={() => {handleDelete(note._id)}} className='text-white border-2 border-red-500 bg-red-500 rounded-md px-2 py-1 font-bold tracking-wider shadow-md hover:shadow-xl shadow-red-500 hover:shadow-red-500 transition-all hover:text-red-500 hover:bg-white hover:border-2 hover:border-red-500 hover:cursor-pointer duration-500'>Delete</button>
                <button onClick={()=>{handleEdit(note._id, ptr,note)}} className='text-white border-2 border-green-400 bg-green-400 rounded-md px-2 py-1 font-bold tracking-wider shadow-md hover:shadow-xl shadow-green-400 hover:shadow-green-400 transition-all hover:text-green-400 hover:bg-white hover:border-2 hover:border-green-400 hover:cursor-pointer duration-500'>Edit</button>
              </div>
              <div className='text-2xl text-center'>{note.title.length>10?note.title.slice(0,10)+"...":note.title}</div>
              <div className='text-center'>{note.description.length>85?note.description.slice(0,85)+"...":note.description}</div>
              <div className='flex justify-between items-center'>
                <div  className='font-bold text-cyan-800'>{note.date.slice(0,10)}</div>
                <button className='text-white border-2 border-cyan-500 bg-cyan-500 rounded-md px-2 py-1 font-bold tracking-wide shadow-md hover:shadow-lg shadow-cyan-500 hover:shadow-cyan-500 transition-all hover:text-cyan-500 hover:bg-white hover:border-2 hover:border-cyan-500 hover:cursor-pointer duration-500' onClick={()=>{readme(note._id)}}>Read me</button>
              </div>
            </div>
          </div>;
        })}</div>
      </div>
  )
}

export default NoteItem
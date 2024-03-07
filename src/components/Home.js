import React, {useContext, useState} from 'react';
// import noteContext from '../context/noteContext';
import alertContext from '../context/alertContext';
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import Footer from './Footer';

const Home = (props) => {
  // const context = useContext(noteContext);
  // const { notes, setNotes } = context;

  const alertCont = useContext(alertContext);
  const {  showAlert } = alertCont;
  const context = useContext(noteContext);
  const { addNote } = context;
  

  const [note, setnote] = useState({title: "", description: "", tag: ""});

  const handleChange = (e) => {
    setnote({...note, [e.target.name]: e.target.value})
  }

  

  const handleClick = (e) => {
    e.preventDefault();
    // props.setProgress(30);
    props.setProgress(80);
    if (note.title.length<5 || note.description.length<5) {
      showAlert(false,"Fields cannot be empty or Title/Description atleast of 5 characters", "red-300", "red-600");
    }else{
      addNote(note.title, note.description, note.tag);
      showAlert(true, "Note Added", "green-300", "green-600");
      setnote({title: "", description: "", tag: ""});
    }
    props.setProgress(100);
  }
  
  return (
    <>
    
    <div className='bg-gradient-to-bl from-pink-500 via-cyan-400 to-yellow-500 w-[100vw] h-fit pb-14  mx-auto space-y-24'>
      <div className='flex py-10 justify-center'>
        <div className='space-y-10 p-8 rounded-[12px] bg-opacity-20 bg-white shadow-2xl backdrop-blur-3xl my-10'>
          <h1 className='my-4 text-5xl text-center '>Add your Note:</h1>
          <div className='flex items-center space-x-5'>
            <h3 className='text-2xl'>Title :</h3>
            <input className='md:w-[35vw] w-[40vw] rounded-md  outline-none
             p-2 border-blue-400 border-4 h-[40px]' type="text" value={note.title} placeholder='Add title' name="title" id="titleBox"  minLength={5} required onChange={handleChange}/>
          </div>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Description :</h3>
            <textarea name="description" id="BodyBox" minLength={5} value={note.description} required className='rounded-md outline-none p-2 border-blue-400 border-4 w-[100%] md:w-[40vw] h-[20vh]' placeholder='Add your description here' onChange={handleChange}></textarea>
          </div>
          <div className='flex items-center space-x-5'>
            <h3 className='text-2xl'>Tag :</h3>
            <input className='md:w-[35vw] w-[40vw] h-[40px] rounded-md  outline-none
             p-2 border-blue-400 border-4' type="text" name="tag" value={note.tag} placeholder='Add tag (optional)' id="tagBox" onChange={handleChange}/>
          </div>
          <button type="submit" onClick={handleClick} className='text-white border-2 border-cyan-500 bg-cyan-500 rounded-md px-2 py-1 font-bold tracking-[2px] shadow-md hover:shadow-xl shadow-cyan-500 hover:shadow-cyan-500 transition-all hover:text-cyan-500 hover:bg-white hover:border-2 hover:border-cyan-500 hover:cursor-pointer duration-500'>Add Note</button>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='space-y-10'>
          <h1 className='my-4 text-5xl text-center'>Saved Notes:</h1>
          <div className='mx-10 my-10'>
            <NoteItem showAlert={showAlert} setProgress={props.setProgress}/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home;
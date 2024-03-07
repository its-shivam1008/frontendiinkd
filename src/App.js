// import logo from './logo.svg';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/NoteState';
import AlertState from './context/AlertState';
import LoadingBar from 'react-top-loading-bar';
import {  useState  } from "react";

function App() {
  const [progress, setProg] = useState(0);
  const setProgress=(progress) =>{
    setProg(progress);
  }
  return (
    <>
    <AlertState>
    <NoteState>
      <BrowserRouter>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<Home setProgress={setProgress}/>} />
          <Route path="/about" element={<About setProgress={setProgress}/>} />
          <Route path="/login" element={<Login setProgress={setProgress}/>} />
          <Route path="/signup" element={<Signup setProgress={setProgress}/>} />
          <Route path="/error404" element={<Error setProgress={setProgress}/>} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
      </NoteState>
    </AlertState>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </>
  );
}

export default App;

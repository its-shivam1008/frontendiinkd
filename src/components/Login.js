import React, {useContext, useState} from 'react';
// import noteContext from '../context/noteContext';
// import landscape from '../img/landscape.svg';
// import portrait from '../img/portrait.svg';
import alertContext from '../context/alertContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {

  const alertCont = useContext(alertContext);
  const {  showAlert } = alertCont;

  let History = useNavigate();

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const host = "https://backendiinkd.onrender.com";

  const changeEmail = (e) =>{
    setEmail(e.target.value)
  }
  const changePass = (e) =>{
    setPass(e.target.value)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    props.setProgress(40);
    const creds = {
      email: email,
      password: pass
    }
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds)
    });
    props.setProgress(80);
    // console.log("Adding a new note");
    const json = await response.json();
    if(json.authToken){
      // console.log(json);
      showAlert(true, "Logged-IN successful", "green-300", "green-600");
      localStorage.setItem('token',json.authToken);
      History('/');  
      props.setProgress(100);
    }else if(json.error === "Please enter correct credentials."){
      showAlert(false, "Check your email or password.", "red-300", "red-600");
      // console.log(json);
      props.setProgress(100);
    }
    else{
      showAlert(false, "Internal server error", "red-300", "red-600");
      // console.log(json);
      props.setProgress(100);
    }
  }

  return (
    <div className='w-full h-[100vh]'>
      <div>

      <img src="./img/landscape.png" className="md:grid hidden h-full w-full absolute" alt="no img" />
      </div>
      <div>
      <img src="./img/portrait.jpg" className="md:hidden  h-[100vh] w-full absolute"/>

      </div>
      <div className='flex relative justify-center items-center h-full'>
          <form onSubmit={handleSubmit} className='p-8 md:mt-24 mt-40 rounded-lg  space-y-12 pb-10 px-10 bg-white w-fit bg-opacity-20 backdrop-blur-sm shadow-2xl'>
            <div className='text-yellow-500 text-center text-5xl font-bold'>
              Login
            </div>
            <div className='space-y-2'>
              <h2>Email :</h2>
              <input onChange={changeEmail} value={email} className='text-white font-bold bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-blue-400 border-4 w-72' placeholder='example@abc.com' type="email" name="emailBox" id="emailbox" required/>
            </div>
            <div className='space-y-2'>
              <h2>Password :</h2>
              <input onChange={changePass} value={pass} className='text-white font-bold bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-blue-400 border-4 w-72' type="password" name="passBox" id="passbox" required />
            </div>
            <div className='text-center'>
              New user ? <Link className='text-white underline hover:cursor-pointer' to='/signup'>Sign-up</Link> to create a new account
            </div>
            <button type="submit" className='text-white border-2 border-cyan-500 bg-cyan-500 rounded-md px-2 py-1 font-bold tracking-[2px] shadow-md hover:shadow-xl shadow-cyan-500 hover:shadow-cyan-500 transition-all hover:text-cyan-500 hover:bg-white hover:border-2 hover:border-cyan-500 hover:cursor-pointer duration-500'>Login</button>
          </form>
        </div>
    </div>
  )
}

export default Login
import React, {useContext, useState} from 'react';
import alertContext from '../context/alertContext';
import { useNavigate, Link } from 'react-router-dom';
// import landscape from '../img/landscape.svg';
// import portrait from '../img/portrait.svg';

const Signup = (props) => {
  
  const alertCont = useContext(alertContext);
  const {  showAlert } = alertCont;

  let History = useNavigate();

  const [Credentials, setCredentials] = useState({name:" ", email:" ", password:"", Cpassword:""});
  const [cpass, setCpass] = useState("");
  const [mssg, setMssg] = useState("Password matched.")
  const host = "https://backendiinkd.onrender.com";

  const pass = document.getElementById('passbox');
  const Cpass = document.getElementById('Cpassbox');
  const Mssg = document.getElementById('Mssg');

  const handleCpass = (e) => {
    setCpass(e.target.value);
    if (pass.value === Cpass.value) {
      pass.className = "bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-green-500 border-4 w-72";
      Cpass.className = "bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-green-500 border-4 w-72";
      Mssg.className = "text-green-500 font-bold";
      setMssg("Password matched.");
    }else{
      setMssg("Password doesn't matched.");
      pass.className = "bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-red-500 border-4 w-72";
      Cpass.className = "bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-red-500 border-4 w-72";
      Mssg.className = "text-red-500 font-bold";
    }
  }


  const handleChange = (e) => {
    setCredentials({...Credentials, [e.target.name]: e.target.value});
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(pass.value === Cpass.value){
      props.setProgress(20);
      const creds = {
        name: Credentials.name,
        email: Credentials.email,
        password: cpass
      }
      // console.log(creds);
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds)
      });
      console.log("Creating a new user");
      props.setProgress(30);
      const json = await response.json();
      if(json.authToken){
        // console.log(json);
        props.setProgress(80);
        showAlert(true, "Sign-Up successful", "green-300", "green-600");
        localStorage.setItem('token',json.authToken);
        History('/');  
        props.setProgress(100);
      }else if(json.error === "Sorry a user with this email already exits."){
        showAlert(false, "User with this email already exist, try to login with it.", "red-300", "red-600");
        // console.log(json);
        props.setProgress(100);
      }else{
        showAlert(false, "Internal server error.", "red-300", "red-600");
        // console.log(json);
        props.setProgress(100);
      }
    }else{
      showAlert(false, "Password does'nt matched", "red-300", "red-600");
      props.setProgress(100);
    }
  }
  return (
    <div className='w-full h-[100vh]'>
        <img src="./img/landscape.png" className="md:grid hidden h-full w-full absolute" alt="logo" />
        <img src="./img/portrait.jpg" className="md:hidden  h-[100vh] w-full absolute" alt="logo" />
      <div className='flex relative justify-center items-center h-full'>
          <form className='px-8 mt-40 md:mt-24  pt-0 rounded-lg  space-y-5 pb-10 bg-white w-fit bg-opacity-20 backdrop-blur-md shadow-2xl' onSubmit={handleSubmit}>
            <div className='text-yellow-500 text-center text-5xl font-bold'>
              Sign-up
            </div>
            <div className='space-y-2'>
              <h2>Name :</h2>
              <input onChange={handleChange} value={Credentials.name} className='text-white font-bold bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-blue-400 border-4 w-72' placeholder='Jason' type="text" name="name" id="namebox" required minLength={3}/>
            </div>
            <div className='space-y-2'>
              <h2>Email :</h2>
              <input onChange={handleChange} value={Credentials.email} className='text-white font-bold bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-blue-400 border-4 w-72' placeholder='example@abc.com' type="email" name="email" id="emailbox" required/>
            </div>
            <div className='space-y-1'>
              <div>
                <h2>Password :</h2>
                <input onChange={handleChange} value={Credentials.password} className='text-white font-bold bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-blue-400 border-4 w-72' type="password" name="password" id="passbox" required minLength={6}/>
              </div>
              <div>
                <h2>Confirm password :</h2>
                <input onChange={handleCpass} value={cpass} className='text-white font-bold bg-opacity-20 bg-black backdrop-blur-sm rounded-md outline-none p-2 border-blue-400 border-4 w-72' type="password" name="Cpassword" id="Cpassbox" required minLength={6}/>
                <div id='Mssg' className='hidden'>{mssg}</div>
              </div>
            </div>
              <div className='text-center'>
              Already have an account ? <Link className='text-white underline hover:cursor-pointer' to='/login'> Login</Link>
            </div>
            <button type="submit" className='text-white border-2 border-cyan-500 bg-cyan-500 rounded-md px-2 py-1 font-bold tracking-[2px] shadow-md hover:shadow-xl shadow-cyan-500 hover:shadow-cyan-500 transition-all hover:text-cyan-500 hover:bg-white hover:border-2 hover:border-cyan-500 hover:cursor-pointer duration-500'>Sign-up</button>
          </form>
        </div>
        <div className='hidden border-green-500 text-green-500  font-bold'>
          <div className='hidden border-red-600 text-red-500'>

          </div>
        </div>
    </div>
  )
}

export default Signup
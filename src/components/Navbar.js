import React, {useContext, useEffect} from 'react';
import alertContext from '../context/alertContext';
import {Link, useLocation, useNavigate} from "react-router-dom";
import Alert from './Alert';

const Navbar = () => {
  let location = useLocation();
  let History = useNavigate();
  const alertCont = useContext(alertContext);
  const {  showAlert } = alertCont;
  const handleLogout = () => {
    localStorage.removeItem('token');
    History('/login');
    showAlert(true, "Logged-OUT successful", "green-300", "green-600");
  }
  useEffect(()=>{
    // console.log(location)
  },[location]);
  
  return (
    <div className='flex-col fixed top-0 right-0 left-0 z-[1030] py-2'>
      <header className="flex justify-center bg-white bg-opacity-20 backdrop-blur-sm shadow-xl -mt-2 py-2">
          <nav className='flex justify-between items-center w-[90vw]'>
              <div className='flex items-center md:space-x-10 space-x-3'>
              <div className="logoname text-2xl flex items-center space-x-2 text-cyan-900 font-bold cursor-pointer">Ink’d</div>
                <Link className={`text-black ${location.pathname==="/"? "font-semibold text-yellow-300 transition-colors duration-500": ""}`} to="/">Home</Link>
                <Link className={`text-black ${location.pathname==="/about"? "font-semibold text-yellow-300 transition-colors duration-500": ""}`} to="/about">About</Link>
              </div>
              <ul className='flex space-x-5'>
                  {!localStorage.getItem('token')?<li className='m-2 space-x-3'><Link className='text-white border-2 border-yellow-500 bg-yellow-500 rounded-md px-2 py-1 font-bold tracking-[2px] shadow-md hover:shadow-sm shadow-yellow-500 hover:shadow-yellow-500 transition-all hover:text-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 hover:cursor-pointer duration-500' to='/login' role='button'>Login</Link><Link className='text-white border-2 border-yellow-500 bg-yellow-500 rounded-md px-2 py-1 font-bold tracking-[2px] shadow-md hover:shadow-sm shadow-yellow-500 hover:shadow-yellow-500 transition-all hover:text-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 hover:cursor-pointer duration-500' to='/signup' role='button'>SignUp</Link></li>:<li><button className='text-white border-2 border-yellow-500 bg-yellow-500 rounded-md px-2 py-1 font-bold tracking-[2px] shadow-md hover:shadow-sm shadow-yellow-500 hover:shadow-yellow-500 transition-all hover:text-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 hover:cursor-pointer duration-500' onClick={handleLogout}>Logout</button></li>}
                  {/* <li><Link to="/unk">Unk</Link></li> */}
              </ul>
          </nav>
      </header>
      <Alert/>
    </div>
  )
}

export default Navbar;
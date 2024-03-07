import React from 'react';
import Footer from './Footer';

const Error = () => {
  return (
    <>
    <div className='bg-gradient-to-bl from-pink-500 via-cyan-400 to-yellow-500 w-[100vw] font-bold md:h-[100vh] h-fit pb-14  mx-auto space-y-24'>
      <div className='flex py-10 justify-center'>
        <div className='text-center text-white text-4xl p-8 md:w-[35%] w-[65%] rounded-[12px] bg-opacity-20 bg-white shadow-2xl backdrop-blur-3xl my-10'>
            Sorry requested page not found ERROR 404
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Error
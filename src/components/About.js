import React from 'react';
import Footer from './Footer';

const About = () => {
  return (
    <>
    <div className='bg-gradient-to-bl from-pink-500 via-cyan-400 to-yellow-500 w-[100vw] font-bold md:h-[100vh] h-fit pb-14  mx-auto space-y-24'>
      <div className='flex py-10 justify-center'>
        <div className='text-center text-white p-8 md:w-[35%] w-[65%] rounded-[12px] bg-opacity-20 bg-white shadow-2xl backdrop-blur-3xl my-10'>
            Imagine a magical notebook that's always with you, whether you're on a bus, in a café, or cozied up at home. This isn't just any notebook; it's Ink'd, your personal space on the web to jot down thoughts, craft stories, or capture fleeting ideas.

          With Ink'd, your notes come alive on any device. Start a list on your phone, add to it from your laptop, and finish it off from your tablet. It's like having a secret friend who remembers everything for you, and it's as easy as tying your shoelaces!
          
          But here's the best part: your notes are locked away behind a digital fortress. Only you, with your special key - your email and password - can peek inside. It's like your thoughts are tucked away in a treasure chest, and only you have the map!
          
          Ink'd is more than a website; it's a companion for your mind. It's a place where your ideas are safe, sound, and ready to be revisited whenever you wish. So go ahead, pour your heart out or plan your dreams - Ink'd is your private corner in the vast world of the internet. 🌐✨
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default About
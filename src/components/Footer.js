import React from 'react'

const Footer = () => {
  return (
    <div className='h-[30vh] w-[100vw] bg-gradient-to-br from-yellow-500 via-cyan-400 to-orange-500'>
        <div className='pl-10  pt-5 text-white font-bold'>
            <div className='text-4xl font-bold'> 
            Contact us
            </div>
            <div  className='pt-8 ml-5'>

            Click <a href="mailto:saboteurshivam@gmail.com">here!</a> to mail me
            </div>
        </div>
    </div>
  )
}

export default Footer
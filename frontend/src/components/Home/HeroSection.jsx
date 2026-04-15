import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className='bg-black pt-24 p-4 text-textColor min-h-screen flex items-center'>
      
      <div className='max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md shadow-redColor'>
        
        {/* LEFT SIDE TEXT */}
        <div className='flex flex-col justify-center items-start md:items-start text-center md:text-left space-y-6'>
          
          <h1 className='text-4xl py-3 px-2 md:text-6xl font-inter font-bold leading-tight'>
            Placement Focused Learning Platform
          </h1>

          <h2 className='text-xl py-1 px-2 md:text-3xl font-inter font-semibold text-gray-300'>
            Code <span className='text-redColor'>.</span> Analyze <span className='text-redColor'>.</span> Succeed
          </h2>

          <p className='text-gray-400 font-roboto font-normal p-2 max-w-lg'>
            A powerful IDE with an AI mentor to help you master DSA and crack technical interviews faster.
          </p>

          <button className='mt-4 px-6 py-3 bg-redColor text-textColor font-roboto font-medium rounded-xl hover:bg-red-600'>
            Start your preparation now
          </button>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className='flex items-end justify-center h-full'>
          <img 
            src="/heroImage1.png" 
            alt="Chatbot girl image"
            className='object-contain'
          />
        </div>

      </div>

    </section>
  )
}

export default HeroSection
import React from 'react'
import { useNavigate } from 'react-router-dom'

const RightImage = () => {

  const navigate = useNavigate();

  // function to handle button click
  const handleClick = () => {
      navigate("/chat-bot");
  }

  return (
    <section className="bg-black py-5 px-4 text-textColor">

      {/* section heading outside container */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-inter font-semibold drop-shadow-[0_0_10px_rgba(0,0,255,0.8)] mb-4">
          AI Assistant
        </h2>
        <p className="text-gray-400 font-roboto font-normal text-sm md:text-base">
          Clear your doubts instantly with our AI-powered chatbot.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center 
                      bg-white/5 backdrop-blur-lg border border-white/10 
                      rounded-2xl shadow-md shadow-redColor p-6 md:p-10">

        {/* LEFT TEXT */}
        <div className="flex flex-col space-y-6 text-center md:text-left">

          <h2 className="text-3xl font-inter font-semibold md:text-5xl leading-tight">
            Stuck on a Problem?
          </h2>

          <p className="text-gray-400 font-roboto font-normal max-w-lg">
            Get instant help with your DSA doubts using our AI chatbot. 
            Ask questions, understand concepts, and keep your preparation flowing without interruptions.
          </p>

          <button
            onClick={handleClick}
            className="w-fit mx-auto md:mx-0 px-6 py-3 bg-redColor 
                       text-textColor font-roboto font-medium rounded-xl 
                       hover:bg-red-600 transition duration-300"
          >
            Ask Your Doubts Now
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src="/image1.png"   // apni image ka path yaha daalna
            alt="AI Chatbot"
            className="rounded-full border border-white/10 object-contain"
          />
        </div>

      </div>

    </section>
  )
}

export default RightImage
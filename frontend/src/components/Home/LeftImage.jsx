import React from 'react'
import { useNavigate } from "react-router-dom"

const LeftImage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/ide");
  };

  return (
    <section className="bg-black py-16 px-4 text-textColor">

      {/* SECTION HEADING */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-inter font-semibold drop-shadow-[0_0_10px_rgba(0,0,255,0.8)] mb-4">
          Code Without Limits
        </h2>
        <p className="text-gray-400 font-roboto font-normal text-sm md:text-base">
          Practice, compile, and test your code in a real interview-like IDE environment.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center
                      bg-white/5 backdrop-blur-lg border border-white/10
                      rounded-2xl shadow-md shadow-redColor p-6 md:p-10">

        {/* LEFT IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src="/image2.png"   // apni IDE image yaha daalna
            alt="Online IDE"
            className="rounded-full shadow-lg border border-white/10 object-contain"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="flex flex-col space-y-6 text-center md:text-left">

          <h2 className="text-3xl md:text-5xl font-inter font-semibold leading-tight">
            Practice Like Interview
          </h2>

          <p className="text-gray-400 font-roboto font-normal max-w-lg">
            Write complete code without hints, just like real interview environments.
            Test your logic, improve speed, and build confidence with every problem you solve.
          </p>

          <button
            onClick={handleClick}
            className="w-fit mx-auto md:mx-0 px-6 py-3 bg-redColor 
                       text-textColor font-roboto font-medium rounded-xl 
                       hover:bg-red-600 transition duration-300"
          >
            Practice Pattern Based Questions
          </button>

        </div>

      </div>

    </section>
  )
}

export default LeftImage
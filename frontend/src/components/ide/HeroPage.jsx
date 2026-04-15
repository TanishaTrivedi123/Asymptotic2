import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const HeroPage = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [topics, setTopics] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // fetch all the topics on page load
  useEffect(() => {
    const fetchTopics = async () => {
      try{
        const allTopics = await axios.get(`${API_URL}/ide/all-topic`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setTopics(allTopics.data.topics)
      }
      catch(error){
        console.log(error)
      }
    }

    fetchTopics()
  }, [])

  // -----------------navigate on the next page---------------
  const handleClick = (topic) => {
    navigate(`/ide/practice/${topic}`)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-white px-6 py-12">
      
      {/* Heading */}
      <h1 className="text-4xl font-inter font-bold mb-12 text-center tracking-wide
                     drop-shadow-[0_0_10px_rgba(0,0,255,0.8)]">
        CHOOSE A TOPIC
      </h1>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-10 max-w-6xl">
        
        {topics.map((topic, index) => (
          <div
            key={index}
            className="w-72 bg-white/5 backdrop-blur-lg 
                       rounded-2xl p-6 
                       border border-white/10
                       shadow-md shadow-redColor/20
                       hover:shadow-redColor/40
                       transition-all duration-300 
                       flex flex-col justify-between group"
          >
            {/* Heading */}
            <h2 className="text-xl uppercase font-inter font-semibold mb-2 
                           group-hover:text-skyBlue transition">
              {topic}
            </h2>

            {/* Description */}
            <p className="text-sm font-roboto font-normal text-gray-300 mb-6">
              Practice important questions of {topic} and improve your problem solving skills.
            </p>

            {/* Button */}
            <button
              onClick={() => handleClick(topic)}
              className="bg-redColor text-white
                         py-2 rounded-xl font-roboto font-medium
                         hover:bg-red-600 hover:scale-105
                         transition-all duration-300"
            >
              Solve
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default HeroPage
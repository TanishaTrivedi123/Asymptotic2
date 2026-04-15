import React, { useEffect, useState } from 'react'
import { LuChartColumnIncreasing } from "react-icons/lu";
import { IoReorderFourOutline, IoClose } from "react-icons/io5";
import { LuUserPlus, LuLogIn } from "react-icons/lu";
import { Link } from 'react-router-dom'
import axios from "axios"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showName, setShowName] = useState();

  useEffect(() => {
    const userInfo = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/auth/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowName(res.data.user);
      // console.log(res.data.user);
    };
    userInfo();
  }, [])

  return (
    <nav className='bg-blackBg w-full text-textColor p-4 px-8 flex justify-between items-center fixed top-0 z-50 shadow-skyBlue shadow-[0_0_10px_rgba(56,189,248,0.25)]'>

      {/* ---------------------------------------Navbar for desktop--------------------------------------- */}
      {/* Part1:- right side to put logo */}
      <div>
        <Link to="/home" className='flex gap-2 items-center'>
        <LuChartColumnIncreasing className='object-cover w-10 h-10 text-skyBlue'/>
        <h2 className='text-3xl font-inter font-bold'>Asymptotic</h2>
        </Link>
      </div>

      {/* Part2:- In middle put navigation links */}
      <div>
        <ul className='hidden md:flex gap-12'>
          <li className='font-medium text-lg font-inter hover:text-skyBlue'><Link to="/home">Home</Link></li>
          <li className='font-medium text-lg font-inter hover:text-skyBlue'><Link to="/chat-bot">Chatbot</Link></li>
          <li className='font-medium text-lg font-inter hover:text-skyBlue'><Link to="/ide">Solve Problems</Link></li>
        </ul>
      </div>

      {/* Part3:- user name */}
<div className='flex items-center'>
  <div className='hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border border-skyBlue bg-black hover:shadow-[0_0_10px_rgba(56,189,248,0.5)] transition'>

    {/* Avatar */}
    <div className='w-9 h-9 flex items-center justify-center rounded-full bg-skyBlue text-black font-bold text-lg font-inter'>
      {showName?.username?.charAt(0).toUpperCase()}
    </div>

    {/* Username */}
    <span className='text-lg font-roboto font-medium text-white'>
      {showName?.username}
    </span>

  </div>
</div>

      {/* hamburger menu for md screen(small screen) */}
      <button onClick={() => setIsOpen(true)} className='p-2 md:hidden text-3xl'>
        <IoReorderFourOutline />
      </button>

      {/*--------------------------------- navbar for mobile screen ------------------------------------*/}
      {
        isOpen && (
          <div className='fixed z-10 md:hidden bg-black inset-0 p-4'>
        {/* website logo */}
        <div className='flex justify-between'>
          <Link to="/home" className='flex gap-2 items-center'>
          <LuChartColumnIncreasing className='object-cover w-10 h-10 text-skyBlue'/>
          <h2 className='text-2xl font-inter font-bold'>Asymptotic</h2>
          </Link>
          {/* Close Icon */}
          <button className='p-2 md:hidden text-4xl'>
            <IoClose onClick={() => setIsOpen(false)}/>
          </button>
        </div>
        {/* navigation links */}
        <div className='mt-6'>
          <Link className='font-medium text-lg font-inter m-3 p-3 hover:bg-skyBlue block rounded-lg' to="/home">Home</Link>
          <Link className='font-medium text-lg font-inter m-3 p-3 hover:bg-skyBlue block rounded-lg' to="/chat-bot">Chatbot</Link>
          <Link className='font-medium text-lg font-inter m-3 p-3 hover:bg-skyBlue block rounded-lg' to="/ide">Solve Problem</Link>
        </div>
      </div>
        )
      }

    </nav>
  )
}

export default Navbar
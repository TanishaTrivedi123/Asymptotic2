import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineWarning } from 'react-icons/ai';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

const NotFound = () => {
  return (
    <>
    <Navbar />
    <div className="w-full flex items-center justify-center p-4 bg-black">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="mt-24 mb-9 bg-white/5 backdrop-blur-lg rounded-2xl 
                        shadow-md shadow-redColor border border-white/10 p-6 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 flex items-center justify-center 
                            rounded-full bg-white/5 border border-white/10">
              <AiOutlineWarning className="w-7 h-7 text-skyBlue" />
            </div>
          </div>

          {/* 404 */}
          <h1 className="text-5xl font-inter font-bold text-white mb-2">404</h1>

          {/* Title */}
          <h2 className="text-lg font-roboto text-white mb-2">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-400 font-roboto text-sm mb-5 px-2">
            The page you're looking for doesn’t exist or has been moved.
          </p>

          {/* Button */}
          <Link 
            to="/" 
            className="inline-flex font-roboto font-medium items-center justify-center gap-2 
                       bg-redColor text-white px-5 py-2.5 rounded-lg
                       hover:bg-red-600 transition duration-300"
          >
            <AiOutlineHome className="w-4 h-4" />
            Go Home
          </Link>

          {/* Footer text */}
          <div className="mt-5 pt-4 font-roboto border-t border-white/10">
            <p className="text-gray-500 text-xs">
              Error Code: <span className="text-skyBlue font-mono">404_NOT_FOUND</span>
            </p>
          </div>

        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NotFound;
import React, {useRef} from 'react';
import { AiOutlineMail, AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { forgotPasswordService } from '../services/authService';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

const ForgotPassword = () => {
    const emailRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const payload = {email};

        try{
            const data = await forgotPasswordService(payload);
            toast.success(data.message || "Reset Link Sent");
        }
        catch(error){
            if(error.message){
                toast.error(error.message || "Failed to send reset link");
            }
        }
    }

  return (
    <>
      <Navbar />
      <div className="w-full flex items-center justify-center p-4 bg-black">

        <div className="relative w-full max-w-md">
          
          {/* Card */}
          <div className="mt-24 mb-9 bg-white/5 backdrop-blur-lg rounded-2xl 
                          shadow-md shadow-redColor border border-white/10 p-8">
            
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-inter font-bold text-white 
                             drop-shadow-[0_0_10px_rgba(0,0,255,0.8)]">
                Forgot Password?
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div className="group">
                <label className="block font-roboto font-normal text-sm text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                  <input
                    ref={emailRef}
                    type="email"
                    className="w-full font-roboto font-normal pl-12 pr-4 py-3 bg-black border border-white/10 rounded-xl text-white 
                               focus:border-skyBlue focus:outline-none transition"
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type='submit'
                className="w-full bg-redColor font-roboto text-white py-3 rounded-xl font-medium 
                           hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
              >
                Send Reset Link
                <AiOutlineArrowRight />
              </button>

              {/* Back to Login */}
              <div className="text-center font-roboto font-normal mt-4">
                <p className="text-gray-400">
                  Remember your password?{" "}
                  <Link to="/login" className="text-skyBlue font-semibold">
                    Sign In
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
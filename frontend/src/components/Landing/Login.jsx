import React, {useRef, useState} from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineArrowRight } from 'react-icons/ai';
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import { loginService } from '../../services/authService';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({switchToSignup}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const payload = {email, password};

    try{
      const data = await loginService(payload);
      // console.log(data)
      localStorage.setItem("token", data.token);
      toast.success(data.message || "Login successful");
      navigate("/home");

      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
    catch(error){
      if(error.message === "User not found, please signup first"){
        toast.error(error.message);
        navigate("/signup");
      }
      else{
        toast.error(error.message || "Login failed");
      }
    }
  }

  return (
    <>
    <div className="w-full flex items-center justify-center">

      <div className="relative w-full max-w-md">
        
        {/* Card */}
        <div className="mt-24 mb-9 bg-white/5 backdrop-blur-lg rounded-2xl 
                        shadow-md shadow-redColor border border-white/10 p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-inter font-bold text-white 
                           drop-shadow-[0_0_10px_rgba(0,0,255,0.8)]">
              Log into Asymptotic
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="group">
              <label className="block text-sm text-gray-400 font-roboto font-normal mb-2">Email Address</label>
              <div className="relative">
                <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                <input
                  ref={emailRef}
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-xl text-white 
                             focus:border-skyBlue font-roboto font-normal focus:outline-none transition"
                  placeholder="user@gmail.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm text-gray-400 font-roboto font-normal mb-2">Password</label>
              <div className="relative">
                <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 font-roboto font-normal bg-black border border-white/10 rounded-xl text-white 
                             focus:border-skyBlue focus:outline-none transition"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-skyBlue"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-skyBlue hover:text-blue-600">
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-redColor text-white py-3 rounded-xl 
                         hover:bg-red-600 font-roboto font-medium transition duration-300 flex items-center justify-center gap-2"
            >
              Log in
              <AiOutlineArrowRight />
            </button>

            {/* Signup link */}
            <div className="text-center font-roboto text-sm font-normal mt-4">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <button onClick={switchToSignup} className="text-skyBlue hover:text-blue-600 font-semibold">
                  Create new account
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
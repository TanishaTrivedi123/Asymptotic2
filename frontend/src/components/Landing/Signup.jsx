import React, {useRef, useState} from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import { signupService } from '../../services/authService';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({switchToLogin}) => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const payload = {username, email, password, confirmPassword}

    try{
      const data = await signupService(payload);
      localStorage.setItem("token", data.token);
      toast.success(data.message || "Signup successful");
      navigate("/home");

      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
    catch(error){
      toast.error(error.message || "Signup failed")
    }
  }
 
  return (
    <>
      <div className="w-full flex items-center justify-center">

        <div className="relative w-full max-w-3xl">
          
          {/* Card */}
          <div className="mt-24 mb-9 bg-white/5 backdrop-blur-lg rounded-2xl 
                          shadow-md shadow-redColor border border-white/10 p-8">

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-inter font-bold text-white 
                             drop-shadow-[0_0_10px_rgba(0,0,255,0.8)]">
                Get started on Asymptotic
              </h2>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="group">
                  <label className="block text-sm font-roboto font-normal text-gray-400 mb-2">Full Name</label>
                  <div className="relative">
                    <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                    <input
                      ref={nameRef}
                      className="w-full pl-12 font-roboto font-normal pr-4 py-3 bg-black border border-white/10 rounded-xl text-white 
                                 focus:border-skyBlue focus:outline-none transition"
                      placeholder="username"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block font-roboto font-normal text-sm text-gray-400 mb-2">Email Address</label>
                  <div className="relative">
                    <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                    <input
                      ref={emailRef}
                      type="email"
                      className="w-full pl-12 font-roboto font-normal pr-4 py-3 bg-black border border-white/10 rounded-xl text-white 
                                 focus:border-skyBlue focus:outline-none transition"
                      placeholder="user@gmail.com"
                    />
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="group">
                  <label className="block font-roboto font-normal text-sm text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      className="w-full font-roboto font-normal pl-12 pr-12 py-3 bg-black border border-white/10 rounded-xl text-white 
                                 focus:border-skyBlue focus:outline-none transition"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-skyBlue">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="group">
                  <label className="block font-roboto font-normal text-sm text-gray-400 mb-2">Confirm Password</label>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                    <input
                      ref={confirmPasswordRef}
                      type={confirmShowPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-3 bg-black border border-white/10 rounded-xl text-white 
                                 focus:border-skyBlue focus:outline-none transition"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setConfirmShowPassword(!confirmShowPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-skyBlue">
                      {confirmShowPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="w-full bg-redColor text-white py-3 rounded-xl font-roboto font-medium
                           hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2 mt-6"
              >
                Create Account
                <AiOutlineArrowRight />
              </button>

              <div className="text-center mt-4">
                <p className="text-gray-400 font-roboto">
                  Already have an account?{" "}
                  <button onClick={switchToLogin} className="text-skyBlue hover:text-blue-600 font-semibold">
                    Sign In
                  </button>
                </p>
              </div>

            </form>

            <p className="text-xs text-gray-500 font-roboto text-center mt-4">
              By signing up, you agree to our{" "}
              <span className="text-skyBlue">Terms of Service</span> and{" "}
              <span className="text-skyBlue">Privacy Policy</span>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
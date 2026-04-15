import React, {useRef, useEffect, useState} from 'react';
import { AiOutlineLock, AiOutlineArrowRight } from 'react-icons/ai';
import { Link, useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify"
import { resetPasswordService, verifyResetToken } from '../services/authService';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

const ResetPassword = () => {

    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();
    const {token} = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
      const verifyToken = async () => {
        try{
          const data = await verifyResetToken(token);
          console.log(data)

          if(data.valid){
            setValidToken(true);
          }
          else{
            navigate("/forgot-password")
          }
        }
        catch(error){
          toast.error(error.message);
          navigate("/forgot-password");
        } finally {
          setLoading(false);
        }
      };
      verifyToken();
    }, [token,navigate]);

    if(loading){
      return null;
    }

    if(!validToken){
      return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        const payload = {newPassword, confirmPassword};

        try{
            const data = await resetPasswordService(token, payload);
            toast.success(data.message || "Password is reset");
            navigate("/login");
        }
        catch(error){
            if(error.message){
                toast.error(error.message || "Something is wrong");
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
                Reset Password
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* New Password */}
              <div className="group">
                <label className="block font-roboto font-normal text-sm text-gray-400 mb-2">New Password</label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                  <input
                    ref={newPasswordRef}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 font-roboto font-normal pr-12 py-3 bg-black border border-white/10 rounded-xl text-white 
                               focus:border-skyBlue focus:outline-none transition"
                    placeholder="Enter new password"
                  />
                  <button 
                    type='button' 
                    onClick={() => setShowPassword(!showPassword)} 
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-skyBlue'
                  >
                    {showPassword ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label className="block font-roboto font-normal text-sm text-gray-400 mb-2">Confirm Password</label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-skyBlue" />
                  <input
                    ref={confirmPasswordRef}
                    type={confirmShowPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3 bg-black border border-white/10 rounded-xl text-white 
                               focus:border-skyBlue font-roboto font-normal focus:outline-none transition"
                    placeholder="Confirm new password"
                  />
                  <button 
                    type='button' 
                    onClick={() => setConfirmShowPassword(!confirmShowPassword)} 
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-skyBlue'
                  >
                    {confirmShowPassword ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button 
                type='submit' 
                className="w-full bg-redColor text-white py-3 rounded-xl font-semibold 
                           hover:bg-red-600 font-roboto transition duration-300 flex items-center justify-center gap-2"
              >
                Reset Password
                <AiOutlineArrowRight />
              </button>

              {/* Back */}
              <div className="text-center mt-4 font-roboto font-normal">
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

export default ResetPassword;
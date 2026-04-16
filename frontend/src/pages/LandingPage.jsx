import React, { useState } from "react";
import Signup from "../components/Landing/Signup";
import Login from "../components/Landing/Login";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="relative min-h-screen text-textColor flex items-center px-6 md:px-12 overflow-hidden">
      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/LandingPageVideo.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[0]" />

      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE TEXT */}
        <div className="flex z-10 flex-col justify-center items-start text-center md:text-left space-y-5">
          <h1 className="text-4xl md:text-6xl font-inter font-bold leading-tight">
            Master DSA Through <br />
            Pattern-Based Practice
          </h1>

          <h2 className="text-lg md:text-2xl font-inter font-semibold text-gray-300">
            Think Like an Interviewer <span className="text-redColor">•</span>{" "}
            Code Independently <span className="text-redColor">•</span> Validate
            Your Approach
          </h2>

          <p className="text-gray-400 font-roboto max-w-lg">
            Sharpen your problem-solving skills with carefully curated DSA
            patterns inspired by real interviews. Write complete solutions
            independently, test your thinking, and validate your approach with
            precision. Get instant clarity on doubts using AI assistance—so you
            stay focused and interview-ready.
          </p>
        </div>

        {/* RIGHT SIDE */}
        {isLogin ? (
          <Login switchToSignup={() => setIsLogin(false)} />
        ) : (
          <Signup switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;

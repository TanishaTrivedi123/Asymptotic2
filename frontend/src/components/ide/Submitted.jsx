import React, { useEffect, useState } from "react";
import axios from "axios";

const Submitted = () => {
  const [showName, setShowName] = useState();

  useEffect(() => {
    const userInfo = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:8080/api/auth/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShowName(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    userInfo();
  }, []);

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg shadow-redColor p-10 text-center space-y-6">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold font-inter text-textColor">
          🎉 Congratulations {showName?.username}!
        </h1>

        {/* Subtitle */}
        <h2 className="text-lg md:text-2xl font-semibold text-gray-300">
          Your solution has been submitted successfully.
        </h2>

        {/* Professional Message */}
        <p className="text-gray-400 font-roboto max-w-xl mx-auto">
          Great work! Your problem has been solved and submitted successfully.
          Keep practicing and refining your skills to achieve excellence in
          coding interviews.
        </p>

        {/* Divider */}
        <div className="w-20 h-1 bg-redColor mx-auto rounded-full"></div>

        {/* Extra motivation */}
        <p className="text-gray-500 text-sm">
          🚀 Keep pushing forward — consistency is the key to success.
        </p>
      </div>
    </section>
  );
};

export default Submitted;

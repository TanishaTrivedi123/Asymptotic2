import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import axios from "axios";

const SideBar = ({
  chatTitles,
  loading,
  onSelectChat,
  onNewChat,
  currentChatId,
  open,
  setOpen,
}) => {
  const [showName, setShowName] = useState();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const userInfo = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://asymptotic2backend-a4ly.onrender.com/api/auth/getUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setShowName(res.data.user);
      // console.log(res.data.user);
    };
    userInfo();
  }, []);

  const handleNewChat = () => {
    onNewChat();
  };

  const handleSelectChat = (chat) => {
    onSelectChat(chat); //chatbot me current chat update ho jaaega
  };

  return (
    <div
      className={`bg-black border-r border-white/10 flex flex-col z-20 ${open ? "w-64" : "w-16"}`}
    >
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="p-1">
          <img
            src="/logo1.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </div>

        <button
          onClick={handleOpen}
          className="p-2 hover:bg-white/5 rounded-lg transition"
        >
          {open ? (
            <ImCross className="w-5 h-5 text-gray-400" />
          ) : (
            <AiOutlineMenu className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* बाकी content sirf open hone par */}
      {open && (
        <>
          {/* New Chat */}
          <div className="px-3 mb-3">
            <button
              onClick={handleNewChat}
              className="w-full bg-redColor text-white py-2.5 rounded-xl font-roboto font-medium 
                       hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
            >
              <AiOutlinePlus className="w-4 h-4" />
              New chat
            </button>
          </div>

          {/* Chat Titles */}
          <div className="flex-1 overflow-y-auto px-3 space-y-1">
            {loading && (
              <p className="text-gray-400 text-sm text-center mt-4">
                Loading chats...
              </p>
            )}

            {!loading && chatTitles.length === 0 && (
              <p className="text-gray-400 text-sm text-center mt-4">
                No chats found
              </p>
            )}

            {!loading &&
              chatTitles.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-all
                  ${
                    chat.id === currentChatId
                      ? "bg-white/10 text-white border-l-2 border-skyBlue"
                      : "text-gray-300 hover:bg-white/5"
                  }
                `}
                >
                  {chat.title || "New Chat"}
                </button>
              ))}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-white/10">
            <div className="hover:bg-white/5 rounded-xl p-2 flex items-center gap-3 transition">
              <div className="w-10 h-10 bg-redColor font-bold rounded-full flex items-center justify-center text-white">
                {showName?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm">{showName?.username}</p>
                <p className="text-gray-500 text-xs">{showName?.email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;

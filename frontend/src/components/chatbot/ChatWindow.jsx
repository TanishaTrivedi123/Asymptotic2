import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { askAI } from "../../services/aiService";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";

const ChatWindow = ({ setChatTitles, currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const [hiddenButtons, setHiddenButtons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages || []);
      setChatId(currentChat._id);
    } else {
      setMessages([]);
      setChatId(null);
    }
  }, [currentChat]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = {
      role: "user",
      content: message,
      timeStamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      const data = await askAI({ question: userMsg.content, chatId });

      if (!chatId) {
        setChatId(data.chat._id);

        setChatTitles((prev) => {
          const filtered = prev.filter((c) => c._id != data.chat._id);

          return [
            {
              id: data.chat._id,
              title: data.chat.title || userMsg.content.slice(0, 30),
            },
            ...filtered,
          ];
        });
      }

      const aiMsg = data.chat.messages[data.chat.messages.length - 1];

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error while asking question", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePracticeClick = (messageId, topic) => {
    setHiddenButtons((prev) => [...prev, messageId]);

    if (!topic) {
      console.log("Topic missing");
      return;
    }

    navigate(`/ide/practice/${topic}`);
  };

  // direct send question on enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Top Navbar */}
      <div className="border-b border-white/10 z-10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-white font-inter font-bold text-base">
              Asymptotic AI
            </h1>
            <p className="text-gray-500 font-roboto font-normal text-xs">
              Your coding assistant
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto z-10 flex flex-col">
        <div className="w-full max-w-4xl mx-auto px-6 py-6 space-y-6">
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-3">
              <h2 className="text-white text-4xl font-inter font-semibold">
                What's on your mind today?
              </h2>
              <p className="text-gray-400 font-roboto font-normal text-lg max-w-md">
                Ask Asymptotic AI anything related to coding, debugging, or
                technology tips.
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                ref={idx === messages.length - 1 ? messagesEndRef : null}
              >
                <div
                  className={`${
                    msg.role === "user"
                      ? "max-w-[75%] px-4 py-2 font-roboto font-medium rounded-2xl bg-redColor text-white rounded-br-none"
                      : "w-full px-2 py-1 text-gray-200 font-roboto font-normal"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    skipHtml={true}
                    components={{
                      h1: ({ ...props }) => (
                        <h1
                          className="text-2xl font-inter font-bold text-white mt-6 mb-4"
                          {...props}
                        />
                      ),
                      h2: ({ ...props }) => (
                        <h2
                          className="text-xl font-inter font-semibold text-white mt-5 mb-3"
                          {...props}
                        />
                      ),
                      h3: ({ ...props }) => (
                        <h3
                          className="text-lg font-inter font-semibold text-white mt-4 mb-2"
                          {...props}
                        />
                      ),
                      p: ({ ...props }) => (
                        <p
                          className="text-gray-200 font-roboto text-sm leading-6 mb-3"
                          {...props}
                        />
                      ),
                      ul: ({ ...props }) => (
                        <ul className="mb-3 pl-5 list-disc" {...props} />
                      ),
                      ol: ({ ...props }) => (
                        <ol className="mb-3 pl-5 list-decimal" {...props} />
                      ),
                      li: ({ ...props }) => (
                        <li className="mb-1 font-normal" {...props} />
                      ),
                      code: ({ inline, children, ...props }) =>
                        inline ? (
                          <code
                            className="bg-white/10 text-skyBlue px-1.5 py-0.5 rounded-md text-xs"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <code {...props}>{children}</code>
                        ),
                      pre: ({ children, ...props }) => (
                        <pre
                          className="bg-black border border-white/10 rounded-xl p-3 my-3 overflow-x-auto"
                          {...props}
                        >
                          {children}
                        </pre>
                      ),
                      blockquote: ({ ...props }) => (
                        <blockquote
                          className="border-l-4 border-white/20 pl-4 italic text-gray-400 my-3"
                          {...props}
                        />
                      ),
                      table: ({ ...props }) => (
                        <div className="overflow-x-auto my-3">
                          <table
                            className="border-collapse border border-white/10 min-w-full"
                            {...props}
                          />
                        </div>
                      ),
                      th: ({ ...props }) => (
                        <th
                          className="border border-white/10 bg-white/10 px-3 py-2 text-left text-white"
                          {...props}
                        />
                      ),
                      td: ({ ...props }) => (
                        <td
                          className="border border-white/10 px-3 py-2"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>

                  {msg.role === "assistant" &&
                    msg.showYesButton &&
                    !hiddenButtons.includes(msg._id) && (
                      <button
                        onClick={() => handlePracticeClick(msg._id, msg.topic)}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-redColor text-white text-sm font-roboto font-medium
                    hover:bg-red-600 transition duration-300
                    active:scale-95"
                      >
                        Practice Questions
                      </button>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input */}
      <div className=" z-10 py-2 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-2">
          <div className="bg-white/5 border border-white/10 rounded-full">
            <div className="flex items-end gap-2 p-3">
              <textarea
                onKeyDown={handleKeyDown}
                placeholder="If You Have Any Doubt Related To 'DSA' You Can Type Here And Submit It To Me and I Will Clear Your Doubt."
                className="flex-1 font-roboto font-normal bg-transparent text-white placeholder-gray-500 outline-none resize-none max-h-32 text-sm py-2"
                rows="1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="p-2.5 bg-redColor hover:bg-red-600 rounded-lg transition shadow-md"
              >
                <AiOutlineSend className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Asymptotic AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

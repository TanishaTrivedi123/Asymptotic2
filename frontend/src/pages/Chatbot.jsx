import React, {useState, useEffect} from 'react'
import SideBar from "../components/chatbot/SideBar"
import ChatWindow from '../components/chatbot/ChatWindow'
import { fetchChatById, fetchChatTitles } from '../services/aiService';

const Chatbot = () => {
  const [chatTitles, setChatTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatResetKey, setChatResetKey] = useState(0);

  const [open, setOpen] = useState(true); // 👈 yaha shift kiya

  useEffect(() => {
    const getTitles = async () => {
      try {
        const data = await fetchChatTitles();
        setChatTitles(data.chats || []);
      } catch (error) {
        console.error('Failed to fetch chat titles', error);
      } finally {
        setLoading(false);
      }
    };

    getTitles();
  }, []);

  const handleSelectChat = async (chatId) => {
    try{
      const data = await fetchChatById(chatId);
      setCurrentChat({ ...data.chat });
    }
    catch(error){
      console.error("Failed to load chat", error);
    }
  }

  const handleNewChat = () => {
    setCurrentChat(null);
    setChatResetKey(prev => prev + 1);
  }

  return (
    <div 
      className={`grid ${open ? "grid-cols-[255px_1fr]" : "grid-cols-[64px_1fr]"} bg-blackBg h-screen`}
    >
      <SideBar 
        chatTitles={chatTitles} 
        loading={loading} 
        onNewChat={handleNewChat} 
        onSelectChat={handleSelectChat} 
        currentChatId={currentChat?._id}
        open={open}
        setOpen={setOpen}
      />

      <ChatWindow 
        key={chatResetKey} 
        setChatTitles={setChatTitles} 
        currentChat={currentChat} 
      />
    </div>
  )
}

export default Chatbot
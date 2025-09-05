import "./ChatWindow.css";
import Navbar from "./Navbar.jsx";
import Chat from "./Chat.jsx";
import MyContext from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { HashLoader } from "react-spinners";

function ChatWindow() {
  const [loading, setLoading] = useState(false);

  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    setCurrThreadId,
    setNewChat,
    prevChat,
    newChat,
  
   
    setPrevChat,
  } = useContext(MyContext);

  const handelClick = async () => {
    if (!prompt.trim()) return; // prevent empty messages
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };

    try {
      // First API call
      const response1 = await fetch("https://aion-ai-backend.onrender.com/api/chat", options);
      const data1 = await response1.json();
      setReply(data1.reply);

     

      setNewChat(false);
    } catch (err) {
      console.error("Chat error:", err);
    }

    setLoading(false);
  };

  // append new chat to prev chat
  useEffect(() => {
    if (prompt && reply) {
      setPrevChat((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    
      setPrompt("");
    }
  }, [reply]);

  return (
    <div className="chatwindow">
      <Navbar />
    
      <div className="chats">
        <Chat />
       
      </div>
      <HashLoader color="#fff" loading={loading} className="loader" />
      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handelClick()}
          />

          <div className="sendArrow" onClick={handelClick}>
            <i className="fa-solid fa-arrow-up"></i>
          </div>
        </div>
        <p className="info">AION chatbot can make mistakes...</p>
      </div>
    </div>
  );
}

export default ChatWindow;

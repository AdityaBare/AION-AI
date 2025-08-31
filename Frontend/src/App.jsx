import { useContext, useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import MyContext from "./MyContext.jsx";
import Login from "./Login.jsx";


function App() {
 
 

  
  const  {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChat,
    setPrevChat,
    allThreads , setAllThreads,
    logIn,setLogIn,
    user, setUser

  } = useContext(MyContext);


  return (
    <>

      <div className="main">
        
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
          {
        !logIn && <Login></Login>
       
      }


   
     
      </div>

      
    </>
  );
}

export default App;

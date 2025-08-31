import "./Sidebar.css";
import { v4 as uuidv4 } from "uuid";
import MyContext from "./MyContext.jsx";
import { useContext, useEffect } from "react";
function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    setCurrThreadId,
    currentThreadId,
    setNewChat,
    setReply,
    setPrompt,
    setPrevChat,
  } = useContext(MyContext);

  const getAllThread = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filterData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      // console.log(filterData);
      setAllThreads(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThread();
  }, [currentThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChat([]);
  };



  const changeThread = async (Id)=>{
     setCurrThreadId(Id);

    const response = await fetch(`http://localhost:8080/api/thread/${Id}`);

     const res = await response.json();
   
     setPrevChat([...res]);
     setReply(null);
     setNewChat(false);
  }

  const deleteThread = async (Id)=>{

   try{
       const option = {
      method:"DELETE"
    }

    const response = await fetch(`http://localhost:8080/api/thread/${Id}`,option);
     const res = response.json();
      setAllThreads(prev => prev.filter((e)=>e.threadId != Id));
      if(Id == currentThreadId){
        createNewChat();
      }
   }
   catch(err){
    console.log(err);
   }
  }





  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="src/assets/logo3.png" alt="Gpt logo" className="logo" />

        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        {allThreads?.map((thread, i) => (
          <li
            key={i}
            onClick={()=>changeThread(thread.threadId)}

            className={currentThreadId == thread.threadId?"highlight":''}
          >
            {thread.title} <div onClick={(e)=>{
              e.stopPropagation(); //stop event bubbling
              deleteThread(thread.threadId)}} className="deletebtn"><i class="fa-solid fa-trash"></i></div>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By AION.ai</p>
        <p style={{ fontSize: "10px" }}>
          {" "}
          <i>~Aditya Bare</i>
        </p>
      </div>
    </section>
  );
}

export default Sidebar;

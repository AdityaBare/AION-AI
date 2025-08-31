import "./Chat.css";
import { useContext, useEffect ,useState} from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";


import MyContext from "./MyContext.jsx";

function Chat() {
  const { reply, prevChat, newChat } = useContext(MyContext);
  const [latestchat , setLatestChat]=useState("");

  useEffect(()=>{

    if(reply == null){
      setLatestChat(null);
      return;
    }

    if(!prevChat?.length)return;

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(()=>{
      setLatestChat(content.slice(0,idx+1).join(" "));
      idx++;
      if(idx>= content.length) clearInterval(interval);
    },40);
    return ()=>clearInterval(interval);
  },[prevChat,reply])
  return (
    <>

      <div className="chat">
        {prevChat?.slice(0,-1).map((chat, idx) => [
          <div className={chat.role == "user" ? "userDiv" : "gptDiv"} key={idx}>
            {chat.role == "user" ? 
              <p className="userMessage">{chat.content}</p>: 
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}    skipHtml={false}>{chat.content}</ReactMarkdown>
          
            }
          </div>,
        ])}

         {
          prevChat.length>0 && latestchat != null && 
          <div className="gptDiv" key={"typing"}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}  skipHtml={false}>{latestchat}</ReactMarkdown>
          </div>
        }

        {
          prevChat.length>0 && latestchat == null && 
          <div className="gptDiv" key={"typing"}
         
          >
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}  skipHtml={false}>{prevChat[prevChat.length-1].content}</ReactMarkdown>
          </div>
        }
      </div>
    </>
  );
}

export default Chat;

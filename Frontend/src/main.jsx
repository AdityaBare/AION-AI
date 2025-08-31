import { StrictMode,useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import SignUp from "./SignUp.jsx";
import MyContext from "./MyContext.jsx";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Root() {
  const [prompt, setPrompt] = useState("");
  const [currentThreadId, setCurrThreadId] = useState(uuidv4());
  const [reply, setReply] = useState(null);
  const [prevChat, setPrevChat] = useState([]);
  // const [prevChat2, setPrevChat2] = useState([]);
// const [reply2, setReply2] = useState(null);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [logIn, setLogIn] = useState(false);  
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .get("https://aion-ai-backend.onrender.com/user")
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setUser(res.data);
          setLogIn(true);
        } else {
          setUser({});
          setLogIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLogIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Checking session...</h2>;

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currentThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChat, setPrevChat,
    allThreads, setAllThreads,
    logIn, setLogIn,
    user, setUser,
  
  };

  return (
    <MyContext.Provider value={providerValues}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </MyContext.Provider>
  );
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);

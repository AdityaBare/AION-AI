import "./Navbar.css";
import { useContext, useState } from "react";
import MyContext from "./MyContext.jsx";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
    const {user, setUser,setLogIn}= useContext(MyContext);

  const toggleProfileMenu = () => {

     console.log(user)
    setIsOpen(!isOpen);
  };


  const handelLogout = async ()=>{
    try{
      await axios.get("https://aion-ai-backend.onrender.com/user/logout",
      { withCredentials: true }
     ).then((res)=>{
      console.log(res);
      setUser(null);
      setLogIn(false);

     })
    }catch(err){
      console.log(err);
    }
     setIsOpen(!isOpen);
  }


  return (

    <div className="navbar">
      <span>
        AION &nbsp; Chatbot <i className="fa-solid fa-angle-down"></i>
      </span>

      <div className="user-section">
        <div className="userIcon" onClick={toggleProfileMenu}>
          <i className="fa-solid fa-user"></i>
        </div>

        {isOpen && (
          <div className="dropDowns">
                <div className="profileIcon">
                {user &&  <p> { user.data.username?.[0]}</p>}
                </div>
         {user &&    <p className="dropDownsMenu">{user.data.username}</p>}
            <p className="dropDownsMenu" onClick={handelLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

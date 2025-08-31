import React, { useState ,useContext} from 'react';
import axios from "axios";
import {Link} from "react-router-dom"
import {useNavigate  } from "react-router-dom";
 import "./SignUp.css";
 import MyContext from "./MyContext.jsx";

function SignUp() {
   const {setUser, logIn,setLogIn}=useContext(MyContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
       await axios.post(`https://aion-ai-backend.onrender.com/user/signup`,formData, {
      withCredentials: true 

      }).then((res)=>{
        console.log(res.data.message);
       
           if(res.data.success==true){
            setLogIn(true);
              if (setUser) setUser(res.data); 
            navigate('/');
        }

        else{
          alert(res.data.message)
        }
      
  
      });
     
    
    
   
  };

  return (
    <div className='signup' >
   <form onSubmit={handleSubmit}>
  {/* Email */}
  {/* Email */}
<div className="form-group">
  <label>Email address</label>
  <input 
    type="email" 
    name="email" 
    value={formData.email} 
    onChange={handleInput} 
    required 
  />
  <small>We'll never share your email with anyone else.</small>
  <span className="error-msg">Enter email!</span>
</div>

{/* Username */}
<div className="form-group">
  <label>Username</label>
  <input 
    type="text" 
    name="username" 
    value={formData.username} 
    onChange={handleInput} 
    required 
  />
  <span className="error-msg">Enter username!</span>
</div>

{/* Password */}
<div className="form-group">
  <label>Password</label>
  <input 
    type="password" 
    name="password" 
    value={formData.password} 
    onChange={handleInput} 
   
  />
  <span className="error-msg">Enter password!</span>
</div>



        <div className="mb-4 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"  required/>
          <label className="form-check-label" htmlFor="exampleCheck1">
            Accept all <a href="">terms</a> & <a href="">conditions</a>
          </label>
        </div>

        <button   className="btn btn-primary mb-4">SignUp</button>
        <br />
        <br />
    <p>Already have an account? Login </p>
      </form>
      <br /><br />
  

    </div>
  );
}

export default SignUp;

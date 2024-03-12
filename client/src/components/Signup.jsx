import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import OdinLogo from '../assets/logo.svg';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const Signup = () => {
  const [FormState, setFormState] = useState({
    email: '',
    username: '',
    password: ''
  })

  const [secpassword, setSecPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = FormState;
    console.log(FormState)
    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    //Form validation
    emailRegex.test(email) ? null : toast.error("Invalid email type")
    passwordRegex.test(password) ? null : toast.error("Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from the set #?!@$%^&*-.");
    username.length < 6 ? toast.error("Username must be more than 6 characters") : null;
    password == secpassword ? null : toast.error("Passwords must match");
    if (emailRegex.test(email) && passwordRegex.test(password) && username.length > 6 && password == secpassword) {
      const API_SOURCE = "http://localhost:9000"
      axios.post(`${API_SOURCE}/signup`,

        {email: email, 
          username: username,
           password: password}

      ).then((res) =>  {
        console.log(res.status, typeof(res.status))
        if(res.status == 201) {
           toast.success("Account created")
           toast("Redirecting to login...")
           setTimeout(() => {
            navigate("/login")
            document.title =  "Login"
          }, 10000);
          
          }
        else { //With a 409 in mind
            toast.error("Username/Email already exists")
        }})
        .catch(err => toast.error(err))
    }
  }

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="flex flex-row items-center gap-3">
      <Link to="/"><img src={OdinLogo} alt="Logo" /></Link>
        <h2 className="text font-bold text-xl" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
          Odin Chat
        </h2>
      </div>
      <h1 className="text font-bold text-2xl m-4" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
        Sign Up🛰
      </h1>
      <form className="flex flex-col items-center gap-[0.47rem]" action="" method="">
        <label htmlFor="email" className="text-left">Email:</label>
        <input type="email" name="email" className="h-9 rounded text-white outline-none px-3 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] shadow-sm shadow-blue-400" value={FormState.email} onChange={(e) => { setFormState({ ...FormState, [e.target.name]: e.target.value }) }} />
        <label htmlFor="username" className="text-left">Username:</label>
        <input type="text" name="username" className="h-9 rounded text-white outline-none px-3 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] shadow-sm shadow-blue-400" value={FormState.username} onChange={(e) => { setFormState({ ...FormState, [e.target.name]: e.target.value }) }} />
        <label htmlFor="password" className="text-left">Password:</label>
        <input type="password" name="password" id="password" className="h-9 rounded text-white outline-none px-3 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] shadow-sm shadow-blue-400" value={FormState.password} onChange={(e) => { setFormState({ ...FormState, [e.target.name]: e.target.value }) }} />
        <label htmlFor="password" className="text-left">Confirm Password:</label>
        <input type="password" name="secpassword" id="secpassword" className="h-9 rounded text-white outline-none px-3 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] shadow-sm shadow-blue-400" value={secpassword} onChange={(e) => { setSecPassword(e.target.value) }} />
        <input type="submit" className="bg-blue-500 text-white rounded h-10 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] m-3 mt-[1r.5em] shadow-md shadow-slate-400 cursor-pointer" value="Sign Up" onClick={(e) => handleSubmit(e)} />
        <p className="m-2">Have an account? <Link to="/login" className="hover:text-blue-400 underline">Log In</Link></p>

        <button className="flex flex-row items-center justify-center md:w-2/4 vmd:w-[65%] vsm:w-[70vw] h-10 bg-gray-500 text-white p-3 focus:outline-none  gap-3 border-lg rounded shadow shadow-blue-500 cursor-pointer">
                    <FaGithub style={{ fontSize: '20px' }} />
                    Sign In With GitHub
        </button>
      </form>

    </div>
  );
};

export default Signup

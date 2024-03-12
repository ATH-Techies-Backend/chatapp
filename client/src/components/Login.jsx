import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import OdinLogo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formState;
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        // Form validation
        if (!emailRegex.test(email)) {
            toast.error('Invalid email type');
            return;
        }

        if (password.length === 0) {
            toast.error('Please enter your password');
            return;
        }

        if (!emailRegex.test(email) || password.length === 0) {
            return;
        }

        const API_SOURCE = 'http://localhost:9000';
        try {
            const response = await fetch(`${API_SOURCE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Logging in...');
                setLoggedIn(true);
                localStorage.setItem('token', data.token);
                navigate('/chatrooms');
            } else if (response.status === 401) {
                const errorData = await response.json();
                toast.error(errorData.message);
            } else {
                toast.error(`Unexpected status: ${response.status}`);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
            
        }
    };

    return (
        <div className="container mx-auto">
            <ToastContainer />
            <div className="flex flex-row items-center gap-3">
                <Link to="/">
                    <img src={OdinLogo} alt="Logo" />
                </Link>
                <h2 className="text font-bold text-xl" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
                    Odin Chat
                </h2>
            </div>
            <h1 className="text font-bold text-2xl m-4" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
                Login🚀
            </h1>
            <form className="flex flex-col items-center gap-[0.47rem]" action="" method="">
                <label htmlFor="email" className="text-left">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="h-9 rounded outline-none px-3 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] text-slate-600 shadow-sm shadow-blue-400 mb-[2rem]"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                />
                <label htmlFor="password" className="text-left">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="h-9 rounded outline-none px-3 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] text-slate-600 shadow-sm shadow-blue-400 mb-[2rem]"
                    value={formState.password}
                    onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                />
                <input
                    type="submit"
                    className="bg-blue-500 text-white rounded h-10 md:w-2/4 vmd:w-[65%] vsm:w-[70vw] m-3 shadow-md shadow-slate-400 cursor-pointer"
                    value="Log In"
                    onClick={(e) => handleSubmit(e)}
                />
                <p className="m-2">
                    Are you new? <Link to="/signup" className="hover:text-blue-400 underline">Sign Up</Link>
                </p>
                <Link className="hover:text-blue-400 underline" to="#">
                    Forgotten Password?
                </Link>
                <button className="flex flex-row items-center justify-center md:w-2/4 vmd:w-[65%] vsm:w-[70vw] h-10 bg-gray-500 text-white p-3 focus:outline-none gap-3 border-lg rounded shadow shadow-blue-500 cursor-pointer">
                    <FaGithub style={{ fontSize: '20px' }} />
                    Sign In With GitHub
                </button>
            </form>
        </div>
    );
};

export default Login;

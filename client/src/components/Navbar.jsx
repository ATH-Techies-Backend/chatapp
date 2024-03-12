import React, { useState, useEffect } from 'react';
import OdinLogo from '../assets/logo.svg';
import { CgProfile } from 'react-icons/cg';
import { ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"

const Navbar = () => {
    // State to manage user login status
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage['token']);
    const navigate = useNavigate()
    const handleLogout = () => {
        const API_SOURCE = "http://localhost:9000"
        //Clear the authentication cookie
        fetch(`${API_SOURCE}/logout`, {
            method: "POST",
            credentials: "include"
        })
        // Clear the authentication token from localStorage
        localStorage.removeItem('token');
        // Update the isLoggedIn state to false
        setIsLoggedIn(false);
        toast.info("Logging out...");
        setTimeout(() => { navigate("/login") }, 3000)
    };

    const populateUsername = () => {
        const token = localStorage.token;
        if (token.length != 0) {
            return JSON.parse(atob(token.split('.')[1])).username;
        } else {
            return 'User';
        }
    };
    
    return (
        <>
            <ToastContainer />
            <div className="flex flex-row gap-8 vmd:justify-center">
                <div className="brand flex flex-row gap-3 items-center">
                    <Link to="/"><img src={OdinLogo} alt="Logo" /></Link>
                    <h2 className="text font-bold text-xl" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
                        Odin Chat
                    </h2>
                </div>
                <div className="w-2/5"></div>
                {isLoggedIn ? (
                    <div className="flex flex-row items-center gap-4">
                       
                        <div className="userdetails flex flex-row gap-4 justify-center">
                            <CgProfile style={{ fontSize: '40px' }} />
                            <div className="flex flex-col text-xs">
                                <p>Logged in as, </p>
                                <p className="text text-lg font-bold">{populateUsername()}</p>
                            </div>
                        </div>
                        <button
                            className="bg-red-400 p-2 rounded  shadow shadow-slate-400 cursor-pointer"
                            style={{ fontFamily: 'Poppins', fontSize: '20px', color: 'white', cursor: 'pointer' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (

                    <div className="flex flex-row items-center gap-4">
                        <Link to="/login" className="no-underline text-white" style={{ fontFamily: 'Poppins', fontSize: '20px', color: 'white' }}>
                            Log In
                        </Link>
                        <Link to="/signup" className="bg-indigo-400 p-2" style={{ fontFamily: 'Poppins', fontSize: '20px', color: 'white' }}>
                            Sign Up
                        </Link>

                     

                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;

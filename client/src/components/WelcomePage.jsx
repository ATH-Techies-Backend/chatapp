import React from 'react';
import OdinLogo from '../assets/logo.svg';
import bgImage from '../assets/homebg.jpg';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'
const WelcomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', 
  };

  return (
    <div style={backgroundStyle} className="flex flex-col vmd:gap-[6.3rem] sm:gap-[4.3rem] vsm:gap-[3.7rem] overflow-hidden h-screen">
      <div className="container mx-auto pt-6w-[100%] lg:ml-[9rem] md:ml-[3rem] vmd:ml-[0.1rem] sm:px-[1.7rem] mt-[2.5rem]">
       <Navbar/>
      </div>

      <h1 className="text font-bold">A new approach to chatting🌌</h1>
      <p className="p-7">Take chatting to the next level with Odin chat app🚀 (Spread your wings🕊). Don't you feel like you can say anything with Odin😉, well not "anything"😅.</p>
      <button className="bg-indigo-500 p-3 rounded-lg w-[70%] self-center shadow-md shadow-slate-400" style={{fontFamily:"Poppins", fontSize:"20px", color: "white"}}>
        <Link className="no-underline text-white" to="/chatrooms" style={{fontFamily:"Poppins", fontSize:"20px", color: "white"}}>Start chatting🚀</Link>
        </button>
    </div>
  );
}

export default WelcomePage;

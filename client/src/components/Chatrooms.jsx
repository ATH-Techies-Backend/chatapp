import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Loader from './Loader';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Chatrooms = () => {
  const [isLoading, setIsLoading] = useState(true) //To render the loader when i'm ready to implement it
  const [roomName, setRoomName] = useState('');
  const [roomData, setRoomData] = useState([
    {
      _id: "419",
      name: "Loading...",
      "members": 0,
      "messages": 0
    }
  ]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const API_SOURCE = "http://localhost:9000"
      await axios.get(`${API_SOURCE}/chatroom`)
      .then((res) => {
        setRoomData(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.error('Error fetching data', err))
      .finally(() => {setIsLoading(false)})
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_SOURCE = "http://localhost:9000"
      await axios.post(`${API_SOURCE}/chatroom`,
        { name: roomName }).then((res) => {
          toast.success('Created chatroom');
          fetchData(); // Refresh room data after creating a chatroom
        }).catch((err) => {
          toast.error('Some weird error,')
          console.log(err.message)
        })
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (uid) => {
    const API_SOURCE = "http://localhost:9000"
    await axios.delete(`${API_SOURCE}/chatroom/${uid}`)
      .then(res => {
        if (res.status == 204) {
          toast.success("Deleted chatroom");
        }
        else {
          toast.error("Something went wrong")
        }
      })
  }

  const goToRoom = async (uid) => {
    const API_SOURCE = "http://localhost:9000"
     await axios.get(`${API_SOURCE}/chatroom/${uid}`)
     .then(res => {
        console.log(res.data.existingRoom.messages) //Accesses the messages available
        toast.success(`Redirecting to ${res.data.existingRoom.name}...`);
        setTimeout(() => {
          navigate(res.data.urlLink);
        }, 3000)
        
       }).catch((err) => {
         toast.error("Something went wrong")
       })
  } 
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <section className="container">
        <h1 className="text text-xxl font-bold text-white p-6" style={{ fontFamily: 'Poppins' }}>
          Chatrooms🥂
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-center">
            <input
              className="h-9 rounded text-white outline-none px-3 w-2/4 shadow-sm shadow-blue-400"
              type="text"
              name="roomname"
              value={roomName}
              onChange={handleRoomNameChange}
              placeholder="New Chatroom🎆"
            />
            <input
              type="submit"
              className="bg-green-500 text-white rounded h-10 mx-2 px-3 cursor-pointer shadow shadow-slate-400"
              value="Create"
            />
          </div>
        </form>
      </section>
      <section className="container">
        <p className="text text-xl m-5">Here are the available chatrooms</p>
        {/* <Loader /> */}
        {roomData.map((room) => (
          <div key={room._id} className="flex flex-row items-center border-white border hover:border-2 hover:border-slate-400 rounded my-5 md:w-2/4 w-3/4 mx-auto cursor-pointer shadow-sm shadow-blue-400"
            onClick={() => {goToRoom(room._id)}}
          >
            <div className="flex flex-col flex-1">
              <p className="text-white font-bold py-2" style={{ fontFamily: "Poppins" }}>{room.name}</p>
            
              <p className="text-sm py-2">{`Member Count: ${room.members.length}`}</p>
            </div>
            <div className="flex items-center">
            <span className="bg-green-500 rounded-[50%] p-2 w-[2.2rem] h-[2.2rem] z-10">
              <p className="text-sm">{`${room.messages.length}`}</p>
              </span>
              <button className="bg-red-500 p-2 m-3 rounded z-10"
                onClick={() => { handleDelete(room._id) }}>
               <FaTrash/>
              </button>
            </div>
          </div>

        ))}
      </section>
    </>
  );
};

export default Chatrooms;

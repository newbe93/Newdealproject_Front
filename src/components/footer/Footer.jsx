import React, { useEffect } from 'react'
import useAuthStore from "@zustand/authStore"
import { IoPersonSharp } from "react-icons/io5";
import { BsChatText } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";


import { useNavigate } from 'react-router-dom';
function Footer() {
    const {accessToken, logout} = useAuthStore(); 

    const handleLogoutTabClick = () => {
        logout();
        navigate('/')
    }
    const navigate = useNavigate();
    return (
        <div className='flex fixed bottom-1 h-8 justify-around w-full'>
            <IoPersonSharp className='w-6 h-6' onClick={() => navigate('/friend')}/>
            <BsChatText className='w-6 h-6' onClick={() => navigate('/chat')}/>
            <FaMapMarkerAlt className='w-6 h-6' onClick={() => navigate('/location')}/>
            <MdLogout className='w-6 h-6' onClick={() => handleLogoutTabClick()}/>
        </div>
    )
}

export default Footer
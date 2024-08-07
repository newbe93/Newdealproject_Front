import React, { useEffect, useRef, useState } from 'react'
import api from '@api/interceptor'
import {useSocketStore} from '@zustand/socketStore';
import { LuUserPlus2 } from "react-icons/lu";
import toast from 'react-hot-toast';
import useAuthStore from "@zustand/authStore"
import { useNavigate } from 'react-router-dom';


function Friend({ moveMapToLocation }) {
    const { onlineUsers, socket } = useSocketStore();
    const {logout, accessToken} = useAuthStore();
    const isOnline = (userId) => {
        return onlineUsers.includes(String(userId));
    } 
    const [friendsList, setFriendsList] = useState([]);
    const [friendUsername, setFriendUsername] = useState('');
    const closeModalBtnRef = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
		console.log("isLoggedIn? = " + accessToken)
		if(!accessToken) navigate('/login')
	},[])

    const fetch = async() => {
        try{
            const response = await api.get('/api/v1/friendship')
            console.log(response)
            if(response.status === 401) {
                useAuthStore.getState().logout();
                throw new Error('시간이 초과하여 로그아웃 되었습니다.');
            }
            setFriendsList(response.data.data)
        }catch(error){
            console.log(error)
        }
        
        
    }

    const createFriendship = async () => {
        if(loading) return;

        setLoading(true)
        try {
            const response = await api.post(`/api/v1/friendship`,{
                username : friendUsername
            })
            console.log(response)
            if(response.status == 200){
                closeModalBtnRef.current.click();
                fetch();
            }
           
        } catch (error) {
            if(error.response.status == 404){
                toast.error("해당하는 아이디의 유저가 없습니다.")
            }
            if(error.response.status == 409){
                toast.error("이미 친구관계입니다.")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleFriendClick = (friend) => {
        moveMapToLocation(friend.username);
    };

    useEffect(()=>{
        // if()
        fetch();
    },[])

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">친구 추가</h3>
                    <form method="dialog" className='my-3'>
                        {/* if there is a button in form, it will close the modal */}
                        <input type="text" placeholder='아이디를 입력하세요' value={friendUsername} onChange={(e) => setFriendUsername(e.target.value)}/>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={closeModalBtnRef}>✕</button>
                    </form>
                    <div className='flex justify-end'>
                        <button className="btn btn-secondary" onClick={() => {createFriendship()}} disabled={loading}>친구 추가</button>
                    </div>
                </div>
            </dialog>
            <div className='px-4 w-full'>
                <header className="mt-9 h-8 mb-1 fixed left-0 top-0 px-4 w-full">
                    <div className="flex items-center w-full justify-between">
                        <div className="flex justify-center ml-5">
                            <p className="font-bold text-lg">친구</p>
                        </div>
                        <div className=''>
                            <LuUserPlus2 className='w-6 h-6' onClick={()=>document.getElementById('my_modal_3').showModal()}/>
                        </div>
                    </div>
                </header>
                <div className='mt-[75px] divider'>
                
                </div>
                <div>
                    {
                        friendsList.map(friend => 
                            <div key={friend.id} className='py-1' onClick={() => handleFriendClick(friend)}>
                                <div className='flex items-center gap-4'>
                                    <div className={`avatar ${isOnline(friend.id) ? "online" : ""}`}>
                                        <div className='w-12 rounded-full'>
                                            <img src={`https://avatar.iran.liara.run/public/boy?username=${friend.username}`} alt='user avatar' />
                                        </div>
                                    </div>
                                    <div>
                                        <p className='font-bold'>{friend.username}</p>
                                    </div>
                                </div>    
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Friend
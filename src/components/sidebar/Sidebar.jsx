import React, { useEffect, useRef, useState } from 'react'
import CHEVRON_LEFT_SOLID from "@assets/icons/chevron-left-solid.svg"
import { RiChatNewLine } from "react-icons/ri";
import Conversations from '@components/sidebar/Conversations'
import { useNavigate } from 'react-router-dom';
import {useSocketStore} from '@zustand/socketStore';
import api from "@api/interceptor"
import useGetConversations from "@hooks/useGetConversations"

const Sidebar = () => {
  const { onlineUsers, socket } = useSocketStore();
  
  const navigate = useNavigate();
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [chatRoomName, setChatRoomName] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const closeModalBtnRef = useRef();
  const [loading, setLoading] = useState(false)
  const isOnline = (userId) => {
      return onlineUsers.includes(String(userId));
  } 
  const fetch = async() => {
    try{
        const response = await api.get('/api/v1/friendship')
        if(response.status === 401) {
            useAuthStore.getState().logout();
            throw new Error('시간이 초과하여 로그아웃 되었습니다.');
        }
        setFriendsList(response.data.data)
    }catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
    fetch();
  },[])

  const handleCheckboxChange = (event) => {
    const friendId = event.target.value;
    if (event.target.checked) {
      setSelectedFriends(prev => [...prev, friendId]);
    } else {
      setSelectedFriends(prev => prev.filter(id => id !== friendId));
    }
  }

  const createChatRoom = async () => {
    if(loading) return;

    setLoading(true);
    try {
      const response = await api.post("/api/v1/chat", {
        id : selectedFriends,
        name : chatRoomName
      })
      if(response.status == 200){
        closeModalBtnRef.current.click();
        setRefreshKey(prev => prev + 1)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setSelectedFriends([]);
      setChatRoomName('')
    }
    
  }

  const isButtonDisabled = selectedFriends.length === 0 || chatRoomName.trim() === '' || loading;

  return (
    <div className='w-full'>
       <header className="mt-9 h-8 mb-1 fixed left-0 top-0 px-7 w-full">
          <div className="flex items-center w-full justify-between">
              {/* <div className="w-9 ml-2 flex-shrink-0">
                  <img src={CHEVRON_LEFT_SOLID} alt="back" className="w-6 h-6" onClick={() => navigate(-1)}/>
              </div> */}
              <div className="flex justify-center">
                  <p className="font-bold text-lg">채팅</p>
              </div>
              <div className="">
                <RiChatNewLine className='w-6 h-6' onClick={()=>document.getElementById('my_modal_3').showModal()}/>
              </div>
          </div>
      </header>
        {/* <SearchInput />
        <div className='divider px-3'></div> */}

        <Conversations refreshKey={refreshKey}/>
        
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">대화상대 선택</h3>
                <form method="dialog" className='my-4'>
                  {
                      friendsList.map(friend => 
                          <div key={friend.id} className='py-2'>
                              <div className='flex items-center gap-4'>
                                  <div className={`avatar ${isOnline(friend.id) ? "online" : ""}`}>
                                      <div className='w-12 rounded-full'>
                                          <img src={`https://avatar.iran.liara.run/public/boy?username=${friend.username}`} alt='user avatar' />
                                      </div>
                                  </div>
                                  <div>
                                      <p className='font-bold'>{friend.username}</p>
                                  </div>
                                  <div className='grow flex justify-end pr-2'>
                                  <input 
                                    type="checkbox" 
                                    className="checkbox checkbox-success" 
                                    name='chatRoomMembers' 
                                    value={friend.id}
                                    onChange={handleCheckboxChange}
                                    checked={selectedFriends.includes(String(friend.id))}
                                  />
                                  </div>
                              </div>    
                          </div>
                      )
                  }
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={closeModalBtnRef}>✕</button>
                </form>
                <div className='flex gap-3'>
                  <input type="text" placeholder="채팅방 이름을 입력해주세요" className="input input-bordered w-full max-w-xs" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)}/>
                  <button className="btn btn-secondary" disabled={isButtonDisabled} onClick={createChatRoom}>확인</button>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default Sidebar
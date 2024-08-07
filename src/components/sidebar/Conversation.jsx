import React, { useEffect } from 'react'
import useConversation from '@zustand/useConversation';
import {useSocketStore} from '@zustand/socketStore';
import useAuthStore from '@zustand/authStore';
import { useNavigate } from 'react-router-dom';
import { extractTime } from "@utils/extractTime";
import { formatMessageTime } from "@utils/formatMessageTime";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
	const navigate = useNavigate();


	const currentUsername = useAuthStore(state => state.username);
	const currentUserId = useAuthStore(state => state.id);

	const otherMember = conversation.members.find(member => member.username !== currentUsername);
	const otherUsername = otherMember?.username || '';
    const otherUserId = otherMember?.userId;

	const isSelected = selectedConversation?.chatRoomId === conversation.chatRoomId;
	const { onlineUsers, socket } = useSocketStore();
	// const isOnline = onlineUsers.includes(currentUserId);
	const isOnline = onlineUsers.includes(String(otherUserId));

	const lastMessage = conversation.lastMessage
	
	
	useEffect(()=>{
		// console.log(conversation)
		// console.log("other user = " + otherUserId)
		// console.log(socket)
		// console.log("onlineUser = " + onlineUsers)
		// console.log("isOnline ? = " , isOnline)
		console.log("lastMessage = " + lastMessage?.message)
		console.log(lastMessage)
	},[onlineUsers,conversation])

	return (
		<>
			<div
				className={`h-[75px] flex gap-2 items-center hover:bg-sky-500 rounded p-5 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => {setSelectedConversation(conversation); navigate(`/chat/${conversation.chatRoomId}`)}}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={`https://avatar.iran.liara.run/public/boy?username=${otherUsername}`} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-1 justify-between flex-col'>
						<p className='font-bold flex gap-2'>
							<span>{conversation.chatRoomName}</span>
							<span className='text-gray-400'>{conversation.members.length}</span>
							{
								lastMessage?.createdAt == undefined ? '' : <span className='grow text-right text-gray-300 font-semibold text-sm'>{formatMessageTime(lastMessage?.createdAt)}</span>
							}
						</p>
						<div className='text-sm flex'>
							<span>{lastMessage?.message}</span>
							<div className='grow flex justify-end items-center'>
								{
									conversation?.unreadCount == 0 || conversation?.unreadCount == undefined ? '' :
									<div className='flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white'><span>{conversation?.unreadCount}</span></div>
								}
							</div>
						</div>
					</div>
				</div>
			</div>

			
		</>
	);
}

export default Conversation
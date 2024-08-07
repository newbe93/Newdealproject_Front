import { useEffect } from "react";
import useConversation from "@zustand/useConversation";
import MessageInput from "@components/messages/MessageInput";
import Messages from "@components/messages/Messages";
import { TiMessages } from "react-icons/ti";
import useAuthStore from "@zustand/authStore";
import { useNavigate, useParams } from "react-router-dom";
import CHEVRON_LEFT_SOLID from "@assets/icons/chevron-left-solid.svg"

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { accessToken, id } = useAuthStore()
	const {chatRoomId} = useParams();
	const navigate = useNavigate();
	const currentUsername = useAuthStore(state => state.username);
	const otherMember = selectedConversation.members.find(member => member.username !== currentUsername);
	const otherUsername = otherMember?.username || '';
	
	useEffect(() => {
		// // cleanup function (unmounts)
		// return () => setSelectedConversation(null);
		const isChatRoomMember = selectedConversation.members.find(member => member.userId == id)
		setSelectedConversation({
			...selectedConversation,
			chatRoomId
		})
		console.log(selectedConversation)
	}, [setSelectedConversation, chatRoomId]);

	return (
		<div className='md:min-w-[450px] flex flex-col h-[100vh]'>
			<>
				{/* Header */}
				<div className=' px-4 py-4 pb-2 mb-2 flex items-center gap-3'>
				<img src={CHEVRON_LEFT_SOLID} alt="back" className="w-6 h-6" onClick={() => navigate('/chat')}/>
					<div className='chat-image avatar'>
						<div className='w-10 rounded-full'>
							<img alt='Tailwind CSS chat bubble component' src={`https://avatar.iran.liara.run/public/boy?username=${otherUsername}`} />
						</div>
					</div>
					<div className="flex gap-2">
						<span className='text-gray-900 font-bold'>{selectedConversation.chatRoomName}</span>
						<span className='text-gray-400 font-bold'>{selectedConversation.members.length}</span>
					</div>
					<div className="flex">
						<span>{`(`}</span>
						<div className="flex gap-1">
							{
								selectedConversation.members.map((member,index) => 
									<span key={index}>
										<span>{member.username}</span>
										{index == selectedConversation.members.length -1 ? '' : <span>,</span>}
									</span>
								)
							}
						</div>
						<span>{`)`}</span>
					</div>
					<div>

					</div>
				</div>
				<Messages key={chatRoomId}/>
				<MessageInput />
			</>
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const {username} = useAuthStore(state => state)
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {username} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;

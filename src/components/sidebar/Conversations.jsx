import React, { useEffect } from "react";
import Conversation from "@components/sidebar/Conversation";
import useGetConversations from "@hooks/useGetConversations";
import useAuthStore from "@zustand/authStore";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	const {accessToken} = useAuthStore(state => state)
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation.chatRoomId}
					conversation={conversation}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;
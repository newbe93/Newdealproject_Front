// import React, { useEffect } from "react";
// import Conversation from "@components/sidebar/Conversation";
// import useGetConversations from "@hooks/useGetConversations";
// import useAuthStore from "@zustand/authStore";

// const Conversations = () => {
// 	const { loading, conversations } = useGetConversations();
// 	const {accessToken} = useAuthStore(state => state)
	
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto mt-[75px] w-full'>
// 			{conversations.map((conversation, idx) => (
// 				<Conversation
// 					key={conversation.chatRoomId}
// 					conversation={conversation}
// 					lastIdx={idx === conversations.length - 1}
// 				/>
// 			))}

// 			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
// 		</div>
// 	);
// };
// export default Conversations;

import React, { useEffect, useState } from "react";
import Conversation from "@components/sidebar/Conversation";
import useGetConversations from "@hooks/useGetConversations";
import useGetLastMessages from "@hooks/useGetLastMessages";
import useAuthStore from "@zustand/authStore";
import useListenMessages from "@hooks/useListenMessages";
import { useNavigate } from "react-router-dom";

const Conversations = () => {
    const { loading: conversationsLoading, conversations } = useGetConversations();
    const { lastMessages, loading: lastMessagesLoading } = useGetLastMessages(conversations);
    const [combinedConversations, setCombinedConversations] = useState([]);
    const { accessToken } = useAuthStore(state => state);
    const navigate = useNavigate();
    const handleNavigate = (chatRoomId) => {
        navigate(`/chat/${chatRoomId}`);
      };
    
    useListenMessages(handleNavigate);

    useEffect(() => {
        if (conversations.length > 0 && lastMessages) {
            const combined = conversations.map(conv => {
                console.log("lastMessages = " + lastMessages)
                const lastMessage = lastMessages.find(msg => msg.chatRoomId == conv.chatRoomId);
                console.log(conv)
                return { ...conv, ...lastMessage };
            });

              // 최근 메시지 순으로 정렬
              const sortedCombined = combined.sort((a, b) => {
                const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt) : new Date(0);
                const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt) : new Date(0);
                return dateB - dateA; // 내림차순 정렬 (최신 날짜가 먼저)
            });

            setCombinedConversations(sortedCombined);
            // setCombinedConversations(combined);
            
        }

        
		console.log("combinedConnversations = " + combinedConversations)
		console.log(combinedConversations)
    }, [conversations, lastMessages]);

    const loading = conversationsLoading || lastMessagesLoading;

    return (
        <div className='py-2 flex flex-col overflow-auto mt-[75px] w-full'>
            {combinedConversations.map((conversation, idx) => (
                <Conversation
                    key={conversation.chatRoomId}
                    conversation={conversation}
                    lastIdx={idx === combinedConversations.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};

export default Conversations;
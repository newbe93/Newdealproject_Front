import { useEffect, useState } from "react";
import useConversation from "@zustand/useConversation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const navigate = useNavigate();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			setMessages([])
			try {
				const res = await fetch(`/socket/messages/${selectedConversation.chatRoomId}`);
				const data = await res.json();
				console.log(res.status)
				if (res.status === 403) {
					// 접근 권한 없음
					toast.error(data.error);
					navigate('/chat');  // 채팅 목록 페이지로 리다이렉트
					return;
				}

				if (res.status === 404) {
					// 채팅방을 찾을 수 없음
					toast.error(data.error);
					navigate('/chat');  // 채팅 목록 페이지로 리다이렉트
					return;
				  }

				if(res.status === 401 ) {
					toast.error("refresToken 없음")
				}
		
				if (!res.ok) {
					throw new Error('메시지를 불러오는 데 실패했습니다.');
				}

				
				setMessages(data);

			} catch (error) {
				console.log(error.status)
				toast.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?.chatRoomId) getMessages();
		return () => {
			getMessages();
		}
	}, [selectedConversation?.chatRoomId, setMessages]);

	return { messages, loading };
};
export default useGetMessages;

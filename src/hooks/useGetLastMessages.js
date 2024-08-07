import { useEffect, useState } from "react";
import useConversation from "@zustand/useConversation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useGetLastMessages = (conversations) => {
    const [loading, setLoading] = useState(false);
    const {lastMessages, setLastMessages} = useConversation()
    const navigate = useNavigate();

    useEffect(() => {
        const getLastMessages = async () => {
            if (!conversations || conversations.length === 0) return;

            setLoading(true);
            try {
                const chatRoomIds = conversations.map(conv => conv.chatRoomId);
                const res = await fetch(`/socket/chatrooms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatRoomIds
                    })
                });

                const data = await res.json();

                if (res.status === 403 || res.status === 404) {
                    toast.error(data.error);
                    navigate('/chat');
                    return;
                }

                if (!res.ok) {
                    throw new Error('메시지를 불러오는 데 실패했습니다.');
                }
                console.log("useGetLstmesage " + data)
                console.log(data)
                setLastMessages(data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getLastMessages();
    }, [conversations, navigate]);

    return { lastMessages, loading };
};

export default useGetLastMessages;
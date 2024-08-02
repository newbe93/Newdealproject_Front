import {useSocketStore} from "@zustand/socketStore"
import useConversation from "@zustand/useConversation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import ChatCustomToast from "@components/toast/ChatCustomToast"



const useListenMessages = (onNavigate) => {
    const {socket} = useSocketStore()
    const {messages, setMessages, lastMessages ,setLastMessages,updateLastMessages}  = useConversation()


    useEffect(() => {
        console.log("새로운 맷메지?")
        console.log(socket)
        socket?.on("newMessage", (newMessage) => {
            // newMessage.shouldShake = true;
            // const sound = new Audio(notificationSound);
            // sound.play();
            setMessages([...messages, newMessage.lastMessage]);
            // 토스트 호출
            // toast.custom(
            //     (t) => (<ChatCustomToast
            //         t={t}
            //         senderName={newMessage.lastMessage.sendername}
            //         message={newMessage.lastMessage.message}
            //       />
            //     ),
            //     {
            //       duration: 5000,
            //       position: 'top-right',
            //     }
            //   );
            toast.custom((t) => 
                ChatCustomToast({
                    t: t,
                    senderName: newMessage.lastMessage.sendername,
                    message: newMessage.lastMessage.message,
                    chatRoomId : newMessage.chatRoomId,
                    onNavigate : onNavigate
                  }),
                  {
                    duration: 2000,
                    position: 'top-right',
                  }
            )
              
          
            // toast(`${newMessage.lastMessage.sendername} ${newMessage.lastMessage.message}`)
             
            // lastMessages 업데이트
             updateLastMessages(prevLastMessages => {
                const updatedLastMessages = prevLastMessages.map(msg => {
                    if (msg.chatRoomId == newMessage.chatRoomId) {
                        return {
                            ...msg,
                            lastMessage: newMessage.lastMessage,
                            unreadCount: (msg.unreadCount || 0) + 1
                        };
                    }
                    return msg;
                });
                
                return updatedLastMessages;
            });
            

        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, setLastMessages, updateLastMessages]);
}

export default useListenMessages
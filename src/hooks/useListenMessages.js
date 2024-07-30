import useSocketStore from "@zustand/socketStore"
import useConversation from "@zustand/useConversation"

const useListenMessages = () => {
    const {socket} = useSocketStore()
    const {messages, setMessages}  = useConversation()


    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages
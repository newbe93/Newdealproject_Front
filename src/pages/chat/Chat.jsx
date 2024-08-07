import MessageContainer from "@components/messages/MessageContainer";
import Sidebar from "@components/sidebar/Sidebar";
import { useSocketSetup } from "@zustand/socketStore";
import { useEffect } from "react";
import useAuthStore from "@zustand/authStore";
import { useNavigate } from "react-router-dom";

const Chat = () => {
	const {isLoggedin} = useAuthStore(state => state)
	const navigate = useNavigate();
	useEffect(()=>{
		console.log("isLoggedIn? = " + isLoggedin)
		if(!isLoggedin) navigate('/login')
	},[])
		
	  
	return (
		<div className='flex grow w-full sm:h-full md:h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			{/* <MessageContainer /> */}
		</div>
	);
};
export default Chat;

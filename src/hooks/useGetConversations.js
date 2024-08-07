import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import api from "@api/interceptor";
import useAuthStore from "@zustand/authStore";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const {accessToken} = useAuthStore(state => state)
  
  const getConversations = async () => {
    setLoading(true);
    try {
        const res = await api.get('/api/v1/chat');
        
        console.log(res.data)
        if(res.data.error){
            console.log("getConversations Error = " + res.data.error)
            throw new Error(res.data.error);
        }
        setConversations(res.data.data);
    } catch (error) {
        console.log("getConversations Error = " + error)
        // toast.error(error.message + "accesToken이 없어요");
    } finally {
        setLoading(false);
    }
}


  useEffect(()=>{
   

    getConversations();
  },[])

  return {loading, conversations, refetch: getConversations};
}

export default useGetConversations
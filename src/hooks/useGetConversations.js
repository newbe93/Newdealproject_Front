import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import api from "@api/interceptor";
import useAuthStore from "@zustand/authStore";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const {accessToken} = useAuthStore(state => state)
  

  useEffect(()=>{
    const getConversations = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/v1/chat');
            
            console.log(res.data)
            if(res.data.error){
                throw new Error(data.error);
            }
            setConversations(res.data.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    getConversations();
  },[])

  return {loading, conversations};
}

export default useGetConversations
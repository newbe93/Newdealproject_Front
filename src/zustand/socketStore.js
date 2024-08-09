import { create } from 'zustand';
import io from 'socket.io-client';
import useAuthStore from "@zustand/authStore"
import { useEffect } from 'react';
const SOCKET_API_URL = import.meta.env.VITE_SOCKET_API_URL;

export const useSocketStore = create((set) => ({
  socket: null,
  onlineUsers: [],
  initializeSocket: () => {
    const authUser = useAuthStore.getState().id;

    if (authUser) {
      const socket = io(SOCKET_API_URL, {
        query: {
          userId: authUser,
        },
      });

      set({ socket });

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        set({ onlineUsers: users });
      });

      

      return () => {
        socket.close();
        set({ socket: null, onlineUsers: [] });
      };
    }
  },
  disconnectSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.close();
      }
      return { socket: null, onlineUsers: [] };
    });
  },
}));

// 소켓 연결 및 해제를 관리하는 커스텀 훅
export const useSocketSetup = () => {
  const initializeSocket = useSocketStore(state => state.initializeSocket);
  const disconnectSocket = useSocketStore(state => state.disconnectSocket);
  const authUser = useAuthStore(state => state.id);

  useEffect(() => {
    if (authUser) {
      initializeSocket();
    } else {
      disconnectSocket();
    }
    
    return () => {
      disconnectSocket();
    };
  }, [authUser, initializeSocket, disconnectSocket]);
};

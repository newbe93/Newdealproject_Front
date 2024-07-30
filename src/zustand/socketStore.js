import { create } from 'zustand';
import io from 'socket.io-client';

const useSocketStore = create((set) => ({
  socket: null,
  onlineUsers: [],
  initSocket: (authUser) => {
    if (authUser) {
      const socket = io("https://chat-app-yt.onrender.com", {
        query: {
          userId: authUser._id,
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
  closeSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.close();
      }
      return { socket: null, onlineUsers: [] };
    });
  },
}));

export default useSocketStore;
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useConversation = create(
    persist(
        (set) => ({
            selectedConversation : null,
            setSelectedConversation : (selectedConversation) => set({selectedConversation}),
            messages : [],
            setMessages : (messages) => set({messages}),
            lastMessages : null,
            setLastMessages : (messages) => set({lastMessages : messages}),
            updateLastMessages: (updateFunction) => set((state) => ({
                lastMessages: updateFunction(state.lastMessages),
            })),
            unreadCount : null,
            setUnreadCount : (unreadCount) => set({unreadCount})
        }),
        {
            name : "conversation-storage",
            storage : createJSONStorage(() => localStorage)
        }
    )
    

)

export default useConversation;
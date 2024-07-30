import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            accessToken : null,
            isLoggedin : false,
            username : null,
            id : 0,
            setAccessToken: (accessToken) => set({ accessToken, isLoggedin: true }),
            setUser: (username) => set({ username }),
            setId: (id) => set({ id }),
            logout: () => set({
                accessToken: null,
                isLoggedin: false,
                username: null,
                id: 0
            }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
          }
    )
   
)

export default useAuthStore
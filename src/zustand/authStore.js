import { create } from "zustand";

export const useAuthStore = create(
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
    })
)

export default useAuthStore
import { create } from "zustand";

const anyStore = create(
    (set) => ({
        any : null,
        setAny : (any) => (set({any : any}))
    })
)

export default anyStore;
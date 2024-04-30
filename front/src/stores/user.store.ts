import { create } from "zustand";

interface UserStore {
    role: string,
    setRole: (role: string) => void,
}

const useUserStore = create<UserStore>(set => ({
    role: '',
    setRole: (role: string) => set(state => ({ ...state, role }))
}));

export default useUserStore;
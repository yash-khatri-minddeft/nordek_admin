import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            setUser: (userInfo) =>
                set({
                    user: userInfo.payload,
                }),
            unsetUser: () => set({ user: null }),
            toggleTwoFA: () => {
                const user = get().user
                const newUser = { ...user, otp: !user.otp }
                set({ user: newUser })
            },
        }),
        {
            name: 'user-storage',
            getStorage: () => localStorage,
        }
    )
)

import create from 'zustand'

export const useAuthErrorStore = create((set) => ({
    authError: false,
    otpError: false,
    invalidCodeError: false,
    setAuthError: () => set({ authError: true }),
    unsetAuthError: () => set({ authError: false }),
    setOtpError: () => set({ otpError: true }),
    unsetOtpError: () => set({ otpError: false }),
    setInvalidCode: () => set({ invalidCodeError: true }),
    unsetInvalidCode: () => set({ invalidCodeError: false }),
}))

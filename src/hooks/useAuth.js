import { shallow } from 'zustand/shallow'
import { useCallback, useState } from 'react'
import { authService } from '../api/service/authService'
import { useUserStore } from '../store/userStore'
import { useAuthErrorStore } from '../store/authErrorStore'

const EMAIL_EXISTS_MESSAGE = 'Email alredy exist'
const OTP_INVALID = 'Otp invalid'

export function useAuth() {
    const [emailError, setEmailError] = useState('')

    const { setUser, unsetUser } = useUserStore(
        ({ setUser, unsetUser }) => ({
            setUser,
            unsetUser,
        }),
        shallow
    )
    const {
        setAuthError,
        unsetAuthError,
        setOtpError,
        unsetOtpError,
        setInvalidCode,
        unsetInvalidCode,
    } = useAuthErrorStore(
        ({
            setAuthError,
            unsetAuthError,
            setOtpError,
            unsetOtpError,
            setInvalidCode,
            unsetInvalidCode,
        }) => ({
            setAuthError,
            unsetAuthError,
            setOtpError,
            unsetOtpError,
            setInvalidCode,
            unsetInvalidCode,
        }),
        shallow
    )

    const login = useCallback(async (data) => {
        try {
            unsetAuthError()
            unsetOtpError()
            unsetInvalidCode()
            const response = await authService.login(data)
            localStorage.setItem('token', response.accessToken)
            localStorage.setItem('refresh-token', response.refreshToken)
            setUser(response)
        } catch (err) {
            if (err.response.data.statusCode === 500) {
                setOtpError()
                return
            }
            if (
                err.response.status === 400 &&
                err.response.data.message === OTP_INVALID
            ) {
                setInvalidCode()
                return
            }
            if (err.response.status === 404 || err.response.status === 400) {
                setAuthError()
            }
            console.error(err)
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('refresh-token')
            unsetUser()
        } catch (err) {
            console.error(err)
        }
    }, [])

    const changePassword = useCallback(async (data) => {
        const requestData = { ...data }
        delete requestData.repeatNewPassword

        try {
            await authService.changePassword(requestData)
            return true
        } catch (err) {
            console.error(err)
            return err
        }
    }, [])

    const changePasswordByAdmin = useCallback(async (data) => {
        try {
            await authService.changePasswordByAdmin(data)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    const registerByAdmin = useCallback(async (registerData) => {
        try {
            await authService.registerByAdmin(registerData)
            return true
        } catch (err) {
            if (err?.response?.data?.message === EMAIL_EXISTS_MESSAGE) {
                setEmailError('Email already exists')
            }
            console.error(err)
        }
    }, [])

    const resetEmailError = useCallback(async () => {
        setEmailError('')
    }, [])

    return {
        login,
        logout,
        changePassword,
        changePasswordByAdmin,
        registerByAdmin,
        emailError,
        resetEmailError,
    }
}

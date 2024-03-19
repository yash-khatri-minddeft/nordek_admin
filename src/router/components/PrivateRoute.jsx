import React from 'react'
import { Navigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { ROUTES } from '../constants/routes'
import { useUserStore } from '../../store/userStore'

export const PrivateRoute = ({ children }) => {
    const { user } = useUserStore(({ user }) => ({ user }), shallow)

    return user !== null ? children : <Navigate to={ROUTES.login} />
}

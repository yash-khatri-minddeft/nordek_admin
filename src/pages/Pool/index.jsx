import React from 'react'
import { Outlet } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { AutoColumn } from '../../components/styled'
import Title from '../../components/Title'
import { useUserStore } from '../../store/userStore'
import { MANAGE_PAIR } from '../../constants/roles'
import PoolTabs from './components/PoolTabs'

const Pool = () => {
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_PAIR)

    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Pool Liquidity.</Title>
            )}
            {hasRole !== undefined && (
                <AutoColumn gap="lg">
                    <Title>Pool Liquidity</Title>
                    <div>
                        <PoolTabs />
                        <Outlet />
                    </div>
                </AutoColumn>
            )}
        </>
    )
}

export default Pool

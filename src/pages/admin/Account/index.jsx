import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import { AutoColumn } from '../../../components/styled'
import Title from '../../../components/Title'
import { TextPrimary } from '../../../components/Text'
import { useUserStore } from '../../../store/userStore'
import AccountTabs from './components/AccountTabs'

const IdText = styled(TextPrimary)`
    font-size: 16px;
`

const Account = () => {
    const { user } = useUserStore(({ user }) => ({ user }), shallow)

    return (
        <>
            <AutoColumn gap="xl">
                <div>
                    <Title>{user?.name}</Title>
                    <IdText fontSize={16} fontWeight={400} lineHeight="26.4px">
                        ID {user?.id}
                    </IdText>
                </div>

                <div>
                    <AccountTabs />
                    <Outlet />
                </div>
            </AutoColumn>
        </>
    )
}

export default Account

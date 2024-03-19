import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Flex } from '../../../../components/styled'
import { Tab } from '../../../../components/Tab'
import { ROUTES } from '../../../../router/constants/routes'

const AccountTabs = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Flex>
            <Tab
                onClick={() => navigate(ROUTES.account)}
                active={String(location.pathname === ROUTES.account)}
            >
                Change Password
            </Tab>
            <Tab
                onClick={() => navigate(ROUTES.two_fa)}
                active={String(location.pathname === ROUTES.two_fa)}
            >
                Two-Factor Authentication
            </Tab>
        </Flex>
    )
}

export default AccountTabs

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Flex } from '../../../components/styled'
import { ROUTES } from '../../../router/constants/routes'
import { Tab } from '../../../components/Tab'

const Tabs = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Flex>
            <Tab
                onClick={() => navigate(ROUTES.swap)}
                active={String(location.pathname === ROUTES.swap)}
            >
                Pairs
            </Tab>
            <Tab
                onClick={() => navigate(ROUTES.tokens)}
                active={String(location.pathname === ROUTES.tokens)}
            >
                Tokens
            </Tab>
            <Tab
                onClick={() => navigate(ROUTES.transactions)}
                active={String(location.pathname === ROUTES.transactions)}
            >
                Transactions
            </Tab>
        </Flex>
    )
}

export default Tabs

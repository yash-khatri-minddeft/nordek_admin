import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Flex } from '../../../components/styled'
import { ROUTES } from '../../../router/constants/routes'
import { Tab } from '../../../components/Tab'

const PoolTabs = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Flex>
            <Tab
                onClick={() => navigate(ROUTES.pool)}
                active={String(location.pathname === ROUTES.pool)}
            >
                General
            </Tab>
            <Tab
                onClick={() => navigate(ROUTES.history)}
                active={String(location.pathname === ROUTES.history)}
            >
                Transaction history
            </Tab>
        </Flex>
    )
}

export default PoolTabs

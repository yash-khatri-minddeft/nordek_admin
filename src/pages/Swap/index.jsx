import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useQuery } from '@apollo/client'
import { AutoColumn } from '../../components/styled'
import { TEXT } from '../../theme'

import Title from '../../components/Title'
import { useUserStore } from '../../store/userStore'
import { MANAGE_SWAP } from '../../constants/roles'
import Tabs from './components/Tabs'
import { FACTORY_VOLUME_QUERY } from './query'

const VolumeSection = styled.div`
    color: ${({ theme }) => theme.textPrimary};
    background-color: ${({ theme }) => theme.white};
    padding: 32px 24px;
    border-radius: 8px;
`

const Swap = () => {
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_SWAP)

    const FACTORY_ADDRESS = process.env.REACT_APP_FACTORY_ADDRESS

    const { data, loading } = useQuery(FACTORY_VOLUME_QUERY, {
        variables: { id: FACTORY_ADDRESS },
    })

    const totalVolume = loading
        ? '0'
        : data?.bidelityFactory?.totalVolumeUSD || '0'
    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Exchange/Swap.</Title>
            )}
            {hasRole !== undefined && (
                <AutoColumn gap="lg">
                    <Title>Exchange/Swap</Title>
                    <VolumeSection>
                        <AutoColumn gap="sm">
                            <TEXT.default fontSize={16} fontWeight={500}>
                                Volume 24h
                            </TEXT.default>
                            <TEXT.default fontSize={24} fontWeight={600}>
                                ${Number(totalVolume).toFixed(2)}
                            </TEXT.default>
                        </AutoColumn>
                    </VolumeSection>
                    <div>
                        <Tabs />
                        <Outlet />
                    </div>
                </AutoColumn>
            )}
        </>
    )
}

export default Swap

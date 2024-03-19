import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { shallow } from 'zustand/shallow'
import {
    AutoColumn,
    Flex,
    FlexAlign,
    Icon,
    RowBetween,
} from '../../components/styled'
import BackIcon from '../../assets/svg/back.svg'
import { TEXT } from '../../theme'
import { ROUTES } from '../../router/constants/routes'
import Toggle from '../../components/Toggle'
import { useCopy } from '../../hooks/useCopy'
import CopyWindow from '../../components/CopyWindow'
import { useWallet } from '../../hooks/useWallet'
import { calculateEarnedTokens } from '../../utils/calculateEarnedTokens'
import { useUserStore } from '../../store/userStore'
import { MANAGE_USERS_ACCOUNT } from '../../constants/roles'
import Title from '../../components/Title'
import { BottomInfo, TopInfo } from './components/InfoSections'
import { USER_INFO_QUERY } from './query'

const ToggleSection = styled(Flex)`
    flex-direction: column;
    align-items: center;
`

const User = () => {
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find(
        (role) => role.name === MANAGE_USERS_ACCOUNT
    )
    const { getWalletById, toggleWallet } = useWallet()
    const navigate = useNavigate()
    const { id } = useParams()
    const [walletInfo, setWalletInfo] = useState({})

    const { data } = useQuery(USER_INFO_QUERY, {
        variables: { id: walletInfo?.address?.toLowerCase() },
    })

    const [isActive, setIsActive] = useState(false)

    const { isCopied, closeCopyWindow, openCopyWindow } = useCopy()

    const navigateToUsers = () => {
        navigate(ROUTES.users)
    }

    const getWallet = async () => {
        const data = await getWalletById(id)
        setIsActive(data?.isActive)
        setWalletInfo(data)
    }

    useEffect(() => {
        getWallet()
    }, [])

    const onChange = (value) => {
        setIsActive(value)
        toggleWallet({ id, value: value })
    }

    const totalShareThePools = data?.liquidityPositions?.length || 0
    const tokensEarned =
        data && data?.liquidityPositions
            ? calculateEarnedTokens(data.liquidityPositions)
            : '-'

    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Users Account.</Title>
            )}
            {isCopied && <CopyWindow onClose={closeCopyWindow} />}
            {hasRole !== undefined && (
                <AutoColumn gap="33px">
                    <RowBetween>
                        <FlexAlign>
                            <Icon
                                width="25px"
                                height="25px"
                                onClick={navigateToUsers}
                            >
                                <img src={BackIcon} alt="back" />
                            </Icon>
                            <TEXT.primary
                                fontWeight={600}
                                fontSize={18}
                                lineHeight="27px"
                                style={{ marginLeft: '8px' }}
                            >
                                {id}
                            </TEXT.primary>
                        </FlexAlign>
                        <ToggleSection>
                            <TEXT.primary
                                fontWeight={600}
                                fontSize={12}
                                lineHeight="20.4px"
                                style={{ marginBottom: '4px' }}
                            >
                                Block / Unblock
                            </TEXT.primary>
                            <Toggle value={isActive} onChange={onChange} />
                        </ToggleSection>
                    </RowBetween>
                    {walletInfo && (
                        <TopInfo
                            walletInfo={walletInfo}
                            openCopyWindow={openCopyWindow}
                        />
                    )}
                    <BottomInfo
                        totalShare={totalShareThePools}
                        tokensEarned={tokensEarned}
                    />
                </AutoColumn>
            )}
        </>
    )
}

export default User

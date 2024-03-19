import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import LogoIcon from '../assets/img/logo-white.png'
import LogoutIcon from '../assets/svg/logout.svg'
// import { TEXT } from '../theme'
import { ROUTES } from '../router/constants/routes'
import { useAuth } from '../hooks/useAuth'
import { useUserStore } from '../store/userStore'
import { Centered, Image, RowBetween } from './styled'

const Title = styled.a`
    display: flex;
    align-items: center;
    pointer-events: auto;
    justify-self: flex-start;
    margin-right: 0.75rem;
    text-decoration: none;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
    :hover {
        cursor: pointer;
    }
`

const HeaderFrame = styled(RowBetween)`
    padding: 16px 20px;
    background-color: ${({ theme }) => theme.bg2};
`

const UserNameText = styled.p`
    color: ${({ theme }) => theme.text1};
    font-weight: 600;
    font-size: 14px;
    margin-right: 16px;
    cursor: pointer;
`

const Header = () => {
    const { logout } = useAuth()
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const navigate = useNavigate()
    const navigateToAccount = () => navigate(ROUTES.account)

    return (
        <HeaderFrame>
            <Title href="/">
                <img src={LogoIcon} width={200} alt="logo" />
                {/* <TEXT.white fontWeight={800} fontSize={20} marginLeft="8px">
                    NORSWAP
                </TEXT.white> */}
            </Title>
            {user !== null ? (
                <Centered>
                    <UserNameText onClick={navigateToAccount}>
                        {user?.name}
                    </UserNameText>
                    <Image
                        onClick={logout}
                        width="24px"
                        height="24px"
                        src={LogoutIcon}
                        alt="logo"
                    />
                </Centered>
            ) : (
                <div />
            )}
        </HeaderFrame>
    )
}

export default Header

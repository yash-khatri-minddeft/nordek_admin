import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { TEXT } from '../../theme'

const TabWrapper = styled(NavLink)`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 13px 16px;
    color: ${({ active, theme }) =>
        active === 'true' ? theme.white : theme.textPrimary};
    background-color: ${({ active, theme }) =>
        active === 'true' ? theme.primary1 : 'transparent'};
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;

    :hover {
        opacity: 0.9;
        background-color: ${({ active, theme }) =>
            active === 'true' ? theme.primary1 : theme.border1};
    }

    img {
        width: 15px;
        height: 15px;
    }
`

const MenuTab = ({ icon, iconActive, title, link, isOpen }) => {
    const location = useLocation()
    const isActive = location.pathname.includes(link)

    return (
        <TabWrapper to={link} active={isActive.toString()}>
            <img src={isActive ? iconActive : icon} alt="icon" />
            {isOpen && <TEXT.default marginLeft="16px">{title}</TEXT.default>}
        </TabWrapper>
    )
}

export default MenuTab

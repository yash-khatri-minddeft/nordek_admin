import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RowBetween } from '../styled'
import OpenMenuIcon from '../../assets/svg/open-menu.svg'
import CloseMenuIcon from '../../assets/svg/close-menu.svg'
import { menuLinks } from '../../router/constants/routes'
import MenuTab from './MenuTab'

const Container = styled.div`
    min-height: 100vh;
    padding: 14px;
    background-color: ${({ theme }) => theme.white};
`

const Icon = styled.div`
    cursor: pointer;
    :hover {
        opacity: 0.6;
    }
    img {
        width: 24px;
        height: 24px;
    }
`

const TopRow = styled(RowBetween)`
    margin-bottom: 16px;
`
const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        const isMenuOpen = localStorage.getItem('sidebar')
        if (isMenuOpen === null || isMenuOpen === undefined) return
        const openSidebar = isMenuOpen === 'true'
        setIsOpen(openSidebar)
    }, [])

    const openMenu = () => {
        localStorage.setItem('sidebar', String(true))
        setIsOpen(true)
    }

    const closeMenu = () => {
        localStorage.setItem('sidebar', String(false))
        setIsOpen(false)
    }

    return (
        <Container>
            <TopRow>
                <div />
                <Icon onClick={isOpen ? closeMenu : openMenu}>
                    <img
                        src={isOpen ? CloseMenuIcon : OpenMenuIcon}
                        alt="icon"
                    />
                </Icon>
            </TopRow>
            {menuLinks.map(({ icon, iconActive, title, link }) => (
                <MenuTab
                    key={title}
                    link={link}
                    icon={icon}
                    iconActive={iconActive}
                    title={title}
                    isOpen={isOpen}
                />
            ))}
        </Container>
    )
}

export default SideMenu

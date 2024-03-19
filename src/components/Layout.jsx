import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { PageWrapper } from './PageWrapper'
import Header from './Header'
import SideMenu from './SideMenu'

const Body = styled.main`
    display: flex;
    background-color: ${({ theme }) => theme.bg1};
`

const Content = styled.div`
    position: relative;
    flex: 1;
    padding: 38px 20px 22px;
`

const Layout = ({ children }) => {
    const location = useLocation()
    const loginPage = location.pathname === '/login'

    return (
        <>
            {loginPage ? (
                children
            ) : (
                <PageWrapper>
                    <Header />
                    <Body>
                        <SideMenu />
                        <Content>{children}</Content>
                    </Body>
                </PageWrapper>
            )}
        </>
    )
}

export default Layout

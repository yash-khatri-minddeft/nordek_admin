import React from 'react'
import styled from 'styled-components'
import { PageWrapper } from '../../components/PageWrapper'
import Header from '../../components/Header'
import LoginForm from './components/LoginForm'

const LoginBody = styled.main`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Login = () => {
    return (
        <PageWrapper>
            <Header />
            <LoginBody>
                <LoginForm />
            </LoginBody>
        </PageWrapper>
    )
}

export default Login

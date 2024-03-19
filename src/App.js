import React from 'react'
import styled from 'styled-components'
import { Router } from './router'
import Layout from './components/Layout'

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`

function App() {
    return (
        <Wrapper>
            <Layout>
                <Router />
            </Layout>
        </Wrapper>
    )
}

export default App

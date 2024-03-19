import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'

export const apolloClient = new ApolloClient({
    // uri: 'https://api.thegraph.com/subgraphs/name/alexsandrbarabash/test-2',
    // uri: 'https://api.thegraph.com/subgraphs/name/yash-khatri-minddeft/chief-finance-graph',
    uri: 'https://subgraph-mainnet.nordek.io/subgraphs/name/technordek/nordek-subgraph-main',
    cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <FixedGlobalStyle />
        <ThemeProvider>
            <ThemedGlobalStyle />
            <div id="portal" />
            <ApolloProvider client={apolloClient}>
                <HashRouter>
                    <App />
                </HashRouter>
            </ApolloProvider>
        </ThemeProvider>
    </>
)

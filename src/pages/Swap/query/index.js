import { gql } from 'graphql-tag'

export const PAIRS_INFO_QUERY = gql`
    {
        pairs(orderBy: id, orderDirection: desc) {
            id
            volumeUSD
            totalSupply
            bidelityProfit
            token0 {
                id
                symbol
            }
            token1 {
                id
                symbol
            }
            swapsAmount
        }
    }
`

export const TOKENS_INFO_QUERY = gql`
    {
        tokens(orderBy: id, orderDirection: desc) {
            id
            symbol
            name
            decimals
            pairBase(orderBy: id, orderDirection: desc) {
                id
                token0 {
                    id
                    symbol
                }
                token1 {
                    id
                    symbol
                }
            }
        }
    }
`

export const TRANSACTIONS_INFO_QUERY = gql`
    {
        swaps(orderBy: id, orderDirection: desc) {
            id
            timestamp
            token0Price
            token1Price
            from
            fee
            hash
            pair {
                token0 {
                    id
                    symbol
                }
                token1 {
                    id
                    symbol
                }
            }
        }
    }
`

export const FACTORY_VOLUME_QUERY = gql`
    query bidelityFactory($id: Bytes!) {
        bidelityFactory(id: $id) {
            totalVolumeUSD
        }
    }
`

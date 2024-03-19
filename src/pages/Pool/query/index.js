import { gql } from 'graphql-tag'

export const POOL_GENERAL_QUERY = gql`
    {
        pairs(orderBy: id, orderDirection: desc) {
            id
            lock
            swapsAmount
            volumeUSD
            liquidityProviderCount
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
            reserve0
            reserve1
            pairHourData {
                hourlyVolumeUSD
            }
        }
    }
`
export const POOL_TRANSACTIONS_QUERY = gql`
    {
        poolTransactions {
            user {
                id
            }
            id
            timestamp
            transactionAmount
            fee
            type
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

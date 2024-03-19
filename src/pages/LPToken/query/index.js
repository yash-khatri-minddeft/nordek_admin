import { gql } from 'graphql-tag'

export const LP_TOKEN_QUERY = gql`
    {
        pairs(orderBy: id, orderDirection: desc) {
            id
            token0 {
                id
                symbol
            }
            token1 {
                id
                symbol
            }
            totalSupply
            burned
            issued
        }
    }
`

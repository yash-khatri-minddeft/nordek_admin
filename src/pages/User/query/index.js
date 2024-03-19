import { gql } from 'graphql-tag'

export const USER_INFO_QUERY = gql`
    query getUserInfo($id: Bytes!) {
        liquidityPositions(where: { user: $id }) {
            user {
                id
            }
            liquidityTokenBalance
        }
    }
`

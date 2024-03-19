import styled from 'styled-components'
import { Flex } from './styled'

export const InfoSection = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 10px 10px 10px;
`

export const Bottom = styled(Flex)`
    width: 100%;
    justify-content: flex-end;
`

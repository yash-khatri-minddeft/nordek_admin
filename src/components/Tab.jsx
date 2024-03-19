import styled from 'styled-components'
import { Centered } from './styled'

export const Tab = styled(Centered)`
    width: 100%;
    max-width: 260px;
    padding: 16px 12px;
    border-radius: 8px 8px 0 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 25.6px;
    color: ${({ theme }) => theme.textPrimary};
    background-color: ${({ theme, active }) =>
        active === 'true' ? theme.white : 'transparent'};
    cursor: pointer;
`

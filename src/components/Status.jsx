import React from 'react'
import styled from 'styled-components'
import { Centered } from './styled'

const StatusContainer = styled(Centered)`
    width: 85px;
`

const StatusIndicator = styled(Centered)`
    padding: 2px 10px;
    background-color: ${({ theme, status }) =>
        status === 'successful' ? theme.primary1 : theme.failed};
    color: ${({ theme }) => theme.white};
    border-radius: 11px;
    font-size: 12px;
    font-weight: 500;
    line-height: 19.2px;
`

const Status = ({ status }) => {
    return (
        <StatusContainer>
            <StatusIndicator status={status}>
                {status === 'successful' ? 'Successful' : 'Failed'}
            </StatusIndicator>
        </StatusContainer>
    )
}

export default Status

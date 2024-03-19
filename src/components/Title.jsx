import React from 'react'
import styled from 'styled-components'

const TitleText = styled.p`
    color: ${({ theme }) => theme.textPrimary};
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
`

const Title = ({ children }) => {
    return <TitleText>{children}</TitleText>
}

export default Title

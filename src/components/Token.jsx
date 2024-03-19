import React from 'react'
import styled from 'styled-components'
import { FlexAlign, Icon } from './styled'
import { TextPrimary } from './Text'
import CurrencyLogo from './CurrencyLogo'

const Text = styled(TextPrimary)`
    font-size: 12px;
    margin: 0px 4px;
`

const Token = ({ token }) => {
    return (
        <FlexAlign style={{ maxHeight: 20, margin: 'auto', maxWidth: '50px' }}>
            <Icon>
                <CurrencyLogo currency={token} />
            </Icon>
            <Text>{token?.symbol}</Text>
        </FlexAlign>
    )
}

export default Token

import React from 'react'
import styled from 'styled-components'
import { FlexAlign, Icon } from './styled'
import { TextPrimary } from './Text'
import CurrencyLogo from './CurrencyLogo'

const Text = styled(TextPrimary)`
    font-size: 12px;
    margin: 0px 4px;
`

const StyledIcon = styled(Icon)`
    margin-left: 4px;
    margin-right: 4px;
`

const DoubleToken = ({ token0, token1 }) => {
    return (
        <FlexAlign style={{ maxHeight: 20 }}>
            <Icon>
                <CurrencyLogo currency={token0} />
            </Icon>
            <Text>{token0?.symbol}</Text>
            <Text style={{ margin: '0px' }}>/</Text>
            <StyledIcon>
                <CurrencyLogo currency={token1} />
            </StyledIcon>
            <Text style={{ margin: '0px' }}>{token1?.symbol}</Text>
        </FlexAlign>
    )
}

export default DoubleToken

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    Centered,
    Flex,
    FlexAlign,
    Icon,
    RowBetween,
} from '../../../../components/styled'
import Toggle from '../../../../components/Toggle'
import DoubleToken from '../../../../components/DoubleToken'
import CurrencyLogo from '../../../../components/CurrencyLogo'
import { useTokens } from '../../../../hooks/useTokens'

const StyledHeader = styled(RowBetween)`
    padding: 13px 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 20.4px;
    color: ${({ theme }) => theme.textPrimary};
`

const HeaderLeft = styled(FlexAlign)`
    flex-grow: 2;
`
const HeaderRight = styled(FlexAlign)`
    flex-grow: 3;
`

const StyledInfoRow = styled(RowBetween)`
    border-top: 1px solid ${({ theme }) => theme.border1};
    padding: 8px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 20.4px;
    color: ${({ theme }) => theme.textPrimary};
`

const TokensRow = styled(Flex)`
    max-width: 585px;
    min-width: 585px;
    flex-wrap: wrap;
    justify-content: center;
`

const TokensRowItem = styled(Centered)`
    margin-left: 4px;
    margin-top: 4px;
    padding: 2px 6px;
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 6px;
`

const TextSecondary = styled.p`
    color: ${({ theme }) => theme.textSecondary};
`

const HeaderTextP = styled.p`
    flex-grow: 1;
    text-align: center;
`
const HeaderTextRight = styled(HeaderTextP)`
    padding-right: 10px;
    text-align: right;
    max-width: 150px;
    min-width: 150px;
`
const HeaderTextLeft = styled(HeaderTextP)`
    padding-left: 10px;
    text-align: left;
`

const StyledHeaderTextLeft = styled(HeaderTextLeft)`
    max-width: 60px;
    padding-left: 15px;
`

const StyledFlex = styled(Centered)`
    flex-grow: 1;
    min-width: 200px;
`

const StyledSpan = styled.span`
    display: inline-block;
    max-width: 360px;
    min-width: 360px;
`

const Block = styled(Centered)`
    flex-grow: 1;
`
const ToggleBlock = styled(FlexAlign)`
    padding-right: 30px;
    justify-content: flex-end;
    flex-grow: 1;
    max-width: 150px;
    min-width: 150px;
`

const StyledParagraph = styled.p`
    margin-right: 4px;
    margin-left: 4px;
`

const REDUNDANT_SYMBOL = '📈'

export const TokensHeaderRow = () => {
    return (
        <StyledHeader>
            <HeaderLeft>
                <HeaderTextLeft style={{ maxWidth: '60px' }}>
                    Num.
                </HeaderTextLeft>
                <HeaderTextP>Token</HeaderTextP>
            </HeaderLeft>
            <HeaderRight>
                <HeaderTextP>
                    <StyledSpan>Available Pairs</StyledSpan>
                </HeaderTextP>
                <HeaderTextRight>Activate / Deactivate</HeaderTextRight>
            </HeaderRight>
        </StyledHeader>
    )
}

export const TokensInfoRow = ({ data, index }) => {
    const { getToken, saveToken } = useTokens()
    const { id: address, name, symbol, pairBase, decimals } = data
    const [isActive, setIsActive] = useState(true)
    const num = index < 10 ? `0${index}` : index

    const saveTokenInfo = (value) => {
        const requestData = {
            address,
            symbol,
            name,
            decimal: +decimals,
            isActive: value,
        }

        saveToken(requestData)
    }

    const getTokenInfo = async () => {
        const response = await getToken(address)

        if (response) {
            setIsActive(response.isActive)
        }
    }

    useEffect(() => {
        getTokenInfo()
    }, [])

    const toggleToken = (value) => {
        saveTokenInfo(value)
        setIsActive(value)
    }

    const clearedName = name.replace(REDUNDANT_SYMBOL, '')

    return (
        <StyledInfoRow>
            <HeaderLeft>
                <StyledHeaderTextLeft>{num}</StyledHeaderTextLeft>
                <StyledFlex>
                    <Icon>
                        <CurrencyLogo currency={data} />
                    </Icon>
                    <StyledParagraph>{symbol}</StyledParagraph>
                    <TextSecondary>{clearedName}</TextSecondary>
                </StyledFlex>
            </HeaderLeft>
            <HeaderRight>
                <Block>
                    <TokensRow>
                        {pairBase.length !== 0 &&
                            pairBase.map((pair, index) => (
                                <TokensPair
                                    key={index.toString()}
                                    token0={pair.token0}
                                    token1={pair.token1}
                                />
                            ))}
                        {pairBase.length === 0 && '-'}
                    </TokensRow>
                </Block>
                <ToggleBlock>
                    <Toggle value={isActive} onChange={toggleToken} />
                </ToggleBlock>
            </HeaderRight>
        </StyledInfoRow>
    )
}

const TokensPair = ({ token0, token1 }) => {
    return (
        <TokensRowItem>
            <DoubleToken token0={token0} token1={token1} />
        </TokensRowItem>
    )
}

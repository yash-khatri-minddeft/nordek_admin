import React from 'react'
import styled from 'styled-components'
import { TOKENS } from '../constants/tokens'
// import BidelityLogo from '../assets/svg/bidelity-logo.svg'
import EthereumLogo from '../assets/img/ethereum-logo.png'
import Logo from './Logo'

const getTokenLogoURL = (address) =>
    `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
    border-radius: 24px;
`

const StyledLogo = styled(Logo)`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: ${({ size }) => size};
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
    background-color: ${({ theme }) => theme.white};
`

export default function CurrencyLogo({ currency, size = '15px', style }) {
    const token = TOKENS.find((t) => t.symbol === currency?.symbol)
    const srcs = getTokenLogoURL(currency?.id)

    if (currency?.name === 'ETH') {
        return (
            <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
        )
    }

    if (token) {
        return (
            <StyledLogo
                size={size}
                srcs={[token.logoURI]}
                alt={`${currency?.symbol ?? 'token'} logo`}
                style={style}
            />
        )
    }

    return (
        <StyledLogo
            size={size}
            srcs={srcs}
            alt={`${currency?.symbol ?? 'token'} logo`}
            style={style}
        />
    )
}

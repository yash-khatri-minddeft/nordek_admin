import React from 'react'
import styled from 'styled-components'
import ChevronUp from '../../../../assets/svg/chevron-up.svg'
import ChevronDown from '../../../../assets/svg/chevron-down.svg'
import {
    FlexAlign,
    RowBetween,
    SortableSpan,
    StyledSpan,
} from '../../../../components/styled'
import DoubleToken from '../../../../components/DoubleToken'
import { ASC, DESC } from '../../../../utils/sortTable'
import { formatUSD } from '../../../../utils/formatUSD'

const StyledTitle = styled(RowBetween)`
    padding: 6px 0;
`

const StyledInfo = styled(StyledTitle)`
    border-top: 1px solid ${({ theme }) => theme.border1};
    padding: 16px 0;
`

const TitleText = styled.div`
    position: relative;
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
    line-height: 20.4px;
    text-align: center;
    flex-grow: 1;
`

const LeftText = styled(TitleText)`
    text-align: center;
    max-width: 200px;
`

const RightText = styled(TitleText)`
    cursor: pointer;
    max-width: 120px;
    user-select: none;
    img {
        position: absolute;
        right: -20px;
        top: 50%;
        transform: translateY(-50%);
        height: 20px;
        width: 20px;
    }
`

const InfoText = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 500;
    line-height: 20.4px;
    flex-grow: 1;
    text-align: center;
`

const RightInfoText = styled(InfoText)`
    max-width: 150px;
`

const CenteredSpan = styled(StyledSpan)`
    text-align: center;
`
const Block = styled(FlexAlign)`
    justify-content: center;
    max-width: 200px;
    min-width: 200px;
    flex-grow: 1;
`

export const TitleRow = ({
    setHeaderKey,
    setOrder,
    nextOrder,
    order,
    initialOrder,
}) => {
    const handleClick = (key) => {
        setHeaderKey(key)
        setOrder({ ...initialOrder, [key]: nextOrder })
    }
    return (
        <StyledTitle>
            <LeftText>
                <StyledSpan w="160px">Pairs</StyledSpan>
            </LeftText>
            <TitleText>
                <SortableSpan
                    w="80px"
                    onClick={() => handleClick('formattedVolume')}
                >
                    Volume
                    {order.formattedVolume === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.formattedVolume === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan
                    w="100px"
                    onClick={() => handleClick('swapsAmount')}
                >
                    Total number of transactions
                    {order.swapsAmount === DESC && <img src={ChevronDown} />}
                    {order.swapsAmount === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan
                    w="100px"
                    onClick={() => handleClick('totalCommission')}
                >
                    Total comission amount
                    {order.totalCommission === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.totalCommission === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan
                    w="100px"
                    onClick={() => handleClick('commissionDistributed')}
                >
                    Total comission distrbuted
                    {order.commissionDistributed === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.commissionDistributed === ASC && (
                        <img src={ChevronUp} />
                    )}
                </SortableSpan>
            </TitleText>
            <RightText
                onClick={() => handleClick('profit')}
                style={{ marginRight: '30px' }}
            >
                NORSWAP profit
                {order.profit === DESC && <img src={ChevronDown} />}
                {order.profit === ASC && <img src={ChevronUp} />}
            </RightText>
        </StyledTitle>
    )
}

export const InfoRow = ({ data }) => {
    const {
        token0,
        token1,
        commissionDistributed,
        swapsAmount,
        profit,
        totalCommission,
        formattedVolume,
    } = data

    // const commissionDistributed = formatCommission(totalSupply)
    // const profit = formatCommission(bidelityProfit)
    // const totalCommission = sumFloats(profit, commissionDistributed)
    // const formattedVolume = formatUSD(volumeUSD)

    return (
        <StyledInfo>
            <Block>
                <DoubleToken token0={token0} token1={token1} />
            </Block>
            <InfoText>
                <CenteredSpan w="80px">{formattedVolume} USD</CenteredSpan>
            </InfoText>
            <InfoText>
                <CenteredSpan w="100px">{swapsAmount}</CenteredSpan>
            </InfoText>
            <InfoText>
                <StyledSpan w="140px">{formatUSD(totalCommission)}</StyledSpan>
            </InfoText>
            <InfoText>
                <StyledSpan w="100px">
                    {formatUSD(commissionDistributed)}
                </StyledSpan>
            </InfoText>
            <RightInfoText>{formatUSD(profit)}</RightInfoText>
        </StyledInfo>
    )
}

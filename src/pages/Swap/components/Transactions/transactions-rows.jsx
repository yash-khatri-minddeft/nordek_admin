import React from 'react'
import styled from 'styled-components'
// import { ethers } from 'ethers'
import {
    Centered,
    RowBetween,
    SortableSpan,
    StyledSpan,
} from '../../../../components/styled'
import ChevronUp from '../../../../assets/svg/chevron-up.svg'
import ChevronDown from '../../../../assets/svg/chevron-down.svg'
import DoubleToken from '../../../../components/DoubleToken'
import Status from '../../../../components/Status'
import { dataFormatter } from '../../../../utils/dataFormatter'
import { ASC, DESC } from '../../../../utils/sortTable'
import { formatUSD } from '../../../../utils/formatUSD'
// import { shortId } from '../../../../utils/shortId'
// import { formatCommission } from '../../../../utils/formatCommission'

const StyledTransactionHeader = styled(RowBetween)`
    padding: 8px 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 20.4px;
    color: ${({ theme }) => theme.textPrimary};
`

const StyledTransactionsInfoRow = styled(StyledTransactionHeader)`
    border-top: 1px solid ${({ theme }) => theme.border1};
    padding: 16px 0;
    font-weight: 500;
`

const StyledParagraph = styled.p`
    flex-grow: 1;
    text-align: center;
`

const StatusText = styled(StyledParagraph)`
    max-width: 100px;
    padding-left: 10px;
`

const FirstElement = styled(StyledParagraph)`
    max-width: 83px;
    min-width: 83px;
    text-align: center;
`

const BlueText = styled.p`
    color: ${({ theme }) => theme.textBlue};
    flex-grow: 1;
    text-align: center;
`

const StatusContainer = styled.div`
    flex-grow: 1;
    max-width: 100px;
    padding-left: 10px;
`

const TimeText = styled(StyledParagraph)`
    min-width: 134px;
    max-width: 230px;
`
const PairText = styled(StyledParagraph)`
    min-width: 160px;
    max-width: 200px;
`
const TransactionFeeText = styled(StyledParagraph)`
    min-width: 180px;
`
const UserIdText = styled(StyledParagraph)`
    max-width: 150px;
    min-width: 64px;
`
const SellPriceText = styled(StyledParagraph)`
    max-width: 180px;
    min-width: 120px;
`
const BuyPriceText = styled(StyledParagraph)`
    max-width: 180px;
    min-width: 120px;
`
const TxHashText = styled(StyledParagraph)`
    max-width: 230px;
    min-width: 154px;
`

const LogosBlock = styled(Centered)`
    min-width: 160px;
    max-width: 200px;
    flex-grow: 1;
`

export const TransactionsHeader = ({
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
        <StyledTransactionHeader>
            <FirstElement>
                <span>Transaction number</span>
            </FirstElement>
            <UserIdText>User ID</UserIdText>
            <TimeText>
                <SortableSpan
                    onClick={() => handleClick('timestamp')}
                    w="120px"
                >
                    Time
                    {order.timestamp === DESC && <img src={ChevronDown} />}
                    {order.timestamp === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TimeText>
            <PairText>
                <StyledSpan w="104px">Pairs</StyledSpan>
            </PairText>
            <BuyPriceText>
                <SortableSpan onClick={() => handleClick('buyPrice')} w="70px">
                    Buy Price
                    {order.buyPrice === DESC && <img src={ChevronDown} />}
                    {order.buyPrice === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </BuyPriceText>
            <SellPriceText>
                <SortableSpan onClick={() => handleClick('sellPrice')}>
                    Sell Price
                    {order.sellPrice === DESC && <img src={ChevronDown} />}
                    {order.sellPrice === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </SellPriceText>
            <TransactionFeeText>
                <SortableSpan
                    onClick={() => handleClick('feeAmount')}
                    w="150px"
                >
                    Transacion fee
                    {order.feeAmount === DESC && <img src={ChevronDown} />}
                    {order.feeAmount === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TransactionFeeText>
            <TxHashText style={{ maxWidth: '200px' }}>
                <StyledSpan w="110px">TxHash</StyledSpan>
            </TxHashText>
            <StatusText>
                <StyledSpan w="90px">Status</StyledSpan>
            </StatusText>
        </StyledTransactionHeader>
    )
}
export const TransactionsInfoRow = ({ data, index }) => {
    const {
        truncatedHash,
        userId,
        timestamp,
        buyPrice,
        sellPrice,
        pair,
        // formattedFee,
        feeAmount,
    } = data

    const num = index < 10 ? `0${index}` : index

    // const truncatedHash = hash.slice(0, 15) + '...'
    const time = dataFormatter.format(new Date(Number(timestamp) * 1000))
    // const userId = shortId(from, 3)
    // const buyPrice = formatCommission(token0Price)
    // const sellPrice = formatCommission(token1Price)

    // const formattedFee = ethers.utils.formatEther(fee)
    // const feeAmount = formatCommission(formattedFee)

    return (
        <StyledTransactionsInfoRow>
            <FirstElement>{num}</FirstElement>
            <BlueText style={{ minWidth: '64px', maxWidth: '150px' }}>
                {userId}
            </BlueText>
            <StyledParagraph style={{ minWidth: '134px', maxWidth: '230px' }}>
                {time}
            </StyledParagraph>
            <LogosBlock>
                <DoubleToken token0={pair.token0} token1={pair.token1} />
            </LogosBlock>
            <StyledParagraph style={{ minWidth: '120px', maxWidth: '180px' }}>
                <StyledSpan w="70px">{formatUSD(buyPrice)}</StyledSpan>
            </StyledParagraph>
            <StyledParagraph style={{ minWidth: '120px', maxWidth: '180px' }}>
                <StyledSpan w="70px">{formatUSD(sellPrice)}</StyledSpan>
            </StyledParagraph>
            <StyledParagraph style={{ minWidth: '180px' }}>
                <StyledSpan w="150px">{formatUSD(feeAmount)}</StyledSpan>
            </StyledParagraph>
            <BlueText style={{ maxWidth: '200px' }}>
                <StyledSpan w="110px">{truncatedHash}</StyledSpan>
            </BlueText>
            <StatusContainer>
                <Status status="successful" />
            </StatusContainer>
        </StyledTransactionsInfoRow>
    )
}

import React from 'react'
import styled from 'styled-components'
import {
    Centered,
    FlexAlign,
    RowBetween,
    SortableSpan,
    StyledSpan,
} from '../../../../components/styled'
import ChevronUp from '../../../../assets/svg/chevron-up.svg'
import ChevronDown from '../../../../assets/svg/chevron-down.svg'
import DoubleToken from '../../../../components/DoubleToken'
import Status from '../../../../components/Status'
import { shortId } from '../../../../utils/shortId'
import { dataFormatter } from '../../../../utils/dataFormatter'
import { formatCommission } from '../../../../utils/formatCommission'
import { ASC, DESC } from '../../../../utils/sortTable'
import { formatUSD } from '../../../../utils/formatUSD'

const StyledHeaderRow = styled(RowBetween)`
    padding: 12px 0;
`

const StyledInfoRow = styled(RowBetween)`
    padding: 16px 0;
    border-top: 1px solid ${({ theme }) => theme.border1};
`

const TitleText = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
    line-height: 20.4px;
    text-align: center;
    flex-grow: 1;
`

const LeftTitleText = styled(TitleText)`
    padding-left: 24px;
    text-align: left;
    max-width: 160px;
    min-width: 160px;
`

const RightTitleText = styled(TitleText)`
    padding-right: 40px;
    text-align: right;
    max-width: 150px;
`

const InfoText = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 500;
    line-height: 20.4px;
    text-align: center;
    flex-grow: 1;
`

const BlueText = styled(InfoText)`
    max-width: 160px;
    min-width: 160px;
    padding-left: 20px;
    color: ${({ theme }) => theme.textBlue};
    text-align: left;
`

const StyledCentered = styled(Centered)`
    flex-grow: 1;
    min-width: 200px;
    max-width: 200px;
`

const StatusBlock = styled(FlexAlign)`
    max-width: 150px;
    padding-right: 16px;
    justify-content: flex-end;
    flex-grow: 1;
`

export const TransactionsHistoryHeaderRow = ({
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
        <StyledHeaderRow>
            <LeftTitleText>
                <StyledSpan w="70px">User ID</StyledSpan>
            </LeftTitleText>
            <TitleText style={{ maxWidth: '270px' }}>
                <SortableSpan
                    onClick={() => handleClick('timestamp')}
                    w="180px"
                >
                    Time
                    {order.timestamp === DESC && <img src={ChevronDown} />}
                    {order.timestamp === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText style={{ maxWidth: '200px' }}>
                <StyledSpan w="220px">Pair</StyledSpan>
            </TitleText>
            <TitleText>
                <StyledSpan w="110px">Type</StyledSpan>
            </TitleText>
            <TitleText>
                <SortableSpan onClick={() => handleClick('transactionAmount')}>
                    Transaction amount
                    {order.transactionAmount === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.transactionAmount === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan onClick={() => handleClick('fee')} w="100px">
                    Fee
                    {order.fee === DESC && <img src={ChevronDown} />}
                    {order.fee === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <RightTitleText>
                <StyledSpan w="78px">Status</StyledSpan>
            </RightTitleText>
        </StyledHeaderRow>
    )
}

export const TransactionsHistoryInfoRow = ({ data }) => {
    const {
        user,
        timestamp,
        transactionAmount,
        fee,
        type,
        pair: { token0, token1 },
    } = data

    const userId = shortId(user.id, 4)
    const time = dataFormatter.format(new Date(Number(timestamp) * 1000))
    const formattedAmount = formatCommission(transactionAmount)
    const formattedFee = formatCommission(fee)

    return (
        <StyledInfoRow>
            <BlueText>
                <StyledSpan w="70px">{userId}</StyledSpan>
            </BlueText>
            <InfoText style={{ maxWidth: '270px' }}>
                <StyledSpan w="180px">{time}</StyledSpan>
            </InfoText>
            <StyledCentered>
                <DoubleToken token0={token0} token1={token1} />
            </StyledCentered>
            <InfoText>
                <StyledSpan w="110px">{type}</StyledSpan>
            </InfoText>
            <InfoText>
                <StyledSpan w="114px">{formatUSD(formattedAmount)}</StyledSpan>
            </InfoText>
            <InfoText>
                <StyledSpan w="100px">{formattedFee}</StyledSpan>
            </InfoText>
            <StatusBlock>
                <Status status="successful" />
            </StatusBlock>
        </StyledInfoRow>
    )
}

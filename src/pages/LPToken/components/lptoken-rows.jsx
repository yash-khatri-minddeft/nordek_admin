import React from 'react'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import ChevronUp from '../../../assets/svg/chevron-up.svg'
import ChevronDown from '../../../assets/svg/chevron-down.svg'
import {
    Centered,
    Icon,
    RowBetween,
    SortableSpan,
    StyledSpan,
} from '../../../components/styled'
import DoubleToken from '../../../components/DoubleToken'
import CopyIcon from '../../../assets/svg/copy.svg'
import { formatCommission } from '../../../utils/formatCommission'
import { ASC, DESC } from '../../../utils/sortTable'
import { formatUSD } from '../../../utils/formatUSD'

const StyledHeaderRow = styled(RowBetween)`
    padding: 13px 0;
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

const TitleTextLeft = styled(TitleText)`
    max-width: 240px;
    min-width: 240px;
`
const TitleTextRight = styled(TitleText)`
    max-width: 200px;
    min-width: 200px;
`

const InfoText = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 500;
    line-height: 20.4px;
    text-align: center;
    flex-grow: 1;
`

const InfoTextWithOutFlex = styled(InfoText)`
    flex-grow: unset;
`

const InfoTextRight = styled(InfoText)`
    max-width: 200px;
    min-width: 200px;
`
const InfoTextLeft = styled(Centered)`
    flex-grow: 1;
    min-width: 240px;
    max-width: 240px;
`

const InfoRowIcon = styled(Icon)`
    margin-left: 10px;
`

const Block = styled(Centered)`
    flex-grow: 1;
    max-width: 350px;
    min-width: 350px;
`

export const LpHeaderRow = ({
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
            <TitleTextLeft>
                <div style={{ minWidth: '76px' }}>Pairs</div>
            </TitleTextLeft>
            <TitleText style={{ maxWidth: '350px', minWidth: '350px' }}>
                <StyledSpan w="140px">Address</StyledSpan>
            </TitleText>
            <TitleText style={{ minWidth: '150px', maxWidth: '350px' }}>
                <SortableSpan onClick={() => handleClick('issued')} w="140px">
                    Issued
                    {order.issued === DESC && <img src={ChevronDown} />}
                    {order.issued === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText style={{ minWidth: '150px', maxWidth: '350px' }}>
                <SortableSpan onClick={() => handleClick('burned')} w="140px">
                    Burned
                    {order.burned === DESC && <img src={ChevronDown} />}
                    {order.burned === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleTextRight>
                <SortableSpan
                    onClick={() => handleClick('totalSupply')}
                    w="140px"
                >
                    In users wallet
                    {order.totalSupply === DESC && <img src={ChevronDown} />}
                    {order.totalSupply === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleTextRight>
        </StyledHeaderRow>
    )
}

export const LpInfoRow = ({ data, openCopyWindow }) => {
    const { id, token0, token1, issued, burned, totalSupply } = data
    const copyAddress = () => {
        copy(id)
        openCopyWindow()
    }

    const inUsersWallet = formatCommission(totalSupply)
    const formattedIssued = formatCommission(issued)
    const formattedBurned = formatCommission(burned)

    return (
        <StyledInfoRow>
            <InfoTextLeft>
                <DoubleToken token0={token0} token1={token1} />
            </InfoTextLeft>
            <Block>
                <InfoTextWithOutFlex>{id}</InfoTextWithOutFlex>
                <InfoRowIcon onClick={copyAddress}>
                    <img src={CopyIcon} alt="icon" />
                </InfoRowIcon>
            </Block>
            <InfoText style={{ minWidth: '150px', maxWidth: '350px' }}>
                <StyledSpan w="140px">{formatUSD(formattedIssued)}</StyledSpan>
            </InfoText>
            <InfoText style={{ minWidth: '150px', maxWidth: '350px' }}>
                <StyledSpan w="140px">{formatUSD(formattedBurned)}</StyledSpan>
            </InfoText>
            <InfoTextRight>
                <div style={{ minWidth: '58px' }}>
                    <StyledSpan w="140px">
                        {formatUSD(inUsersWallet)}
                    </StyledSpan>
                </div>
            </InfoTextRight>
        </StyledInfoRow>
    )
}

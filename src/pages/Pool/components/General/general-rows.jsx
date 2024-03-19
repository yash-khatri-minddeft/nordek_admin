import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    Centered,
    RowBetween,
    SortableSpan,
    StyledSpan,
} from '../../../../components/styled'
import DoubleToken from '../../../../components/DoubleToken'
import Toggle from '../../../../components/Toggle'
import ChevronUp from '../../../../assets/svg/chevron-up.svg'
import ChevronDown from '../../../../assets/svg/chevron-down.svg'
import { usePairs } from '../../../../hooks/usePairs'
import { formatCommission } from '../../../../utils/formatCommission'
import { ASC, DESC } from '../../../../utils/sortTable'
import { formatUSD } from '../../../../utils/formatUSD'
// import { sumFloats } from '../../../../utils/sumFloats'

const StyledHeaderRow = styled(RowBetween)`
    padding: 10px 0;
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
    text-align: left;
    margin-left: 16px;
`

const RightTitleText = styled(TitleText)`
    text-align: center;
    max-width: 100px;
`

const InfoText = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 500;
    text-align: center;
    line-height: 20.4px;
    flex-grow: 1;
`

const LeftInfoText = styled(InfoText)`
    margin-left: 16px;
    text-align: left;
    max-width: 100px;
`

const ToggleBlock = styled(Centered)`
    flex-grow: 1;
    max-width: 115px;
`

const Toggle2Block = styled(Centered)`
    flex-grow: 1;
    max-width: 100px;
`

const LogosBlock = styled(Centered)`
    flex-grow: 1;
`
export const GeneralHeaderRow = ({
    isAnyLocked,
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
                <StyledSpan w="60px">Num.</StyledSpan>
            </LeftTitleText>
            <TitleText style={{ minWidth: '200px' }}>
                <StyledSpan w="160px">Tokens/pairs</StyledSpan>
            </TitleText>
            <TitleText>
                <SortableSpan onClick={() => handleClick('hourlyValue')}>
                    Volume 24H
                    {order.hourlyValue === DESC && <img src={ChevronDown} />}
                    {order.hourlyValue === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan onClick={() => handleClick('formattedVolume')}>
                    Volume 7D
                    {order.formattedVolume === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.formattedVolume === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan
                    onClick={() => handleClick('liquidityProviderCount')}
                >
                    Users in pool
                    {order.liquidityProviderCount === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.liquidityProviderCount === ASC && (
                        <img src={ChevronUp} />
                    )}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan onClick={() => handleClick('reserve0')}>
                    Balance token 1
                    {order.reserve0 === DESC && <img src={ChevronDown} />}
                    {order.reserve0 === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText>
                <SortableSpan onClick={() => handleClick('reserve1')}>
                    Balance token 2
                    {order.reserve1 === DESC && <img src={ChevronDown} />}
                    {order.reserve1 === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText style={{ maxWidth: '80px' }}>
                <SortableSpan
                    onClick={() => handleClick('swapsAmount')}
                    w="40px"
                >
                    Swaps
                    {order.swapsAmount === DESC && <img src={ChevronDown} />}
                    {order.swapsAmount === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText style={{ maxWidth: '170px' }}>
                <SortableSpan
                    onClick={() => handleClick('totalCommission')}
                    w="110px"
                >
                    Total comission
                    {order.totalCommission === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.totalCommission === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText style={{ maxWidth: '170px' }}>
                <SortableSpan
                    onClick={() => handleClick('commissionDistributed')}
                    w="150px"
                >
                    Comission Distributed
                    {order.commissionDistributed === DESC && (
                        <img src={ChevronDown} />
                    )}
                    {order.commissionDistributed === ASC && (
                        <img src={ChevronUp} />
                    )}
                </SortableSpan>
            </TitleText>
            <TitleText style={{ maxWidth: '170px' }}>
                <SortableSpan onClick={() => handleClick('profit')} w="140px">
                    NORSWAP profit
                    {order.profit === DESC && <img src={ChevronDown} />}
                    {order.profit === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </TitleText>
            <TitleText style={{ maxWidth: '115px' }}>Lock/Unlock</TitleText>
            {isAnyLocked && (
                <RightTitleText>
                    <StyledSpan w="70px">Hide in exchange</StyledSpan>
                </RightTitleText>
            )}
        </StyledHeaderRow>
    )
}

export const GeneralInfoRow = ({
    data,
    index,
    setIsAnyLocked,
    isAnyLocked,
}) => {
    const { getPair, savePair, lockPair, unlockPair } = usePairs()
    const {
        id,
        reserve0,
        reserve1,
        token0,
        token1,
        swapsAmount,
        liquidityProviderCount,
        lock,
        hourlyValue,
        profit,
        totalCommission,
        formattedVolume,
        commissionDistributed,
    } = data

    const [isLocked, setIsLocked] = useState(!!lock)
    const [isHidden, setIsHidden] = useState(false)

    const num = index < 10 ? `0${index}` : index

    const savePairInfo = (value) => {
        const requestData = {
            token0: token0.id,
            token1: token1.id,
            isHide: value,
        }
        savePair(requestData)
    }

    const getPairInfo = async () => {
        const info = await getPair(token0.id, token1.id)
        if (info === undefined) {
            savePairInfo(false)
        } else if (info) {
            setIsHidden(info.isHide)
        }
    }

    useEffect(() => {
        if (isLocked) {
            setIsAnyLocked(true)
        }
    }, [isLocked])

    useEffect(() => {
        getPairInfo()
    }, [])

    const toggleIsHide = (value) => {
        savePairInfo(value)
        setIsHidden(value)
    }

    const toggleLockPair = (value) => {
        const requestData = { address: id }
        if (value) {
            lockPair(requestData)
        } else if (!value) {
            unlockPair(requestData)
        }
        setIsLocked(value)
    }

    // const commissionDistributed = formatCommission(totalSupply)
    // const profit = formatCommission(bidelityProfit)
    // const totalCommission = sumFloats(profit, commissionDistributed)
    // const formattedVolume = formatCommission(volumeUSD)

    // const hourlyValue =
    //     pairHourData.length === 0
    //         ? 0
    //         : formatCommission(
    //               pairHourData[pairHourData.length - 1].hourlyVolumeUSD
    //           )

    const balance0 = formatCommission(reserve0)
    const balance1 = formatCommission(reserve1)

    return (
        <StyledInfoRow>
            <LeftInfoText>
                <StyledSpan w="60px">{num}</StyledSpan>
            </LeftInfoText>
            <LogosBlock style={{ minWidth: '200px' }}>
                <DoubleToken token0={token0} token1={token1} />
            </LogosBlock>
            <InfoText>
                <StyledSpan w="67px">{hourlyValue}</StyledSpan>
            </InfoText>
            <InfoText>
                <StyledSpan w="61px">{formattedVolume}</StyledSpan>
            </InfoText>
            <InfoText style={{ maxWidth: '120px' }}>
                <StyledSpan w="76px">{liquidityProviderCount}</StyledSpan>
            </InfoText>
            <InfoText style={{ maxWidth: '133px' }}>
                <StyledSpan w="91px">{formatUSD(balance0)}</StyledSpan>
            </InfoText>
            <InfoText style={{ maxWidth: '133px' }}>
                <StyledSpan w="91px">{formatUSD(balance1)}</StyledSpan>
            </InfoText>
            <InfoText style={{ maxWidth: '80px' }}>
                <StyledSpan w="40px">{swapsAmount}</StyledSpan>
            </InfoText>
            <InfoText style={{ maxWidth: '170px' }}>
                <StyledSpan w="110px">{formatUSD(totalCommission)}</StyledSpan>
            </InfoText>
            <InfoText style={{ maxWidth: '170px' }}>
                <StyledSpan w="150px">
                    {formatUSD(commissionDistributed)}
                </StyledSpan>
            </InfoText>
            <InfoText style={{ maxWidth: '170px' }}>
                <StyledSpan w="140px">{formatUSD(profit)}</StyledSpan>
            </InfoText>
            <ToggleBlock>
                <Centered style={{ width: '71px' }}>
                    <Toggle value={isLocked} onChange={toggleLockPair} />
                </Centered>
            </ToggleBlock>
            {(isLocked || isAnyLocked) && (
                <Toggle2Block>
                    <Centered style={{ width: '70px' }}>
                        <Toggle value={isHidden} onChange={toggleIsHide} />
                    </Centered>
                </Toggle2Block>
            )}
        </StyledInfoRow>
    )
}

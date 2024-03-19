import React from 'react'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import {
    AutoColumn,
    Flex,
    FlexAlign,
    FlexColumn,
    Icon,
    RowBetween,
} from '../../../components/styled'
import Copy2Icon from '../../../assets/svg/copy2.svg'
import { TextPrimary, TextSecondary } from '../../../components/Text'

const InfoSection = styled.div`
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    padding: 24px;
`

const Info = styled.div`
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 5px;
    padding: 12px;
    width: 100%;
    height: fit-content;

    :first-child {
        margin-left: 0;
    }
`

const InfoBlock = styled(Info)`
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`

const Section = styled(FlexColumn)`
    width: 100%;
`

const Secondary = styled(TextSecondary)`
    font-size: 12px;
    font-weight: 600;
    line-height: 20.4px;
`
const Primary = styled(TextPrimary)`
    font-size: 14px;
    font-weight: 600;
    line-height: 23.1px;
`
const Primary2 = styled(TextPrimary)`
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
`

export const TopInfo = ({ walletInfo, openCopyWindow }) => {
    const { id, address, lastLogIn, providerId } = walletInfo
    const copyAddress = () => {
        copy(address)
        openCopyWindow()
    }
    const lastLoggedIn = new Date(lastLogIn).toLocaleString('en-GB')

    return (
        <InfoSection>
            <Flex>
                <Section>
                    <AutoColumn gap="xl">
                        <Info>
                            <RowBetween>
                                <Secondary>User ID:</Secondary>
                                <Primary style={{ marginLeft: '40px' }}>
                                    {id}
                                </Primary>
                                <div />
                            </RowBetween>
                        </Info>
                        <Info>
                            <RowBetween>
                                <Secondary>{providerId}:</Secondary>
                                <Primary>{address}</Primary>
                                <Icon onClick={copyAddress}>
                                    <img src={Copy2Icon} alt="copy" />
                                </Icon>
                            </RowBetween>
                        </Info>
                    </AutoColumn>
                </Section>
                <Info style={{ marginLeft: '30px' }}>
                    <FlexAlign>
                        <Secondary>User last log in:</Secondary>
                        <Primary style={{ marginLeft: '40px' }}>
                            {lastLoggedIn}
                        </Primary>
                    </FlexAlign>
                </Info>
            </Flex>
        </InfoSection>
    )
}

export const BottomInfo = ({ tokensEarned, totalShare }) => {
    return (
        <InfoSection>
            <AutoColumn gap="xl">
                <Primary2>Balance</Primary2>
                <Flex>
                    <InfoBlock>
                        <Secondary style={{ marginTop: '8px' }}>
                            Total tokens earned:
                        </Secondary>
                        <Primary2>{tokensEarned}</Primary2>
                    </InfoBlock>
                    <Info style={{ marginLeft: '30px' }}>
                        <AutoColumn gap="16px">
                            <Secondary
                                style={{
                                    marginTop: '8px',
                                    maxWidth: '130px',
                                }}
                            >
                                Tootal share the pools:
                            </Secondary>
                            <Primary2>{totalShare}</Primary2>
                        </AutoColumn>
                    </Info>
                </Flex>
            </AutoColumn>
        </InfoSection>
    )
}

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import QRCode from 'react-qr-code'
import { shallow } from 'zustand/shallow'
import {
    AutoColumn,
    Centered,
    Flex,
    FlexAlign,
    Icon,
} from '../../../../components/styled'
import { TEXT } from '../../../../theme'
import AppStoreLogo from '../../../../assets/svg/AppStore.svg'
import GooglePlay from '../../../../assets/svg/GooglePlay.svg'
import AttentionIcon from '../../../../assets/svg/attention.svg'
import { InputNumber, Label } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { TextSecondary } from '../../../../components/Text'
import { useTwoFA } from '../../../../hooks/useTwoFA'
import { useUserStore } from '../../../../store/userStore'
import { Styled2FAButton } from './Styled2FAButton'

const Wrapper = styled(AutoColumn)`
    max-width: 564px;
`

const Circle = styled(Centered)`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary1};
    color: ${({ theme }) => theme.white};
    font-size: 14px;
    font-weight: 500;
    line-height: 25.2px;
`

const Title = styled.p`
    color: ${({ theme }) => theme.textPrimary};
    margin-left: 16px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25.6px;
`

const StyledA = styled.a`
    margin-left: 24px;

    :first-child {
        margin-left: 0;
    }
`

const DownloadIcon = styled(Icon)`
    img {
        width: 136px;
        height: 41px;
    }
`
const QRCodeContainer = styled.div`
    width: 150px;
    height: 150px;
`

const SecretKeySection = styled(AutoColumn)`
    margin-left: 24px;
`

const StyledLabel = styled(Label)`
    font-weight: 500;
    line-height: 19.2px;
`

const SecretKey = styled.div`
    width: 100%;
    max-height: 40px;
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.border4};
    outline: none;
    color: ${({ theme }) => theme.textBlue};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    line-height: 25.2px;
`

const WarningSection = styled(Flex)`
    padding: 6px;
    background-color: rgba(253, 50, 50, 0.1);
    color: ${({ theme }) => theme.warning};
    border-radius: 12px;
    font-size: 12px;
    font-weight: 400;
    line-height: 21.6px;
`

const AttentionIconWrapper = styled(Icon)`
    display: flex;
    align-items: flex-start;
    img {
        height: 18px;
        width: 18px;
    }
`

const EnableButton = styled(Button)`
    max-width: 500px;
    max-height: 60px;
`

const Paragraph = styled(TextSecondary)`
    font-size: 14px;
    font-weight: 500;
    line-height: 23.1px;
`

const EnableSection = () => {
    const { toggleTwoFA } = useUserStore(
        ({ toggleTwoFA }) => ({ toggleTwoFA }),
        shallow
    )
    const { generateLink, setOtp } = useTwoFA()
    const [isOpen, setIsOpen] = useState(false)
    const [secret, setSecret] = useState('')
    const [qrCodeUri, setQrCodeUri] = useState('')
    const [token, setToken] = useState('')

    const open = () => setIsOpen(true)

    const getSecret = async () => {
        const data = await generateLink()
        setSecret(data.secret)
        setQrCodeUri(data.uri)
    }

    const enableOtp = async () => {
        const requestData = {
            secret,
            token,
        }
        const response = await setOtp(requestData)
        if (response === true) {
            toggleTwoFA()
        }
    }

    useEffect(() => {
        if (isOpen) {
            getSecret()
        }
    }, [isOpen])

    if (!isOpen) {
        return <EnableButton onClick={open}>Enable 2FA</EnableButton>
    }

    return (
        <Wrapper gap="xl">
            <TitleRow number={1} label="Download 2FA App" />
            <Paragraph>
                You should download and install an authenticator application,
                such as Google Authenticator or Authy, on your mobile device.
                This app will generate one-time 6-digit access codes, which are
                required for logging into your account.
            </Paragraph>
            <Flex>
                <StyledA
                    href="https://apps.apple.com/app/google-authenticator/id388497605"
                    target="_blank"
                >
                    <DownloadIcon>
                        <img src={AppStoreLogo} alt="App Store" />
                    </DownloadIcon>
                </StyledA>
                <StyledA
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                    target="_blank"
                >
                    <DownloadIcon>
                        <img src={GooglePlay} alt="Google Play" />
                    </DownloadIcon>
                </StyledA>
            </Flex>
            <TitleRow number={2} label="Save 2FA Backup Key and Scan QR Code" />
            <Paragraph>
                Please, backup your 2FA recovery key to some offline storage,
                write down on a paper. If your mobile device gets lost, stolen
                or erased, you will need this key to recover your 2FA access.
            </Paragraph>
            <FlexAlign>
                <QRCodeContainer>
                    <QRCode
                        size={150}
                        style={{
                            height: 'auto',
                            maxWidth: '100%',
                            width: '100%',
                        }}
                        value={qrCodeUri}
                    />
                </QRCodeContainer>
                <SecretKeySection gap="sm">
                    <StyledLabel>Backup / Secret Key</StyledLabel>
                    <SecretKey>{secret}</SecretKey>
                    <WarningSection>
                        <AttentionIconWrapper>
                            <img src={AttentionIcon} alt="" />
                            <TEXT.default style={{ marginLeft: '6px' }}>
                                Please, write down or print a copy of the key
                                above and store it safely.
                            </TEXT.default>
                        </AttentionIconWrapper>
                    </WarningSection>
                </SecretKeySection>
            </FlexAlign>
            <TitleRow number={3} label="Confirm 2FA Activation" />
            <AutoColumn gap="xl">
                <InputNumber
                    label="2FA Code from Authenticator App"
                    placeholder="Enter a 6-digit 2FA code"
                    type="number"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <Styled2FAButton disabled={token === ''} onClick={enableOtp}>
                    Enable 2FA
                </Styled2FAButton>
            </AutoColumn>
        </Wrapper>
    )
}

const TitleRow = ({ label, number }) => {
    return (
        <FlexAlign>
            <Circle>{number}</Circle>
            <Title>{label}</Title>
        </FlexAlign>
    )
}

export default EnableSection

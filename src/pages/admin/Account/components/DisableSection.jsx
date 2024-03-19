import React, { useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import { AutoColumn, ErrorText } from '../../../../components/styled'
import { TEXT } from '../../../../theme'
import { InputNumber } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { useTwoFA } from '../../../../hooks/useTwoFA'
import { useUserStore } from '../../../../store/userStore'
import { Styled2FAButton } from './Styled2FAButton'

const Wrapper = styled(AutoColumn)`
    max-width: 500px;
`

const DisableButton = styled(Button)`
    max-width: 500px;
    background-color: transparent;
    color: ${({ theme }) => theme.primary1};
    border: 2px solid ${({ theme }) => theme.primary1};
    max-height: 60px;
    :hover {
        opacity: 0.7;
    }
`

const INVALID_OTP = 'Invalid otp'

const DisableSection = () => {
    const { toggleTwoFA } = useUserStore(
        ({ toggleTwoFA }) => ({ toggleTwoFA }),
        shallow
    )
    const { disable } = useTwoFA()
    const [isOpen, setIsOpen] = useState(false)
    const [code, setCode] = useState('')
    const [error, setError] = useState(false)

    const open = () => setIsOpen(true)

    const disableOtp = async () => {
        const response = await disable({ code })
        if (response === true) {
            toggleTwoFA()
        } else if (response?.response?.data?.message === INVALID_OTP) {
            setError(true)
        }
    }

    const resetError = () => {
        setError(false)
    }

    if (!isOpen) {
        return <DisableButton onClick={open}>Disable 2FA</DisableButton>
    }

    return (
        <Wrapper gap="lg">
            <TEXT.secondary fontSize={14} fontWeight={500} lineHeight="23.1px">
                Two-factor Authentication is enabled. If you want to disable
                it,please input the 6-digit on your google authenticator
            </TEXT.secondary>
            <AutoColumn gap="xl">
                {error && <ErrorText>Invalid code</ErrorText>}
                <InputNumber
                    type="number"
                    label="2FA Code from Authenticator App"
                    placeholder="Enter a 6-digit 2FA code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onFocus={resetError}
                />
                <Styled2FAButton disabled={code === ''} onClick={disableOtp}>
                    Disable 2FA
                </Styled2FAButton>
            </AutoColumn>
        </Wrapper>
    )
}

export default DisableSection

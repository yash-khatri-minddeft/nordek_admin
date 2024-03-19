import React from 'react'
import styled from 'styled-components'
import SuccessIcon from '../../../../assets/svg/succes.svg'
import { AutoColumn, Centered, Icon } from '../../../../components/styled'
import { TEXT } from '../../../../theme'
import { Button } from '../../../../components/Button'
import { useAuth } from '../../../../hooks/useAuth'

const Wrapper = styled.div`
    width: 100%;
    max-width: 365px;
    padding: 24px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 14px;
    text-align: center;
    color: ${({ theme }) => theme.textPrimary};
`

const TopIcon = styled(Icon)`
    img {
        width: 54px;
        height: 54px;
    }
`

const ModalButton = styled(Button)`
    padding: 8px 10px;
    width: 100%;
    max-width: 240px;
    font-size: 14px;
    line-height: 23.1px;
    border-radius: 10px;
`

const PasswordChangedModal = () => {
    const { logout } = useAuth()
    const handleClick = (e) => {
        e.stopPropagation()
    }

    return (
        <Wrapper onClick={handleClick}>
            <AutoColumn gap="32px">
                <TopIcon>
                    <img src={SuccessIcon} alt="Success" />
                </TopIcon>
                <AutoColumn gap="lg">
                    <AutoColumn gap="10px">
                        <Centered>
                            <TEXT.default
                                fontWeight={500}
                                fontSize={20}
                                lineHeight="32px"
                            >
                                Password Updated!
                            </TEXT.default>
                        </Centered>
                        <Centered>
                            <TEXT.default
                                fontWeight={500}
                                fontSize={14}
                                lineHeight="22.4px"
                            >
                                Your password has been changed successfully. Use
                                your new password to log in.
                            </TEXT.default>
                        </Centered>
                    </AutoColumn>
                    <Centered>
                        <ModalButton onClick={logout}>Log in</ModalButton>
                    </Centered>
                </AutoColumn>
            </AutoColumn>
        </Wrapper>
    )
}

export default PasswordChangedModal

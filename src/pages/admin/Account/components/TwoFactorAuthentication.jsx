import React from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import { InfoSection } from '../../../../components/StyledSection'
import { AutoColumn } from '../../../../components/styled'
import { TextPrimary, TextSecondary } from '../../../../components/Text'
import { useUserStore } from '../../../../store/userStore'
import EnableSection from './EnableSection'
import DisableSection from './DisableSection'

const Container = styled(InfoSection)`
    padding: 37px;
`

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.border1};
`

const TextContainer = styled.div`
    width: 100%;
    max-width: 500px;
`

const Primary = styled(TextPrimary)`
    font-size: 16px;
    font-weight: 600;
    line-height: 25.6px;
`
const Secondary = styled(TextSecondary)`
    font-size: 14px;
    font-weight: 500;
    line-height: 23.1px;
`

const TwoFactorAuthentication = () => {
    const { user } = useUserStore(({ user }) => ({ user }), shallow)

    return (
        <Container>
            <AutoColumn gap="xl">
                <Primary>Two-Factor Authentication</Primary>
                <Divider />
                <TextContainer>
                    <Secondary>
                        For your security, we strongly recommend enabling 2FA on
                        your account. After that, you will need to enter a
                        one-time 6-digit code each time you are logging into
                        your account, withdrawing funds or changing the
                        password.
                    </Secondary>
                </TextContainer>
                {!user.otp && <EnableSection />}
                {user.otp && <DisableSection />}
            </AutoColumn>
        </Container>
    )
}

export default TwoFactorAuthentication

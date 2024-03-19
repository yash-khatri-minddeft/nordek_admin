import React from 'react'
import styled from 'styled-components'
import { AutoColumn, Flex } from '../../../../components/styled'
import { InputPassword, TextInput } from '../../../../components/Input'

const Container = styled(Flex)`
    width: 100%;
`

const Block = styled.div`
    padding: 32px 24px;
    background-color: ${({ theme }) => theme.white};
    width: 100%;
    max-width: 420px;
    margin-left: 24px;
    border-radius: 8px;

    :first-child {
        margin-left: 0;
    }
`

const TextPrimary = styled.p`
    color: ${({ theme }) => theme.textPrimary};
    font-size: 16px;
    font-weight: 600;
    line-height: 25.6px;
`

const CreateForms = () => {
    return (
        <Container>
            <Block>
                <AutoColumn gap="xl">
                    <TextPrimary>Name</TextPrimary>
                    <TextInput placeholder="Full name" label="Full name" />
                    <TextInput placeholder="Email" label="Email" />
                </AutoColumn>
            </Block>
            <Block>
                <AutoColumn gap="xl">
                    <TextPrimary>Password</TextPrimary>
                    <InputPassword />
                    <InputPassword
                        placeholder="Repeat Password"
                        label="Confirm password"
                    />
                </AutoColumn>
            </Block>
        </Container>
    )
}

export default CreateForms

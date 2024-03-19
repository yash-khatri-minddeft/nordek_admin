import styled from 'styled-components'
import React, { useState } from 'react'
import PasswordIcon from '../assets/svg/password.svg'
import PasswordClosedIcon from '../assets/svg/password-closed.svg'
import { AutoColumn } from './styled'

export const Label = styled.label`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.textPrimary};
    line-height: 20.4px;
`

export const Input = styled.input`
    width: 100%;
    max-height: 40px;
    padding: 8px 12px 8px 16px;
    border: 1px solid ${({ theme }) => theme.border1};
    outline: none;
    color: ${({ theme }) => theme.textPrimary};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 23.1px;
`

export const InputNumber = styled(Input)`
    padding-right: 32px;
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

const Wrapper = styled(AutoColumn)`
    position: relative;
`

const Icon = styled.div`
    position: absolute;
    bottom: 10px;
    right: 12px;
    cursor: pointer;
    img {
        width: 16px;
        height: 16px;
    }
`

export const TextInput = ({
    value,
    onChange,
    label,
    placeholder,
    type = 'text',
    ...rest
}) => {
    return (
        <AutoColumn gap="4px">
            <Label>{label}</Label>
            <Input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                {...rest}
            />
        </AutoColumn>
    )
}

export const InputPassword = ({
    value,
    onChange,
    label = 'Password',
    placeholder = 'Password',
    name = 'password',
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggle = () => setShowPassword((prev) => !prev)

    const inputType = showPassword ? 'text' : 'password'

    return (
        <Wrapper gap="4px">
            <Label>{label}</Label>
            <Input
                name={name}
                value={value}
                onChange={onChange}
                type={inputType}
                placeholder={placeholder}
                {...rest}
                style={{ paddingRight: '34px' }}
            />
            <Icon onClick={toggle}>
                <img
                    src={showPassword ? PasswordClosedIcon : PasswordIcon}
                    alt=""
                />
            </Icon>
        </Wrapper>
    )
}

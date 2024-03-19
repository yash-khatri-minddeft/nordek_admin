import React, { useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { shallow } from 'zustand/shallow'
import { AutoColumn, Centered } from '../../../components/styled'
import LoginIcon from '../../../assets/svg/login.svg'
import {
    Input,
    InputNumber,
    InputPassword,
    Label,
} from '../../../components/Input'
import { Button } from '../../../components/Button'
import { initialSignInValues, signInValidationSchema } from '../constants'
import { useAuth } from '../../../hooks/useAuth'
import { useAuthErrorStore } from '../../../store/authErrorStore'

const FormWrapper = styled.form`
    width: 100%;
    max-width: 420px;
    padding: 40px;
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 14px;
`

const SecondaryText = styled.p`
    color: ${({ theme }) => theme.textSecondary};
    font-size: 12px;
    font-weight: 500;
`

const TitleText = styled.p`
    color: ${({ theme }) => theme.textPrimary};
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
`

const ErrorText = styled.p`
    color: ${({ theme }) => theme.error};
    font-size: 14px;
    font-weight: 500;
    line-height: 23.1px;
`

const LoginForm = () => {
    const { login } = useAuth()
    const {
        authError,
        otpError,
        invalidCodeError,
        unsetAuthError,
        unsetOtpError,
        unsetInvalidCode,
    } = useAuthErrorStore(
        ({
            authError,
            otpError,
            invalidCodeError,
            unsetAuthError,
            unsetOtpError,
            unsetInvalidCode,
        }) => ({
            authError,
            otpError,
            invalidCodeError,
            unsetAuthError,
            unsetOtpError,
            unsetInvalidCode,
        }),
        shallow
    )

    const [otp, setOtp] = useState('')

    const onSubmit = (data) => {
        if (otp) {
            data.meta = { otp }
        }
        login(data)
    }

    const resetErrors = () => {
        unsetAuthError()
        unsetOtpError()
        unsetInvalidCode()
    }

    const formik = useFormik({
        initialValues: initialSignInValues,
        validationSchema: signInValidationSchema,
        onSubmit: (values) => onSubmit(values),
    })

    const errorMessage =
        (formik.touched.email && formik.errors?.email) ||
        (formik.touched.password && formik.errors.password)

    return (
        <FormWrapper onSubmit={formik.handleSubmit}>
            <AutoColumn gap="lg">
                <AutoColumn gap="sm">
                    <Centered>
                        <img src={LoginIcon} width={55} alt="login" />
                    </Centered>
                    <Centered>
                        <TitleText
                            fontWeight={500}
                            fontSize={18}
                            lineHeight="27px"
                        >
                            Log in NORSWAP
                        </TitleText>
                    </Centered>
                </AutoColumn>
                {authError && (
                    <ErrorText>
                        Your login or password is wrong. Please check your
                        credentials and try again.
                    </ErrorText>
                )}
                {otpError && (
                    <ErrorText>Please enter authenticator code.</ErrorText>
                )}
                {invalidCodeError && (
                    <ErrorText>Invalid authenticator code.</ErrorText>
                )}
                {!authError && !otpError && !invalidCodeError && (
                    <ErrorText>{errorMessage}</ErrorText>
                )}
                <AutoColumn gap="xl">
                    <AutoColumn gap="4px">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                            id="login-email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={resetErrors}
                        />
                    </AutoColumn>
                    <InputPassword
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={resetErrors}
                    />
                    <AutoColumn gap="4px">
                        <Label htmlFor="login-authenticator-code">
                            Authenticator Code
                        </Label>
                        <InputNumber
                            id="login-authenticator-code"
                            type="number"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            onFocus={resetErrors}
                        />
                        <SecondaryText>
                            Enter the 6-digit code from Google Authenticator
                        </SecondaryText>
                    </AutoColumn>
                </AutoColumn>
                <Button type="submit">Log In</Button>
            </AutoColumn>
        </FormWrapper>
    )
}

export default LoginForm

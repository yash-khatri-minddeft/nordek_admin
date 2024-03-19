import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { shallow } from 'zustand/shallow'
import {
    AutoColumn,
    ErrorText,
    Flex,
    FlexAlign,
    Icon,
} from '../../../components/styled'
import { TEXT } from '../../../theme'
import GoBackIcon from '../../../assets/svg/go-back-icon.svg'
import { CancelButton, SaveButton } from '../common/buttons'
import Permissions from '../common/Permissions'
import Title from '../../../components/Title'
import { InputPassword, TextInput } from '../../../components/Input'
import { useUserStore } from '../../../store/userStore'
import {
    ACCEPT_ALL_PERMISSIONS,
    ACCEPT_ALL_ROLES,
    INITIAL_PERMISSIONS_STATE,
    MANAGE_ADMINS,
} from '../../../constants/roles'
import { useAuth } from '../../../hooks/useAuth'
import CopyWindow from '../../../components/CopyWindow'
import { useCopy } from '../../../hooks/useCopy'
import { useRolesList } from '../../../hooks/useRolesList'
import {
    createAdminValidationSchema,
    initialCreateAdminValues,
} from './constants'

const BackIcon = styled(Icon)`
    margin-right: 16px;
    img {
        width: 25px;
        height: 25px;
    }
`

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

const CreateAdmin = () => {
    const { registerByAdmin, emailError, resetEmailError } = useAuth()
    const navigate = useNavigate()
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_ADMINS)
    const navigateToAdminRoles = () => navigate('/roles')

    const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS_STATE)

    const rolesList = useRolesList()

    const {
        isCopied: isSuccess,
        closeCopyWindow: closeInfoWindow,
        openCopyWindow: openInfoWindow,
    } = useCopy()

    const formik = useFormik({
        initialValues: initialCreateAdminValues,
        validationSchema: createAdminValidationSchema,
        onSubmit: (values) => onSubmit(values),
    })

    const onSubmit = async (data) => {
        const roles = []

        for (const key in permissions) {
            if (key !== ACCEPT_ALL_PERMISSIONS && permissions[key] === true) {
                const role = rolesList.find((role) => role.name === key)
                if (role !== undefined) {
                    roles.push(role.id)
                }
            }
        }

        const { email, password, name } = data
        const requestData = {
            email,
            password,
            fields: {
                name,
                roles,
            },
        }
        const response = await registerByAdmin(requestData)
        if (response === true) {
            openInfoWindow()
            formik.resetForm()
            setPermissions(INITIAL_PERMISSIONS_STATE)
        }
    }

    const errorMessage =
        (formik.touched.name && formik.errors?.name) ||
        (formik.touched.email && formik.errors.email) ||
        (formik.touched.password && formik.errors.password) ||
        (formik.touched.repeatPassword && formik.errors.repeatPassword)

    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Admins.</Title>
            )}
            {isSuccess && (
                <CopyWindow text="Success" onClose={closeInfoWindow} />
            )}
            {hasRole !== undefined && (
                <form onSubmit={formik.handleSubmit}>
                    <AutoColumn gap="lg">
                        <AutoColumn gap="xl">
                            <FlexAlign>
                                <BackIcon onClick={navigateToAdminRoles}>
                                    <img src={GoBackIcon} alt="back" />
                                </BackIcon>
                                <Title>Create admin account</Title>
                            </FlexAlign>
                            <div>
                                <ErrorText>
                                    {emailError ? emailError : errorMessage}
                                </ErrorText>
                                <Container>
                                    <Block>
                                        <AutoColumn gap="xl">
                                            <TextPrimary>Name</TextPrimary>
                                            <TextInput
                                                placeholder="Full name"
                                                label="Full name"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                onFocus={resetEmailError}
                                            />
                                            <TextInput
                                                placeholder="Email"
                                                label="Email"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                onFocus={resetEmailError}
                                            />
                                        </AutoColumn>
                                    </Block>
                                    <Block>
                                        <AutoColumn gap="xl">
                                            <TextPrimary>Password</TextPrimary>
                                            <InputPassword
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                onFocus={resetEmailError}
                                            />
                                            <InputPassword
                                                placeholder="Repeat Password"
                                                label="Confirm password"
                                                name="repeatPassword"
                                                value={
                                                    formik.values.repeatPassword
                                                }
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                onFocus={resetEmailError}
                                            />
                                        </AutoColumn>
                                    </Block>
                                </Container>
                            </div>
                        </AutoColumn>
                        <AutoColumn gap="xl">
                            <TEXT.primary fontSize={24} fontWeight={600}>
                                Permissions
                            </TEXT.primary>
                            <Permissions
                                data={permissions}
                                onChange={setPermissions}
                                acceptAll={ACCEPT_ALL_ROLES}
                                declineAll={INITIAL_PERMISSIONS_STATE}
                            />
                            <Flex>
                                <CancelButton onClick={navigateToAdminRoles}>
                                    Cancel
                                </CancelButton>
                                <SaveButton type="submit">Save</SaveButton>
                            </Flex>
                        </AutoColumn>
                    </AutoColumn>
                </form>
            )}
        </>
    )
}

export default CreateAdmin

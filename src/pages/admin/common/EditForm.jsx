import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { useAuth } from '../../../hooks/useAuth'
import { useUser } from '../../../hooks/useUser'
import {
    ACCEPT_ALL_PERMISSIONS,
    ACCEPT_ALL_ROLES,
    INITIAL_PERMISSIONS_STATE,
} from '../../../constants/roles'
import { useRolesList } from '../../../hooks/useRolesList'
import {
    editAdminValidationSchema,
    initialEditAdminValues,
} from '../EditAdmin/constants'
import {
    AutoColumn,
    ErrorText,
    Flex,
    FlexAlign,
    Icon,
} from '../../../components/styled'
import GoBackIcon from '../../../assets/svg/go-back-icon.svg'
import Title from '../../../components/Title'
import { Tab } from '../../../components/Tab'
import { TEXT } from '../../../theme'
import FormInputs from './FormInputs'
import Permissions from './Permissions'
import { CancelButton, SaveButton } from './buttons'

const BackIcon = styled(Icon)`
    margin-right: 16px;
    img {
        width: 25px;
        height: 25px;
    }
`

const FormWrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 10px 10px 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
`

const EditForm = ({
    userInfo,
    openInfoWindow,
    openInfoChangedWindow,
    permissions,
    setPermissions,
}) => {
    const { changePasswordByAdmin } = useAuth()
    const { editByAdmin } = useUser()
    const navigate = useNavigate()
    const params = useParams()
    const rolesList = useRolesList()

    const navigateToAdminRoles = () => navigate('/roles')

    const formik = useFormik({
        initialValues: initialEditAdminValues,
        validationSchema: editAdminValidationSchema,
        onSubmit: (values) => onSubmit(values),
    })

    const onSubmit = async (data) => {
        let shouldReset = false
        const roles = []

        for (const key in permissions) {
            if (key !== ACCEPT_ALL_PERMISSIONS && permissions[key] === true) {
                const role = rolesList.find((role) => role.name === key)
                if (role !== undefined) {
                    roles.push(role.id)
                }
            }
        }

        const requestData = {
            id: userInfo.id,
            name: data.name || userInfo.name,
            email: data.email || userInfo.email,
            roles,
        }

        const passwordRequestData = { userId: params.id }

        if (data?.newPassword) {
            passwordRequestData.newPassword = data.newPassword
        }

        if (data.surname) {
            requestData.name = `${requestData.name} ${data.surname}`
        }

        if (passwordRequestData?.newPassword) {
            const response = await changePasswordByAdmin(passwordRequestData)
            if (response === true) {
                openInfoWindow()
                shouldReset = true
            }
        }

        const shouldUpdateInfo =
            data.email ||
            data.name ||
            data.surname ||
            roles.length !== userInfo.roles.length

        if (shouldUpdateInfo) {
            const response = await editByAdmin(requestData)
            if (response === true) {
                openInfoChangedWindow()
                shouldReset = true
            }
        }

        if (shouldReset) {
            formik.resetForm()
        }
    }

    const errorMessage =
        (formik.touched.name && formik.errors?.name) ||
        (formik.touched.surname && formik.errors.surname) ||
        (formik.touched.email && formik.errors.email) ||
        (formik.touched.oldPassword && formik.errors.oldPassword) ||
        (formik.touched.newPassword && formik.errors.newPassword) ||
        (formik.touched.repeatNewPassword && formik.errors.repeatNewPassword)

    return (
        <form onSubmit={formik.handleSubmit}>
            <AutoColumn gap="lg">
                <AutoColumn gap="xl">
                    <FlexAlign>
                        <BackIcon onClick={navigateToAdminRoles}>
                            <img src={GoBackIcon} alt="back" />
                        </BackIcon>
                        <Title>ID {params.id}</Title>
                    </FlexAlign>
                    <div>
                        <Tab active={'true'}>Change Password</Tab>
                        <FormWrapper>
                            <ErrorText>{errorMessage}</ErrorText>
                            <FormInputs formik={formik} />
                        </FormWrapper>
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
                        <SaveButton>Save</SaveButton>
                    </Flex>
                </AutoColumn>
            </AutoColumn>
        </form>
    )
}

export default EditForm

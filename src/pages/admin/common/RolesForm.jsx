import React from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { shallow } from 'zustand/shallow'
import { ErrorText } from '../../../components/styled'
import {
    editAdminValidationSchema,
    initialEditAdminValues,
} from '../EditAdmin/constants'
import { useUserStore } from '../../../store/userStore'
import { useAuth } from '../../../hooks/useAuth'
import { useUser } from '../../../hooks/useUser'
import FormInputs from './FormInputs'

const Wrapper = styled.form`
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 10px 10px 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
`

const RolesForm = ({ openInfoWindow, openInfoChangedWindow }) => {
    const { changePassword } = useAuth()
    const { editByMe } = useUser()
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const formik = useFormik({
        initialValues: initialEditAdminValues,
        validationSchema: editAdminValidationSchema,
        onSubmit: (values) => onSubmit(values),
    })

    const onSubmit = async (data) => {
        let shouldReset = false

        const requestData = {
            name: data.name || user.name,
            email: data.email || user.email,
        }

        const passwordRequestData = {}

        if (data?.newPassword && !data?.oldPassword) {
            formik.setErrors({
                oldPassword:
                    'To change your password please enter old password.',
            })
        }
        if (data?.newPassword && data?.oldPassword) {
            passwordRequestData.newPassword = data.newPassword
            passwordRequestData.oldPassword = data.oldPassword

            const response = await changePassword(passwordRequestData)
            if (response === true) {
                openInfoWindow()
                shouldReset = true
            }
        }

        if (data.surname) {
            requestData.name = `${requestData.name} ${data.surname}`
        }

        if (data.email || data.name || data.surname) {
            const response = await editByMe(requestData)
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
        <Wrapper onSubmit={formik.handleSubmit}>
            <ErrorText>{errorMessage}</ErrorText>
            <FormInputs formik={formik} />
        </Wrapper>
    )
}

export default RolesForm

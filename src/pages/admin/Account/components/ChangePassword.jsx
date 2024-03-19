import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { InfoSection } from '../../../../components/StyledSection'
import { InputPassword } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import {
    changePasswordValidationSchema,
    initialChangePasswordValues,
} from '../constants/changePassword'
import { useAuth } from '../../../../hooks/useAuth'
import { LeftSection } from '../../common/FormInputs'
import PasswordChangedModal from './PasswordChangedModal'

const Container = styled(InfoSection)`
    padding: 24px;
`

const Form = styled.form`
    max-width: 372px;
`

const ErrorText = styled.p`
    color: ${({ theme }) => theme.error};
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 23.1px;'
`

const INVALID_PASSWORD_MESSAGE = 'Old password invalid'

const ChangePassword = () => {
    const { changePassword } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])
    const openModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const onSubmit = (data) => {
        changePassword(data).then((res) => {
            if (res === true) {
                openModal()
            } else if (
                res?.response?.data?.message === INVALID_PASSWORD_MESSAGE
            ) {
                setWrongPassword(true)
            }
        })
    }

    const resetOldPasswordError = () => {
        setWrongPassword(false)
    }

    const formik = useFormik({
        initialValues: initialChangePasswordValues,
        validationSchema: changePasswordValidationSchema,
        onSubmit: (values) => onSubmit(values),
    })

    const errorMessage =
        (formik.touched.oldPassword && formik.errors?.oldPassword) ||
        (formik.touched.newPassword && formik.errors.newPassword) ||
        (formik.touched.repeatNewPassword && formik.errors.repeatNewPassword)

    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                {wrongPassword && <ErrorText>Wrong old password.</ErrorText>}
                {!wrongPassword && <ErrorText>{errorMessage}</ErrorText>}
                <LeftSection gap="xl">
                    <InputPassword
                        name="oldPassword"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Old password"
                        onFocus={resetOldPasswordError}
                    />
                    <InputPassword
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="New password"
                        onFocus={resetOldPasswordError}
                    />
                    <InputPassword
                        name="repeatNewPassword"
                        value={formik.values.repeatNewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Confirm password"
                        onFocus={resetOldPasswordError}
                    />
                    <Button type="submit">Save</Button>
                </LeftSection>
            </Form>

            <Modal closeModal={closeModal} isOpen={isModalOpen}>
                <PasswordChangedModal />
            </Modal>
        </Container>
    )
}

export default ChangePassword

import React from 'react'
import styled from 'styled-components'
import { InputPassword, TextInput } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { AutoColumn, Flex } from '../../../components/styled'

export const LeftSection = styled(AutoColumn)`
    width: 100%;
    max-width: 372px;
`
const RightSection = styled(AutoColumn)`
    width: 100%;
    max-height: 224px;
    margin-left: 24px;
`
const FormInputs = ({ formik }) => {
    return (
        <Flex>
            <LeftSection gap="xl">
                <InputPassword
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Old password"
                />
                <InputPassword
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="New password"
                />
                <InputPassword
                    name="repeatNewPassword"
                    value={formik.values.repeatNewPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Confirm password"
                />
                <Button type="submit">Save</Button>
            </LeftSection>
            <RightSection gap="xl">
                <TextInput
                    placeholder="Name"
                    label="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <TextInput
                    placeholder="Surname"
                    label="Surname"
                    name="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <TextInput
                    placeholder="Email"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </RightSection>
        </Flex>
    )
}

export default FormInputs

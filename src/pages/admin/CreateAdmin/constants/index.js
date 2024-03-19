import * as yup from 'yup'
import { emailRegExp, nameRegExp } from '../../../Login/constants'

export const initialCreateAdminValues = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
}

export const createAdminValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name required')
        .matches(nameRegExp, 'Name should contain only latin letters')
        .min(2, 'Enter at least 2 characters'),
    email: yup
        .string()
        .matches(emailRegExp, 'Incorrect email')
        .required('Email required'),
    password: yup
        .string()
        .trim('Password can not include spaces')
        .required('Password required')
        .min(6, 'Enter at least 6 characters'),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm password required'),
})

import * as yup from 'yup'
import { emailRegExp, nameRegExp } from '../../../Login/constants'

export const initialEditAdminValues = {
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
    name: '',
    surname: '',
    email: '',
}

export const editAdminValidationSchema = yup.object().shape({
    oldPassword: yup.string().trim('Password can not include spaces'),
    newPassword: yup
        .string()
        .trim('Password can not include spaces')
        .min(6, 'Enter at least 6 characters'),
    repeatNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
    name: yup
        .string()
        .min(2, 'Enter at least 2 characters')
        .matches(nameRegExp, 'Name should contain only latin letters'),
    surname: yup
        .string()
        .min(2, 'Enter at least 2 characters')
        .matches(nameRegExp, 'Surname should contain only latin letters'),
    email: yup.string().matches(emailRegExp, 'Incorrect email'),
})

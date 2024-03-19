import * as yup from 'yup'

export const initialChangePasswordValues = {
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
}

export const changePasswordValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .trim('Password can not include spaces')
        .required('Old password required')
        .min(6, 'Enter at least 6 characters'),
    newPassword: yup
        .string()
        .trim('Password can not include spaces')
        .required('New password required')
        .min(6, 'Enter at least 6 characters'),
    repeatNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords do not match')
        .required('Confirm password required'),
})

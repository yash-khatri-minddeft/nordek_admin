import * as yup from 'yup'

export const initialSignInValues = {
    email: '',
    password: '',
}

export const emailRegExp =
    /^([_a-z0-9]+[\._a-z0-9]*)(\+[a-z0-9]+)?@(([a-z0-9-]+\.)*[a-z]{2,4})$/

export const nameRegExp = /^[A-Za-z\s]*$/

export const signInValidationSchema = yup.object().shape({
    email: yup
        .string()
        .matches(emailRegExp, 'Incorrect email')
        .required('Email required'),
    password: yup
        .string()
        .trim('Password can not include spaces')
        .required('Password required'),
    // .min(2, 'Enter at least 2 characters'),
})

import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required("Enter password")
})
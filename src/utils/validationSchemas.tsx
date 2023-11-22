import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    pwd: Yup.string()
      .required("Enter password")
})
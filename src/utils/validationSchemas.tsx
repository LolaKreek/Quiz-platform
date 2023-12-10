import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required("Enter password")
})

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required("Enter password")
})

export const addQuizSchema = Yup.object().shape({
  quizName: Yup.string()
    .required("Please enter quiz name"),
  faculty: Yup.string()
    .required("Please select a faculty"),
  subjects: Yup.string()
    .min(1, "Please select a subject")
    .required("Please select a subject")
})
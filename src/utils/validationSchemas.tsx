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
    .required("Please select a subject"),
  questions: Yup.array().required().min(1, "Please add at least one question")
})

export const addQuizQuestionSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter question title"),
  type: Yup.string()
    .required("Please select a type"),
  answers: Yup.object().shape({
    first: Yup.object().shape({
      text: Yup.string().required(),
    }),
    second: Yup.object().shape({
      text: Yup.string().required(),
    }),
    third: Yup.object().shape({
      text: Yup.string().required(),
    }),
    fourth: Yup.object().shape({
      text: Yup.string().required(),
    }),
  })
})
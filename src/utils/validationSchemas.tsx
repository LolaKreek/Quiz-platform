import * as Yup from 'yup'
export const SUPPORTED_FORMATS = ["application/pdf"]
export const FILE_SIZE_LIMIT = 1048480

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

export const addQuizQuestionSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter question title"),
  type: Yup.string()
    .required("Please select a type"),
})

export const uploafFilenSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter file title"),
  faculty: Yup.string()
    .required("Please select a faculy"),
  subject: Yup.string()
    .required("Please select a subject"),
  file: Yup.mixed()
    .required("Please choose the file")
    .test('fileType', "File type is not supported (only .pdf)", value => {
      if (!value) return false
      //@ts-ignore
      return SUPPORTED_FORMATS.includes(value.type)
    })
    .test('fileSize', "File size should be 5mb or less", value => {
      if (!value) return false
      //@ts-ignore
      return FILE_SIZE_LIMIT >= value.size
    }),
})
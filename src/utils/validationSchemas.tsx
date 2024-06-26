import * as Yup from "yup";
export const SUPPORTED_FORMATS = ["application/pdf"];
export const SUPPORTED_FORMATS_PIC = ["image/png", "image/jpeg"];
export const FILE_SIZE_LIMIT = 1048480;

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Enter password"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Enter password"),
});

export const addQuizSchema = Yup.object().shape({
  quizName: Yup.string().required("Please enter quiz name"),
  faculty: Yup.string().required("Please select a faculty"),
  subjects: Yup.string()
    .min(1, "Please select a subject")
    .required("Please select a subject"),
  questions: Yup.array().required().min(1, "Please add at least one question"),
});

export const addQuizQuestionSchema = Yup.object().shape({
  title: Yup.string().required("Please enter question title"),
  type: Yup.string().required("Please select a type"),
  picture: Yup.mixed()
    .nullable()
    .test("size", "File in question size should be 5mb or less", (value) => {
      if (!value || typeof value === "string") return true;
      //@ts-ignore
      return FILE_SIZE_LIMIT >= value.size;
    }),
  answers: Yup.object().shape({
    first: Yup.object().shape({
      text: Yup.string().required("Please enter first answer"),
      picture: Yup.mixed()
        .test("size", "File in first answer size should be 5mb or less", (value) => {
          
          if (!value || typeof value === "string") return true;
          //@ts-ignore
          return FILE_SIZE_LIMIT >= value.size;
        })
        .test(
          "type",
          "File in first answer type is not supported (only .png, .jpg, .jpeg)",
          (value) => {
            if (!value || typeof value === "string") return true;
            //@ts-ignore
            return SUPPORTED_FORMATS_PIC.includes(value.type);
          }
        ),
    }),
    second: Yup.object().shape({
      text: Yup.string().required("Please enter second answer"),
      picture: Yup.mixed()
        .test("size", "File in second answer size should be 5mb or less", (value) => {
          
          if (!value || typeof value === "string") return true;
          //@ts-ignore
          return FILE_SIZE_LIMIT >= value.size;
        })
        .test(
          "type",
          "File in second answer type is not supported (only .png, .jpg, .jpeg)",
          (value) => {
            if (!value || typeof value === "string") return true;
            //@ts-ignore
            return SUPPORTED_FORMATS_PIC.includes(value.type);
          }
        ),
    }),
    third: Yup.object().shape({
      text: Yup.string().required("Please enter third answer"),
      picture: Yup.mixed()
        .test("size", "File in third answer size should be 5mb or less", (value) => {
          
          if (!value || typeof value === "string") return true;
          //@ts-ignore
          return FILE_SIZE_LIMIT >= value.size;
        })
        .test(
          "type",
          "File in third answer type is not supported (only .png, .jpg, .jpeg)",
          (value) => {
            if (!value || typeof value === "string") return true;
            //@ts-ignore
            return SUPPORTED_FORMATS_PIC.includes(value.type);
          }
        ),
    }),
    fourth: Yup.object().shape({
      text: Yup.string().required("Please enter fourth answer"),
      picture: Yup.mixed()
        .test("size", "File in fourth answer size should be 5mb or less", (value) => {
          
          if (!value || typeof value === "string") return true;
          //@ts-ignore
          return FILE_SIZE_LIMIT >= value.size;
        })
        .test(
          "type",
          "File in fourth answer type is not supported (only .png, .jpg, .jpeg)",
          (value) => {
            if (!value || typeof value === "string") return true;
            //@ts-ignore
            return SUPPORTED_FORMATS_PIC.includes(value.type);
          }
        ),
    }),
  }),
});

export const uploafFilenSchema = Yup.object().shape({
  title: Yup.string().required("Please enter file title"),
  faculty: Yup.string().required("Please select a faculy"),
  subject: Yup.string().required("Please select a subject"),
  file: Yup.mixed()
    .required("Please choose the file")
    .test("fileType", "File type is not supported (only .pdf)", (value) => {
      if (!value) return false;
      //@ts-ignore
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "File size should be 5mb or less", (value) => {
      if (!value) return false;
      //@ts-ignore
      return FILE_SIZE_LIMIT >= value.size;
    }),
});

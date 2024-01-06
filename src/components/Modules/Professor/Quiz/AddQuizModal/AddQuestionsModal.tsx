import { Box, Modal, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { AppInput } from "../../../../AppInput";
import { Formik } from "formik";
import { useState } from "react";
import { AppSelect } from "../../../../AppSelect";
import { AppButton } from "../../../../AppButton";
import { addQuizQuestionSchema } from "../../../../../utils/validationSchemas";
import { ErrorOverLay } from "../../../../ErrorOverLay";
import toast from "react-hot-toast";
import Notification from "../../../../Notification";
import SingleAnswer from "../../QuestionElements/SingleAnswer";
import MultipleAnswer from "../../QuestionElements/MultipleAnswer";
import DragNDropAnswer from "../../QuestionElements/DragNDropAnswer";

const AddQuestionModal = ({
  open,
  setQuiestionOpen,
  types,
  questions,
  setQuestions,
  editing,
  editingValues,
}: any) => {
  const { t } = useTranslation("quiz");
  const initialState = { title: "", type: "", id: Date.now(), answers: null };

  const questionElements: { [key: string]: (props: any) => JSX.Element } = {
    Single: (props) => <SingleAnswer {...props} />,
    Multiple: (props) => <MultipleAnswer {...props} />,
    "Drag & Drop": (props) => <DragNDropAnswer {...props} />,
  };

  const [submitted, setSubmitted] = useState(false);

  const questionTypeInitialValues = {
    Single: {
      first: { text: "" },
      second: { text: "" },
      third: { text: "" },
      fourth: { text: "" },
    },
    Multiple: {
      first: { text: "", isCorrect: false },
      second: { text: "", isCorrect: false },
      third: { text: "", isCorrect: false },
      fourth: { text: "", isCorrect: false },
    },
    "Drag & Drop": {
      first: { text: "" },
      second: { text: "" },
      third: { text: "" },
      fourth: { text: "" },
    },
  };

  const handleClose = () => {
    setQuiestionOpen(false);
  };

  const actionQuestion = (values: any) => {
    if (editing) {
      let questionsInstance = [...questions];
      questionsInstance[questions.indexOf(editingValues)] = values;
      setQuestions(questionsInstance);
      handleClose();

      toast.custom(
        (element) => (
          <Notification
            header={t("addQuestionActionHeader")}
            message={t("addQuestionActionMessageEdited")}
            element={element}
            type="success"
          />
        ),
        { position: "bottom-center" }
      );
    } else {
      setQuestions([...questions, values]);
      handleClose();

      toast.custom(
        (element) => (
          <Notification
            header={t("addQuestionActionHeader")}
            message={t("addQuestionActionMessage")}
            element={element}
            type="success"
          />
        ),
        { position: "bottom-center" }
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="add-questions-modal__modal-wrapper"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Paper className="add-questions-modal">
        <Formik
          initialValues={editing ? editingValues : initialState}
          validationSchema={addQuizQuestionSchema}
          validateOnChange={submitted}
          validateOnBlur={false}
          onSubmit={actionQuestion}
        >
          {({
            errors,
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            validateForm,
            setErrors,
          }) => (
            <Box>
              <Box className="add-questions-modal__header-wrapper">
                <Typography className="add-questions-modal__main-title">
                  {editing ? t("questionsPartEditing") : t("questionsPart")}
                </Typography>
                <CloseIcon
                  className="add-questions-modal__close-icon"
                  onClick={handleClose}
                />
              </Box>

              <Box className="add-questions-modal__content-wrapper">
                <Box>
                  <Typography className="add-questions-modal__quiz-title label">
                    <i className="symbol">*&nbsp;</i> {t("quiestionTitle")}
                  </Typography>
                  <AppInput
                    id="title"
                    // @ts-ignore
                    value={values.title}
                    // @ts-ignore
                    error={!!errors.title}
                    onChange={(e) => {
                      setFieldValue("title", e.target.value);
                      handleChange(e);
                    }}
                    variant="outlined"
                    className="add-questions-modal__title-input"
                  />
                </Box>

                <Box className="add-questions-modal__type-wrapper">
                  <Typography className="add-questions-modal__quiz-title label">
                    <i className="symbol">*&nbsp;</i> {t("quiestionType")}
                  </Typography>

                  <AppSelect
                    id="type"
                    className="add-questions-modal__select"
                    variant="outlined"
                    // @ts-ignore
                    value={values.type}
                    // @ts-ignore
                    error={!!errors.type}
                    options={types}
                    onChange={(e) => {
                      // @ts-ignore
                      setFieldValue("answers",questionTypeInitialValues[e.target.value]);
                      setFieldValue("type", e.target.value);
                      setErrors({ ...errors, answers: undefined });
                    }}
                  />
                </Box>

                <Box>
                  {questionElements[values.type] &&
                    questionElements[values.type]({
                      set: (arg)=>{setFieldValue("answers", arg)},
                      values: values.answers,
                      errors: errors.answers,
                      editing: editing,
                    })}
                </Box>

                <Box className="add-questions-modal__button-wrapper">
                  <AppButton
                    onClick={() => {
                      validateForm().then((res) => {
                        values.type === "Open" && delete res["answers"];

                        if (!Object.keys(res).length) {
                          setSubmitted(true);
                          handleSubmit();
                          actionQuestion(values);
                        }
                      });
                    }}
                    className="top-menu__button"
                  >
                    {editing ? t("editQuizBtn") : t("addQuizBtn")}
                  </AppButton>
                </Box>
              </Box>

              <Box className="add-questions-modal__error-wrapper margin-top">
                {/* @ts-ignore */}
                {(errors?.title || errors.type || errors.answers) && (
                  <ErrorOverLay>
                    {/* @ts-ignore */}
                    {errors.title ||
                      errors.type ||
                      (errors.answers ? "Please enter answers" : null)}
                  </ErrorOverLay>
                )}
              </Box>
            </Box>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
};

export default AddQuestionModal;

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppInput } from "../../../../AppInput";
import { Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { initialStateType } from "./tyles";
import { AppSelect } from "../../../../AppSelect";
import { onValue, ref } from "firebase/database";
import { database } from "../../../../../services/Firebase/firebase";
import { AppButton } from "../../../../AppButton";
import { getQuizQuestionTypes, writeQuizData } from "../../../../../services/quiz";
import toast from "react-hot-toast";
import Notification from "../../../../Notification";
import { useNavigate } from "react-router-dom";
import { PROFESSOR_QUIZ_PAGE } from "../../../../../routes/pathnames";
import { addQuizSchema } from "../../../../../utils/validationSchemas";
import { ErrorOverLay } from "../../../../ErrorOverLay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddQuestionModal from "./AddQuestionsModal";
import QuestionBox from "../../../../QuestionBox";

const Form = ({ setSubmitted }: any) => {
  const { t } = useTranslation("quiz");
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState([]);
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [quiestionOpen, setQuiestionOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const [editing, setEditing] = useState<{editing: boolean; values: any}>({editing: false, values: null});

  const { values, handleChange, errors, setFieldValue, validateForm } =
    useFormikContext();

  const getFaculties = async () => {
    const starCountRef = ref(database, "faculties/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);

      const faculties = data.map(({ name }: { name: string }) => name);
      setFaculties(faculties);
    });
    
    
    
    
  };

  const getAnswerTypes = async () => {
    const response = await getQuizQuestionTypes();
    if (response) {
      setTypes(response.map((item: any) => item.title));
    }
  };

  const facultyHandleChange = (value: any) => {
    // @ts-ignore
    const element = data.find((item: { name: string; objects: [] }) => item.name === value)?.objects;

    if (element) {
      const subjects = element.map((subject: { name: string }) => subject.name);
      setSubjects(subjects);
    } else {
      setSubjects([]);
    }
  };

  const handleDeleteQuestion = (id: Date) => {
    // @ts-ignore
    setFieldValue("questions", (values.questions.filter((item) => item.id !== id)));

    toast.custom(
      (element) => (
        <Notification
        // @ts-ignore
          header={values.quizEditing ? t("editQuizActionHeader") : t("addQuizActionHeader")}
          message={t("deleteQuestionActionMessage")}
          element={element}
          type="success"
        />
      ),
      { position: "bottom-center" }
    );
  };

  const handleEditingQuestion = (id: Date) => {
    // @ts-ignore
    setEditing({editing: true, values: values.questions.filter((item) => item.id === id)[0]});
    setQuiestionOpen(true)
  }

  const handleAddQuiz = async () => {
    const validationResult = await validateForm();

    if (!Object.keys(validationResult).length) {
      setSubmitted(true);

      try {
        // @ts-ignore
        writeQuizData({title: values?.quizName, faculty: values?.faculty, subject: values?.subjects, timer: values?.timer, showAnswers: values?.showAnswers, questions: values?.questions, editingId: values.quizEditing ? values?.quizEditingId : null});
        toast.custom(
          (element) => (
            <Notification
            // @ts-ignore
              header={values.quizEditing ? t("editQuizActionHeader") : t("addQuizActionHeader")} message={values.quizEditing ? t("editQuizActionMessage") : t("addQuizActionMessage")}
              element={element}
              type="success"
            />
          ),
          { position: "bottom-center" }
        );
        navigate(PROFESSOR_QUIZ_PAGE);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  useEffect(() => {
    getFaculties();
    getAnswerTypes();
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (values.quizEditing) {
      // @ts-ignore
      onValue(ref(database, `quiz/${values.quizEditingId}/faculty`), (snapshot) => {
        const data = snapshot.val();
        setFieldValue("faculty", data)
        facultyHandleChange(data)
      });
    }
  }, [faculties])
  


  return (
    <Box className="quiz-add-modal">
      <Box className="quiz-add-modal__header-wrapper">
        <Box className="quiz-add-modal__title-wrapper">
          <ArrowBackIcon
            className="quiz-add-modal__back-icon"
            onClick={() => navigate(PROFESSOR_QUIZ_PAGE)}
          />
          <Typography className="quiz-add-modal__main-title">
          {/* @ts-ignore */}
            {values.quizEditing ? t("editModalTitle") : t("addModalTitle")}
          </Typography>
        </Box>

        <Box>
          <AppButton onClick={handleAddQuiz} className="top-menu__button">
          {/* @ts-ignore */}
            {values.quizEditing ? t("editQuizBtn") : t("addQuizBtn")}
          </AppButton>
        </Box>
      </Box>

      <Box className="quiz-add-modal__content-wrapper">
        <Box className="quiz-add-modal__left-part left-part">
          <Typography className="sub-title">{t("quizConfig")}</Typography>

          <Box className="left-part__quiz-title-wrapper margin-bottom margin-top">
            <Typography className="left-part__quiz-title label">
              <i className="symbol">*&nbsp;</i> {t("addQuizTitle")}
            </Typography>
            <AppInput
              id="quizName"
              // @ts-ignore
              value={values.quizName}
              // @ts-ignore
              error={!!errors.quizName}
              onChange={(e) => {
                setFieldValue("quizName", e.target.value);
                handleChange(e);
              }}
              variant="outlined"
              className="left-part__title-input"
            />
          </Box>

          <Box className="left-part__quiz-type-wrapper margin-bottom">
            <Typography className="left-part__quiz-type label">
              <i className="symbol">*&nbsp;</i> {t("addQuizFaculty")}
            </Typography>

            <AppSelect
              id="faculty"
              className="left-part__select"
              variant="outlined"
              options={faculties}
              // @ts-ignore
              error={!!errors.faculty}
              // @ts-ignore
              value={values.faculty}
              onChange={(e) => {
                setFieldValue("faculty", e.target.value);
                facultyHandleChange(e.target.value);
              }}
            />
          </Box>

          <Box className="left-part__quiz-type-wrapper margin-bottom">
            <Typography className="left-part__quiz-type label">
              <i className="symbol">*&nbsp;</i> {t("addQuizCourse")}
            </Typography>

            <AppSelect
              id="subjects"
              className="left-part__select"
              variant="outlined"
              // @ts-ignore
              value={values.subjects}
              // @ts-ignore
              error={!!errors.subjects}
              options={subjects}
              onChange={(e) => setFieldValue("subjects", e.target.value)}
            />
          </Box>

          <Box className="left-part__timer-wrapper">
            <FormControlLabel
              className="show-answers__label"
              label={t("addQuizTimer")}
              control={
                <Checkbox
                  id="timer"
                  // @ts-ignore
                  value={values.timer} onChange={handleChange} checked={values.timer}
                />
              }
            />
          </Box>

          <Box className="left-part__show-answers-wrapper">
            <FormControlLabel
              className="show-answers__label"
              label={t("addQuizShowAnswers")}
              control={
                <Checkbox
                  id="showAnswers"
                  // @ts-ignore
                  value={values.showAnswers} checked={values.showAnswers} onChange={handleChange}
                />
              }
            />
          </Box>
        </Box>

        <Box className="quiz-add-modal__right-part right-part">
          <Typography className="sub-title">
            {t("addQuizQuestionTitle")}
          </Typography>
              {/* @ts-ignore */}
          {values.questions.length > 0 && (
            <Box>
              {/* @ts-ignore */}
              {values.questions.map((question) => (
                //@ts-ignore
                <QuestionBox title={question.title} id={question.id} type={question.type} handleDeleteQuestion={handleDeleteQuestion} handleEditingQuestion={handleEditingQuestion}/>
              ))}
            </Box>
          )}

          <Box className="right-part__button-wrapper">
            <AppButton
              onClick={() => {setQuiestionOpen(true)
              setEditing({editing: false, values: null})}}
              className="top-menu__button"
            >
              {t("addQuiestionBtn")}
            </AppButton>
          </Box>
        </Box>
      </Box>

      <Box className="quiz-add-modal__error-wrapper">
        {/* @ts-ignore */}
        {(errors?.quizName || errors.faculty || errors.subjects || errors.questions) && (
          <ErrorOverLay>
            {/* @ts-ignore */}
            {errors.quizName || errors.faculty || errors.subjects || errors.questions}
          </ErrorOverLay>
        )}
      </Box>

      {quiestionOpen && (
        <AddQuestionModal
          editing={editing.editing}
          editingValues={editing.values}
          open={quiestionOpen}
          setQuiestionOpen={setQuiestionOpen}
          types={types}
          // @ts-ignore
          questions={values.questions}
          // @ts-ignore
          setQuestions={(value)=>{setFieldValue("questions", value)}}
        />
      )}
    </Box>
  );
};


// можно добавить сюда initialvalues потом прокинуть их в формик
// и надо сделать чтобы всё было не на дефолт стейтах а на стейтах формика

const QuizModule = ({editing, editingValues}: {editing?: boolean, editingValues?: any}) => {
  const [submitted, setSubmitted] = useState(false);

  const initialState: initialStateType = editing ? {
    quizName: editingValues.title,
    faculty: "",
    timer: editingValues.timer,
    showAnswers: editingValues.showAnswers,
    questions: editingValues.questions,
    subjects: editingValues.subject,
    quizEditing: true,
    quizEditingId: editingValues.id,
  } : {
    quizName: "",
    faculty: "",
    timer: false,
    showAnswers: false,
    questions: [],
    subjects: "",
    quizEditing: false,
  };
  

  const addQuiz = () => {};

  return (
    <Formik
      initialValues={initialState}
      validationSchema={addQuizSchema}
      validateOnChange={submitted}
      validateOnBlur={false}
      onSubmit={addQuiz}
    >
      <Form setSubmitted={setSubmitted} />
    </Formik>
  );
};

export default QuizModule;

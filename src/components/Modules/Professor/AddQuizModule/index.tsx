import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { AppInput } from "../../../AppInput";
import { Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { initialStateType } from "./tyles";
import { AppSelect } from "../../../AppSelect";
import { onValue, ref } from "firebase/database";
import { database } from "../../../../services/Firebase/firebase";
import { AppButton } from "../../../AppButton";
import { writeQuizData } from "../../../../services/quiz";
import toast from "react-hot-toast";
import Notification from "../../../Notification";
import { useNavigate } from "react-router-dom";
import { PROFESSOR_QUIZ_PAGE } from "../../../../routes/pathnames";
import { addQuizSchema } from "../../../../utils/validationSchemas";
import { ErrorOverLay } from "../../../ErrorOverLay";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Form = ({setSubmitted}: any) => {
    const { t } = useTranslation('quiz')
    const navigate = useNavigate();

    const [faculties, setFaculties] = useState([])
    const [data, setData] = useState([])
    const [subjects, setSubjects] = useState([])

    const {
        values,
        handleChange,
        errors,
        setFieldValue,
        validateForm
    } = useFormikContext();

    const getFaculties = () => {
        const starCountRef = ref(database, 'faculties/');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setData(data)

                const faculties = data.map(({name}: {name: string}) => name)
                setFaculties(faculties)
        });
    }

    const facultyHandleChange = (e: any) => {
        // @ts-ignore
        const element = data.find((item: {name: string, objects: []}) => item.name === e.target.value)?.objects
        
        if(element){
            const subjects = element.map((subject: {name: string}) => subject.name)
            setSubjects(subjects)
        }else{
            setSubjects([])
        }
    }

    const handleAddQuiz = async () => {
        const validationResult = await validateForm();

        if(!Object.keys(validationResult).length){
            setSubmitted(true);

            try{
                // @ts-ignore
                writeQuizData({title: values?.quizName, faculty: values?.faculty,subject:  values?.subjects, timer: values?.timer, showAnswers: values?.showAnswers});
                toast.custom((element) => (
                    <Notification header={t('addQuizActionHeader')} message={t('addQuizActionMessage')} element={element} type='success' />
                ), {position: "bottom-center"});
                navigate(PROFESSOR_QUIZ_PAGE)
            }catch(error) {
                console.log('error: ', error)
            } 
        }
    }

    useEffect(() => {
        getFaculties()
    }, [])

    return(
        <Box className="quiz-add-modal">
            <Box className="quiz-add-modal__header-wrapper">
                <Box className="quiz-add-modal__title-wrapper">
                    <ArrowBackIcon className="quiz-add-modal__back-icon" onClick={() => navigate(PROFESSOR_QUIZ_PAGE)} />
                    <Typography className="quiz-add-modal__main-title">{t('addModalTitle')}</Typography>
                </Box>

                <Box>
                    <AppButton
                        onClick={handleAddQuiz}
                        className='top-menu__button'
                    >
                        {t('addQuizBtn')}
                    </AppButton>
                </Box>
            </Box>

            <Box className="quiz-add-modal__content-wrapper">
                <Box className="quiz-add-modal__left-part left-part">
                    <Typography className="sub-title">{t('quizConfig')}</Typography>

                    <Box className="left-part__quiz-title-wrapper margin-bottom margin-top">
                        <Typography className="left-part__quiz-title label"><i className="symbol">*&nbsp;</i> {t('addQuizTitle')}</Typography>
                        <AppInput
                            id="quizName"
                            // @ts-ignore
                            value={values.quizName}
                            // @ts-ignore
                            error={!!errors.quizName}
                            onChange={(e) => {
                                setFieldValue('quizName', e.target.value)
                                handleChange(e)
                            }}
                            variant="outlined"
                            className="left-part__title-input"
                        />
                    </Box>

                    <Box className="left-part__quiz-type-wrapper margin-bottom">
                        <Typography className="left-part__quiz-type label"><i className="symbol">*&nbsp;</i> {t('addQuizFaculty')}</Typography>
                                
                        <AppSelect 
                            id="faculty"
                            className='left-part__select'
                            variant="outlined"
                            options={faculties}
                            // @ts-ignore
                            error={!!errors.faculty}
                            // @ts-ignore
                            value={values.faculty}
                            onChange={(e) => {
                                setFieldValue('faculty', e.target.value)
                                facultyHandleChange(e)
                            }}
                        />
                    </Box>

                    <Box className="left-part__quiz-type-wrapper margin-bottom">
                        <Typography className="left-part__quiz-type label"><i className="symbol">*&nbsp;</i> {t('addQuizCourse')}</Typography>
                                
                        <AppSelect 
                            id='subjects'
                            className='left-part__select'
                            variant="outlined"
                            // @ts-ignore
                            value={values.subjects}
                            // @ts-ignore
                            error={!!errors.subjects}
                            options={subjects}
                            onChange={(e) => setFieldValue('subjects', e.target.value)}
                        />
                    </Box>

                    <Box className="left-part__timer-wrapper">
                        <FormControlLabel
                            className="show-answers__label"
                            label={t('addQuizTimer')}
                            control={
                                <Checkbox
                                    id='timer'
                                    // @ts-ignore
                                    value={values.timer}
                                    onChange={handleChange}
                                />
                            }
                        />
                    </Box>

                    <Box className="left-part__show-answers-wrapper">
                        <FormControlLabel
                            className="show-answers__label"
                            label={t('addQuizShowAnswers')}
                            control={
                                <Checkbox 
                                    id='showAnswers'
                                    // @ts-ignore
                                    value={values.showAnswers}
                                    onChange={handleChange}
                                />
                            }
                        />
                    </Box>
                </Box>

                <Box className="quiz-add-modal__right-part right-part">
                    <Typography className="sub-title">{t('addQuizQuestionTitle')}</Typography>

                </Box>

            </Box>

            <Box className="quiz-add-modal__error-wrapper">
                {/* @ts-ignore */}
                {(errors?.quizName || errors.faculty || errors.subjects) &&
                    <ErrorOverLay>
                        {/* @ts-ignore */}
                        {errors.quizName || errors.faculty || errors.subjects}
                    </ErrorOverLay>
                }
            </Box>
        </Box>
    )
}

const AddQuizModule = () => {
    const [submitted, setSubmitted] = useState(false);
  
    const initialState:initialStateType = {
        quizName: '',
        faculty: '',
        timer: false,
        showAnswers: false,
        // это пример questions
        questions: [
            {id: 0, title: '', answers: [
                {id: 0, title: ''},
                {id: 1, title: ''},
                {id: 2, title: ''},
                {id: 3, title: ''},
            ]}
        ],
        subjects: ''
    }

    const addQuiz = () => {

    }
  
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

export default AddQuizModule
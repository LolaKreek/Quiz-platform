import { Box, Modal, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import CloseIcon from '@mui/icons-material/Close';

import { AppInput } from "../../AppInput";
import { Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { initialStateType } from "./tyles";
import { AppSelect } from "../../AppSelect";
import { onValue, ref } from "firebase/database";
import { database } from "../../../services/Firebase/firebase";
import { withSuspense } from "../../../HOCs/withSusspense";

const Form = ({open = true, onClose}: any) => {
    const { t } = useTranslation('quiz')

    const [faculties, setFaculties] = useState([])
    const [data, setData] = useState([])
    const [subjects, setSubjects] = useState([])

    const {
        values,
        handleChange,
        errors,
        setFieldValue,
        // validateForm,
        // initialValues,
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

    useEffect(() => {
        getFaculties()
    }, [])

    return(
        <Modal
            className='quiz-add-module__modal'
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            <Paper className="quiz-add-module__paper papper" >
                <Box className="papper__main-wrapper">
                    <Typography className="papper__title">{t('addModalTitle')}</Typography>
                    <CloseIcon onClick={onClose} className="papper__close-icon" />

                    <Box className="papper__content-wrapper content">
                        <Box className='content__left-row left-row'>
                            <Typography className="papper__sub-title">{t('quizConfig')}</Typography>

                            <Box className="left-row__quiz-title-wrapper margin-bottom margin-top">
                                <Typography className="left-row__quiz-title"><i>*&nbsp;</i> {t('addQuizTitle')}</Typography>
                                <AppInput
                                    id="quizName"
                                    // @ts-ignore
                                    value={values.quizName}
                                    // @ts-ignore
                                    error={!!errors.quizName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    className="left-row__title-input"
                                />
                            </Box>

                            <Box className="left-row__quiz-type-wrapper margin-bottom">
                                <Typography className="left-row__quiz-type"><i>*&nbsp;</i> {t('addQuizFaculty')}</Typography>
                                
                                <AppSelect 
                                    id="faculty"
                                    className='left-row__select'
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

                            <Box className="left-row__quiz-type-wrapper margin-bottom">
                                <Typography className="left-row__quiz-type"><i>*&nbsp;</i> {t('addQuizCourse')}</Typography>
                                
                                <AppSelect 
                                    id='subjects'
                                    className='left-row__select'
                                    variant="outlined"
                                    // @ts-ignore
                                    value={values.subjects}
                                    // @ts-ignore
                                    error={!!errors.subjects}
                                    options={subjects}
                                    onChange={(e) => setFieldValue('subjects', e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    )
}

const AddQuizModuleForm = ({open = true, onClose}: any) => {
    const [submitted, setSubmitted] = useState(false);
  
    const initialState:initialStateType = {
        quizName: '',
        faculty: '',
        // это пример questions
        questions: [
            {id: 0, title: '', answers: [
                {id: 0, title: ''},
                {id: 1, title: ''},
                {id: 2, title: ''},
                {id: 3, title: ''},
            ]}
        ],
        subjects: []
    }

    const addQuiz = () => {

    }
  
    return (
      <Formik
        initialValues={initialState}
        // create validation schema: utils -> validationSchemas.tsx
        // validationSchema={}
        validateOnChange={submitted}
        validateOnBlur={false}
        onSubmit={addQuiz}
      >
        <Form open={open} onClose={onClose} setSubmitted={setSubmitted} />
      </Formik>
    );
  };

//  @ts-ignore
export const AddQuizModule = withSuspense(AddQuizModuleForm);
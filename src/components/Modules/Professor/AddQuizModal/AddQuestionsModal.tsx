import { Box, Modal, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';
import { AppInput } from "../../../AppInput";
import { Formik } from "formik";
import { useState } from "react";
import { AppSelect } from "../../../AppSelect";
import { AppButton } from "../../../AppButton";
import { addQuizQuestionSchema } from "../../../../utils/validationSchemas";
import { ErrorOverLay } from "../../../ErrorOverLay";
import toast from "react-hot-toast";
import Notification from "../../../Notification";

const AddQuestionModal = ({open, setQuiestionOpen, types, questions, setQuestions}: any) => {
    const { t } = useTranslation('quiz')
    const initialState = {title: '', type: ''}

    const [submitted, setSubmitted] = useState(false);

    const handleClose = () => {
        setQuiestionOpen(false)
    }
     
    const addQuestion = (values:any) => {
        setQuestions([...questions, values])
        handleClose()

        toast.custom((element) => (
            <Notification header={t('addQuestionActionHeader')} message={t('addQuestionActionMessage')} element={element} type='success' />
        ), {position: "bottom-center"});
    }

    return(
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
                    initialValues={initialState}
                    validationSchema={addQuizQuestionSchema}
                    validateOnChange={submitted}
                    validateOnBlur={false}
                    onSubmit={addQuestion}
                >
                    {({ errors, values, handleChange, handleSubmit, setFieldValue, validateForm }) => (
                    <Box>
                        <Box className="add-questions-modal__header-wrapper">
                            <Typography className="add-questions-modal__main-title">{t('questionsPart')}</Typography>
                            <CloseIcon className="add-questions-modal__close-icon" onClick={handleClose}/>
                        </Box>

                        <Box className="add-questions-modal__content-wrapper">
                            <Box>
                                <Typography className="add-questions-modal__quiz-title label"><i className="symbol">*&nbsp;</i> {t('quiestionTitle')}</Typography>
                                <AppInput
                                    id="title"
                                    // @ts-ignore
                                    value={values.title}
                                    // @ts-ignore
                                    error={!!errors.title}
                                    onChange={(e) => {
                                        setFieldValue('title', e.target.value)
                                        handleChange(e)
                                    }}
                                    variant="outlined"
                                    className="add-questions-modal__title-input"
                                />
                            </Box>

                            <Box className="add-questions-modal__type-wrapper">
                                <Typography className="add-questions-modal__quiz-title label"><i className="symbol">*&nbsp;</i> {t('quiestionType')}</Typography>
                                
                                <AppSelect 
                                    id='type'
                                    className='add-questions-modal__select'
                                    variant="outlined"
                                    // @ts-ignore
                                    value={values.type}
                                    // @ts-ignore
                                    error={!!errors.type}
                                    options={types}
                                    onChange={(e) => setFieldValue('type', e.target.value)}
                                />
                            </Box>

                            <Box className="add-questions-modal__button-wrapper">
                                <AppButton
                                    onClick={() => {
                                        validateForm().then((res) => {
                                            if(!Object.keys(res).length) {
                                                setSubmitted(true)
                                                handleSubmit()
                                                addQuestion(values)

                                            }
                                        })
                                    }}
                                    className='top-menu__button'
                                >
                                    {t('addQuizBtn')}
                                </AppButton>
                            </Box>
                        </Box>

                        <Box className="add-questions-modal__error-wrapper margin-top">
                            {/* @ts-ignore */}
                            {(errors?.title || errors.type) &&
                                <ErrorOverLay>
                                    {/* @ts-ignore */}
                                    {errors.title || errors.type}
                                </ErrorOverLay>
                            }
                        </Box>
                    </Box>
                    )}
                </Formik>
            </Paper>
        </Modal>
    )
}

export default AddQuestionModal;
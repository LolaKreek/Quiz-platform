import { Box, ClickAwayListener, Modal, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import CloseIcon from '@mui/icons-material/Close';
import { AppInput } from "../AppInput";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { AppSelect } from "../AppSelect";
import { AppButton } from "../AppButton";
import { onValue, ref } from "firebase/database";
import { database } from "../../services/Firebase/firebase";
import { uploafFilenSchema } from "../../utils/validationSchemas";
import { uploadFileData } from "../../services/uploadFile";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Notification from "../Notification";
import { ErrorOverLay } from "../ErrorOverLay";

type uploadFilePropsType = {
    onClose: any,
    open: boolean
}

const UploadFile = ({onClose, open}:uploadFilePropsType) => {
    const { t } = useTranslation('menu')
    const initialState = {title: '', faculty: '', subject: '', file: null}
    //@ts-ignore
    const author = useSelector(state => state.auth.user);

    const [submitted, setSubmitted] = useState(false)
    const [faculties, setFaculties] = useState([])
    const [subjects, setSubjects] = useState([])
    const [data, setData] = useState([])

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

    const uploadFile = (values:any) => {
        if(Object.keys(values).length){
            try{
                // @ts-ignore
                uploadFileData({title: values?.title, faculty: values?.faculty, subject: values?.subject, author: author, file: values?.file});
                toast.custom((element) => (
                    <Notification header={t('notificationUploadFileHeader')} message={t('notificationUploadFileMessage')} element={element} type='success' />
                ), {position: "bottom-center"});
                onClose()
            }catch(error) {
                console.log('error: ', error)
            } 
        }
    }

    useEffect(() => {
        getFaculties();
    }, [])

    return(
        <Modal
            open={open}
            onClose={onClose}
            className="add-questions-modal__modal-wrapper"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Paper className='profile-settings__paper upload-file__papper'>
                <ClickAwayListener onClickAway={onClose}>
                <>
                    <Formik
                        initialValues={initialState}
                        validationSchema={uploafFilenSchema}
                        validateOnChange={submitted}
                        validateOnBlur={false}
                        onSubmit={uploadFile}
                    >
                        {({ errors, values, handleChange, handleSubmit, setFieldValue, validateForm }) => (
                        <Box className="upload-file">
                            <Box className="upload-file__header-wrapper">
                                <Typography className="upload-file__main-header">{t('uploadFileTitle')}</Typography>
                                <CloseIcon className="upload-file__close-icon" onClick={onClose} />
                            </Box>

                            <Box className="upload-file__input-wrapper">
                                <Typography  className="add-questions-modal__quiz-title label">
                                    <i className="symbol">*&nbsp;</i>
                                    {t('uploadFileTitleLabel')}
                                </Typography>
                                <AppInput
                                    id="title"
                                    className="add-questions-modal__title-input"
                                    placeholder=""
                                    value={values.title}
                                    onChange={(e) => {
                                        handleChange(e),
                                        setFieldValue('title', e.target.value)
                                    }}
                                    // @ts-ignore
                                    error={!!errors.title}
                                    variant="outlined"
                                />
                            </Box>

                            <Box className="upload-file__input-wrapper">
                                <Typography  className="add-questions-modal__quiz-title label">
                                    <i className="symbol">*&nbsp;</i>
                                    {t('uploadFileFacultyLabel')}
                                </Typography>

                                <AppSelect 
                                    id='faculty'
                                    className='add-questions-modal__select'
                                    variant="outlined"
                                    // @ts-ignore
                                    value={values.faculty}
                                    // @ts-ignore
                                    error={!!errors.faculty}
                                    options={faculties}
                                    onChange={(e) => {
                                        setFieldValue('faculty', e.target.value)
                                        facultyHandleChange(e)
                                    }}
                                />
                            </Box>

                            <Box className="upload-file__input-wrapper">
                                <Typography  className="add-questions-modal__quiz-title label">
                                    <i className="symbol">*&nbsp;</i>
                                    {t('uploadFileSubjectLabel')}
                                </Typography>

                                <AppSelect 
                                    id='subject'
                                    className='add-questions-modal__select'
                                    variant="outlined"
                                    // @ts-ignore
                                    value={values.subject}
                                    // @ts-ignore
                                    error={!!errors.subject}
                                    options={subjects}
                                    onChange={(e) => setFieldValue('subject', e.target.value)}
                                />
                            </Box>

                            <Box className="upload-file__upload">
                                <input 
                                    id='file'
                                    type='file'
                                    // @ts-ignore
                                    error={!!errors.file}
                                    // @ts-ignore
                                    onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
                                />
                            </Box>

                            <Box className="add-questions-modal__error-wrapper margin-top">
                                {/* @ts-ignore */}
                                {(errors?.title || errors.faculty || errors.subject || errors.file) &&
                                    <ErrorOverLay>
                                        {/* @ts-ignore */}
                                        {errors.title || errors.faculty || errors.subject || errors.file}
                                    </ErrorOverLay>
                                }
                            </Box>

                            <Box className="add-questions-modal__button-wrapper">
                                <AppButton
                                    onClick={() => {
                                        validateForm().then((res) => {
                                            if(!Object.keys(res).length) {
                                                setSubmitted(true)
                                                handleSubmit()
                                            }
                                        })
                                    }}
                                    className='top-menu__button'
                                >
                                    {t('uploadFileSubmit')}
                                </AppButton>
                            </Box>
                        </Box>
                    )}
                    </Formik>
                </>
                </ClickAwayListener>
            </Paper>
        </Modal>
    )
}

export default UploadFile
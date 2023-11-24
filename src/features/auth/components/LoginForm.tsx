import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../services/Firebase/firebase';
import { loginSchema } from '../../../utils/validationSchemas';
import { AppInput } from '../../../components/AppInput';
import { AppButton } from '../../../components/AppButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ErrorOverLay } from '../../../components/ErrorOverLay';
import './styles.scss'
import { INVALID_DATA } from './constant';
import { authLogin } from '../../../store/Slices/auth';
import { userType } from './types';
import { addNotification } from '../../../store/Slices/notification';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation('login');

    const [submitted, setSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [requestError, setRequestError] = useState('')

    const loginUser = ({ email, password }: {email: string, password: string}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user:userType = userCredential.user;
                const userData = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    isAnonymous: user.isAnonymous,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    roles: []
                }
                dispatch(authLogin({user: userData, token: user.accessToken}))
                dispatch(addNotification({header: t('notificationLoginHeader'), message: t('notificationLoginMessage'), type: 'info', status: true}))
                navigate('/')
            })
            .catch((error) => {
                setRequestError(error.code)
            });
    }

    // const handleSignUp = () => {
    //     createUserWithEmailAndPassword(auth, 'ex@gmail.com', 'Qwertyuiop1!')
    //         .then((userCredential) => {
    //             // Signed up 
    //             const user = userCredential.user;
    //             console.log("user register: ", user);
    //             // ...
    //         })
    //         .catch((error) => {;
    //             console.log("Error", error.code);
    //             console.log("Error",error.message);
    //             // ..
    //         });
    // }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={loginUser}
            validateOnChange={submitted}
            validateOnBlur={false}
        >
            {({ errors, values, handleChange, handleSubmit }) => (
                <Box className='login__main-wrapper'>
                    <Box className='login__container'>
                        <Box>
                            <Typography className='text'>{t('signIn')}</Typography>
                        </Box>

                        <Typography className='input-label small-text'>{t('email')}</Typography>
                        <AppInput 
                            id="email"
                            className='input'
                            variant="outlined"
                            type={'email'}
                            value={values.email}
                            onChange={(e) => {
                                if(requestError) setRequestError('')
                                handleChange(e)
                            }}
                            error={!!errors.email}
                        />

                        <Typography className='input-label small-text'>{t('password')}</Typography>
                        <AppInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className='input'
                            variant="outlined"
                            value={values.password}
                            onChange={(e) => {
                                if(requestError) setRequestError('')
                                handleChange(e)
                            }}
                            error={!!errors.password}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleShowPassword}>
                                            {showPassword ? <VisibilityIcon  /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                        />

                        <AppButton
                            onClick={() => {
                                if (!submitted) setSubmitted(true)
                                handleSubmit()}
                            }
                            className='button'
                        >
                            {t('signInBtn')}
                        </AppButton>

                        {(errors.email || errors.password) &&
                            <ErrorOverLay>
                                {errors.email || errors.password}
                            </ErrorOverLay>
                        }

                        {requestError === INVALID_DATA &&
                            <ErrorOverLay>
                                {t('invalidLoginCredentials')}
                            </ErrorOverLay>
                        }
                    </Box>
                </Box>
            )}
        </Formik>
    );
};

export default LoginForm;
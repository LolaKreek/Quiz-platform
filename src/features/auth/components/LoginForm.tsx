import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, useFormik } from 'formik';
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/Firebase/firebase';
import { QuizIcon } from '../../../assets/icons';
import { loginSchema } from '../../../utils/validationSchemas';
import { AppInput } from '../../../components/AppInput';
import './styles.scss'
import { AppButton } from '../../../components/AppButton';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {t} = useTranslation('login');

    const [error, serError] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    // const formik = useFormik({
    //     initialValues: {
    //       login: '',
    //       password: '',
    //     },
    //     isInitialValid: false,
    //     // validationSchema: validationSchema,
    //     onSubmit: (values) => {
    //         try {
    //             userLogin(values.login, values.password)
    //                 .then((e:any) => {
    //                     // const token:tokenType = jwt_decode(e.Token)
    //                     const token:tokenType = e.Token
    //                     const user = {id: '1', name: token.firstName, surname: token.lastName, roles: token.roles}

    //                     dispatch(authLogin({user, token: e.Token, expirationDate: e.Expiration}));
    //                     if(location.search){
    //                         const redirectUrl = location.search.substring(1);
    //                         navigate(redirectUrl)
    //                     }else{
    //                         navigate('/');
    //                     }
    //                 })
    //                 .catch(() => {serError(true)});
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     },
    // });

    const loginUser = () => {
        signInWithEmailAndPassword(auth, 'bonstik5@mail.ru', 'Qwertyuiop1!')
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user sign in: ", user);
                // ...
            })
            .catch((error) => {
                console.log("Error", error.code);
                console.log("Error",error.message);
            });
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, 'ex@gmail.com', 'Qwertyuiop1!')
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user register: ", user);
                // ...
            })
            .catch((error) => {;
                console.log("Error", error.code);
                console.log("Error",error.message);
                // ..
            });
    }

    return (
        <Formik
            initialValues={{ email: '', pwd: '' }}
            validationSchema={loginSchema}
            onSubmit={loginUser}
            validateOnChange={submitted}
            validateOnBlur={false}
        >
            {({ errors, values, handleChange, handleSubmit }) => (
                <Box className='login__main-wrapper'>
                    <Box className='login__container'>
                        <QuizIcon className='logo' />

                        <Box>
                            <Typography className='text'>{t('signIn')}</Typography>
                        </Box>

                        <Typography className='input-label small-text'>{t('email')}</Typography>
                        <AppInput 
                            id="email"
                            className='input'
                            variant="outlined"
                            value={values.email}
                            // onChange={e => changeHandler(e, handleChange)}
                            // error={!!errors.email || !!loginErrors}
                            // onKeyUp={e => keyListener(e, handleSubmit)}
                        />

                        <Typography className='input-label small-text'>{t('password')}</Typography>
                        <AppInput
                            id="pwd"
                            // type={showPassword ? 'text' : 'password'}
                            className='input'
                            variant="outlined"
                            value={values.pwd}
                            // onChange={e => changeHandler(e, handleChange)}
                            // error={!!errors.pwd || !!loginErrors}
                            // onKeyUp={e => keyListener(e, handleSubmit)}
                            // InputProps={{
                            // endAdornment:
                            //     <InputAdornment position="end">
                            //     <IconButton onClick={toggleShowPassword}>
                            //         {showPassword ? <PasswordShownIcon  /> : <PasswordHiddenIcon />}
                            //     </IconButton>
                            //     </InputAdornment>,
                            // }}
                        />

                        <AppButton
                            // disabled={loginIsLoading}
                            // onClick={() => {
                            // if (!submitted) setSubmitted(true)
                            // handleSubmit()}
                            // }
                            className='button'
                        >
                            {t('signInBtn')}
                        </AppButton>
                    </Box>
                </Box>
            )}
        </Formik>
    );
};

export default LoginForm;
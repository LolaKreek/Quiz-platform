import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom';
import { authLogin } from '../../../store/Slices/auth';
import { userLogin } from '../../../services/auth';

type tokenType = {
    aud:string,
    exp:number,
    firstName:string,
    iss:string,
    jti:string,
    lastName:string,
    name:string,
    nameIdentifier:string,
    roles: []
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {t} = useTranslation();
    const [error, serError] = useState(false);

    const formik = useFormik({
        initialValues: {
          login: '',
          password: '',
        },
        isInitialValid: false,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            try {
                userLogin(values.login, values.password)
                    .then((e:any) => {
                        // const token:tokenType = jwt_decode(e.Token)
                        const token:tokenType = e.Token
                        const user = {id: '1', name: token.firstName, surname: token.lastName, roles: token.roles}

                        dispatch(authLogin({user, token: e.Token, expirationDate: e.Expiration}));
                        if(location.search){
                            const redirectUrl = location.search.substring(1);
                            navigate(redirectUrl)
                        }else{
                            navigate('/');
                        }
                    })
                    .catch(() => {serError(true)});
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div className='login-page__form-fogot-wrapper'>
            <div className='login-page__form-wrapper'>
                <h3 className='login-page__main-header'>{t("login")}</h3>
                <form className='login-page__form' onSubmit={formik.handleSubmit}>
                    <TextField
                        name="login"
                        label={t("loginStandard")}
                        variant="standard"
                        autoComplete='on'
                        type="text"
                        className='login-form__inputs'
                        value={formik.values.login}
                        onChange={formik.handleChange}
                        error={formik.touched.login && Boolean(formik.errors.login)}
                        helperText={formik.touched.login && formik.errors.login}/>
                    <TextField
                        name="password"
                        label={t("password")}
                        type="password"
                        autoComplete='on'
                        variant="standard"
                        className='login-form__inputs'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}/>
                    {error ? <p className='login__error'>{t("loginError")}</p> : <></>}
                    {/* <ButtonBlu
                        padding={3}
                        func={undefined}
                        option='submit'
                        value='logIn'
                        color="error"
                        disabled={!formik.isValid}/>
                    <LoginFooterLink href='/forgot-password' buttonName="forgotPassword"/> */}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/Firebase/firebase';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {t} = useTranslation();
    const [error, serError] = useState(false);

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

    const handleClick = () => {
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
        <div>
            <h1 className="login-page__main-header">Login page</h1>
            <Button onClick={handleClick}>Sing In</Button>
            <Button onClick={handleSignUp}>Sing Up</Button>
        </div>
    );
};

export default LoginForm;
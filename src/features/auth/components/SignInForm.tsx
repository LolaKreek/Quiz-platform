import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { registerSchema } from "../../../utils/validationSchemas";
import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../components/AppButton";
import { ErrorOverLay } from "../../../components/ErrorOverLay";
import { INVALID_DATA } from "./constant";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../../services/Firebase/firebase";
import { addNotification } from "../../../store/Slices/notification";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./styles.scss";
import { ref, set } from "firebase/database";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("login");

  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [requestError, setRequestError] = useState("");

  const handleSignUp = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(
          addNotification({
            header: t("notificationSignUpHeader"),
            message: t("notificationSignUpMessage"),
            type: "info",
            status: true,
          })
        );
        navigate("/login");
        const userRef = ref(database, `users/${userCredential.user.uid}`);
        set(userRef, {
          phone: "",
          role: "student",
        });
      })
      .catch((error) => {
        setRequestError(error.code);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={registerSchema}
      onSubmit={handleSignUp}
      validateOnChange={submitted}
      validateOnBlur={false}
    >
      {({ errors, values, handleChange, handleSubmit }) => (
        <Box className="login__main-wrapper">
          <Box className="login__container">
            <Box>
              <Typography className="text">{t("register")}</Typography>
            </Box>

            <Typography className="input-label small-text">
              {t("email")}
            </Typography>
            <AppInput
              id="email"
              className="input"
              variant="outlined"
              type={"email"}
              value={values.email}
              onChange={(e) => {
                if (requestError) setRequestError("");
                handleChange(e);
              }}
              error={!!errors.email}
            />

            <Typography className="input-label small-text">
              {t("password")}
            </Typography>
            <AppInput
              id="password"
              type={showPassword ? "text" : "password"}
              className="input"
              variant="outlined"
              value={values.password}
              onChange={(e) => {
                if (requestError) setRequestError("");
                handleChange(e);
              }}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <AppButton
              onClick={() => {
                if (!submitted) setSubmitted(true);
                handleSubmit();
              }}
              className="button"
            >
              {t("signUpBtn")}
            </AppButton>

            <Box className="login__register-wrapper">
              <Typography className="login__register-info">
                {t("loginInfo")}
              </Typography>
              <Link to="/login" className="login__register-sign-in">
                {t("registerLoginIn")}
              </Link>
            </Box>

            {(errors.email || errors.password) && (
              <ErrorOverLay>{errors.email || errors.password}</ErrorOverLay>
            )}

            {requestError === INVALID_DATA && (
              <ErrorOverLay>{t("invalidLoginCredentials")}</ErrorOverLay>
            )}
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default SignInForm;

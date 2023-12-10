import { Button, Modal, Paper, TextField } from "@mui/material";
import "./styles.scss";
import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth } from "../../../services/Firebase/firebase";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { AppInput } from "../../../components/AppInput";
import * as Yup from "yup";
import { Formik } from "formik";
import { ErrorOverLay } from "../../../components/ErrorOverLay";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const EmailModal = ({ open = true, onClose }: any) => {
  const [password, setPassword] = useState("");
  const { t } = useTranslation("profile");
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (auth.currentUser && auth.currentUser.email) {
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
          );
          try {
            await reauthenticateWithCredential(auth.currentUser, credential);
            await verifyBeforeUpdateEmail(auth.currentUser, values.email);
            toast.custom(
              (element) => (
                <Notification
                  header={t("mail_notificationHeader")}
                  message={t("mail_notificationMessage")}
                  element={element}
                  type={"info"}
                />
              ),
              { position: "bottom-center" }
            );
          } catch (e) {
            console.log(e);
            toast.custom(
              (element) => (
                <Notification
                  header={t("mail_notificationHeaderERR")}
                  message={t("mail_notificationMessageERR")}
                  element={element}
                  type={"info"}
                />
              ),
              { position: "bottom-center" }
            );
          }
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, values, handleChange, handleSubmit }) => (
        <Modal
          className="profilemodal__modal"
          open={open}
          onClose={onClose}
          closeAfterTransition
        >
          <Paper className="profilemodal__paper papper">
            <AppInput
              id="email"
              className="input"
              variant="outlined"
              type="email"
              value={values.email}
              onChange={(e) => {
                handleChange(e);
              }}
              error={!!errors.email}
            />
            <TextField
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              placeholder={t("email_currentPassword")}
            />
            <Button
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              {t("submit")}
            </Button>
            {errors.email && <ErrorOverLay>{errors.email}</ErrorOverLay>}
          </Paper>
        </Modal>
      )}
    </Formik>
  );
};

export default EmailModal;

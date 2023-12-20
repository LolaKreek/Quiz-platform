import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "../../../styles/themes/default/components/modals/_profileModal.scss";
import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth } from "../../../services/Firebase/firebase";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import * as Yup from "yup";
import { Formik } from "formik";
import { ErrorOverLay } from "../../../components/ErrorOverLay";
import { useTranslation } from "react-i18next";
import { AppInput } from "../../../components/AppInput";
import CloseIcon from "@mui/icons-material/Close";
import { AppButton } from "../../../components/AppButton";
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
                  header={t("email_notificationHeader")}
                  message={t("email_notificationMessage")}
                  element={element}
                  type={"info"}
                />
              ),
              { position: "bottom-center" }
            );
          } catch (e) {
            toast.custom(
              (element) => (
                <Notification
                  header={t("email_notificationHeaderERR")}
                  message={t("email_notificationMessageERR")}
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
            <Box className="papper__header">
              <Typography className="papper__title">
                {t("email_header")}
              </Typography>
              <CloseIcon className="papper__close-icon" onClick={onClose} />
            </Box>
            <AppInput
              variant="outlined"
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => {
                handleChange(e);
              }}
              error={!!errors.email}
              placeholder={t("email_placeholder")}
            />
            <AppInput
              variant="outlined"
              error={false}
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              placeholder={t("email_currentPassword")}
            />
            <AppButton
              className=""
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
            >
              {t("submit")}
            </AppButton>
            {errors.email && <ErrorOverLay>{errors.email}</ErrorOverLay>}
          </Paper>
        </Modal>
      )}
    </Formik>
  );
};

export default EmailModal;

import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { auth, database } from "../../../services/Firebase/firebase";
import "../../../styles/themes/default/components/modals/_profileModal.scss";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { Formik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { ErrorOverLay } from "../../../components/ErrorOverLay";
import * as Yup from "yup";
import { ref, set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { updateUser } from "../../../store/Slices/auth";
import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../components/AppButton";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /^(?:(?:(?:\+|00)?48)|(?:\(?\+?48\)?)|(?:\(?\+?48\)?)?)?[ -]?[1-9][0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{3}$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
});
const PhoneModal = ({ open = true, onClose }: any) => {
  const userState = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { t } = useTranslation("profile");
  return (
    <Formik
      initialValues={{ phone: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (auth.currentUser) {
          const userRef = ref(database, `users/${auth.currentUser.uid}`);
          console.log(values.phone)
          dispatch(
            updateUser({ user: { ...userState, phone: values.phone } })
          );
          
          toast.custom(
            (element) => (
              <Notification
                header={t("phone_notificationHeader")}
                message={t("phone_notificationMessage")}
                element={element}
                type={"info"}
              />
            ),
            { position: "bottom-center" }
          );
        }
      }}
      validateOnBlur={false}
      validateOnChange={true}
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
                {t("phone_header")}
              </Typography>
              <CloseIcon className="papper__close-icon" onClick={onClose} />
            </Box>
            <AppInput
              id="phone"
              type="phone"
              variant="outlined"
              value={values.phone}
              onChange={(e) => {
                handleChange(e);
              }}
              error={!!errors.phone}
              placeholder={t("phone_placeholder")}
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

            {errors.phone && <ErrorOverLay>{errors.phone}</ErrorOverLay>}
          </Paper>
        </Modal>
      )}
    </Formik>
  );
};

export default PhoneModal;

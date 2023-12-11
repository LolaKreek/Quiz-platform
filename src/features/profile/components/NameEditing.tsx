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
import { auth } from "../../../services/Firebase/firebase";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { updateUser } from "../../../store/Slices/auth";
import { useTranslation } from "react-i18next";
import { AppInput } from "../../../components/AppInput";
import CloseIcon from "@mui/icons-material/Close";
import { AppButton } from "../../../components/AppButton";
const NameModal = ({ open = true, onClose }: any) => {
  const [name, setName] = useState("");
  const { t } = useTranslation("profile");
  const authState = useSelector((state: RootState) => {
    return state.auth.user;
  });
  const dispatch = useDispatch();
  async function submit() {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { displayName: name });
      dispatch(updateUser({ user: { ...authState, name: name } }));
      toast.custom(
        (element) => (
          <Notification
            header={t("name_notificationHeader")}
            message={t("name_notificationMessage")}
            element={element}
            type={"info"}
          />
        ),
        { position: "bottom-center" }
      );
    }
  }

  return (
    <Modal
      className="profilemodal__modal"
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Paper className="profilemodal__paper papper">
        <Box className="papper__header">
          <Typography className="papper__title">{t("name_header")}</Typography>
          <CloseIcon className="papper__close-icon" onClick={onClose} />
        </Box>
        <AppInput
          variant="outlined"
          error={false}
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          placeholder={t("name_placeholder")}
        />
        <AppButton
          className=""
          variant="contained"
          onClick={() => {
            submit();
          }}
        >
          {t("submit")}
        </AppButton>
      </Paper>
    </Modal>
  );
};

export default NameModal;

import { Button, Modal, Paper, TextField } from "@mui/material";
import "./styles.scss";
import { useState } from "react";
import { auth } from "../../../services/Firebase/firebase";
import toast from "react-hot-toast";
import Notification from "../../../components/Notification";
import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { updateUser } from "../../../store/Slices/auth";
import { useTranslation } from "react-i18next";

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
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          placeholder={t("name_name")}
        />
        <Button
          onClick={() => {
            submit();
          }}
        >
          {t("submit")}
        </Button>
      </Paper>
    </Modal>
  );
};

export default NameModal;

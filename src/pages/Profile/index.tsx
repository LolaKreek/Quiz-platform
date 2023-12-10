import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import "./styles.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";
import { ReactNode, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import EmailModal from "../../features/profile/components/EmailEditing";
import NameModal from "../../features/profile/components/NameEditing";
import PhoneModal from "../../features/profile/components/PhoneEditing";

const ProfilePage = () => {
  const { t } = useTranslation("profile");
  const [modal, setModal] = useState<null | ReactNode>(null);
  const modals = {
    email: (
      <EmailModal
        onClose={() => {
          setModal(false);
        }}
      />
    ),
    name: (
      <NameModal
        onClose={() => {
          setModal(false);
        }}
      />
    ),
    phone: <PhoneModal onClose={() => setModal(false)} />,
  };
  const authState = useSelector((state: RootState) => state.auth.user);
  return (
    <Box>
      <Typography className="profile__titletext">{t("Profile")}</Typography>
      <Box className="profile__pfpwrapper">
        <Avatar
          className="menu__user-image"
          alt="User U"
          src={authState.photoURL || undefined}
        />
        <Divider />
      </Box>
      <Box className="profile__infocontainer">
        <Box>
          <Box className="profile__infosection">
            <Box className="profile__flexcentered">
              <Typography variant="h4">{t("name")}</Typography>
              <Button
                onClick={() => {
                  setModal(modals.name);
                }}
              >
                <EditIcon></EditIcon>
              </Button>
            </Box>
            <Typography>{authState.name || t("unknown")}</Typography>
          </Box>
          <Box className="profile__infosection">
            <Box className="profile__flexcentered">
              <Typography variant="h4">{t("email")}</Typography>
              <Button
                onClick={() => {
                  setModal(modals.email);
                }}
              >
                <EditIcon></EditIcon>
              </Button>
            </Box>
            <Typography>{authState.email}</Typography>
          </Box>
          <Box className="profile__infosection">
            <Typography variant="h4">{t("verifiedTitle")}</Typography>
            <Box className="profile__emailverif">
              {authState.emailVerified ? (
                <>
                  <Typography>{t("verified")}</Typography>
                  <CheckCircleIcon color="success" />
                </>
              ) : (
                <>
                  <Typography>{t("notVerified")}</Typography>
                  <CancelIcon color="error" />
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="profile__flexcentered">
            <Typography variant="h4">{t("phone")}</Typography>
            <Button
              onClick={() => {
                setModal(modals.phone);
              }}
            >
              <EditIcon></EditIcon>
            </Button>
          </Box>
          <Typography>{authState.phoneNumber || t("unknown")}</Typography>
        </Box>
      </Box>
      {modal}
    </Box>
  );
};

export default ProfilePage;

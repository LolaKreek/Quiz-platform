import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";
import { ReactNode, useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import EmailModal from "../../features/profile/components/EmailEditing";
import NameModal from "../../features/profile/components/NameEditing";
import PhoneModal from "../../features/profile/components/PhoneEditing";
import { auth, database } from "../../services/Firebase/firebase";
import { sendEmailVerification } from "firebase/auth";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import { child, get, ref } from "firebase/database";

const ProfilePage = () => {
  const { t } = useTranslation("profile");
  const [modal, setModal] = useState<null | ReactNode>(null);
  const authState = useSelector((state: RootState) => state.auth.user);
  const [reputation, setReputation] = useState(0);

  useEffect(() => {
    get(child(ref(database), `student/${authState.id}/reputation`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          setReputation(snapshot.val());
        } else {
          console.log("No data available");
        }
      }
    );
  }, []);

  const modals = {
    email: <EmailModal onClose={() => setModal(false)} />,
    name: <NameModal onClose={() => setModal(false)} />,
    phone: <PhoneModal onClose={() => setModal(false)} />,
  };

  return (
    <Box>
      <Typography className="profile__titletext">{t("Profile")}</Typography>
      <Box className="profile__pfpwrapper">
        <Avatar
          sizes="100px"
          className="menu__user-image"
          alt="User U"
          src={authState.photoURL || undefined}
        />
        <Divider />
      </Box>

      <Box className="profile__content-wrapper">
        <Box className="profile__left-part">
          <Box className="profile__left-part-content">
            <Box className="profile__left-part-labels">
              <Typography className="profile__label">{t("name")}</Typography>
              <Typography className="profile__data">
                {authState.name || t("unknown")}
              </Typography>
            </Box>

            <Box className="profile__edit-icon">
              <EditIcon onClick={() => setModal(modals.name)} />
            </Box>
          </Box>

          <Box className="profile__left-part-content">
            <Box className="profile__left-part-labels">
              <Typography className="profile__label">{t("email")}</Typography>
              <Typography className="profile__data">
                {authState.email || t("unknown")}
              </Typography>
            </Box>

            <Box className="profile__edit-icon">
              <EditIcon onClick={() => setModal(modals.email)} />
            </Box>
          </Box>

          <Box className="profile__left-part-content">
            <Box className="profile__left-part-labels">
              <Typography className="profile__label">
                {t("verifiedTitle")}
              </Typography>
              <Box
                className="profile__verified"
                onClick={() => {
                  if (!authState.emailVerified) {
                    auth.currentUser && sendEmailVerification(auth.currentUser);
                    toast.custom(
                      (element) => (
                        <Notification
                          header={t("email_verificationHeader")}
                          message={t("email_verificationMessage")}
                          element={element}
                          type={"info"}
                        />
                      ),
                      { position: "bottom-center" }
                    );
                  }
                }}
              >
                {authState.emailVerified ? (
                  <>
                    <Typography className="profile__data">
                      {t("verified")}
                    </Typography>
                    <CheckCircleIcon className="profile__icon profile__success-icon" />
                  </>
                ) : (
                  <>
                    <Typography className="profile__data">
                      {t("notVerified")}
                    </Typography>
                    <CancelIcon className="profile__icon profile__error-icon" />
                  </>
                )}
              </Box>
            </Box>

            <Box className="profile__edit-icon">
              <EditIcon onClick={() => setModal(modals.email)} />
            </Box>
          </Box>
        </Box>

        <Box className="profile__right-part">
          <Box className="profile__left-part-content">
            <Box className="profile__left-part-labels">
              <Typography className="profile__label">{t("phone")}</Typography>
              <Typography className="profile__data">
                {authState.phoneNumber || t("unknown")}
              </Typography>
            </Box>

            <Box className="profile__edit-icon">
              <EditIcon onClick={() => setModal(modals.phone)} />
            </Box>
          </Box>
          <Box className="profile__left-part-content">
            <Box className="profile__left-part-centered">
              <Typography className="profile__label">
                {t("reputation")}
              </Typography>
              <Typography className="profile__data" variant="h5">
                {reputation}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box className="profile__right-part">

<Box className="profile__infosection">
  <Box className="profile__flexcentered">
    <Typography className="profile__label">{t("phone")}</Typography>
    <Button onClick={() => setModal(modals.phone)} >
      <EditIcon /> 
    </Button>
  </Box>
  <Typography>{authState.phoneNumber || t("unknown")}</Typography>
</Box>
</Box>
</Box> */}

      {/* <Box className="profile__infocontainer">

        <Box className="profile__left-part">
          <Box className="profile__infosection">
            <Box className="profile__flexcentered">
              <Typography className="profile__label">{t("name")}</Typography>
              <Button onClick={() => setModal(modals.name)} >
                <EditIcon /> 
              </Button>
            </Box>
            <Typography>{authState.name || t("unknown")}</Typography>
          </Box>

          <Box className="profile__infosection">
            <Box className="profile__flexcentered">
              <Typography className="profile__label">{t("email")}</Typography>
              <Button
                onClick={() => setModal(modals.email)}>
                <EditIcon />
              </Button>
            </Box>
            <Typography>{authState.email}</Typography>
          </Box>

          <Box className="profile__infosection">
            <Typography className="profile__label">{t("verifiedTitle")}</Typography>
            <Box
              className="profile__emailverif"
              onClick={() => {
                if (!authState.emailVerified) {
                  auth.currentUser && sendEmailVerification(auth.currentUser);
                  toast.custom(
                    (element) => (
                      <Notification
                        header={t("email_verificationHeader")}
                        message={t("email_verificationMessage")}
                        element={element}
                        type={"info"}
                      />
                    ),
                    { position: "bottom-center" }
                  );
                }
              }}
            >
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

        <Box className="profile__right-part">

          <Box className="profile__infosection">
            <Box className="profile__flexcentered">
              <Typography className="profile__label">{t("phone")}</Typography>
              <Button onClick={() => setModal(modals.phone)} >
                <EditIcon /> 
              </Button>
            </Box>
            <Typography>{authState.phoneNumber || t("unknown")}</Typography>
          </Box>
        </Box>
      </Box> */}
      {modal}
    </Box>
  );
};

export default ProfilePage;

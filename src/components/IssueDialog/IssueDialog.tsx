import React from "react";
import {
  Typography,
  Modal,
  Paper,
  TextareaAutosize,
  Box
} from "@mui/material";
import { AppButton } from "../../components/AppButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { quizDataType } from "../../services/quiz/tyles";
import { useState } from "react";
import emailjs from 'emailjs-com';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IssueDialogProps {
  quiz: quizDataType | null;
  onClose: () => void;
}

const IssueDialog: React.FC<IssueDialogProps> = ({ quiz, onClose }) => {
  if (!quiz) {
    return null;
  }
  const { t } = useTranslation("quiz");
  const [issue, setIssue] = useState("");
  const authState = useSelector((state: RootState) => state.auth.user);
  
  const message : string = `User ${authState.name || t("unknown")} has reported that your quiz called ${quiz?.title} has an issue. \n\n ${issue}`

  const sendEmail = () => {    
    emailjs.send('service_14mshir', 'template_289ev8q', { message, recipient_email: quiz?.authorEmail}, 'XM98eZJKtZW0ajxcy')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    onClose
   };
   
  return (
    <Modal className="quiz-passing__modal" open={true} onClose={onClose}>
      <Paper className="quiz-passing__paper">
        <Typography className="quiz-passing__title-issue" variant="h4">{t('reportTitle')}</Typography>
        
        <Typography className="quiz-passing__title-issue issue-title" variant="h4">{quiz.title}</Typography>
        <TextareaAutosize
          className="quiz-passing__open-question-answer"
          onChange={(e) => setIssue(e.target.value)}
          value={issue}
        />
        
        <AppButton className="quiz-passing__welcome-button" onClick={sendEmail}>{t('submit')}</AppButton>
        <CloseIcon className="quiz-passing__close-icon issue-close" onClick={onClose} />
      </Paper>
    </Modal>
  );
};

export default IssueDialog;

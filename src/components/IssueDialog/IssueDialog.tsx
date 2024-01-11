import React from "react";
import {
  Box,
  Typography,
  Modal,
  Paper,
  TextareaAutosize,
  Button,
  IconButton,
} from "@mui/material";
import { AppButton } from "../../components/AppButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { quizDataType } from "../../services/quiz/tyles";
import { useEffect, useState } from "react";
import emailjs from 'emailjs-com';
import { auth, database } from "../../services/Firebase/firebase";
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
    console.log(message)
    console.log(quiz?.authorEmail)
    
    emailjs.send('service_14mshir', 'template_289ev8q', { message, recipient_email: quiz?.authorEmail}, 'XM98eZJKtZW0ajxcy')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
   };
   
  return (
    <Modal className="quiz-passing__modal" open={true} onClose={onClose}>
    <Paper className="quiz-passing__paper">
      
       <Typography className="quiz-passing__title" variant="h4">
        Report an issue
      </Typography>
      <Typography className="quiz-passing__title" variant="h4">
        {quiz.title}
      </Typography>
      <TextareaAutosize
        className="quiz-passing__open-question-answer"
        onChange={(e) => {
          setIssue(e.target.value);
        }}
        value={issue}
      />
      
      <AppButton
        className="quiz-passing__welcome-button" onClick={sendEmail}>
        Submit
      </AppButton>
      <CloseIcon className="quiz-passing__close-icon" onClick={onClose} />
    </Paper>
    </Modal>
    
  );
};

export default IssueDialog;

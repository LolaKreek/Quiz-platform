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

interface IssueDialogProps {
  quiz: quizDataType | null;
  onClose: () => void;
}

const IssueDialog: React.FC<IssueDialogProps> = ({ quiz, onClose }) => {
  const { t } = useTranslation("quiz");
  const [issue, setIssue] = useState("");
  const setNotification = () => {
    console.log("you did great")
  }
  if (!quiz) {
    return null;
  }

  return (
    <Modal  className="quiz-passing__modal" open={true} onClose={onClose}>
    <Paper className="quiz-passing__paper">
    <CloseIcon className="quiz-passing__close-icon" onClick={onClose} />
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
        className="quiz-passing__welcome-button" onClick={setNotification}>
        Submit
      </AppButton>
      
    </Paper>
    </Modal>
    
  );
};

export default IssueDialog;

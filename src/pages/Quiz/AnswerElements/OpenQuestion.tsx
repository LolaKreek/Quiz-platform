import { Box, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { question } from "../../../services/quiz/tyles";
import { AppButton } from "../../../components/AppButton";

const OpenQuestion = ({
  question,
  submit,
  index,
}: {
  question: question;
  submit: any;
  index: number;
}) => {
  useEffect(() => {
    setAnswer("");
  }, [question]);
  const [answer, setAnswer] = useState("");
  return (
    <Box className="quiz-passing__open-question-wrapper">
      <Typography variant="h5" className="quiz-passing__single-question-title">
        {question.title}
      </Typography>
      <Typography className="add-questions-modal__quiz-title label">
        <i className="symbol">*&nbsp;</i> Write answer
      </Typography>
      <TextareaAutosize
        className="quiz-passing__open-question-answer"
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        value={answer}
      />
      <AppButton
        className="quiz-passing__single-question-submit"
        onClick={() => {
          submit(question.id, answer, index);
        }}
      >
        Submit
      </AppButton>
    </Box>
  );
};

export default OpenQuestion;

import { Box, Checkbox, Divider, Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { question } from "../../../services/quiz/tyles";
import { AppButton } from "../../../components/AppButton";

const SingleQuestion = ({
  question,
  submit,
  index,
}: {
  question: question;
  submit: any;
  index: number;
}) => {
  useEffect(() => {
    setRandomized(
      Object.entries(question.answers)
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
    setSelectedAnswer("Not selected");
  }, [question]);

  const [randomized, setRandomized] = useState<any>(null);

  const [selectedAnswer, setSelectedAnswer] = useState("Not selected");
  return (
    <Box>
      <Typography variant="h5" className="quiz-passing__single-question-title">
        {question.title}
      </Typography>
      <Typography className="add-questions-modal__quiz-title label">
        <i className="symbol">*&nbsp;</i> Choose one answer
      </Typography>
      <Box className="quiz-passing__single-question-wrapper">
        {randomized &&
          randomized.map((answer: any) => (
            <Box className="quiz-passing__single-question-answer-wrapper">
              <Radio
                checked={selectedAnswer === answer[0]}
                onChange={() => setSelectedAnswer(answer[0])}
              />
              <Typography className="quiz-passing__single-question-answer">
                {answer[1].text}
              </Typography>
            </Box>
          ))}
      </Box>
      <AppButton
        className="quiz-passing__single-question-submit"
        onClick={() => {
          submit(question.id, selectedAnswer, index);
        }}
      >
        Submit
      </AppButton>
    </Box>
  );
};

export default SingleQuestion;

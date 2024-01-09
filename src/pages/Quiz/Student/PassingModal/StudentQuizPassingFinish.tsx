import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { quizDataType } from "../../../../services/quiz/tyles";
import { useEffect, useState } from "react";
import { AppButton } from "../../../../components/AppButton";

const StudentQuizPassingFinish = ({
  quiz,
  finish,
  timer,
  setTimer,
  setGlobalElapsed,
}: {
  quiz: quizDataType;
  finish: Function;
  timer?: number | null;
  setTimer: Function;
  setGlobalElapsed: Function;
}) => {
  const [answersPage, setAnswersPage] = useState(false);
  const [answersObj, setAnswers] = useState([]);
  function answers() {
    let answers: any = [];
    quiz.questions.map((question, index) => {
      if (question.type === "Single") {
        answers.push({
          title: question.title,
          answer: question.answers.first.text,
        });
      } else if (question.type === "Multiple") {
        answers.push({
          title: question.title,
          answer: Object.values(question.answers)
            .filter((answer) => answer.isCorrect)
            .map((answer) => answer.text)
            .join(", "),
        });
      } else if (question.type === "Open") {
        answers.push({
          title: question.title,
          answer: "Open answer",
        });
      } else if (question.type === "Drag & Drop") {
        answers.push({
          title: question.title,
          answer: Object.values(question.answers)
            .map((answer) => answer.text)
            .join(", "),
        });
      }
    });
    return answers;
  }

  function millisecondsToHMS(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  }

  const [elapsed, setElapsed] = useState<any>(0);

  useEffect(() => {
    setAnswers(answers());
    //@ts-ignore
    setTimer((startTimer) => {
      if (startTimer) {
        setElapsed(millisecondsToHMS(Date.now() - startTimer));
        setGlobalElapsed(millisecondsToHMS(Date.now() - startTimer));
        return null;
      }
    });
  }, []);

  const { t } = useTranslation("quiz");

  const pages = [
    <Box>
      <Typography className="quiz-passing__title" variant="h4">
        Finishing
      </Typography>
      <Box className="quiz-passing__welcome-info">
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentTitle")}
          </Typography>
          <Typography>{quiz.title}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentFaculty")}
          </Typography>
          <Typography>{quiz.faculty}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentAuthor")}
          </Typography>
          <Typography>
            {quiz.authorName ? quiz.authorName : "Unknown"}
          </Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentSubject")}
          </Typography>
          <Typography>{quiz.subject}</Typography>
        </Box>
        <Box>
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentQuestions")}
          </Typography>
          <Typography>{quiz.questions.length}</Typography>
        </Box>
      </Box>
      <Box className="quiz-passing__welcome-divider-container">
        <Divider className="quiz-passing__welcome-divider"></Divider>
      </Box>
      <Box>
        <Box className="quiz-passing__welcome-under-info">
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentTimer") + ":"}
          </Typography>
          <Typography>{quiz.timer ? elapsed + " / 30:00" : "-"}</Typography>
        </Box>

        <Box className="quiz-passing__welcome-under-info">
          <Typography className="quiz-passing__sub-title" variant="subtitle2">
            {t("studentAnswers") + ":"}
          </Typography>
          {quiz.showAnswers ? (
            <AppButton
              onClick={() => setAnswersPage(!answersPage)}
              variant="outlined"
              className="quiz-passing__answers-button"
            >
              See answers
            </AppButton>
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </Box>
      <AppButton
        onClick={() => {
          finish();
        }}
        className="quiz-passing__welcome-button"
      >
        {t("done")}
      </AppButton>
    </Box>,
    <Box className="quiz-passing__answers-container">
      <Typography className="quiz-passing__title" variant="h4">
        {t("studentQuizAnswers")}
      </Typography>
      {answersObj.map((answer: any, index) => {
        return (
          <Box className="quiz-passing__answers-item">
            <Typography className="quiz-passing__sub-title" variant="subtitle2">
              {index + 1 + ". " + answer.title + " -"}
            </Typography>
            <Typography className="quiz-passing__answers-item-answer">
              {answer.answer}
            </Typography>
          </Box>
        );
      })}
      <AppButton
        onClick={() => setAnswersPage(!answersPage)}
        variant="outlined"
        className="quiz-passing__answers-backbutton"
      >
        {t("back")}
      </AppButton>
    </Box>,
  ];

  return <Box>{pages[answersPage ? 1 : 0]}</Box>;
};

export default StudentQuizPassingFinish;

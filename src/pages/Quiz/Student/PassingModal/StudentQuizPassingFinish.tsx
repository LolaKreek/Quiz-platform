import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { quizDataType } from "../../../../services/quiz/tyles";
import { useEffect, useState } from "react";
import { AppButton } from "../../../../components/AppButton";
import AnswersPage from "./AnswersPage";

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

  return (
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
        {quiz.timer && (
          <Box>
            <Typography className="quiz-passing__sub-title" variant="subtitle2">
              {t("studentTimer")}
            </Typography>
            <Typography>{elapsed + " / 30:00"}</Typography>
          </Box>
        )}
      </Box>
      <Box className="quiz-passing__welcome-divider-container">
        <Divider className="quiz-passing__welcome-divider"></Divider>
      </Box>
      <AppButton
        onClick={() => {
          finish();
        }}
        className="quiz-passing__welcome-button"
      >
        {t("done")}
      </AppButton>
    </Box>
  );
};
export default StudentQuizPassingFinish;

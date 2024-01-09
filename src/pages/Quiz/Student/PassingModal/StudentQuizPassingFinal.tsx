import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { quizDataType } from "../../../../services/quiz/tyles";
import { useEffect, useState } from "react";
import { AppButton } from "../../../../components/AppButton";
import { child, get, ref } from "firebase/database";
import { auth, database } from "../../../../services/Firebase/firebase";

const StudentQuizPassingFinal = ({
  onCliose,
  quiz,
}: {
  onCliose: Function;
  quiz: quizDataType;
}) => {
  const { t } = useTranslation("quiz");

  const [mark, setMark] = useState("Loading...");
  useEffect(() => {
    get(child(ref(database), `student/${auth.currentUser?.uid}/results`)).then(
      (snapshot) => {
        const answers = Object.values(
          //@ts-ignore
          Object.values(snapshot.val())[
            Object.values(snapshot.val()).length - 1
          ].results
        );

        const total = answers.length;

        const corrct = answers.filter((answer: any) => answer).length;
        setMark(`${corrct}/${total}`);
      }
    );
  }, []);

  return (
    <Box>
      <Typography className="quiz-passing__title" variant="h4">
        {t("studentCongratulations")}
      </Typography>
      <Typography className="quiz-passing__title" variant="h5">
        {t("studentScored")}
      </Typography>
      <Typography className="quiz-passing__title" variant="h6">
        {mark}
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
      {quiz.showAnswers && (
        <>
          <Box className="quiz-passing__welcome-divider-container">
            <Divider className="quiz-passing__welcome-divider"></Divider>
          </Box>
          <AppButton
            variant="outlined"
            className="quiz-passing__answers_button"
            onClick={() => {}}
          >
            See answers
          </AppButton>
        </>
      )}

      <AppButton
        onClick={() => {
          onCliose();
        }}
        className="quiz-passing__welcome-button"
      >
        {t("quit")}
      </AppButton>
    </Box>
  );
};

export default StudentQuizPassingFinal;

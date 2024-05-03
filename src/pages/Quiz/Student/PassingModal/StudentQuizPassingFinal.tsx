import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { quizDataType } from "../../../../services/quiz/tyles";
import { useEffect, useState } from "react";
import { AppButton } from "../../../../components/AppButton";
import { child, get, ref } from "firebase/database";
import { auth, database } from "../../../../services/Firebase/firebase";
import AnswersPage from "./AnswersPage";

const StudentQuizPassingFinal = ({
  onCliose,
  quiz,
}: {
  onCliose: Function;
  quiz: quizDataType;
}) => {
  const { t } = useTranslation("quiz");

  const [answersPage, setAnswersPage] = useState(false);
  const [answersObj, setAnswers] = useState([]);
  function answers() {
    let answers: any = [];
    quiz.questions.map((question) => {
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
          answer: `${question.answers.first.text}, ${question.answers.second.text}, ${question.answers.third.text}, ${question.answers.fourth.text}`,
        });
      }
    });
    return answers;
  }

  const [mark, setMark] = useState("Loading...");
  useEffect(() => {
    setAnswers(answers());
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
      {answersPage ? (
        <AnswersPage
          answersObj={answersObj}
          setAnswersPage={setAnswersPage}
          answersPage={answersPage}
        ></AnswersPage>
      ) : (
        <>
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
              <Typography
                className="quiz-passing__sub-title"
                variant="subtitle2"
              >
                {t("studentTitle")}
              </Typography>
              <Typography>{quiz.title}</Typography>
            </Box>
            <Box>
              <Typography
                className="quiz-passing__sub-title"
                variant="subtitle2"
              >
                {t("studentFaculty")}
              </Typography>
              <Typography>{quiz.faculty}</Typography>
            </Box>
            <Box>
              <Typography
                className="quiz-passing__sub-title"
                variant="subtitle2"
              >
                {t("studentAuthor")}
              </Typography>
              <Typography>
                {quiz.authorName ? quiz.authorName : "Unknown"}
              </Typography>
            </Box>
            <Box>
              <Typography
                className="quiz-passing__sub-title"
                variant="subtitle2"
              >
                {t("studentSubject")}
              </Typography>
              <Typography>{quiz.subject}</Typography>
            </Box>
            <Box>
              <Typography
                className="quiz-passing__sub-title"
                variant="subtitle2"
              >
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
                onClick={() => {
                  setAnswersPage(!answersPage);
                }}
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
        </>
      )}
    </Box>
  );
};

export default StudentQuizPassingFinal;

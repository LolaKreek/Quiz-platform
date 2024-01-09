import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { quizDataType } from "../../../../services/quiz/tyles";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import { AppButton } from "../../../../components/AppButton";

const StudentQuizPassingWelcome = ({
  setTimer,
  quiz,
  next,
}: {
  setTimer: Function;
  quiz: quizDataType;
  next: Function;
}) => {
  const { t } = useTranslation("quiz");
  return (
    <Box>
      <Typography className="quiz-passing__title" variant="h4">{t('welcome')}</Typography>
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
        <Typography className="quiz-passing__sub-title" variant="subtitle2">
          {t("studentTimer")}
        </Typography>
        <Typography>{quiz.timer ? "Yes" : "No"}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" className="quiz-passing__sub-title">
          {t("studentAnswers")}
        </Typography>
        <Typography>{quiz.showAnswers ? "Yes" : "No"}</Typography>
      </Box>

      {quiz.timer && (
        <Box className="quiz-passing__attention">
          <PriorityHigh
            sx={{ width: "30px", height: "30px", color: "#6062FF" }}
          />
          <Typography>
            This test is time limited! You have 30 minutes to answer all
            questions! If the time runs out before you answer the questions, the
            platform will consider the unanswered questions to be{" "}
            <strong>incorrect</strong>. The countdown will begin after you press
            the START button and proceed to solving the first question.
          </Typography>
        </Box>
      )}
      {quiz.showAnswers && (
        <Box className="quiz-passing__attention">
          <PriorityHigh
            sx={{ width: "30px", height: "30px", color: "#6062FF" }}
          />
          <Typography>
            After completing this test, you will be able to see the correct
            answers to this test!
          </Typography>
        </Box>
      )}
      <AppButton
        className="quiz-passing__welcome-button"
        onClick={() => {
          next();
          quiz.timer && setTimer(Date.now());
        }}
      >
        Start
      </AppButton>
    </Box>
  );
};

export default StudentQuizPassingWelcome;

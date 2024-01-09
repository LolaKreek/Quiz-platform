import { Box, Typography } from "@mui/material";
import React from "react";
import { AppButton } from "../../../../components/AppButton";
import { useTranslation } from "react-i18next";

const AnswersPage = ({
  answersObj,
  setAnswersPage,
  answersPage,
}: {
  answersObj: any;
  setAnswersPage: Function;
  answersPage: boolean;
}) => {
  const { t } = useTranslation("quiz");

  return (
    <Box className="quiz-passing__answers-container">
      <Typography className="quiz-passing__title" variant="h4">
        {t("studentQuizAnswers")}
      </Typography>
      {answersObj.map((answer: any, index: number) => {
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
    </Box>
  );
};

export default AnswersPage;

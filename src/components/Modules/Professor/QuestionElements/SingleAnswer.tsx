import { Box } from "@mui/material";
import { AppInput } from "../../../AppInput";
import { useEffect } from "react";

const SingleAnswer = ({
  set,
  values,
  errors,
  editing,
}: {
  set: Function;
  values: { [key: string]: { text: string } };
  errors: { [key: string]: { text: string } };
  editing: boolean;
}) => {
  return (
    <>
      {values && (
        <Box className="_add-quiz-question__container _add-quiz-question__single">
          <AppInput
            variant="outlined"
            error={errors && !!errors.first}
            value={values["first"].text}
            onChange={(e) => {
              set("answers", {
                ...values,
                first: { text: e.target.value },
              });
            }}
            className="_add-quiz-question__input _add-quiz-question__correct"
          ></AppInput>
          <AppInput
            variant="outlined"
            error={errors && !!errors.second}
            value={values["second"].text}
            onChange={(e) => {
              set("answers", {
                ...values,
                second: { text: e.target.value },
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
          <AppInput
            variant="outlined"
            error={errors && !!errors.third}
            value={values["third"].text}
            onChange={(e) => {
              set("answers", {
                ...values,
                third: { text: e.target.value },
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
          <AppInput
            variant="outlined"
            error={errors && !!errors.fourth}
            value={values["fourth"].text}
            onChange={(e) => {
              set("answers", {
                ...values,
                fourth: { text: e.target.value },
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
        </Box>
      )}
    </>
  );
};

export default SingleAnswer;

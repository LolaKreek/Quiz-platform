import { Box, Checkbox } from "@mui/material";
import { AppInput } from "../../../AppInput";
import { useEffect } from "react";

const MultipleAnswer = ({
  set,
  values,
  errors,
  editing
}: {
  set: Function;
  values: { [key: string]: { text: string; isCorrect: boolean } };
  errors: { [key: string]: { text: string } };
  editing: boolean;
}) => {

  return (
    <>
      {values && (
        <Box className="_add-quiz-question__container _add-quiz-question__multiple">
          <Checkbox
            checked={values["first"]["isCorrect"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                first: {
                  ...values["first"],
                  isCorrect: e.target.checked,
                },
              });
            }}
          />
          <AppInput
            variant="outlined"
            error={errors && !!errors.first}
            value={values["first"]["text"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                first: {
                  ...values["first"],
                  text: e.target.value,
                },
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
          <Checkbox
            checked={values["second"]["isCorrect"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                second: {
                  ...values["second"],
                  isCorrect: e.target.checked,
                },
              });
            }}
          />
          <AppInput
            variant="outlined"
            error={errors && !!errors.second}
            value={values["second"]["text"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                second: {
                  ...values["second"],
                  text: e.target.value,
                },
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
          <Checkbox
            checked={values["third"]["isCorrect"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                third: {
                  ...values["third"],
                  isCorrect: e.target.checked,
                },
              });
            }}
          />
          <AppInput
            variant="outlined"
            error={errors && !!errors.third}
            value={values["third"]["text"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                third: {
                  ...values["third"],
                  text: e.target.value,
                },
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
          <Checkbox
            checked={values["fourth"]["isCorrect"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                fourth: {
                  ...values["fourth"],
                  isCorrect: e.target.checked,
                },
              });
            }}
          />
          <AppInput
            variant="outlined"
            error={errors && !!errors.fourth}
            value={values["fourth"]["text"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                fourth: {
                  ...values["fourth"],
                  text: e.target.value,
                },
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
        </Box>
      )}
    </>
  );
};

export default MultipleAnswer;

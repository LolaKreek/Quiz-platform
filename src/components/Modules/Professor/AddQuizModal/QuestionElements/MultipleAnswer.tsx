import { Box, Checkbox } from "@mui/material";
import { AppInput } from "../../../../AppInput";
import { useEffect } from "react";

const MultipleAnswer = ({
  set,
  values,
}: {
  set: Function;
  values: { [key: string]: { text: string; isCorrect: boolean } };
}) => {
  useEffect(() => {
    set("answers", {
      first: {
        text: "",
        isCorrect: false,
      },
      second: {
        text: "",
        isCorrect: false,
      },
      third: {
        text: "",
        isCorrect: false,
      },
      fourth: {
        text: "",
        isCorrect: false,
      },
    });
  }, []);

  return (
    <>
      {values && (
        <Box className="_add-quiz-question__container _add-quiz-question__multiple">
          <Checkbox
            value={values["first"]["isCorrect"]}
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
            error={false}
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
            value={values["second"]["isCorrect"]}
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
            error={false}
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
            value={values["third"]["isCorrect"]}
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
            error={false}
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
            value={values["fourth"]["isCorrect"]}
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
            error={false}
            value={values["fourth"]["text"]}
            onChange={(e) => {
              set("answers", {
                ...values["answers"],
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

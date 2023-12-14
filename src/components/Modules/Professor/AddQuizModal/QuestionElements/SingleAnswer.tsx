import { Box } from "@mui/material";
import { AppInput } from "../../../../AppInput";
import { useEffect } from "react";

const SingleAnswer = ({
  set,
  values,
}: {
  set: Function;
  values: { [key: string]: string };
}) => {
  useEffect(() => {
    set("answers", {
      first: "",
      second: "",
      third: "",
      fourth: "",
    });
  }, []);

  return (
    <>
      {values && (
        <Box className="_add-quiz-question__container _add-quiz-question__single">
          <AppInput
            variant="outlined"
            error={false}
            value={values["first"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                first: e.target.value,
              });
            }}
            className="_add-quiz-question__input _add-quiz-question__correct"
          ></AppInput>
          <AppInput
            variant="outlined"
            error={false}
            value={values["second"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                second: e.target.value,
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
          <AppInput
            variant="outlined"
            error={false}
            value={values["third"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                third: e.target.value,
              });
            }}
            className="_add-quiz-question__input"
          ></AppInput>
          <AppInput
            variant="outlined"
            error={false}
            value={values["fourth"]}
            onChange={(e) => {
              set("answers", {
                ...values,
                fourth: e.target.value,
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

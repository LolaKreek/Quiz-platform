import { Box } from "@mui/material";
import { AppInput } from "../../../AppInput";
import AttachButton from "../../../Attach";

const SingleAnswer = ({
  set,
  values,
  errors,
}: {
  set: Function;
  values: { [key: string]: { text: string; picture?: { [key: string]: any } } };
  errors: { [key: string]: { text: string; picture?: string } };
  editing: boolean;
}) => {
  return (
    <>
      {values && (
        <Box className="_add-quiz-question__container _add-quiz-question__single">
          <Box className="_add-quiz-question__inputs-wrapper">
            <AppInput
              variant="outlined"
              error={errors && !!errors.first}
              disabled={!!values["first"].picture}
              value={values["first"].text}
              onChange={(e) => {
                set({
                  ...values,
                  first: { text: e.target.value },
                });
              }}
              className="_add-quiz-question__input _add-quiz-question__correct"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  first: {
                    picture: file,
                    text: file.name,
                  },
                });
              }}
            />
          </Box>

          <Box className="_add-quiz-question__inputs-wrapper">
            <AppInput
              variant="outlined"
              error={errors && !!errors.second}
              disabled={!!values["second"].picture}
              value={values["second"].text}
              onChange={(e) => {
                set({
                  ...values,
                  second: { text: e.target.value },
                });
              }}
              className="_add-quiz-question__input"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  second: {
                    picture: file,
                    text: file.name,
                  },
                });
              }}
            />
          </Box>

          <Box className="_add-quiz-question__inputs-wrapper">
            <AppInput
              variant="outlined"
              error={errors && !!errors.third}
              disabled={!!values["third"].picture}
              value={values["third"].text}
              onChange={(e) => {
                set({
                  ...values,
                  third: { text: e.target.value },
                });
              }}
              className="_add-quiz-question__input"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  third: {
                    picture: file,
                    text: file.name,
                  },
                });
              }}
            />
          </Box>

          <Box className="_add-quiz-question__inputs-wrapper">
            <AppInput
              variant="outlined"
              error={errors && !!errors.fourth}
              disabled={!!values["fourth"].picture}
              value={values["fourth"].text}
              onChange={(e) => {
                set({
                  ...values,
                  fourth: { text: e.target.value },
                });
              }}
              className="_add-quiz-question__input"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  fourth: {
                    picture: file,
                    text: file.name,
                  },
                });
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleAnswer;

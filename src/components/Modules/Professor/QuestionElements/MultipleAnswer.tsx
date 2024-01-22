import { Box, Checkbox, Icon, IconButton, styled } from "@mui/material";
import { AppInput } from "../../../AppInput";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AttachButton from "../../../Attach";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const MultipleAnswer = ({
  set,
  values,
  errors,
  editing,
}: {
  set: Function;
  values: {
    [key: string]: {
      text: string;
      isCorrect: boolean;
      picture?: { [key: string]: any };
    };
  };
  errors: { [key: string]: { text: string; picture?: string } };
  editing: boolean;
}) => {
  return (
    <>
      {values && (
        <Box className="_add-quiz-question__container _add-quiz-question__multiple">
          <Box className="_add-quiz-question__inputs-wrapper">
            <Checkbox
              checked={values["first"]["isCorrect"]}
              onChange={(e) => {
                set({
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
              disabled={!!values["first"].picture}
              value={values["first"].text}
              onChange={(e) => {
                set({
                  ...values,
                  first: {
                    ...values["first"],
                    text: e.target.value,
                  },
                });
              }}
              className="_add-quiz-question__input  multiple-input"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  first: {
                    ...values["first"],
                    picture: file,
                    text: file.name,
                  },
                });
              }}
            />
          </Box>

          <Box className="_add-quiz-question__inputs-wrapper">
            <Checkbox
              checked={values["second"]["isCorrect"]}
              onChange={(e) => {
                set({
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
              disabled={!!values["second"].picture}
              value={values["second"].text}
              onChange={(e) => {
                set({
                  ...values,
                  second: {
                    ...values["second"],
                    text: e.target.value,
                  },
                });
              }}
              className="_add-quiz-question__input  multiple-input"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  second: {
                    ...values["second"],
                    picture: file,
                    text: file.name,
                  },
                });
              }}
            />
          </Box>

          <Box className="_add-quiz-question__inputs-wrapper">
            <Checkbox
              checked={values["third"]["isCorrect"]}
              onChange={(e) => {
                set({
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
              disabled={!!values["third"].picture}
              value={values["third"].text}
              onChange={(e) => {
                set({
                  ...values,
                  third: {
                    ...values["third"],
                    text: e.target.value,
                  },
                });
              }}
              className="_add-quiz-question__input  multiple-input"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  third: {
                    ...values["third"],
                    picture: file,
                    text: file.name,
                  },
                });
              }}
            />
          </Box>

          <Box className="_add-quiz-question__inputs-wrapper">
            <Checkbox
              checked={values["fourth"]["isCorrect"]}
              onChange={(e) => {
                set({
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
              disabled={!!values["fourth"].picture}
              value={values["fourth"].text}
              onChange={(e) => {
                set({
                  ...values,
                  fourth: {
                    ...values["fourth"],
                    text: e.target.value,
                  },
                });
              }}
              className="_add-quiz-question__input multiple-input"
            ></AppInput>
            <AttachButton
              accept=".png, .jpg, .jpeg"
              set={(file: File) => {
                set({
                  ...values,
                  fourth: {
                    ...values["fourth"],
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

export default MultipleAnswer;

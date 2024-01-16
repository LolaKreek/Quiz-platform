import { Box, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { question } from "../../../services/quiz/tyles";
import { AppButton } from "../../../components/AppButton";
import { AppLoader } from "../../../components/AppLoader";

const MultipleQuestion = ({
  question,
  submit,
  index,
}: {
  question: question;
  submit: any;
  index: number;
}) => {

  const [loadingImages, setLoadingImages] = useState<{[key: string]: boolean}>({
    first: false,
    second: false,
    third: false,
    fourth: false,
    title: false,
  })

  useEffect(() => {
    setLoadingImages((prev) => ({ ...prev, title: !!question.picture }))
    setRandomized(
      Object.entries(question.answers)
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => {
          setLoadingImages((prev) => ({ ...prev, [value[0]]: !!value[1].picture }))
          return value
        })
    );
    setSelectedAnswer({
      first: false,
      second: false,
      third: false,
      fourth: false,
    });
  }, [question]);

  const [randomized, setRandomized] = useState<any>(null);

  const [selectedAnswers, setSelectedAnswer] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });
  return (
    <Box>
      <Typography variant="h5" className="quiz-passing__single-question-title">
        {question.title}
      </Typography>
      <AppLoader show={loadingImages.title}/>
      {question.picture && <img className="quiz-passing__picture" onLoad={() => setLoadingImages((prev) => ({ ...prev, title: false }))} src={`https://firebasestorage.googleapis.com/v0/b/pracadyplomowa-8a45f.appspot.com/o/pictures%2F${question.id}?alt=media`}></img>}
      <Typography className="add-questions-modal__quiz-title label">
        <i className="symbol">*&nbsp;</i> Choose multiple answers
      </Typography>
      <Box className="quiz-passing__single-question-wrapper">
        {randomized &&
          randomized.map((answer: any) => (
            <Box className="quiz-passing__single-question-answer-wrapper">
              <Checkbox
                //@ts-ignore
                checked={selectedAnswers[answer[0]]}
                onChange={() =>
                  setSelectedAnswer({
                    ...selectedAnswers,
                    //@ts-ignore
                    [answer[0]]: !selectedAnswers[answer[0]],
                  })
                }
              />
              <Box className="quiz-passing__single-question-answer quiz-passing__answer">
              {answer[1].picture ? <>
                  <AppLoader show={loadingImages[answer[0]]}/>
                  <img onLoad={() => setLoadingImages((prev) => ({ ...prev, [answer[0]]: false }))} src={`https://firebasestorage.googleapis.com/v0/b/pracadyplomowa-8a45f.appspot.com/o/pictures%2F${question.id}_${answer[0]}?alt=media`}/>
                </> : <Typography>
                  {answer[1].text}
                </Typography>}
              </Box>
            </Box>
          ))}
      </Box>
      <AppButton
        className="quiz-passing__single-question-submit"
        onClick={() => {
          submit(question.id, selectedAnswers, index);
        }}
      >
        Submit
      </AppButton>
    </Box>
  );
};

export default MultipleQuestion;
